## Commands

### Create New Nest Application/microservice

```
nx g application micro-service-name
```

### Run project and apps

Run single service by name

```
OR

```

NX_STREAM_OUTPUT=true nx run app-name:serve

```
nx serve app_name
nx run-many --target=serve --projects=jobber-auth,jobber-jobs
```

### Databases

#### Prisma

generate Types from prisma schema

```
nx generate-types service_name
```

Generate Migrations from schema

```
nx migrate-prisma service_name
```

### Tests

Run tests of a service

```
nx test service_name
```
