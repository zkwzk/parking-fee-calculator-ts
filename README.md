# Parking fee calculator

This is a Node.js project built with TypeScript and Express.

## Project Structure

```
my-nodejs-app
|-- api-tests
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── HelloWorldController.ts
│   ├── routes
│   │   └── index.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## File Descriptions

- `src/app.ts`: This file is the entry point of the application. It creates an instance of the express app, sets up middleware and routes, and starts the server.
- `src/controllers/HelloWorldController.ts`: This file exports a class `HelloWorldController` which has a method `getHelloWorld` that handles the `/hello` route of the application and returns "Hello, World!".
- `src/routes/index.ts`: This file exports a function `setRoutes` which sets up the routes for the application. It uses the `HelloWorldController` to handle the `/hello` route.
- `src/types/index.ts`: This file exports interfaces `Request` and `Response` which extend the interfaces from the `express` library.
- `tsconfig.json`: This file is the configuration file for TypeScript. It specifies the compiler options and the files to include in the compilation.
- `package.json`: This file is the configuration file for npm. It lists the dependencies and scripts for the project.
- `README.md`: This file contains the documentation for the project.

## install

```
npm install
````

## run local

```
npm run dev
```

it will run at localhost:3000, and has a endpoint `/hello`

## run test

```
npm t
```

## run api-test

```
npm run apitest
```
