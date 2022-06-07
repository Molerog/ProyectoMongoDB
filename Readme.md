#  <center> 🦸 🦸‍♂️ API MongoDB Red Social 🦹‍♂️ 🦹‍♀️</center> 

 ## 📑 Indice 

 - [Sobre el proyecto](#sobre-el-proyecto)

    - [Instalación y despliegue](#instalacion-y-despliegue)

    - [Tecnologías utilizadas](#tecnologias-utilizadas)
    
    - [Contenido adicional](#contenido-adicional)

- [Documentacion de API](#documentacion-de-api)


- [Retos presentados](#retos-presentados)

- [Agradecimientos](#agradecimientos)

- [Futura implementaciones](#futuras-implementaciones)

- [Autor](#autor)

<br>

# Sobre el proyecto 🙇‍♀️

##  Instalación y despliegue 🤖

<br>

Primero instalamos npm

```
npm init -y 
```

<br>

A continuación los siguientes paquetes 
```
npm i express mongoose dotenv nodemailer validator jsonwebtoken multer
```

<br>

También necesitaremos la siguiente herramienta de desarrollador para no tener que reiniciar el servidor con cada cambio que realicemos

```
npm i -D nodemon
```

<br>

A continuación introducimos el script nodemon de la siguiente forma

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
```

<br>

En .env.example introduciremos las variable de entorno junto a la dirección a nuestra base de datos de MongoDB, la contraseña que se añadira al token del usuario y un email para enviar validaciones de registro de usuario

```
PORT = <Puerto>

MONGO_URI = <Tu URI de MONGO>

JWT_SECRET = <contraseña secreta>

USER_NODEMAILER = <Email para enviar validaciones>

PASS_NODEMAILER = <Password del email>

```
<br>

## Tecnologías/packages utilizados ⛏️

- MongoDB
- Mongoose
- Express
- Nodemailer
- Multer
- Dotenv
- Validator
- Jest
- Swagger

<br>

# Documentación de la API 👓

https://documenter.getpostman.com/view/21016507/Uz5JHFie

<br>

# Retos presentados 💢

El mayor reto al trabajar con una base de datos no relacional fue el crear un algoritmo que al eliminar un usuario, eliminara todo lo relacionado a este usuario (comentarios, likes, followings, posts...). Al no disponer de una opción "on cascade" como en SQL es necesario iterar los documentos para eliminar los ObjectId a los que se hace referencia. Cuantas más referencias tenga un documento más complejo resulta eliminar dichas referencias.

Otro reto fue implementar Jest con mongoose pues fue necesario crear una conexión a una base de datos alternativa para realizar los test. 

<br>

# Agradecimientos 🤝


Agradecimientos a Sofía, Ger e Iván por su inestimable ayuda para sacar adelante el proyecto. 

Gracias a todos los compañeros que siempre se ofrecen a ayudar en los momentos de bloqueo mental. ¡Sois unos cracks!

<br>

# Futuras implementaciones 🚀

- Creación de semillas en Mongoose
- Más endpoints para el Admin
- Añadir más roles


<br>

# Autor 🐧

Germán Molero

- https://github.com/Molerog








