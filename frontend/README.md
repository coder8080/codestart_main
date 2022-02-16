# Code</>Start - frontend

This folder container frontend microservice code. You can find whole documentation in root
project frol in README file.

# Specification

-   Written in Vue.js and Bootstrap
-   Contains code of frontend microservice and Dockerfiles

# Structure

-   `public` - public files - styles and icons.
-   `src` - source code
    -   `api` - code for interaction with backend
    -   `components` - Vue components (don't confuse with pages)
    -   `helpers` - helper function
    -   `router/index.js` - list of page addresses
    -   `store` - Vuex modules and its main file
    -   `views` - pages
    -   `App.vue` - base page
    -   `main.js` - initialization
-   `Dockerfile.dev` - Dockerfile for development mode
-   `Dockerfile.prod` - Dockerfile for production mod

Some files are not listed because you don't need to work with them - they are a part
of Vue.js
