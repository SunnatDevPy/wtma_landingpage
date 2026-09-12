# `landing.okaposai.uz` — Serverga O'rnatish Qo'llanmasi

Ushbu qo'llanma orqali WTMA landing sahifasini serverdagi mavjud boshqa loyihalarga ta'sir qilmagan holda **`landing.okaposai.uz`** domeniga ulaysiz.

---

## 0. DNS Sozlamasi (Eng birinchi qilinadigan ish)

Domeningiz boshqaruv panelida (masalan, Cloudflare yoki domen sotib olgan joyingizda):
- **Type**: `A`
- **Name / Host**: `landing` (yoki to'liq `landing.okaposai.uz`)
- **Value / IPv4**: Serveringizning IP manzili (masalan `185.xxx.xxx.xxx`)
- **Proxy status**: Agar Cloudflare bo'lsa DNS Only yoki Proxied

---

## 1. Arxitektura sxemasi

```
Foydalanuvchi (brauzer)
       ↓ https://landing.okaposai.uz (443-port)
Serveringizdagi Asosiy Nginx (Reverse Proxy)
       ↓ proxy_pass: http://127.0.0.1:8088
Docker Konteyneri (wtma_landing_app : 8088-port)
```

Serveringizdagi mavjud asosiy saytlar (masalan `okaposai.uz` yoki boshqa portdagi loyihalar) 80 va 443 portlarda ishlashda davom etaveradi.

---

## 2. Serverda Loyihani Docker orqali Ishga Tushirish

1. Serverga SSH orqali kiring:
   ```bash
   ssh root@SERVER_IP
   ```

2. Loyihani yuklab oling (Git orqali):
   ```bash
   cd /var/www
   git clone https://github.com/SunnatDevPy/wtma_landingpage.git landing_wtma
   cd landing_wtma
   ```

3. Docker konteynerini ishga tushiring:
   ```bash
   docker compose up -d --build
   ```

4. Konteyner holatini tekshiring:
   ```bash
   docker ps
   ```
   Sizda `wtma_landing_app` nomli konteyner `0.0.0.0:8088->80/tcp` portida ishlab turgan bo'ladi.

---

## 3. Serverdagi Asosiy Nginx-ni Sozlash

1. Yangi konfiguratsiya faylini oching:
   ```bash
   sudo nano /etc/nginx/sites-available/landing.okaposai.uz
   ```

2. Ichiga loyihadagi `server_nginx/landing.okaposai.uz.conf` fayli mazmunini yozing:
   ```nginx
   server {
       listen 80;
       server_name landing.okaposai.uz;

       client_max_body_size 20M;

       location / {
           proxy_pass http://127.0.0.1:8088;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   *(Ctrl + O, Enter, Ctrl + X bilan saqlab chiqing)*

3. Konfiguratsiyani faollashtiring va Nginx-ni qayta yuklang:
   ```bash
   sudo ln -s /etc/nginx/sites-available/landing.okaposai.uz /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## 4. Bepul SSL (HTTPS) Sertifikatini O'rnatish

Certbot yordamida avtomatik HTTPS yoqing:
```bash
sudo certbot --nginx -d landing.okaposai.uz
```

Muvaffaqiyatli tugagandan so'ng, brauzeringizda **`https://landing.okaposai.uz`** manzilini oching — sayt to'liq xavfsiz (yashil qulf) bilan ishlaydi!
