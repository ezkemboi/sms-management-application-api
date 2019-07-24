[![Build Status](https://travis-ci.org/ezrqnkemboi/sms-management-application-api.svg?branch=master)](https://travis-ci.org/ezrqnkemboi/sms-management-application-api)
[![Coverage Status](https://coveralls.io/repos/github/ezrqnkemboi/sms-management-application-api/badge.svg?branch=master)](https://coveralls.io/github/ezrqnkemboi/sms-management-application-api?branch=master)

# SMS Managament Application API
SMS managment API system that ensure that people can send or receive messages.

# Frameworks and Tools

- NodeJS
- ExpressJS
- pg
- Mocha(Testing)

NB: `This app does not use any ORM`

## SMS:

- person sending sms
- person receiving sms
- message of sms
- sms status

## Contact:

- name of person
- phone number of person

## Relationship Needed:

- All sms sent by a Contact should be linked to them
- All sms sent to a Contact should be linked to them
- Deleting a contact removes the messages they sent and references to messages they received.

# How to Get started

- Clone: `git clone https://github.com/me-x-mi/sms-management-application-api.git`
- Change directory: `cd sms-management-application-api`
- Install dependancies: `npm install`
- Set up `.env` file using the example `.env.example`
- Create tables `npm run create`
- Run development: `npm run start:dev`
- Documentation served on: `http://localhost:8000/api-documentation/`
- Run tests: `npm test`

NB: To drop any tables previous created use `npm run drop`
    To run production version `npm run start:prod`

# Expected Endpoints

|Endpoint                            | Functionality                    |HTTP method 
|------------------------------------|----------------------------------|-------------
|/contacts                       |Add a contact                       |POST        
|/contacts  |Get all contacts   |GET  
|/contacts/:id             |Delete/remove a contact                   |DELETE
|/sms                      |Add a sms                       |POST        
|/sms  |Get all sms   |GET 


## Contributor
Ezrqn Kemboi
