FROM httpd:2.4-alpine

# 1. Limpiamos TODO lo que haya en la carpeta de la web del contenedor
RUN rm -rf /usr/local/apache2/htdocs/*

# 2. Copiamos solo el CONTENIDO de tu carpeta de la web a la raíz de Apache
# IMPORTANTE: El punto al final de la ruta de origen y destino es clave
COPY ./Taldea4_Erronka/ /usr/local/apache2/htdocs/

EXPOSE 80