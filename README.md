# Parking Fee Calculator

You are tasked to build a Parking Fee Calculator, that will help to calculate parking fees and thus help users decide where to park.
These are the carparks that will be considered in this application:

![alt text](carpark_data.png)

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
│   ├── services
│   │   └── FeeCalculationService.ts
|   │   └── fee
|   │       └── BaseFee.ts
|   │       └── FeeCalculator.ts
|   │       └── FixedFeePerEntry.ts
|   │       └── FixedFeePerXMinutes.ts
|   │       └── FixedFirstXMinutes.ts
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
- `src/types/index.ts`: This file exports the types and interfaces used in the calculation, such as `CarPark` and `CarFee`.
- `src/services/fee/BaseFee.ts`: This file implements the Fee interface and implements the `isFit` method, which returns the time period that falls within the ruleset, or a false result if the inputted time period does not fall within the ruleset at all.
- `src/services/fee/FeeCalculator.ts`: This file implements the `calculateParkingFee` method and its helper methods.
- `src/services/fee/FixedFeePerEntry.ts`: This file defines the ruleset for which there is a fixed fee per entry for the time period defined in the ruleset.
- `src/services/fee/FixedFeePerXMinutes.ts`: This file defines the ruleset for which there is a fixed fee per X minutes for the time period defined in the ruleset. Each block will be rounded up (i.e. if X=15, if the parking duration is 50minutes, it will be counted as 4 blocks of X)
- `src/services/fee/FixedFirstXMinutes.ts`: This file defines the ruleset for which there is a fixed fee for the first X minutes, and thereafter the remaining time is charged for another fixed fee per Y minutes. Similarly, each block will be rounded up. (i.e. if X=60 and Y=15, if the parking duration is 110minutes the parking charge will be xFee + 4 \* yFee).
- `tsconfig.json`: This file is the configuration file for TypeScript. It specifies the compiler options and the files to include in the compilation.
- `package.json`: This file is the configuration file for npm. It lists the dependencies and scripts for the project.
- `README.md`: This file contains the documentation for the project.

## install

```
npm install
```

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
