/**
 * WTMA — Telegram Bot & Yopiq Guruhlar Sozlamalarini Tekshirish Skripti
 * 
 * Ishlatish:
 * 1) Oddiy tekshirish:
 *    node test-telegram.js
 * 
 * 2) Yopiq guruh ID-sini avtomatik aniqlash (Botni guruhga qo'shgach):
 *    node test-telegram.js --find
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. .env faylini o'qish
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('\n❌ XATOLIK: .env fayli topilmadi!');
  console.log('Iltimos, avval .env.example faylini .env ga nusxalang va bot tokeni hamda ID larini kiriting.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('#')) return;
  const eqIdx = line.indexOf('=');
  if (eqIdx !== -1) {
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
});

const token = process.env.TELEGRAM_BOT_TOKEN;
const personalChatId = process.env.TELEGRAM_CHAT_ID;
const rawGroupId = process.env.TELEGRAM_GROUP_ID;
const groupThreadId = process.env.TELEGRAM_GROUP_THREAD_ID;

// Chat ID ni tozalash va yopiq guruhlar uchun tekshirish
function normalizeId(id) {
  if (!id) return '';
  let str = id.trim().replace(/^["']|["']$/g, '');

  // Agar Telegram xabar havolasi berilgan bo'lsa: "https://t.me/c/2489172314/12"
  const tmeMatch = str.match(/t\.me\/c\/(\d+)(?:\/(\d+))?/);
  if (tmeMatch) {
    const rawChanId = tmeMatch[1];
    return rawChanId.startsWith('100') ? `-${rawChanId}` : `-100${rawChanId}`;
  }

  // Agar Web Telegram havolasi berilgan bo'lsa: "https://web.telegram.org/a/#-1002489172314"
  const webMatch = str.match(/#(-?\d{7,})/);
  if (webMatch) {
    let extracted = webMatch[1];
    if (/^100\d{9,}$/.test(extracted)) extracted = '-' + extracted;
    return extracted;
  }

  if (/^100\d{9,}$/.test(str)) {
    str = '-' + str;
  }
  return str;
}

const groupId = normalizeId(rawGroupId);


// Agar argument --find bo'lsa, getUpdates orqali guruh ID larini topish
const isFindMode = process.argv.includes('--find') || process.argv.includes('-f');

function httpsGet(path) {
  return new Promise((resolve, reject) => {
    https.get({
      hostname: 'api.telegram.org',
      path: `/bot${token}${path}`,
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function sendMsg(targetId, targetName, threadId = null) {
  return new Promise((resolve) => {
    if (!targetId || targetId.includes('your_')) {
      console.log(`⚠️  ${targetName} ID kiritilmagan, o'tkazib yuborildi.`);
      resolve({ targetName, skipped: true });
      return;
    }

    const isGroup = targetId.startsWith('-');
    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' });
    const text = `🔔 <b>WTMA — Telegram Bot Test Xabari</b>\n\n` +
      `✅ <b>Status:</b> Bot to'g'ri sozlangan va muvaffaqiyatli ishlayapti!\n` +
      `🎯 <b>Qabul qiluvchi:</b> ${targetName}\n` +
      `🆔 <b>Chat ID:</b> <code>${targetId}</code>${threadId ? ' (Topic ID: ' + threadId + ')' : ''}\n` +
      `🔒 <b>Turi:</b> ${isGroup ? 'Guruh / Yopiq Superguruh' : 'Shaxsiy chat (Admin)'}\n` +
      `⏰ <b>Vaqt:</b> ${now} (Toshkent vaqti)\n\n` +
      `<i>Ushbu xabar .env sozlamalari to'g'ri ekanligini tasdiqlaydi.</i>`;

    const payload = {
      chat_id: targetId,
      text: text,
      parse_mode: 'HTML'
    };

    if (threadId) {
      payload.message_thread_id = parseInt(threadId, 10);
    }

    const postData = JSON.stringify(payload);

    const req = https.request({
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${token}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode === 200 && json.ok) {
            console.log(`✅ [MUVAFFAQITYAT] ${targetName} (${targetId}) ga xabar yuborildi!`);
            resolve({ targetName, ok: true });
          } else {
            console.error(`❌ [XATOLIK] ${targetName} (${targetId}) ga yuborib bo'lmadi!`);
            console.error(`   Telegram xatosi: ${json.description || data}`);

            // Yopiq guruhlar uchun aniq yo'l-yo'riq
            if (json.description && json.description.includes('chat not found')) {
              console.log(`   💡 MASLAHAT: Yopiq guruhga bot qo'shilganmi? ID -100 bilan boshlanishi kerak.`);
              console.log(`   👉 Botni guruhga qo'shib birorta so'z yozing va: node test-telegram.js --find buyrug'ini bering!`);
            } else if (json.description && (json.description.includes('not a member') || json.description.includes('was kicked'))) {
              console.log(`   💡 MASLAHAT: Bot hali bu guruhga a'zo qilinmagan. Guruhga kirib, botni a'zo qiling.`);
            } else if (json.description && (json.description.includes('have no rights') || json.description.includes('not enough rights'))) {
              console.log(`   💡 MASLAHAT: Botga yopiq guruhda xabar yozish ruxsatini (Admin huquqini) bering.`);
            } else if (json.description && json.description.includes('message thread not found')) {
              console.log(`   💡 MASLAHAT: Yopiq guruhingizda Topics (Mavzular) yoqilgan. .env da TELEGRAM_GROUP_THREAD_ID ni ko'rsating.`);
            }
            resolve({ targetName, ok: false, error: json.description });
          }
        } catch (e) {
          console.error(`❌ Xatolik javobni o'qishda:`, e.message);
          resolve({ targetName, ok: false, error: e.message });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`❌ Ulanishda xatolik:`, err.message);
      resolve({ targetName, ok: false, error: err.message });
    });

    req.write(postData);
    req.end();
  });
}

async function findGroups() {
  console.log('\n======================================================');
  console.log('🔍 Telegram Botga ulangan guruhlarni qidirish (--find)');
  console.log('======================================================');

  if (!token || token === 'your_bot_token_here') {
    console.error('❌ TELEGRAM_BOT_TOKEN .env faylida ko\'rsatilmagan!');
    return;
  }

  try {
    const res = await httpsGet('/getUpdates');
    if (!res.ok) {
      console.error('❌ Telegram API dan ma\'lumot olib bo\'lmadi:', res.description);
      return;
    }

    const updates = res.result || [];
    const chatsFound = new Map();

    updates.forEach(u => {
      const msg = u.message || u.channel_post || u.my_chat_member;
      if (msg && msg.chat) {
        const c = msg.chat;
        chatsFound.set(String(c.id), {
          id: c.id,
          title: c.title || `${c.first_name || ''} ${c.last_name || ''}`.trim() || c.username || 'Noma\'lum',
          type: c.type,
          threadId: msg.message_thread_id || null
        });
      }
    });

    if (chatsFound.size === 0) {
      console.log('ℹ️  Hozircha bot hech qanday yangi xabar qabul qilmagan.');
      console.log('📋 Yopiq guruh ID-sini topish bo\'yicha qadamlar:');
      console.log('   1. Telegramda yopiq guruhingizga o\'z botingizni a\'zo qiling.');
      console.log('   2. Unga guruhda admin huquqini bering.');
      console.log('   3. Guruh ichida birorta xabar (masalan: "salom") yozing.');
      console.log('   4. Qaytadan ushbu buyruqni bering: node test-telegram.js --find');
    } else {
      console.log(`\n🎉 Bot qatnashgan chatlar va yopiq guruhlar topildi (${chatsFound.size} ta):\n`);
      chatsFound.forEach(chat => {
        const isGroup = chat.type === 'group' || chat.type === 'supergroup' || chat.type === 'channel';
        console.log(`📌 Nomi: "${chat.title}"`);
        console.log(`   Turi: ${chat.type} ${isGroup ? '(Guruh/Kanal)' : '(Shaxsiy chat)'}`);
        console.log(`   ID:   ${chat.id}  <-- .env faylidagi TELEGRAM_${isGroup ? 'GROUP' : 'CHAT'}_ID ga shu qiymatni qo'ying!`);
        if (chat.threadId) {
          console.log(`   Topic ID: ${chat.threadId} (TELEGRAM_GROUP_THREAD_ID=${chat.threadId})`);
        }
        console.log('------------------------------------------------------');
      });
      console.log('\nNusxa oling va .env faylingizga qo\'ying!');
    }
  } catch (err) {
    console.error('Qidiruvda xatolik:', err.message);
  }
}

async function runTest() {
  if (isFindMode) {
    await findGroups();
    return;
  }

  console.log('\n======================================================');
  console.log('🔍 WTMA Telegram Bot & Yopiq Guruhlar Tekshiruvi');
  console.log('======================================================');
  console.log(`🤖 Bot Token: ${token && token !== 'your_bot_token_here' ? token.slice(0, 10) + '...' + token.slice(-5) : '❌ Kiritilmagan'}`);
  console.log(`👤 Alohida Chat ID (Admin): ${personalChatId || '❌ Kiritilmagan'}`);
  console.log(`👥 Guruh Chat ID (Yopiq/Ochiq): ${groupId || '❌ Kiritilmagan'}`);
  if (groupThreadId) {
    console.log(`🧵 Guruh Topic ID (Thread): ${groupThreadId}`);
  }
  console.log('------------------------------------------------------\n');

  if (!token || token === 'your_bot_token_here') {
    console.error('❌ TELEGRAM_BOT_TOKEN .env faylida to\'g\'ri ko\'rsatilmagan!');
    console.log('1. Telegramda @BotFather ga kiring');
    console.log('2. Yangi bot yarating (/newbot) va tokenni .env ga yozing');
    process.exit(1);
  }

  if (rawGroupId && (rawGroupId.includes('t.me/+') || rawGroupId.includes('t.me/joinchat'))) {
    console.log('⚠️  DIQQAT: Siz TELEGRAM_GROUP_ID ga taklif havolasini (invite link: ' + rawGroupId + ') kiritgansiz.');
    console.log('❌ Telegram Bot API taklif havolasiga to\'g\'ridan-to\'g\'ri xabar yubora olmaydi.');
    console.log('💡 Yechim: Botni ushbu yopiq guruhga a\'zo qilib, admin huquqini bering, guruhda birorta xabar yozing va:');
    console.log('   node test-telegram.js --find buyrug\'ini ishga tushiring — haqiqiy -100... ID darhol chiqadi!\n');
  }

  console.log('🚀 Test xabarlarini yuborish boshlanmoqda...\n');
  await sendMsg(personalChatId, 'Alohida Chat ID (Admin)');
  await sendMsg(groupId, 'Guruh Chat ID (Yopiq Guruh)', groupThreadId);


  console.log('\n======================================================');
  console.log('🏁 Tekshiruv yakunlandi.');
  console.log('💡 Maslahat: Agar yopiq guruh ID-sini bilmasangiz: node test-telegram.js --find');
  console.log('======================================================\n');
}

runTest();
