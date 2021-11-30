const supertest = require("supertest");
const app = require("../app");
const userRepository = require("../persistence/repositories/UserRepositoryPostgres");

const users = [
  {
    id: "0fe4170e-7f6e-41c8-8060-30c7e8795b0e",
    email: "dani@test.com",
    firstName: "Dani",
    lastName: "Test",
    rol: "instructor",
    location: null,
    interests: null,
    profilePictureUrl: null,
    subscription: "free",
    subscriptionExpirationDate: "2021-12-19T13:05:57.501Z",
    favoriteCourses: null,
    description: null,
  },
  {
    id: "abc52922-eddf-403a-80b7-f61023953edd",
    email: "chia@gmail.com",
    firstName: "Chiara",
    lastName: "Bauni",
    rol: "instructor",
    location: "Bs as",
    interests: null,
    profilePictureUrl: null,
    subscription: "free",
    subscriptionExpirationDate: null,
    favoriteCourses: null,
    description: null,
  },
  {
    id: "eb9b304a-9e50-4b6a-b47e-dabee64008c1",
    email: "chiara@gmail.com",
    firstName: "Chiara",
    lastName: "Bauni",
    rol: "instructor",
    location: "Bs as",
    interests: null,
    profilePictureUrl: null,
    subscription: "free",
    subscriptionExpirationDate: null,
    favoriteCourses: null,
    description: null,
  },
];

const newUser = {
  email: "chia@gmail.com",
  firstName: "Chiara",
  lastName: "Bauni",
  rol: "instructor",
  location: "Bs as",
  interests: [],
  profilePictureUrl: "",
  subscription: "free",
  subscriptionExpirationDate: "",
  favoriteCourses: [],
  description: "",
};

describe("userController", () => {
  let request;
  let res;
  let spyUserRepository;

  describe("/users", () => {
    const path = "/users";

    beforeEach(() => {
      spyUserRepository = {};
      request = supertest(app);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("GET", () => {
      describe("when there are users", () => {
        beforeEach(async () => {
          spyUserRepository.getAllUsers = jest
            .spyOn(userRepository, "getAllUsers")
            .mockReturnValueOnce(users);

          res = await request.get(path).set("authorization", "47M47m");
        });

        it("should respond with correct status and body", () => {
          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.body).toEqual(users);
        });
      });

      describe("when unexpected error happens", () => {
        beforeEach(async () => {
          spyUserRepository.getAllUsers = jest
            .spyOn(userRepository, "getAllUsers")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.get(path).set("authorization", "47M47m");
        });

        it("should respond with unexpected error status", () => {
          expect(res.status).toEqual(500);
        });
      });

      describe("when unexpected error happens gettin user by id", () => {
        it("should respond with unexpected error status", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.get(`${path}/1234`).set("authorization", "47M47m");
          expect(res.status).toEqual(500);
        });
      });

      describe("when invalid apikey", () => {
        beforeEach(async () => {
          spyUserRepository.getAllUsers = jest
            .spyOn(userRepository, "getAllUsers")
            .mockReturnValueOnce(users);

          res = await request.get(path).set("authorization", "banana");
        });

        it("should respond with unauthorized error status and body", () => {
          expect(res.status).toEqual(401);
          expect(res.body).toEqual({ message: "Unauthorized" });
        });
      });

      describe("when invalid id getting user by id", () => {
        it("should respond with user not found status and body", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(null);

          res = await request.get(`${path}/banana`).set("authorization", "47M47m");
          expect(res.status).toEqual(404);
          expect(res.body).toEqual({ message: "User Id not found" });
        });
      });

      describe("when user exists", () => {
        it("should respond with correct status and body", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(users[0]);

          res = await request.get(`${path}/${users[0].id}`).set("authorization", "47M47m");
          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.body).toEqual(users[0]);
        });
      });

      describe("when invalid apikey getting user by id", () => {
        it("should respond with unauthorized error status and body", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(users[0]);

          res = await request.get(`${path}/${users[0].id}`).set("authorization", "banana");
          expect(res.status).toEqual(401);
          expect(res.body).toEqual({ message: "Unauthorized" });
        });
      });
    });

    describe("POST", () => {
      describe("when user is student and interest is missing", () => {
        it("should return invalid fields response", async () => {
          res = await request.post(path).send(users[0]).set("authorization", "47M47m");
          expect(res.status).toEqual(400);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.body).toEqual({ message: "Invalid fields" });
        });
      });

      describe("when user body is valid", () => {
        it("should return created user response", async () => {
          spyUserRepository.getUserByEmail = jest
            .spyOn(userRepository, "getUserByEmail")
            .mockReturnValueOnce(false);

          spyUserRepository.createUser = jest
            .spyOn(userRepository, "createUser")
            .mockReturnValueOnce(users[1]);

          res = await request.post(path).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.body).toEqual(users[1]);
        });
      });

      describe("when user already exists", () => {
        it("should return user already exists response", async () => {
          spyUserRepository.getUserByEmail = jest
            .spyOn(userRepository, "getUserByEmail")
            .mockReturnValueOnce(true);

          res = await request.post(path).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(409);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.body).toEqual({ message: "User already exists with given email" });
        });
      });

      describe("when new user has gold subcription", () => {
        it("should set subscription expiration date", async () => {
          spyUserRepository.getUserByEmail = jest
            .spyOn(userRepository, "getUserByEmail")
            .mockReturnValueOnce(false);

          spyUserRepository.createUser = jest
            .spyOn(userRepository, "createUser")
            .mockReturnValueOnce(users[1]);

          const goldUser = newUser;
          goldUser.subscription = "gold";
          res = await request.post(path).send(goldUser).set("authorization", "47M47m");

          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          const nullSubs = { subscriptionExpirationDate: null };
          const expDate = res.body.subscriptionExpirationDate;
          expect(expDate).toEqual(expect.not.objectContaining(nullSubs));
        });
      });

      describe("when invalid apikey", () => {
        it("should respond with unauthorized error status and body", async () => {
          res = await request.post(`${path}`).send(users[1]).set("authorization", "banana");
          expect(res.status).toEqual(401);
          expect(res.body).toEqual({ message: "Unauthorized" });
        });
      });

      describe("when unexpected error happens", () => {
        it("should respond with unexpected error status", async () => {
          spyUserRepository.createUser = jest
            .spyOn(userRepository, "createUser")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.post(path).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(500);
        });
      });
    });

    describe("UPDATE", () => {
      describe("when invalid user id", () => {
        it("should respond with user not found status and body", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(null);

          res = await request.put(`${path}/banana`).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(404);
          expect(res.body).toEqual({ message: "User not found with given id" });
        });
      });

      describe("when invalid user", () => {
        it("should respond with bad request status and body", async () => {
          res = await request.put(`${path}/1234`).send(users[0]).set("authorization", "47M47m");
          expect(res.status).toEqual(400);
          expect(res.body).toEqual({ message: "Invalid fields" });
        });
      });

      describe("when user exists", () => {
        it("should respond with correct status and body", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(true);

          spyUserRepository.updateUser = jest
            .spyOn(userRepository, "updateUser")
            .mockReturnValueOnce(true);

          res = await request.put(`${path}/${users[0].id}`).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.body).toEqual({ message: "User updated successfully" });
        });
      });

      describe("when invalid apikey", () => {
        it("should respond with unauthorized error status and body", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(users[0]);

          res = await request.put(`${path}/${users[0].id}`).send(users[1]).set("authorization", "banana");
          expect(res.status).toEqual(401);
          expect(res.body).toEqual({ message: "Unauthorized" });
        });
      });

      describe("when new user has gold subscription", () => {
        it("should set subscription expiration date", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(true);

          spyUserRepository.updateUser = jest
            .spyOn(userRepository, "updateUser")
            .mockReturnValueOnce(users[1]);

          const goldUser = newUser;
          goldUser.subscription = "gold";
          res = await request.put(`${path}/1234`).send(goldUser).set("authorization", "47M47m");

          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          const nullSubs = { subscriptionExpirationDate: null };
          const expDate = res.body.subscriptionExpirationDate;
          expect(expDate).toEqual(expect.not.objectContaining(nullSubs));
        });
      });

      describe("when unexpected error happens", () => {
        it("should respond with unexpected error status", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(true);

          spyUserRepository.updateUser = jest
            .spyOn(userRepository, "updateUser")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.put(`${path}/1234`).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(500);
        });
      });
    });

    describe("PATCH", () => {
      describe("when invalid user id", () => {
        it("should respond with user not found status and body", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(null);

          res = await request.patch(`${path}/banana`).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(404);
          expect(res.body).toEqual({ message: "User ID not found" });
        });
      });

      describe("when user exists", () => {
        it("should respond with correct status and body", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(true);

          spyUserRepository.patchUser = jest
            .spyOn(userRepository, "patchUser")
            .mockReturnValueOnce(true);

          res = await request.patch(`${path}/${users[0].id}`).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.body).toEqual({ message: "User updated successfully" });
        });
      });

      describe("when invalid user", () => {
        it("should respond with bad request status and body", async () => {
          res = await request.patch(`${path}/1234`).send(users[0]).set("authorization", "47M47m");
          expect(res.status).toEqual(400);
          expect(res.body).toEqual({ message: "Invalid fields" });
        });
      });

      describe("when new user has gold subcription", () => {
        it("should set subscription expiration date", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(true);

          spyUserRepository.patchUser = jest
            .spyOn(userRepository, "patchUser")
            .mockReturnValueOnce(users[1]);

          const goldUser = newUser;
          goldUser.subscription = "gold";
          res = await request.patch(`${path}/1234`).send(goldUser).set("authorization", "47M47m");

          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          const nullSubs = { subscriptionExpirationDate: null };
          const expDate = res.body.subscriptionExpirationDate;
          expect(expDate).toEqual(expect.not.objectContaining(nullSubs));
        });
      });

      describe("when invalid apikey", () => {
        it("should respond with unauthorized error status and body", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(users[0]);

          res = await request.patch(`${path}/${users[0].id}`).send(users[1]).set("authorization", "banana");
          expect(res.status).toEqual(401);
          expect(res.body).toEqual({ message: "Unauthorized" });
        });
      });

      describe("when unexpected error happens", () => {
        it("should respond with unexpected error status", async () => {
          spyUserRepository.getUserById = jest
            .spyOn(userRepository, "getUserById")
            .mockReturnValueOnce(true);

          spyUserRepository.patchUser = jest
            .spyOn(userRepository, "patchUser")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.patch(`${path}/1234`).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(500);
        });
      });
    });

    describe("DELETE", () => {
      describe("when invalid user id", () => {
        it("should respond with user not found status and body", async () => {
          spyUserRepository.removeUser = jest
            .spyOn(userRepository, "removeUser")
            .mockReturnValueOnce(null);

          res = await request.delete(`${path}/banana`).set("authorization", "47M47m");
          expect(res.status).toEqual(404);
          expect(res.body).toEqual({ message: "User Id not found" });
        });
      });

      describe("when user exists", () => {
        it("should respond with correct status and body", async () => {
          spyUserRepository.removeUser = jest
            .spyOn(userRepository, "removeUser")
            .mockReturnValueOnce(true);

          res = await request.delete(`${path}/${users[0].id}`).set("authorization", "47M47m");
          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.body).toEqual({ message: "User deleted successfully" });
        });
      });

      describe("when users exist", () => {
        it("should respond with correct status and body", async () => {
          spyUserRepository.removeAllUsers = jest
            .spyOn(userRepository, "removeAllUsers")
            .mockReturnValueOnce(true);

          res = await request.delete(`${path}`).set("authorization", "47M47m");
          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.body).toEqual({ message: "All users deleted successfully" });
        });
      });

      describe("when invalid apikey", () => {
        it("should respond with unauthorized error status and body", async () => {
          spyUserRepository.removeUser = jest
            .spyOn(userRepository, "removeUser")
            .mockReturnValueOnce(users[0]);

          res = await request.delete(`${path}/${users[0].id}`).set("authorization", "banana");
          expect(res.status).toEqual(401);
          expect(res.body).toEqual({ message: "Unauthorized" });
        });
      });

      describe("when invalid apikey deleting all", () => {
        it("should respond with unauthorized error status and body", async () => {
          spyUserRepository.removeAllUsers = jest
            .spyOn(userRepository, "removeAllUsers")
            .mockReturnValueOnce(users[0]);

          res = await request.delete(`${path}`).set("authorization", "banana");
          expect(res.status).toEqual(401);
          expect(res.body).toEqual({ message: "Unauthorized" });
        });
      });

      describe("when unexpected error happens", () => {
        it("should respond with unexpected error status", async () => {
          spyUserRepository.removeUser = jest
            .spyOn(userRepository, "removeUser")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.delete(`${path}/1234`).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(500);
        });
      });

      describe("when unexpected error happens", () => {
        it("should respond with unexpected error status deleting all", async () => {
          spyUserRepository.removeAllUsers = jest
            .spyOn(userRepository, "removeAllUsers")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.delete(`${path}`).send(newUser).set("authorization", "47M47m");
          expect(res.status).toEqual(500);
        });
      });
    });
  });
});
