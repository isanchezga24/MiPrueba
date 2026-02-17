# 1. Usamos una imagen que ya tiene Apache + PHP 8.2
FROM php:8.2-apache

# 2. Instalamos extensiones necesarias para Laravel (opcional pero recomendado)
RUN docker-php-ext-install pdo pdo_mysql

# 3. Habilitamos el módulo de reescritura de Apache para las rutas de Laravel
RUN a2enmod rewrite

# 4. Cambiamos el DocumentRoot para que apunte directamente a /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. Copiamos todo tu proyecto al contenedor
WORKDIR /var/www/html
COPY . .

# 6. Permisos para que Apache pueda escribir en storage y cache (vital en Laravel)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html