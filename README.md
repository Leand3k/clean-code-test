# Enviame Backend Junior Test

El proyecto está enfocado en los aspectos operacionales de un proceso de marketplace ecommerce típico, con el propósito de crear un API que de la capacidad de tener **usuarios, productos, categorías y transacciones**

### Herramientas

Se utilizó para la creación del backend:
 - NodeJS + ExpressJS
 - Sequelize + PostgreSQL
 - Docker + Docker-compose
 
 ### Contenido y estructura del proyecto
 
 El proyecto está estructurado con la idea de mantener los principios del Clean Code Architecture. La aplicación corre con un archivo de variables de entorno, los cuales pueden ser cambiados para crear una base de datos diferente o conectarla a una ya existente **(revisar .env)**. Además de esto, se brinda una colección de postman para probar y utilizar las rutas creadas.
 
 - Coleccion: https://www.getpostman.com/collections/e452a78cba5e27aa5cdc
 
 ### Como correr y probar el proyecto
 
 #### Con Docker
 
 Los pasos para correr el proyecto son:
 
 1. Clonar el repositorio.
 2. ``docker compose up -d node_backend`` para poder subir el servicio del backend, que depende de la base de datos.
 3. Correr la [coleccion de postman](https://www.getpostman.com/collections/e452a78cba5e27aa5cdc) completa para ver resultados.
 
 Si no se desea correr la colección completa, pues se puede abrir cada ruta y empezar a probar como se desee.
 
 #### Correr localmente
 
 Los pasos para correr el proyecto desde su propia máquina sin docker son:
 
 1. Clonar el repositorio.
 2. Correr el comando ``npm install`` para conseguir todas las dependencias.
 3. Ir al ``.env`` y cambiar ``SEQUELIZE_HOST``. Este está pautado con la variable ``'db'`` por razones de docker. Si se desea correr local deberá de cambiar ``'db'`` por ``'localhost'``
 4. Fuera de la carpeta ``/src`` utilizar el comando ``node index.js`` para correr el proyecto.
 5. Correr la [coleccion de postman](https://www.getpostman.com/collections/e452a78cba5e27aa5cdc) completa para ver resultados.

