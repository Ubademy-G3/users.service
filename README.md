# Users Microservice
[![CI](https://github.com/Ubademy-G3/users.service/actions/workflows/test.yml/badge.svg)](https://github.com/Ubademy-G3/users.service/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Ubademy-G3/users.service/branch/main/graph/badge.svg?token=5ODNFTLVGI)](https://codecov.io/gh/Ubademy-G3/users.service)

Service dedicated to the management of users: enrollment, unsubscription, modification and everything related to users of online course platforms.

# File Structure:
```tree
├── app.js
├── application
│   ├── controllers
│   │   └── UserController.js
│   ├── logger.js
│   ├── serializers
│   │   └── UserSerializer.js
│   └── useCases
│       ├── CreateNewUser.js
│       ├── GetAllUsers.js
│       ├── GetUserById.js
│       ├── PatchUser.js
│       ├── RemoveAllUsers.js
│       ├── RemoveUser.js
│       └── UpdateUser.js
├── deploy
│   └── heroku-entrypoint.sh
├── docker-compose.yml
├── Dockerfile
├── domain
│   ├── UpdateUserSchema.json
│   ├── UserModel.js
│   ├── UserRepository.js
│   └── UserSchema.json
├── errors
│   ├── UnexpectedError.js
│   ├── UserAlreadyExists.js
│   └── UserNotFound.js
├── heroku.yml
├── index.js
├── infrastructure
│   ├── config
│   │   └── ServiceLocator.js
│   ├── db
│   │   ├── Database.js
│   │   └── Sequelize.js
│   └── routes
│       └── Users.js
├── jest.config.js
├── LICENSE
├── logs.log
├── monitoring
│   └── datadog.yml
├── package.json
├── package-lock.json
├── persistence
│   └── repositories
│       └── UserRepositoryPostgres.js
├── README.md
├── swagger.json
└── test
    └── users.test.js
```

# Tech Stack

* NodeJS
* Express (as web framework for NodeJS applications)
* MongoDB (as NoSQL database)

# Local Environment 

## Requirements 

* Docker
* Docker-compose

## Environment variables

To run this application you need to define the following environment variable:

```
USERSERVICE_APIKEY = YOUR_USERS_SERVICE_APIKEY
```

## Build and Deploy Services

```docker-compose up -d --build```

This command deploys the service:

* `usersservice_web`: Web Service
* `usersservice_db`: Data base
* `pgadmin`: Data base admin

## Stop services

```docker-compose stop```

## Down services and remove containers, networks, volumes and images created by 'up'

```docker-compose down```

## To run tests

```docker-compose exec node npm run test```


You can try it out at <https://staging-users-service-v2.herokuapp.com/api-docs>
