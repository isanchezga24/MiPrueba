#!/bin/bash
set -e

cd /var/www/html/Taldea4_Erronka

# Run migrations
php artisan migrate --force

# Clear and cache config
php artisan config:cache
php artisan view:clear

# Fix permissions
chown -R www-data:www-data storage bootstrap/cache database

# Start Apache
exec apache2-foreground
