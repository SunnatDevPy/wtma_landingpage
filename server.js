/**
 * WTMA (World Textile Marketing Agency)
 * Telegram Lead Notification Microservice & API
 * 
 * Standart Node.js kutubxonalarida (zero-dependency) yozilgan.
 * Ochiq va YOPIQ (private) guruhlar, kanallar, alohida shaxsiy chatlar hamda forum mavzularini (Topics) to'liq qo'llab-quvvatlaydi.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// 1. .env faylni yuklash (ichki parser)
function loadEnv() {
  const envPaths = [
    path.join(__dirname, '.env'),
    path.join(process.cwd(), '.env'),
    path.join(__dirname, '..', '.env')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach((line) => {
          line = line.trim();
          if (!line || line.startsWith('#')) return;
          const eqIdx = line.indexOf('=');
          if (eqIdx !== -1) {
            const key = line.slice(0, eqIdx).trim();
            let val = line.slice(eqIdx + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        });
        console.log(`[Env] .env fayli yuklandi: ${envPath}`);
        break;
      } catch (err) {
        console.warn(`[Env] .env o'qishda xatolik:`, err.message);
      }
    }
  }
}

loadEnv();

const PORT = parseInt(process.env.PORT, 10) || 3000;

// 2. HTML maxsus belgilarini tozalash (Telegram HTML parse_mode xavfsizligi)
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// 3. Zayavkani chiroyli Telegram xabariga aylantirish
function formatLeadMessage(lead) {
  const now = new Date();
  const timeStr = now.toLocaleString('ru-RU', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const lines = [
    '🌟 <b>YANGI ZAYAVKA — WTMA PLATFORMASI</b>',
    '━━━━━━━━━━━━━━━━━━━━━━━━━',
    `👤 <b>Mijoz:</b> ${escapeHtml(lead.name || 'Ko\'rsatilmadi')}`,
    `📞 <b>Telefon:</b> ${lead.phone ? `<a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a>` : '<i>Ko\'rsatilmadi</i>'}`
  ];

  if (lead.email) {
    lines.push(`✉️ <b>Email:</b> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a>`);
  }
  if (lead.company) {
    lines.push(`🏢 <b>Kompaniya:</b> ${escapeHtml(lead.company)}`);
  }
  if (lead.direction) {
    lines.push(`🎯 <b>Yo'nalish:</b> ${escapeHtml(lead.direction)}`);
  }
  if (lead.budget) {
    lines.push(`💰 <b>Byudjet:</b> ${escapeHtml(lead.budget)}`);
  }
  if (lead.message) {
    lines.push(`📝 <b>Xabar:</b>\n<i>${escapeHtml(lead.message)}</i>`);
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push(`🌐 <b>Manba:</b> ${escapeHtml(lead.source || 'Veb-sayt')}`);
  lines.push(`⏰ <b>Vaqt:</b> ${timeStr} (Toshkent vaqti)`);

  return lines.join('\n');
}

// 4. Chat ID ni tozalash va yopiq guruhlar formatiga keltirish (-100 prefiksini ta'minlash)
function normalizeChatId(rawId) {
  if (!rawId) return null;
  let str = String(rawId).trim().replace(/^["']|["']$/g, '');
  if (!str) return null;

  // Agar Telegram xabar havolasi berilgan bo'lsa: "https://t.me/c/2489172314/12"
  const tmeMatch = str.match(/t\.me\/c\/(\d+)(?:\/(\d+))?/);
  if (tmeMatch) {
    const rawChanId = tmeMatch[1];
    str = rawChanId.startsWith('100') ? `-${rawChanId}` : `-100${rawChanId}`;
    return { chatId: str, threadId: tmeMatch[2] || null };
  }

  // Agar Web Telegram havolasi berilgan bo'lsa: "https://web.telegram.org/a/#-1002489172314"
  const webMatch = str.match(/#(-?\d{7,})/);
  if (webMatch) {
    let extracted = webMatch[1];
    if (/^100\d{9,}$/.test(extracted)) extracted = '-' + extracted;
    return { chatId: extracted, threadId: null };
  }

  // Mavzu (Topic / Thread ID) sintaksisi: "-100123456789:15"
  let threadId = null;
  if (str.includes(':')) {
    const parts = str.split(':');
    str = parts[0].trim();
    threadId = parts[1].trim();
  }

  // Agar superguruh ID-si kiritilgan bo'lsa, lekin foydalanuvchi minusni unutgan bo'lsa (masalan 1002489172314)
  if (/^100\d{9,}$/.test(str)) {
    str = '-' + str;
  }

  return { chatId: str, threadId };
}


// 5. Telegram Bot API ga xabar yuborish (Ochiq va Yopiq guruhlar uchun moslangan)
function sendTelegramMessage(token, target, text) {
  return new Promise((resolve) => {
    const chatId = typeof target === 'object' ? target.chatId : target;
    const threadId = typeof target === 'object' ? target.threadId : null;

    const payload = {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };

    if (threadId) {
      payload.message_thread_id = parseInt(threadId, 10);
    }

    const postData = JSON.stringify(payload);

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${token}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode === 200 && json.ok) {
            resolve({ success: true, chatId, threadId, messageId: json.result?.message_id });
          } else {
            const rawDesc = json.description || `HTTP ${res.statusCode}`;

            // Agar chat not found bo'lsa va -100 bilan boshlanmagan bo'lsa (masalan -5248424317), avtomatik -100 bilan qayta urinib ko'rish:
            let altChatId = null;
            if (rawDesc.includes('chat not found')) {
              if (chatId.startsWith('-') && !chatId.startsWith('-100')) {
                altChatId = '-100' + chatId.slice(1);
              } else if (!chatId.startsWith('-') && /^\d{7,}$/.test(chatId)) {
                altChatId = '-100' + chatId;
              }
            }

            if (altChatId) {
              // Avtomatik qayta urinish
              sendTelegramMessage(token, { chatId: altChatId, threadId }, text).then((altRes) => {
                if (altRes.success) {
                  console.log(`[Telegram Avto-moslashuv] Guruh ID -100 superguruh formatiga avtomatik o'tkazildi: ${altChatId}`);
                  resolve(altRes);
                } else {
                  finishError(rawDesc);
                }
              }).catch(() => finishError(rawDesc));
              return;
            }

            finishError(rawDesc);

            function finishError(errorMsg) {
              if (errorMsg.includes('chat not found')) {
                errorMsg += ' [Maslahat: Yopiq guruhga bot a\'zo qilinmagan yoki ID noto\'g\'ri. Yopiq guruh ID-si doim -100 bilan boshlanadi]';
              } else if (errorMsg.includes('not a member') || errorMsg.includes('was kicked')) {
                errorMsg += ' [Maslahat: Bot hali bu yopiq guruhga qo\'shilmagan]';
              } else if (errorMsg.includes('not enough rights') || errorMsg.includes('have no rights')) {
                errorMsg += ' [Maslahat: Botga yopiq guruhda xabar yozish ruxsatini (admin huquqini) bering]';
              } else if (errorMsg.includes('message thread not found')) {
                errorMsg += ' [Maslahat: Guruhda Topics (Mavzular) yoqilgan, TELEGRAM_GROUP_THREAD_ID ni ko\'rsating]';
              }
              resolve({ success: false, chatId, threadId, error: errorMsg });
            }
          }

        } catch (e) {
          resolve({ success: false, chatId, threadId, error: body || e.message });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ success: false, chatId, threadId, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, chatId, threadId, error: 'Telegram API timeout (10s)' });
    });

    req.write(postData);
    req.end();
  });
}

// 6. Maqsadli barcha chat ID larni yig'ish (Alohida chat + Yopiq/Ochiq Guruh ID + Mavzu ID)
function getTargetChatIds() {
  const targets = [];

  // Alohida shaxsiy chat ID (Admin)
  if (process.env.TELEGRAM_CHAT_ID && process.env.TELEGRAM_CHAT_ID !== 'your_personal_chat_id_here') {
    const parsed = normalizeChatId(process.env.TELEGRAM_CHAT_ID);
    if (parsed) targets.push(parsed);
  }

  // Guruh chat ID (Yopiq yoki ochiq guruh)
  if (process.env.TELEGRAM_GROUP_ID && process.env.TELEGRAM_GROUP_ID !== 'your_group_chat_id_here') {
    // Bir nechta guruh kiritilgan bo'lsa (vergul bilan)
    process.env.TELEGRAM_GROUP_ID.split(',').forEach((gId) => {
      const parsed = normalizeChatId(gId);
      if (parsed) {
        // Agar guruhda alohida thread ID bo'lsa va inline ko'rsatilmagan bo'lsa
        if (!parsed.threadId && process.env.TELEGRAM_GROUP_THREAD_ID) {
          parsed.threadId = process.env.TELEGRAM_GROUP_THREAD_ID.trim();
        }
        targets.push(parsed);
      }
    });
  }

  // Qo'shimcha ID lar (agar bo'lsa)
  if (process.env.TELEGRAM_EXTRA_CHAT_IDS) {
    process.env.TELEGRAM_EXTRA_CHAT_IDS.split(',').forEach((id) => {
      const parsed = normalizeChatId(id);
      if (parsed) targets.push(parsed);
    });
  }

  // Takrorlanishlarning oldini olish
  const seen = new Set();
  return targets.filter((item) => {
    const key = `${item.chatId}:${item.threadId || ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// 7. Statik fayllar MIME turlari (Lokal rejimda server sifatida ham ishlashi uchun)
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4'
};

// 8. Asosiy HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS sarlavhalari
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // --- API: Zayavkani qabul qilish va Telegramga yuborish ---
  if (req.method === 'POST' && (pathname === '/api/send-lead' || pathname === '/api/lead')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) { // 1MB limit
        req.connection.destroy();
      }
    });

    req.on('end', async () => {
      try {
        const lead = JSON.parse(body || '{}');

        // Validatsiya: Ism yoki telefon kiritilgan bo'lishi kerak
        if (!lead.name && !lead.phone && !lead.email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'Ism, telefon yoki email maydoni to\'ldirilishi shart' }));
          return;
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const targets = getTargetChatIds();

        console.log(`\n[Lead] Yangi zayavka qabul qilindi: ${lead.name || 'Noma\'lum'} (${lead.phone || lead.email})`);

        // Agar bot token yoki ID lar kiritilmagan bo'lsa
        if (!botToken || botToken === 'your_bot_token_here' || targets.length === 0) {
          console.warn('[Telegram Ogohlantirish] TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID yoki TELEGRAM_GROUP_ID .env faylida sozlanmagan!');
          console.log('[Zayavka Ma\'lumotlari]:', lead);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            ok: true,
            warning: 'Zayavka qabul qilindi, ammo Telegram sozlamalari to\'liq kiritilmagan',
            lead
          }));
          return;
        }

        // Telegram xabarini tayyorlash
        const messageText = formatLeadMessage(lead);

        // Barcha belgilangan chatlarga (Alohida chat + Yopiq guruhlar) parallel yuborish
        const sendPromises = targets.map(target => sendTelegramMessage(botToken, target, messageText));
        const results = await Promise.all(sendPromises);

        let successCount = 0;
        results.forEach((r) => {
          if (r.success) {
            successCount++;
            console.log(`[Telegram ✓] Xabar chat ID ${r.chatId}${r.threadId ? ' (topic ' + r.threadId + ')' : ''} ga yetkazildi (msg_id: ${r.messageId})`);
          } else {
            console.error(`[Telegram ✗] Chat ID ${r.chatId} ga yuborishda xatolik:`, r.error);
          }
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: true,
          message: 'Zayavka muvaffaqiyatli qabul qilindi va Telegramga yuborildi!',
          delivered: successCount,
          total: targets.length,
          details: results
        }));

      } catch (err) {
        console.error('[Lead Error]', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Server xatoligi: ' + err.message }));
      }
    });
    return;
  }

  // --- API: Holat tekshiruvi (Health / Status) ---
  if (req.method === 'GET' && (pathname === '/api/status' || pathname === '/api/health')) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const targets = getTargetChatIds();
    const hasToken = Boolean(botToken && botToken !== 'your_bot_token_here');

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'WTMA Telegram Lead Service',
      time: new Date().toISOString(),
      telegram: {
        configured: Boolean(hasToken && targets.length > 0),
        hasBotToken: hasToken,
        hasPersonalChatId: Boolean(process.env.TELEGRAM_CHAT_ID && process.env.TELEGRAM_CHAT_ID !== 'your_personal_chat_id_here'),
        hasGroupId: Boolean(process.env.TELEGRAM_GROUP_ID && process.env.TELEGRAM_GROUP_ID !== 'your_group_chat_id_here'),
        totalTargets: targets.length,
        targets: targets.map(t => ({ chatId: t.chatId, hasTopic: Boolean(t.threadId) }))
      }
    }));
    return;
  }

  // --- Statik fayllarni uzatish (Lokal rejim uchun) ---
  let safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  let filePath = path.join(__dirname, safePath);

  // Agar kengaytmasi bo'lmasa, .html deb tekshirish (masalan /napravleniya -> /napravleniya.html)
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found - WTMA Platform');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const targets = getTargetChatIds();
  console.log(`\n======================================================`);
  console.log(`🚀 WTMA Telegram Lead Service ishga tushdi!`);
  console.log(`📡 Port: http://0.0.0.0:${PORT}`);
  console.log(`🤖 Telegram Bot: ${process.env.TELEGRAM_BOT_TOKEN ? 'Mavjud' : 'Kiritilmagan'}`);
  console.log(`👤 Alohida Chat ID: ${process.env.TELEGRAM_CHAT_ID || 'Kiritilmagan'}`);
  console.log(`👥 Guruh ID (Yopiq/Ochiq): ${process.env.TELEGRAM_GROUP_ID || 'Kiritilmagan'}`);
  console.log(`📬 Jami qabul qiluvchi manzillar: ${targets.length}`);
  console.log(`======================================================\n`);
});
