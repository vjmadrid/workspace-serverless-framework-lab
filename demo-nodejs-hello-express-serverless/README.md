# demo-nodejs-hello-express-serverless
Proyecto que Muestra un mensaje "Hello World" ("Todo un clásico de cualquier desarrollo" :-) ) junto a información del evento que lo desencadeno a través de una petición REST (evento HTTP)
a traves del framework de aplicaciones web Express

## Stack Tecnológico

* Node.js (https://nodejs.org)
* Serverless Framework (https://serverless.com/)
* Express(http://expressjs.com/)

## Prerrequisitos

Instalar las siguientes herramientas y frameworks:
* Node.js 8.10 o superior
* Editor de código
* Postman

Recomendación de elementos extra a instalar :
* Visual Studio Code: https://code.visualstudio.com/
* nvm: https://github.com/creationix/nvm
* npm: https://www.npmjs.com/ (ver. 6.5.0)

## Instalación

Generales Nodejs

>IMPORTANTE: 
>* Serverless se ejecuta en Node v4 o superior
>* Nodejs 8.10 es el límite actual de AWS Lambda

* Instalar y Configurar Node.js (Documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-node.md**)
* Instalar y Configurar NVM (Documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-nvm.md**)

Generales

* Instalar y Configurar Serverless Framework (Documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-serverless.md**)
* Instalar y Configurar Serverless-Offline (Documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-serverless-offline.md**)

Específicos

* Preparar y Configurar un proyecto genérica (Documento **workspace-nodejs-lab/doc/README-preparar-configurar-proyecto.md**)

Este proyecto sigue los pasos básicos de construcción

1. Creación de un directorio para el proyecto : **demo-nodejs-hello-express-serverless**
2. Ubicarse dentro de este directorio
3. Ejecutar el comando de creación de un arquetipo básico 

```bash
npm init -y
```

4. Verificar la existencia del fichero package.json

``` js
{
  "name": "demo-nodejs-hello-express-serverless",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

5. Crear directorios tipo (opcional)

* "src" : para incluir el código fuente



## Preparación del proyecto 

### Definición de tareas iniciales del proyecto

Añadir al fichero 'package.json':

``` js
"scripts": {
    "clean": "rm -rf package-lock.json && npm install",
    "node:version": "echo 'nodejs version: ' && node -v "
  },
```

Tareas :

**clean** :  Clean y install del proyecto:

``` bash
$ npm run clean
```
Verificar que se genera el fichero "package-lock.json" y el directorio "node_modules"


**node:version** : Validación de versión de node con la que trabajar

``` bash
$ npm run node:version
```

### Instalación de dependencias iniciales 

Instalar las siguientes dependencias :

* **[express](https://www.npmjs.com/package/express)** : Framework para aplicaciones web en node

* **[serverless-http](https://www.npmjs.com/search?q=serverless-http)** : Permite crear un wrap para eluso de un API para uso serverless

* **[cross-env](https://www.npmjs.com/package/cross-env)** : Facilita trabajar con variables de entorno en diferentes plataformas

Fichero 'package.json':

``` js
"dependencies": {
    "express": "^4.16.4",
    "serverless-http": "^1.9.1"
  },
"devDependencies": {
    "cross-env": "5.2.0"
  } 
```

Añadir la tarea 'package.json':

``` js
"scripts": {
  ...
    "profile:local": "cross-env-shell NODE_ENV=local",
  ...
  },
```
**profile:local** :  Permite crear/sobreescribir una variable de entorno con el valor indicado

En este caso facilitaría ciertas configuración para el entorno "local"

``` bash
$ npm run profile:local
```

Por último ejecutar la carga de las dependencias añadidas

```bash
$ npm run clean
```

### Instalar y Configurar Serverless Framework

Seguir el documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-serverless.md**


#### Configurar fichero "serverless.yml"

El cliente Serverless funciona a partir de la existencia de un fichero serverless.yml que contien la configuración de las operativas que utilizará.

Se ubica en el directorio raiz del proyecto y tiene un formato como el siguiente :

serverless.yml
```js
service: 
  name: demo-nodejs-hello-express-serverless

custom:
  serverless-offline:
    port: 3000

provider:
  name: aws
  runtime: nodejs8.10

functions:
  ...

```

### Instalar y Configurar Serverless Offline

Seguir el documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-serverless-offline.md**


### Creación del proyecto

Se tiene que crear una clase manejadora (por ejemplo : app.js) y una función de invocación facilitada por express : req, res, next

Por ejemplo : 
``` js
'use strict';
const express = require('express')
const sls = require('serverless-http')
const app = express()

const IS_OFFLINE = eval(process.env.IS_OFFLINE);

app.get('/', async (req, res, next) => {
    console.log('info', '[APP EXPRESS] hello...' );
    console.log('info', '[*] IS_OFFLINE : '+ IS_OFFLINE);

    res.status(200).send('Hello World!' + new Date().toTimeString())
})

module.exports.server = sls(app)
};

```

En este manejador se pinta información con detalle del tipo de evento que se esta ejecutando en el manejador , el mensaje de "Hello World con la hora de invocación" y se devuelve como petición REST 200.

Además se esta mostrando el valor de la variable de entorno que indica que se esta ejecutando en modo OFFLINE (IS_OFFLINE)


Posteriormente mapear su invocación en el fichero : serverless.yml

```js
service: 
  name: demo-nodejs-hello-express-serverless

custom:
  serverless-offline:
    port: 3000

provider:
  name: aws
  runtime: nodejs8.10

functions:
  app:
    handler: src/app.server
    events:
      - http: # this is an API Gateway HTTP event trigger
          path: /
          method: ANY
          cors: true
      - http: # all routes get proxied to the Express router
          path: /{proxy+}
          method: ANY
          cors: true    

plugins:
  - serverless-offline
```

### Ejecutar el proyecto

En caso de que no se haya hecho todavía ejecutar las dependencias : **npm run clean**

### Arrancar el proyecto

Ejecutar la tarea "start"

``` bash
$ npm run start
```

Se debería e ver algo como esto
``` bash
cross-env-shell NODE_ENV=local "sls offline start"

Serverless: Starting Offline: undefined/undefined.

Serverless: Routes for app:
Serverless: ANY /
Serverless: ANY /{proxy*}

Serverless: Offline listening on http://localhost:3000
```

El proyecto quedaría listo para usarse

### Ejemplo Práctico : "Hello World!"

Se puede probar invocando una URL como la sigueinte

GET http://localhost:3000/

Se puede observar una respuesta como la siguiente
``` js
Hello World!21:08:47 GMT+0100 (Hora estándar romance)
```

Cualquier otra opción sera bloqueada por seguridad

Revisar tambien los logs de la consola