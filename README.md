## Commands

### Create New Nest Application/microservice

```
nx g application micro-service-name
```

### Run project and apps

Run single service by name

```
nx serve app_name
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
