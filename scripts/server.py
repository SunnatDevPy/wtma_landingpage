"""
WTMA (World Textile Marketing Agency)
Telegram Lead Notification Microservice (Python versiyasi)

Standart Python kutubxonalarida (zero-dependency) yozilgan.
Ochiq va YOPIQ (private) guruhlar, kanallar va mavzularni (Topics) to'liq qo'llab-quvvatlaydi.
Ishga tushirish:
python server.py
"""

import http.server
import json
import os
import socketserver
import urllib.parse
import urllib.request
from datetime import datetime
import zoneinfo

def load_env():
    env_file = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_file):
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith('#'):
                    continue
                if '=' in line:
                    key, val = line.split('=', 1)
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    if key not in os.environ:
                        os.environ[key] = val

load_env()

PORT = int(os.environ.get('PORT', 3000))
BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID', '')
GROUP_ID = os.environ.get('TELEGRAM_GROUP_ID', '')
GROUP_THREAD_ID = os.environ.get('TELEGRAM_GROUP_THREAD_ID', '')
EXTRA_IDS = os.environ.get('TELEGRAM_EXTRA_CHAT_IDS', '')

import re

def normalize_id(raw_id):
    if not raw_id:
        return None
    val = str(raw_id).strip().strip('"').strip("'")
    if not val:
        return None

    # Agar Telegram xabar havolasi berilgan bo'lsa: "https://t.me/c/2489172314/12"
    tme_match = re.search(r't\.me/c/(\d+)(?:/(\d+))?', val)
    if tme_match:
        raw_cid = tme_match.group(1)
        cid = f"-{raw_cid}" if raw_cid.startswith('100') else f"-100{raw_cid}"
        return {"chatId": cid, "threadId": tme_match.group(2)}

    # Agar Web Telegram havolasi berilgan bo'lsa: "https://web.telegram.org/a/#-1002489172314"
    web_match = re.search(r'#(-?\d{7,})', val)
    if web_match:
        extracted = web_match.group(1)
        if extracted.startswith('100') and len(extracted) >= 12:
            extracted = '-' + extracted
        return {"chatId": extracted, "threadId": None}

    thread_id = None
    if ':' in val:
        parts = val.split(':', 1)
        val = parts[0].strip()
        thread_id = parts[1].strip()

    # Agar superguruh ID-sida minus unutib qoldirilgan bo'lsa: "1002345678910" -> "-1002345678910"
    if val.startswith('100') and len(val) >= 12 and val.isdigit():
        val = '-' + val

    return {"chatId": val, "threadId": thread_id}


def get_targets():
    targets = []
    if CHAT_ID and CHAT_ID != 'your_personal_chat_id_here':
        parsed = normalize_id(CHAT_ID)
        if parsed:
            targets.append(parsed)

    if GROUP_ID and GROUP_ID != 'your_group_chat_id_here':
        for gid in GROUP_ID.split(','):
            parsed = normalize_id(gid)
            if parsed:
                if not parsed.get('threadId') and GROUP_THREAD_ID:
                    parsed['threadId'] = GROUP_THREAD_ID.strip()
                targets.append(parsed)

    if EXTRA_IDS:
        for extra in EXTRA_IDS.split(','):
            parsed = normalize_id(extra)
            if parsed:
                targets.append(parsed)

    # Remove duplicates
    unique = []
    seen = set()
    for t in targets:
        key = f"{t['chatId']}:{t.get('threadId') or ''}"
        if key not in seen:
            seen.add(key)
            unique.append(t)
    return unique

def escape_html(text):
    if not text:
        return ""
    return str(text).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")

def format_message(lead):
    try:
        tz = zoneinfo.ZoneInfo("Asia/Tashkent")
        now = datetime.now(tz).strftime("%d.%m.%Y, %H:%M:%S")
    except Exception:
        now = datetime.now().strftime("%d.%m.%Y, %H:%M:%S")

    lines = [
        "🌟 <b>YANGI ZAYAVKA — WTMA PLATFORMASI</b>",
        "━━━━━━━━━━━━━━━━━━━━━━━━━",
        f"👤 <b>Mijoz:</b> {escape_html(lead.get('name', 'Ko\'rsatilmadi'))}",
        f"📞 <b>Telefon:</b> <a href=\"tel:{escape_html(lead.get('phone', ''))}\">{escape_html(lead.get('phone', 'Ko\'rsatilmadi'))}</a>" if lead.get('phone') else "📞 <b>Telefon:</b> <i>Ko'rsatilmadi</i>"
    ]

    if lead.get('email'):
        lines.append(f"✉️ <b>Email:</b> <a href=\"mailto:{escape_html(lead['email'])}\">{escape_html(lead['email'])}</a>")
    if lead.get('company'):
        lines.append(f"🏢 <b>Kompaniya:</b> {escape_html(lead['company'])}")
    if lead.get('direction'):
        lines.append(f"🎯 <b>Yo'nalish:</b> {escape_html(lead['direction'])}")
    if lead.get('budget'):
        lines.append(f"💰 <b>Byudjet:</b> {escape_html(lead['budget'])}")
    if lead.get('message'):
        lines.append(f"📝 <b>Xabar:</b>\n<i>{escape_html(lead['message'])}</i>")

    lines.append("━━━━━━━━━━━━━━━━━━━━━━━━━")
    lines.append(f"🌐 <b>Manba:</b> {escape_html(lead.get('source', 'Veb-sayt'))}")
    lines.append(f"⏰ <b>Vaqt:</b> {now} (Toshkent vaqti)")

    return "\n".join(lines)

def send_telegram(token, target, text):
    chat_id = target.get('chatId')
    thread_id = target.get('threadId')

    api_url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload_dict = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True
    }
    if thread_id:
        try:
            payload_dict["message_thread_id"] = int(thread_id)
        except ValueError:
            pass

    payload = json.dumps(payload_dict).encode('utf-8')

    req = urllib.request.Request(api_url, data=payload, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            return {"success": True, "chatId": chat_id, "messageId": res_data.get('result', {}).get('message_id')}
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8')
        try:
            err_json = json.loads(err_body)
            msg = err_json.get('description', err_body)
        except Exception:
            msg = err_body
        return {"success": False, "chatId": chat_id, "error": f"{e.code} - {msg}"}
    except Exception as e:
        return {"success": False, "chatId": chat_id, "error": str(e)}

class WTMAHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path in ['/api/send-lead', '/api/lead']:
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length).decode('utf-8')
            try:
                lead = json.loads(raw_body)
            except Exception:
                lead = {}

            targets = get_targets()
            if not BOT_TOKEN or BOT_TOKEN == 'your_bot_token_here' or not targets:
                print(f"[Lead qabul qilindi (Telegram sozlanmagan)]: {lead}")
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "ok": True,
                    "warning": "Zayavka qabul qilindi, ammo Telegram .env to'liq sozlanmagan",
                    "lead": lead
                }).encode('utf-8'))
                return

            text = format_message(lead)
            results = [send_telegram(BOT_TOKEN, t, text) for t in targets]
            delivered = sum(1 for r in results if r['success'])

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "ok": True,
                "message": "Zayavka Telegramga yuborildi!",
                "delivered": delivered,
                "total": len(targets),
                "details": results
            }).encode('utf-8'))
            return

        self.send_response(404)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path in ['/api/status', '/api/health']:
            targets = get_targets()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "ok",
                "service": "WTMA Python Telegram Lead Service",
                "telegram": {
                    "configured": bool(BOT_TOKEN and targets),
                    "totalTargets": len(targets),
                    "targets": targets
                }
            }).encode('utf-8'))
            return

        super().do_GET()

if __name__ == '__main__':
    print(f"🚀 WTMA Python Lead Server port http://0.0.0.0:{PORT} da ishga tushdi")
    with socketserver.TCPServer(("0.0.0.0", PORT), WTMAHandler) as httpd:
        httpd.serve_forever()
