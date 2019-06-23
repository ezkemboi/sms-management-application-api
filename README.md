[![Build Status](https://travis-ci.org/me-x-mi/sms-management-application-api.svg?branch=master)](https://travis-ci.org/me-x-mi/sms-management-application-api)
[![Coverage Status](https://coveralls.io/repos/github/me-x-mi/sms-management-application-api/badge.svg?branch=master)](https://coveralls.io/github/me-x-mi/sms-management-application-api?branch=master)

# SMS Managament Application API
Create an SMS management API using the framework of your choice that will model the following abstractions:

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
- Run tests: `npm test`

NB: To drop any tables previous created use `npm run drop`
    To run production version `npm run start:prod`

## Contributor
Ezrqn Kemboi
