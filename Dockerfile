# 1. Imagen base con PHP y Apache
FROM php:8.2-apache

# 2. Instalar dependencias del sistema, Node.js (v18) y extensiones PHP
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev curl gnupg \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install zip pdo pdo_mysql

# 3. Copiar Composer desde la imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Configurar Apache (Habilitar rewrite y apuntar a /public)
RUN a2enmod rewrite
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. Directorio de trabajo y copia de archivos
WORKDIR /var/www/html
COPY . .

# 6. Instalar dependencias de PHP (Arregla el error de autoload.php)
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 7. COMPILAR FRONTEND (Arregla el error de Vite manifest not found)
# IMPORTANTE: Entramos en la subcarpeta donde está tu package.json
RUN cd Taldea4_Erronka && npm install && npm run build

# 8. Configurar Base de Datos SQLite y clave de la App
RUN mkdir -p /var/www/html/Taldea4_Erronka/database && \
    touch /var/www/html/Taldea4_Erronka/database/database.sqlite && \
    cp /var/www/html/Taldea4_Erronka/.env.example /var/www/html/Taldea4_Erronka/.env && \
    php /var/www/html/Taldea4_Erronka/artisan key:generate --force

# 9. Permisos para el usuario de Apache
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/Taldea4_Erronka/storage /var/www/html/Taldea4_Erronka/bootstrap/cache /var/www/html/Taldea4_Erronka/database

EXPOSE 80