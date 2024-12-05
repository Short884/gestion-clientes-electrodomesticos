# Proyecto de Gestión de Clientes y Electrodomésticos - Refrigeración Santa Fe

Este proyecto permite gestionar clientes y sus electrodomésticos en un sistema de reparación. Se puede registrar, modificar, consultar y eliminar información de clientes junto a sus electrodomesticos.

## Requisitos
- Servidor local: XAMPP, WAMP o similar.
- Base de datos MySQL (adjunta en el archivo de la descarga).
- Navegador web.

## Instalación
1. Coloca los archivos del proyecto en la carpeta `www` de tu servidor local.
2. Importa el archivo `reparaciones.sql` en tu servidor MySQL usando phpMyAdmin o la línea de comandos.
3. Configura las credenciales (usuario y contraseña) de `conexion.php` para que se conecte a tu base de datos. Si no usas un usuario o administrador distintos al root no es necesario este paso.

## Uso
- Accede al sistema mediante `http://localhost/[CARPETA DE PROYECTOS DENTRO DE WWW]/gestion-clientes-electrodomesticos/index.html`.
- Utiliza las opciones para registrar, modificar, consultar y dar de baja clientes y electrodomésticos.

## Datos
- Puedes agregar perfiles de clientes y adjuntarles electrodomesticos.

### IMPORTANTE
- En la carpeta de descarga del proyecto se encuentra el archivo de base de datos 'reparaciones.sql' necesario para que funcione este sistema. Recuerde importarlo utilizando phpMyAdmin.
