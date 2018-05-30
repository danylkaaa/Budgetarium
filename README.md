# Budgetarium
| Master |  Dev    |
| ------: | ------ | 
| [![Build Status][travis-master]](https://travis-ci.org/ZulusK/Budgetarium) | [![Build Status][travis-dev]](https://travis-ci.org/ZulusK/Budgetarium) | 
| [![codecov][codecov-master]](https://codecov.io/gh/ZulusK/Budgetarium) | [![codecov][codecov-dev]](https://codecov.io/gh/ZulusK/Budgetarium) | 

#### [Demo](https://budgetarium.herokuapp.com/)
#### [Docs](https://docs.google.com/document/d/1jEZoszNnyu-Y8ANxGwkmFo4U96YzkSMF1Tg0W-MFOws/edit?usp=sharing)

## Motivation
This project was done as a part of the course work: **application of programming templates in software development.**
## Dzen
Each of us makes a lot of money transactions every day. The goals are different, but the result is one - we spend 
money. Sometimes, at the end of the month, we ask ourselves: "Dude, where is my money?".

The memory of a person is not ideal, therefore it is impossible to remember all operations with our wallet.
The Budgetarium waw created to solve the problem of cash management. This is a service for analyzing and collecting 
data about money, displaying statistical data on expenses and a convenient interface for viewing the current state of
 wallet.
 
### Features
1. The user can register by email and password.
1. The client is authorized by the server using a key JWT-strategy (access/refresh token). 
2. The user can create wallet with specific name and currency.
3. The user can add transaction to wallet with different currency, then it was specified in wallet.
4. The user can delete wallet and transactions.
5. The user can view chart with all transactions.
6. The server makes requests National Bank of Ukraine and gets actual currencies rate every day. 
7. The server and the client communicate using only GraphQL.

### Prerequisites

You need have installed Node.js environment and npm manager. [Here is link to tutorial](https://www.npmjs.com/get-npm) 


## Getting Started
**Server side**
1. Make sure you have npm installed. Then install dependencies with command
    ```sh
    npm install
    ```
2. Create `.env` file with environment variables using this [template](template.env)    

3. **Dev mode** allows you watch all logs in terminal and provides more information about service lifecycle. To run 
server in development mode, just use next command
    ```sh
    npm run dev
    ```
4.  **Production mode** allows you watch, how services will works in production and provides minimum information about 
service lifecycle. To run server in production mode, just use next command
    ```sh
    npm start
    ```
**Client side**
1. Go to directory with client sources
   ```sh
   cd src/client
   ```
2. Make sure you have npm installed. Then install dependencies with command
    ```sh
    npm i
    ```    
3. **Dev mode** allows you run client app on local machine without server (it's bundled)
    ```sh
    npm start
    ```
4.  **Production build**  next command build bundle for production use, minimize code and compress it
    ```sh
    npm run build
    ```
## Running the tests
#### Unit test
Run unit tests with command
```sh
npm run test
```    
#### Lint code
Lint code of server using rules, defined in [.eslintrc.js](.eslintrc.js) file
```sh
npm run lint
```

## Built With
| Server | Client |
| ------ | ------ |
| [Node.js](https://nodejs.org/)| [React](https://reactjs.org/)| 
| [Express](http://expressjs.com)| [Typescript](https://www.typescriptlang.org/)| 
| [MongoDB](https://www.mongodb.com/)| [Redux](https://redux.js.org)
| [Chai](http://chaijs.com)| [Redux Thunk](https://github.com/reduxjs/redux-thunk)|
| [Mocha](https://mochajs.org)|[Redux Form](https://redux-form.com/)|
| [Typescript](https://www.typescriptlang.org/)|[Typescript](https://www.typescriptlang.org/)|
| [Apollo GraphQL Server](https://www.apollographql.com/server/)|[Apollo GraphQL Client](https://www.apollographql.com/client/) |
| [Heroku](https://heroku.com/) |[Material UI](https://material-ui.com/)|
| [Passport.js](http://www.passportjs.org/)|[Bulma.io](https://bulma.io/)|
## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ZulusK/Budgetarium/tags). 

## Authors

* **Kazimirov Danil** - *Full stack development* - [ZulusK](https://github.com/ZulusK)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


[codecov-dev]: https://codecov.io/gh/ZulusK/Budgetarium/branch/dev/graph/badge.svg "Code coverage dev"
[codecov-master]: https://codecov.io/gh/ZulusK/Budgetarium/branch/master/graph/badge.svg "Code coverage master"
[travis-dev]: https://travis-ci.org/ZulusK/Budgetarium.svg?branch=dev "Travis CI build status"
[travis-master]: https://travis-ci.org/ZulusK/Budgetarium.svg?branch=master "Travis CI build status"
