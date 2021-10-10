## Init project using typeorm
https://typeorm.io/#/undefined/quick-start
```console
npm install typeorm -g
typeorm init --name MyProject --database postgres
```
## Update `ormconfig.json`: db credentials
## Update `tsconfig.json`
## Config tslint
## Graphql defs:
- Schema: collection of `typeDefs`: Book, User (queryable fields)
- resolvers: how to fetch data
    - query: special type
    - mutation: special type
## Setup jest
```console
yarn add --dev jest ts-jest @types/jest
yarn ts-jest config:init
```
- Send graphql queries to server
```console
yarn add graphql-request --dev
```
## Rules for integration testing
- Separate db for testing
- Start server instance when testing
- Clean db before and after testing