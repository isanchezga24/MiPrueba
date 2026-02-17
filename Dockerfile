FROM php:8.2-apache

# 1. Instalación de extensiones necesarias
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev \
    && docker-php-ext-install zip pdo pdo_mysql gd

# 2. Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Habilitar Apache Rewrite
RUN a2enmod rewrite

# 4. Copiar TODO el proyecto primero
WORKDIR /var/www/html
COPY . .

# 5. Configurar Apache para que apunte a la subcarpeta 'public' correcta
# Nota: Aquí usamos la ruta que vimos en tu captura de pantalla
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 6. Entrar en la subcarpeta del proyecto Laravel para instalar dependencias
WORKDIR /var/www/html/Taldea4_Erronka
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 7. Configurar el .env y la Key
RUN cp .env.example .env || true
RUN php artisan key:generate --force

# 8. Permisos finales
RUN chown -R www-data:www-data /var/www/html && chmod -R 775 storage bootstrap/cache