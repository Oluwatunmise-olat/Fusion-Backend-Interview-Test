## Fusion Backend Interview

## Documentation
Check out the [Postman Docs](https://documenter.getpostman.com/view/16498899/UzBqoQyP)

Check out the [DB Schema Docs](https://dbdocs.io/oolat31/Fintech?table=accounts&schema=public&view=table_structure)

## Note:
An assumption is made that you have `node js` and `mysql database`.


## Steps To Run
1. `yarn install` to install dependencies
2. Create a `.env` file in the project root dir following the .env.example file. If not running docker, neglect env variable `MYSQL_ROOT_PASSWORD`.
3. `yarn run migration:run` to run all db migrations
4. `yarn run seed` to seed db with default values
5. `yarn run start` to start server

## Test (Make sure to setup a test database)
1. create a `.env.test` file in the project root directory following that of `.env.test.example`.
2. `yarn run test`

Note: Environment variable `JWTSECRET` should be same as that in `.env` file created in `STEPS TO RUN guide`. If not running docker, neglect env variable `MYSQL_ROOT_PASSWORD`.

## Test with Docker
A docker compose file has been provided in the case you have `docker` installed.

Note: If running docker, don not neglect env variable `MYSQL_ROOT_PASSWORD`.

1. create a `.env.test` file in the project root directory following that of `.env.test.example`.
2. `docker compose up fusion_test_db -d`
3. `yarn run test`
 

## Build Tools
1. Express + Typescript (Framework)
2. Typeorm (ORM)
3. MYSQL (DATABASE)
