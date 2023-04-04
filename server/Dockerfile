FROM php:8-fpm

RUN apt-get update \
    && apt-get install -y \
        libzip-dev \
        libpq-dev \
        libonig-dev \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        libxml2-dev \
        zip \
        unzip \
        curl \
        git \
    && docker-php-ext-install \
        pdo_mysql \
        mysqli \
        mbstring \
        zip \
        exif \
        pcntl \
        bcmath \
        soap \
        gd

WORKDIR /var/www/html

COPY . .

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage \
    && chmod -R 775 bootstrap/cache

CMD php artisan serve --host=0.0.0.0 --port=8080

EXPOSE 8080
