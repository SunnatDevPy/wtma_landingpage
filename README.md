# WTMA — World Textile Marketing Agency Landing Page

Xalqaro to'qimachilik marketing agentligi (WTMA) uchun premium darajadagi zamonaviy va to'liq interaktiv landing page.

## Texnologiyalar
- **HTML5**: Semantik va toza struktura
- **CSS3**: Google Fonts (Cormorant Garamond, Plus Jakarta Sans), maxsus dizayn tizimi, responsiv layout
- **JavaScript (Vanilla)**: ScrollSpy, interaktiv vaqt chizig'i (Timeline), yuklanishda dinamik aylanadigan animatsiyali raqamlar (Number Counters), modal bog'lanish oynasi
- **Docker & Nginx**: Konteynerizatsiya, kesh va Gzip siqish bilan serverga deploy qilishga to'liq tayyor

## Mahalliy Ishga Tushirish
Brauzerda `index.html` faylini ochish yoki oddiy statik server bilan:
```bash
python -m http.server 8080
```

## Docker orqali Ishga Tushirish
```bash
docker compose up -d --build
```
Batafsil serverga o'rnatish qo'llanmasi: [DEPLOY.md](DEPLOY.md)
