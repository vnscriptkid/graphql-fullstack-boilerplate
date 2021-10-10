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