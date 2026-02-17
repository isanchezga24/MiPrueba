# 1. Imagen base con PHP 8.2 y Apache
FROM php:8.2-apache

# 2. Instalar dependencias del sistema, Node.js (v18) y extensiones de PHP
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    curl \
    gnupg \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install zip pdo pdo_mysql

# 3. Copiar Composer desde la imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Configurar Apache (Habilitar rewrite y apuntar el servidor a la carpeta /public)
RUN a2enmod rewrite
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. Directorio de trabajo y copia de archivos
WORKDIR /var/www/html
COPY . .

# 6. Instalar dependencias de PHP (Laravel Vendor)
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 7. COMPILAR FRONTEND (Arregla el error de Vite manifest not found)
# Instalamos los módulos de Node y generamos el 'build' que lee tu index.jsx
RUN cd Taldea4_Erronka && npm install && npm run build

# 8. Preparar Base de Datos SQLite y clave de seguridad
RUN mkdir -p /var/www/html/Taldea4_Erronka/database && \
    touch /var/www/html/Taldea4_Erronka/database/database.sqlite && \
    cp /var/www/html/Taldea4_Erronka/.env.example /var/www/html/Taldea4_Erronka/.env && \
    php /var/www/html/Taldea4_Erronka/artisan key:generate --force

# 9. Permisos críticos para que Laravel pueda escribir logs, cache y en la BD
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/Taldea4_Erronka/storage /var/www/html/Taldea4_Erronka/bootstrap/cache /var/www/html/Taldea4_Erronka/database

EXPOSE 80