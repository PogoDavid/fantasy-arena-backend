<p align="center"> <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a> </p> <p align="center">A fantasy football platform built using the <a href="http://nodejs.org" target="_blank">Node.js</a> framework for managing teams, leagues, and scoring based on real-world football matches.</p> <p align="center"> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a> <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a> <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a> <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a> <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a> <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a> <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a> <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a> <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a> </p>

Fantasy Football Application

Overview

This application is a fantasy football platform where users can create and manage football teams, participate in leagues, and compete based on real-world player performances. The platform targets football enthusiasts, fantasy sports players, social groups, and general sports fans.

Key Features

User Management:

Registration/Login: Users register with an email and password. Username is the only initial profile field.
Roles and Permissions: Regular users and league creators have different permissions. League creators can modify their leagues.
Password Recovery: Users can recover passwords through a recovery system.
Profile Management: Users can update their username and email.
Data Security: Follows best practices for data encryption and GDPR compliance.

League Management:

Public vs. Private Leagues: Public leagues have fixed rules and are visible to all users. Private leagues require a unique code to join.
Create/Join Leagues: Users can create or join leagues with customizable rules and budgets.
Rule Customization: League creators can customize league rules, including scoring, budget limits, and player eligibility.
Team Limits: Each user can only have one active team per league.
Team Drafting:

Fixed Formations: Users choose from predefined formations like 4-3-3 and 4-4-2.
Budget Management: Leagues have budget constraints for team drafting, which can be customized by the league creator.
Player Selection: Player recommendations are based on the last 5 games' performance, fetched in real-time from an external Football API.
Draft Persistence: Drafts are auto-saved, and users can reset their drafts if needed.
Scoring System:

Customizable Scoring: League creators define how points are awarded for different actions, such as goals and assists.
Real-Time Scoring: Points are updated in real-time based on live match data.
Penalty Points: Negative points for actions like yellow/red cards and own goals.
Historical Data Storage: Historical scoring data is stored for cumulative rankings and player statistics.
Data Integration:

Real-Time Data Fetching: Player data and match updates are fetched in real-time from an external API.
Caching Strategy: Implemented to reduce API calls and improve performance.
Error Handling: Fallback mechanisms in place for API downtime or data fetching issues.
Security: API keys are secured, with access controls to prevent unauthorized access.
Project Setup
To get started with this project, follow these steps:

$ npm install

Running the Application

To start the project in different environments, use the following commands:

# development

$ npm run start

# watch mode

$ npm run start:dev

# production mode

$ npm run start:prod

# debug mode

$ npm run start:debug
Running Tests
You can run various tests to ensure the stability and correctness of the application:

# unit tests

$ npm run test

# watch mode for tests

$ npm run test:watch

# test coverage

$ npm run test:cov

# end-to-end tests

$ npm run test:e2e

Linting and Formatting
Ensure your code follows the coding standards by running the following commands:

# linting

$ npm run lint

# formatting

$ npm run format

License
This project is currently marked as UNLICENSED in the package.json, meaning it is not open for general public use or contributions. The code is proprietary and may not be copied, distributed, or modified without permission from the project maintainers. For more information on licensing, please review the package.json and consult the project maintainers.
