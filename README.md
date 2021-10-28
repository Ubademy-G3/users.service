# Users Microservice
[![CI](https://github.com/Ubademy-G3/users.service/actions/workflows/test.yml/badge.svg)](https://github.com/Ubademy-G3/users.service/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Ubademy-G3/users.service/branch/main/graph/badge.svg?token=5ODNFTLVGI)](https://codecov.io/gh/Ubademy-G3/users.service)

# File Structure:
```tree
├── main.py
├── src
│   ├── infrastructure
│   │   ├── db
│   │   │   ├──  
│   │   │   └──  
│   │   ├── routes
│   │   │   └──  
│   ├── persistence
│   │   └── repositories
│   │       └── 
│   ├── application
│   │   ├── controllers
│   │   │   └── 
│   │   ├──serializers
│   │   │   └── 
│   │   └── useCases
│   │       └── 
│   └── domain
│       ├── 
│       └── 
├── monitoring
├── deploy
└── tests
```

# Local Environment 

## Requirements 

* Docker
* Docker-compose

## Build and Deploy Services

```docker-compose up -d --build```

This command deploys the service:

* `usersservice_web`: Web Service
* `usersservice_db`: Data base
* `pgadmin`: Data base admin

## Stop services

```docker-compose stop```