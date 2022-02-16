# Code</>Start - backend

This folder contains backend microservice code. You can find whole documentation in root
project folder in README file.

# Specification

-   Contains code of backend microservice and Dockerfiles
-   Written in express.js framework
-   Mongoose ORM is used to interact with db

# Structure

-   `src` - source code
    -   `api` - interaction with other services
    -   `config` - settings
    -   `controllers` - interaction with db based on frontend requests
    -   `helpers` - helper functions
    -   `middlewares` - intermediate request handlers
    -   `models` - database tables models
    -   `routes` - pathes to controllers
    -   `main.js` - server start main file
-   `Dockerfile` - docker instructions for building image
-   `nodemon.js` - nodemon configuration for server start
