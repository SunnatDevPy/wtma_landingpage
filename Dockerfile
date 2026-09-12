# Eng yengil va tezkor Nginx Alpine bazasi
FROM nginx:alpine

# Maxsus Nginx konfiguratsiyasi
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Loyiha fayllarini Nginx papkasiga nusxalash
COPY . /usr/share/nginx/html

# Ichki 80-port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
