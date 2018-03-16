# Budgetarium
| Master  |  Dev    |
| ------: | :------ |
| [![Build Status][travis-master]](https://travis-ci.org/ZulusK/Budgetarium) | [![Build Status][travis-dev]](https://travis-ci.org/ZulusK/Budgetarium) | 
| [![codecov][codecov-master]](https://codecov.io/gh/ZulusK/Budgetarium) | [![codecov][codecov-dev]](https://codecov.io/gh/ZulusK/Budgetarium) | 

#### [Demo](https://budgetarium.herokuapp.com/)

Each of us makes a lot of money transactions every day. Someone buys milk in the store, someone pays for the Internet. The goals are different, but the essence is one - we spend money. Sometimes, at the end of the month, it becomes unclear where all that cache happened, which so pleased us 30 days ago. The memory of a person is not ideal, therefore it is impossible to remember absolutely all operations with your wallet.
To solve the problem of management and monitoring of own funds, a Budgetarium is created - a service for analyzing and collecting data about your money, displaying statistical data on expenses and a convenient interface for viewing the current state of your wallet.
One Paragraph of project description goes here

### Prerequisites

You need have installed Node.js environment and npm manager. [Here is link to tutorial](https://www.npmjs.com/get-npm) 


## Getting Started

Make sure you have npm installed. Then install dependencies with command
```bash
npm install
```
Create `.env` file with environment variables using this [template](template.env)    

### Installing
You can run server in dev or production mode.
**Dev mode** allows you watch all logs in terminal and provides more information about service lifecycle. To run server in development mode, just use next command
```bash
npm run dev
```
**Production mode** allows you watch, how services will works in production and provides minimum information about service lifecycle. To run server in production mode, just use next command
```bash
npm start
```
## Running the tests
Note, all tests require created .env file

### Unit tests
Run unit tests with command
```bash
npm run test
```    
### Lint code
Lint code of server using rules, defined in [.eslintrc.js](.eslintrc.js) file
```bash
npm run lint
```    
### Code coverage
If you want to look code coverage data, just use next command
```bash
npm run test:coverage
```  

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Node.js](https://nodejs.org/)
* [Express](http://expressjs.com)
* [MongoDB](https://www.mongodb.com/)


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ZulusK/Budgetarium/tags). 

## Authors

* **Kazimirov Danil** - *Full stack development* - [ZulusK]((https://github.com/ZulusK))

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


[codecov-dev]: https://codecov.io/gh/ZulusK/Budgetarium/branch/dev/graph/badge.svg "Code coverage dev"
[codecov-master]: https://codecov.io/gh/ZulusK/Budgetarium/branch/master/graph/badge.svg "Code coverage master"
[travis-dev]: https://travis-ci.org/ZulusK/Budgetarium.svg?branch=dev "Travis CI build status"
[travis-master]: https://travis-ci.org/ZulusK/Budgetarium.svg?branch=master "Travis CI build status"