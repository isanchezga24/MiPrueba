# 1. Imagen base con PHP 8.2 y Apache
FROM php:8.2-apache

# 2. Instalar dependencias del sistema, Node.js (v18) y herramientas de compresión
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    curl \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install zip pdo pdo_mysql

# 3. Copiar Composer desde la imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Habilitar el módulo rewrite de Apache (necesario para las rutas de Laravel)
RUN a2enmod rewrite

# 5. Configurar el DocumentRoot para que apunte a la carpeta public
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 6. Establecer el directorio de trabajo y copiar el código
WORKDIR /var/www/html
COPY . .

# 7. Instalar dependencias de PHP (Composer)
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# 8. Instalar dependencias de Node y compilar assets con Vite (esto crea el manifest.json)
RUN cd Taldea4_Erronka && npm install && npm run build

# 9. Preparar la base de datos SQLite y generar la APP_KEY
RUN mkdir -p /var/www/html/Taldea4_Erronka/database && \
    touch /var/www/html/Taldea4_Erronka/database/database.sqlite && \
    cp /var/www/html/Taldea4_Erronka/.env.example /var/www/html/Taldea4_Erronka/.env && \
    php /var/www/html/Taldea4_Erronka/artisan key:generate --force

# 10. Permisos finales para el usuario de Apache (www-data)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/Taldea4_Erronka/storage /var/www/html/Taldea4_Erronka/bootstrap/cache /var/www/html/Taldea4_Erronka/database

EXPOSE 80