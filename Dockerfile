# 1. Imagen base con PHP y Apache
FROM php:8.2-apache

# 2. Instalar dependencias del sistema, Node.js y extensiones PHP
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev curl gnupg \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install zip pdo pdo_mysql

# 3. Copiar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Configurar Apache
RUN a2enmod rewrite
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. Copiar el proyecto
WORKDIR /var/www/html
COPY . .

# 6. Instalar dependencias de PHP (Arregla el error de autoload.php)
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 7. Compilar Frontend con Vite (Arregla el error de Vite manifest not found)
RUN cd Taldea4_Erronka && npm install && npm run build

# 8. Configurar Base de Datos SQLite (Arregla el error de Database file does not exist)
RUN mkdir -p /var/www/html/Taldea4_Erronka/database && \
    touch /var/www/html/Taldea4_Erronka/database/database.sqlite && \
    cp /var/www/html/Taldea4_Erronka/.env.example /var/www/html/Taldea4_Erronka/.env && \
    php /var/www/html/Taldea4_Erronka/artisan key:generate --force

# 9. Permisos para Apache
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/Taldea4_Erronka/storage /var/www/html/Taldea4_Erronka/bootstrap/cache /var/www/html/Taldea4_Erronka/database

EXPOSE 80