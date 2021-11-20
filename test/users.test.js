const supertest = require('supertest');
const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const app = require("../app");
const userRepository = require("../persistence/repositories/UserRepositoryPostgres");
const repository = new userRepository();
console.log(repository);

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
    "rol": "Student",
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
      const path = '/';
  
      describe('GET', () => {
        describe('when there are users', () => {
          beforeEach(async () => {
            spyUserRepository.getAllUsers = jest
              .spyOn(repository, 'getAllUsers')
              .mockReturnValueOnce(users);
  
            res = await request.get(path).set("Authorization", "test");
          });
  
          it('should respond with correct status and body', () => {
            expect(res.status).toEqual(200);
            expect(res.header['content-type']).toMatch(/json/);
            expect(res.body).toEqual(users);
          });
        });
      })
    })
})

