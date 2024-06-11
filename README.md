# How to run this project

### Create a .env file at the app root level for configurations
    NODE_ENV = DEVELOPMENT

    APP_PORT = 8080
    ORIGIN = http://localhost:3000

    DB_HOST = localhost
    DB_PORT = 5432
    DB_USER = yourusername
    DB_PASSWORD = yourpassword
    DB_DATABASE = yourdbname
    DB_MAX_CONNECTIONS = 11


### Install Packages
    npm install


### Start the application in dev mode
    npm run dev


### Start the application in production mode
    npm run build
    npm run start


### Generate SQL migration script
    npm run generate


### Browser SQL editor
    npm run studio
