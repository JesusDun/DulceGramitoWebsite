# Usar la imagen oficial de PHP con Apache
FROM php:8.2-apache

# Instalar las extensiones de PDO y MySQL para la base de datos
RUN docker-php-ext-install pdo pdo_mysql

# Copiar todos los archivos de tu proyecto al servidor de Apache
COPY . /var/www/html/

# Ajustar permisos para que el servidor pueda leer los archivos
RUN chown -R www-data:www-data /var/www/html

# Exponer el puerto estándar web
EXPOSE 80
