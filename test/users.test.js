const supertest = require('supertest');
const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const app = require("../app");
const userRepository = require("../persistence/repositories/UserRepositoryPostgres");
const { UnexpectedError } = require('../errors/UnexpectedError');


const users = [
  {
    "id": "0fe4170e-7f6e-41c8-8060-30c7e8795b0e",
    "email": "dani@test.com",
    "firstName": "Dani",
    "lastName": "Test",
    "rol": "Student",
    "location": null,
    "interests": null,
    "profilePictureUrl": null,
    "subscription": null,
    "subscriptionExpirationDate": "2021-12-19T13:05:57.501Z",
    "favoriteCourses": null,
    "description": null
  },
  {
    "id": "abc52922-eddf-403a-80b7-f61023953edd",
    "email": "chia@gmail.com",
    "firstName": "Chiara",
    "lastName": "Bauni",
    "rol": "Instructor",
    "location": "Bs as",
    "interests": null,
    "profilePictureUrl": null,
    "subscription": null,
    "subscriptionExpirationDate": null,
    "favoriteCourses": null,
    "description": null
  },
  {
    "id": "eb9b304a-9e50-4b6a-b47e-dabee64008c1",
    "email": "chiara@gmail.com",
    "firstName": "Chiara",
    "lastName": "Bauni",
    "rol": "Instructor",
    "location": "Bs as",
    "interests": null,
    "profilePictureUrl": null,
    "subscription": null,
    "subscriptionExpirationDate": null,
    "favoriteCourses": null,
    "description": null
  }
]

const newUser = {
  "email": "chia@gmail.com",
  "firstName": "Chiara",
  "lastName": "Bauni",
  "rol": "Instructor",
  "location": "Bs as",
  "interests": [],
  "profilePictureUrl": "",
  "subscription": "Free",
  "subscriptionExpirationDate": "",
  "favoriteCourses": [],
  "description": ""
}

describe('userController', () => {
    let request;
    let res;
    let spyUserRepository;    
    
    beforeEach(() => {
      spyUserRepository = {};
      request = supertest(app);
  
      // API Keys
      fakeApikey = 'fake-apikey';
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('/users', () => {
      const path = '/users';
  
      describe('GET', () => {
        describe('when there are users', () => {
          beforeEach(async () => {
            spyUserRepository.getAllUsers = jest
              .spyOn(userRepository, 'getAllUsers')
              .mockReturnValueOnce(users);
  
            res = await request.get(path).set("authorization", "47M47m");
        });
  
          it('should respond with correct status and body', () => {
            expect(res.status).toEqual(200);
            expect(res.header['content-type']).toMatch(/json/);
            expect(res.body).toEqual(users);
          });
        });

        describe('when unexpected error happens', () => {
          beforeEach(async () => {
            spyUserRepository.getAllUsers = jest
              .spyOn(userRepository, 'getAllUsers')
              .mockImplementation(() => {
                throw new Error();
              });
  
            res = await request.get(path).set("authorization", "47M47m");
        });
  
          it('should respond with unexpected error status', () => {
            expect(res.status).toEqual(500);
          });
        });

        describe('when invalid apikey', () => {
          beforeEach(async () => {
            spyUserRepository.getAllUsers = jest
              .spyOn(userRepository, 'getAllUsers')
              .mockReturnValueOnce(users);
  
            res = await request.get(path).set("authorization", "banana");
        });
  
          it('should respond with unauthorized error status and body', () => {
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({ message: "Unauthorized" });
          });
        });

        describe('when invalid id getting user by id', () => {
          it('should respond with user not found status and body', async () => {
            spyUserRepository.getUserById = jest
              .spyOn(userRepository, 'getUserById')
              .mockReturnValueOnce(null);
  
            res = await request.get(`${path}/banana`).set("authorization", "47M47m");
            expect(res.status).toEqual(404);
            expect(res.body).toEqual({ message: "User Id not found" });
          });
        });

        describe('when user exists', () => {  
          it('should respond with correct status and body', async () => {
            spyUserRepository.getUserById = jest
              .spyOn(userRepository, 'getUserById')
              .mockReturnValueOnce(users[0]);
  
            res = await request.get(`${path}/${users[0].id}`).set("authorization", "47M47m");
            expect(res.status).toEqual(200);
            expect(res.header['content-type']).toMatch(/json/);
            expect(res.body).toEqual(users[0]);
          });
        });

        describe('when invalid apikey getting user by id', () => {  
          it('should respond with unauthorized error status and body', async () => {
            spyUserRepository.getUserById = jest
              .spyOn(userRepository, 'getUserById')
              .mockReturnValueOnce(users[0]);
  
            res = await request.get(`${path}/${users[0].id}`).set("authorization", "banana");
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({ message: "Unauthorized" });
          });
        });
      })

      describe('POST', () => {
        describe('when user is student and interest is missing', () => {  
          it('should return invalid fields response', async () => {
            res = await request.post(path).send(users[0]).set("authorization", "47M47m");
            expect(res.status).toEqual(400);
            expect(res.header['content-type']).toMatch(/json/);
            expect(res.body).toEqual({ message: "Invalid fields" });
          });
        });

        describe('when user body is valid', () => {  
          it('should return created user response', async () => {
            spyUserRepository.getUserByEmail = jest
              .spyOn(userRepository, 'getUserByEmail')
              .mockReturnValueOnce(false);
            
            spyUserRepository.createUser = jest
              .spyOn(userRepository, 'createUser')
              .mockReturnValueOnce(users[1]);
            
            res = await request.post(path).send(newUser).set("authorization", "47M47m");
            expect(res.status).toEqual(200);
            expect(res.header['content-type']).toMatch(/json/);
            expect(res.body).toEqual(users[1]);
          });
        });
        
        describe('when user already exists', () => {  
          it('should return user already exists response', async () => {
            spyUserRepository.getUserByEmail = jest
              .spyOn(userRepository, 'getUserByEmail')
              .mockReturnValueOnce(true);
            
            res = await request.post(path).send(newUser).set("authorization", "47M47m");
            expect(res.status).toEqual(409);
            expect(res.header['content-type']).toMatch(/json/);
            expect(res.body).toEqual({message: "User already exists with given email"});
          });
        });

        /*describe('when new user has gold subcription', () => {  
          it('should set subscription expiration date', async () => {
            spyUserRepository.getUserByEmail = jest
              .spyOn(userRepository, 'getUserByEmail')
              .mockReturnValueOnce(false);
            
            spyUserRepository.createUser = jest
              .spyOn(userRepository, 'createUser')
              .mockReturnValueOnce(users[1]);

            const goldUser = newUser;
            goldUser.subscription = "Gold";
            res = await request.post(path).send(goldUser).set("authorization", "47M47m");

            const now = new Date();
            const expiration = new Date(now.setMonth(now.getMonth() + 1));
            goldUser.subscriptionExpirationDate = expiration;
            expect(res.status).toEqual(200);
            expect(res.header['content-type']).toMatch(/json/);
            expect(spyUserRepository.createUser).toHaveBeenCalledWith(goldUser);
            //expect(res.body.subscriptionExpirationDate).toEqual(expiration);
          });
        });*/

      })
    })
})

