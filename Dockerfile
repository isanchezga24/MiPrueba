FROM php:8.2-apache

# 1. Instalación de herramientas
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev curl gnupg \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install zip pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 2. Apache Config
RUN a2enmod rewrite
ENV APACHE_DOCUMENT_ROOT /var/www/html/Taldea4_Erronka/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

WORKDIR /var/www/html
COPY . .

# 3. LA CLAVE: Entrar en la carpeta antes de ejecutar comandos
RUN cd Taldea4_Erronka && composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs
RUN cd Taldea4_Erronka && npm install && npm run build

# 4. Configuración final
RUN mkdir -p /var/www/html/Taldea4_Erronka/database && \
    touch /var/www/html/Taldea4_Erronka/database/database.sqlite && \
    cp /var/www/html/Taldea4_Erronka/.env.example /var/www/html/Taldea4_Erronka/.env && \
    php /var/www/html/Taldea4_Erronka/artisan key:generate --force

RUN chown -R www-data:www-data /var/www/html && chmod -R 775 /var/www/html/Taldea4_Erronka/storage