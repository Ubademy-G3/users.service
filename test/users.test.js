/* const sequelize = require("sequelize");
const request = require("supertest");
const sequelizeMock = require("sequelize-mock");
const app = require("../app");
const model = require("../infrastructure/db/Sequelize"); // User Schema

const dbMock = new sequelizeMock(model); */

const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});

/* let mockedUser;
let mockedUser2;
let mockedUserUpdated;

beforeEach(() => {
    mockedUser = {
        id: "3d0bc4e8-f301-47ce-930a-16b4bf0f2edf",
        email: "jonh@snow.com",
        firstName: "Jhon",
        lastName: "Snow",
        rol: "student",
        location: "argentina",
        interests: [
            "music"
        ],
        profilePictureUrl: "photosample.com",
        subscription: "normal",
        subscriptionExpirationDate: "01/01/3000",
        favoriteCourses: [
          1,2,3
        ],
        coursesHistory: [
          2,3
        ]
    };

    mockedUser2 = {
        id: "8ba6be09-1039-454d-b7d9-2886fee96a11",
        email: "eddard@stark.com",
        firstName: "Eddard",
        lastName: "Stark",
        rol: "student",
        location: "argentina",
        interests: [
            "falconry"
        ],
        profilePictureUrl: "photosample4.com",
        subscription: "silver",
        subscriptionExpirationDate: "01/01/3000",
        favoriteCourses: [
          1,4,3
        ],
        coursesHistory: [
          2,6
        ]
    };

    mockedUserUpdated = {
        id: "3d0bc4e8-f301-47ce-930a-16b4bf0f2edf",
        email: "jonh@snow.com",
        firstName: "Jhon",
        lastName: "Snow",
        rol: "collaborator",
        location: "argentina",
        interests: [
            "science"
        ],
        profilePictureUrl: "photosample2.com",
        subscription: "gold",
        subscriptionExpirationDate: "02/02/3000",
        favoriteCourses: [
          1,2,3
        ],
        coursesHistory: [
          2,3,4,5
        ]
    };
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("POST /users", () => {
    beforeEach(() => {
    mockingoose(model).reset();
    process.env.AUTH_APIKEY = "test";
    });
    afterEach(() => {
    delete process.env.AUTH_APIKEY;
    });
    test("Creates user successfully with valid email and password", async () => {
    await supertest(app).post("/users/")
        .set("Authorization", "test")
        .send(mockedUser)
        .expect(200)
        .then((response) => {
        const res = JSON.parse(response.text);
        expect(res.email).toBe("john@doe.com");
        expect(res.token).toBe("eyJ0eXAiHGY3dTfYeWQ-cyY9jkHoAwjRLbo");
        expect(res.password).toBeUndefined();
        expect(res.salt).toBeUndefined();
        expect(res.id).toBeUndefined();
        });
    });
    test("Fails when password is missing", async () => {
    await supertest(app).post("/users/")
        .set("Authorization", "test")
        .send({ email: mockedUser.email })
        .expect(400)
        .then((response) => {
        const res = JSON.parse(response.text);
        expect(res.message).toBe("Missing required fields");
        });
    });
    test("Fails when email is missing", async () => {
    await supertest(app).post("/users/")
        .set("Authorization", "test")
        .send({ password: mockedUser.password })
        .expect(400)
        .then((response) => {
        const res = JSON.parse(response.text);
        expect(res.message).toBe("Missing required fields");
        });
    });
    test("Fails email already exists", async () => {
    const existingUser = mockedUser;
    mockingoose(model).toReturn(existingUser, "findOne");
    await supertest(app).post("/users/")
        .set("Authorization", "test")
        .send(mockedUser)
        .expect(409)
        .then((response) => {
        const res = JSON.parse(response.text);
        expect(res.message).toBe("User already exists with given email");
        });
    });
    test("Returns unauthorized when invalid apikey", async () => {
    const existingUser = mockedUser;
    mockingoose(model).toReturn(existingUser, "findOne");
    await supertest(app).post("/users/")
        .set("Authorization", "invalid")
        .expect(401)
        .then((response) => {
        const res = JSON.parse(response.text);
        expect(res.message).toBe("Unauthorized");
        });
    });
}); */
