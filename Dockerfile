# 1. Imagen base con PHP 8.2 y Apache
FROM php:8.2-apache

# 2. Instalar dependencias del sistema y Node.js 20 (Requerido por Vite)
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev curl \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install zip pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Configuración de Apache
RUN a2enmod rewrite
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. Preparar el proyecto
WORKDIR /var/www/html
COPY . .

# 5. Instalar dependencias de PHP
WORKDIR /var/www/html/Taldea4_Erronka
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 6. INSTALAR Y COMPILAR FRONTEND (Vite)
# Se asegura de que Node 20 esté disponible para npm run build
RUN npm install
RUN npm run build

# 7. Base de datos SQLite y Permisos
RUN mkdir -p database && \
    touch database/database.sqlite && \
    [ -f .env.example ] && cp .env.example .env || echo "No .env.example" && \
    php artisan key:generate --force && \
    chown -R www-data:www-data /var/www/html/Taldea4_Erronka \
    && chmod -R 775 storage bootstrap/cache database