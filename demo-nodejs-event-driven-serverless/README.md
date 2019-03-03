# demo-nodejs-event-driven-serverless
Proyecto "Hello World!" en modo Event Driven en una petición REST

## Stack Tecnológico

* Node.js (https://nodejs.org)
* Serverless Framework (https://serverless.com/)

Destaca por montar un modulo de gestión de eventos : event

## Prerrequisitos

Instalar las siguientes herramientas y frameworks:
* Node.js 8.10 o superior
* Editor de código
* Postman

Recomendación de elementos extra a instalar :
* Visual Studio Code: https://code.visualstudio.com/
* nvm: https://github.com/creationix/nvm
* npm: https://www.npmjs.com/ (ver. 6.5.0)


Recomendación de elementos extra a instalar :
- Visual Studio Code: https://code.visualstudio.com/
- nvm: https://github.com/creationix/nvm
- npm: https://www.npmjs.com/ (ver. 6.5.0)

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


1. Creación de un directorio para el proyecto : **demo-nodejs-event-driven-serverless**
2. Ubicarse dentro de este directorio
3. Ejecutar el comando de creación de un arquetipo básico 

```bash
npm init -y
```

4. Verificar la existencia del fichero package.json

``` js
{
  "name": "demo-nodejs-event-driven-serverless",
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
    "clean": "rm -rf package-lock.json .serverless/ && npm install",
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

### Instalar y Configurar Serverless Framework

Seguir el documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-serverless.md**


#### Configurar fichero "serverless.yml"

El cliente Serverless funciona a partir de la existencia de un fichero serverless.yml que contien la configuración de las operativas que utilizará.

Se ubica en el directorio raiz del proyecto y tiene un formato como el siguiente :


Se ubica en el directorio raiz del proyecto y tiene un formato como el siguiente

```js
service: 
  name: demo-nodejs-event-driven-serverless

provider:
  name: aws
  runtime: nodejs8.10

event:
    handler: src/handler.createEvent
    events:
      - http:
          path: create-event
          method: get
```

### Instalar y Configurar Serverless Offline

Seguir el documento **workspace-serverless-framework-lab/doc/README-instalacion-configuracion-serverless-offline.md**



### Creación del proyecto

Se ha generado un modulo dentro del directorio src/ con toda la operativa relacionada con la generación de un evento generico

Se ha definido un manejador para gestionar una petición REST y generar un evento

Se tiene que crear una clase manejadora (por ejemplo : handler.js) y una función de invocación que contenga la estructura de parametros : event, context, callback

Por ejemplo : 
``` js
'use strict';

const EventConstant = require('./event/event.constant');
const EventFactory = require('./event/event.factory');
const EventService = require('./event/event.service');

exports.createEvent = (event, context, callback) => {
    console.log('info', '[createEvent] ...' );

    let hello = "Hello World!" + new Date().toTimeString();
    let payload = { hello : hello }

    let eventService = new EventService();
    
    const params_body = {
        message_factory: EventFactory.createEvent('CREATE Custom Event',EventConstant.EVENT_TYPE.CREATE,'','acme',0,payload),
        message_service: eventService.create('UPDATE Custom Event',EventConstant.EVENT_TYPE.UPDATE,'','acme',0)
    };

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            params_body
        }),
      };
    
    callback(null, response);

};
```

Posteriormente mapear su invocación en el fichero : serverless.yml

```js
service: 
  name: demo-nodejs-event-driven-serverless

custom:
  serverless-offline:
    port: 3000

provider:
  name: aws
  runtime: nodejs8.10

functions:

  event:
    handler: src/handler.createEvent
    events:
      - http:
          path: create-event
          method: get        

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
Serverless: Starting Offline: undefined/undefined.

Serverless: Routes for event:
Serverless: GET /create-event

Serverless: Offline listening on http://localhost:3000
```

Se puede ejecutar algo como lo siguiente
http://localhost:3000/create-event


se puede observar una respuesta como la siguiente
``` bash
{
    "params_body": {
        "message_factory": {
            "eventId": "2a0f11c0-3048-11e9-ad3a-fbb2e79559e0",
            "parentEventId": "",
            "eventName": "CREATE Custom Event",
            "eventType": "CREATE",
            "author": "acme",
            "createDate": "2019-02-14T11:03:31.292Z",
            "expiration": 0,
            "payload": {
                "hello": "Hello World!12:03:31 GMT+0100 (Hora estándar romance)"
            }
        }
    }
}
```