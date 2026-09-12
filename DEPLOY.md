# Docker & Yangi Domenga O'rnatish Qo'llanmasi

Ushbu loyihani serverdagi mavjud boshqa loyihalarga xalaqit bermagan holda alohida portda va yangi domenda ishga tushirish yo'riqnomasi.

---

## 1. Arxitektura qanday ishlaydi?

```
[Foydalanuvchi] 
       ↓ (yangi-domen.uz : 80/443)
[Serverdagi Asosiy Nginx (Reverse Proxy)]
       ↓ (proxy_pass: http://127.0.0.1:8088)
[Docker Konteyneri (wtma_landing_app : 8088)]
```

Serveringizdagi mavjud loyihalar 80/443 portlarda ishlashda davom etadi. Bu yangi landing page esa izolyatsiyalangan holda (masalan, `8088` portda) ishlaydi va asosiy Nginx orqali yangi domenga yo'naltiriladi.

---

## 2. Serverda Loyihani Ishga Tushirish

1. Loyiha fayllarini serverga yuklang (masalan, `/var/www/wtma_landing` papkasiga).
2. Papkaga kiring va Docker orqali ishga tushiring:
   ```bash
   docker compose up -d --build
   ```
3. Konteyner ishlayotganini tekshiring:
   ```bash
   docker ps
   ```
   Endi sayt `http://SERVER_IP:8088` manzilida ishlayotgan bo'ladi.

*(Eslatma: Agar `8088` porti band bo'lsa, `docker-compose.yml` faylidagi `"8088:80"` qatoridagi `8088` sonini istalgan bo'sh portga, masalan `"8085:80"` ga o'zgartirishingiz mumkin).*

---

## 3. Serverdagi Asosiy Nginx-ga Yangi Domenni Ulash

Serveringizdagi Nginx konfiguratsiyasiga (masalan `/etc/nginx/sites-available/yangi-domen.uz` fayliga) quyidagilarni yozasiz:

```nginx
server {
    listen 80;
    server_name yangi-domen.uz www.yangi-domen.uz;

    location / {
        proxy_pass http://127.0.0.1:8088;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Konfiguratsiyani faollashtiring va Nginx-ni qayta yuklang:
```bash
sudo ln -s /etc/nginx/sites-available/yangi-domen.uz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 4. Bepul SSL Sertifikat (HTTPS) O'rnatish

Certbot orqali 1 daqiqada bepul HTTPS o'rnating:
```bash
sudo certbot --nginx -d yangi-domen.uz -d www.yangi-domen.uz
```

Tamom! Sayt endi `https://yangi-domen.uz` manzilida xavfsiz va boshqa loyihalarga ta'sir qilmagan holda ishlaydi.
