# Eng yengil va tezkor Nginx Alpine bazasi
FROM nginx:alpine

# Node.js va vaqt mintaqasini o'rnatish (API va Telegram integratsiya uchun)
RUN apk add --no-cache nodejs tzdata

WORKDIR /usr/share/nginx/html

# Maxsus Nginx konfiguratsiyasi
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Loyiha fayllarini Nginx papkasiga nusxalash
COPY . /usr/share/nginx/html

# Entrypoint skriptini sozlash
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Ichki 80 (Nginx) va 3000 (API) portlari
EXPOSE 80 3000

ENTRYPOINT ["/docker-entrypoint.sh"]

