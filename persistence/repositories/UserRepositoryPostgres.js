const UserModel = require("../../domain/UserModel");
const db = require("../../infrastructure/db/Database");
const UserRepository = require("../../domain/UserRepository");

const UserDb = db.users;
// thats for operators like or, and, ecc. in conditionals like findAll where
// const Op = db.Sequelize.Op;

module.exports = class extends UserRepository {
  static async createUser(userInfo) {
    const user = {
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      rol: userInfo.rol,
      location: userInfo.location,
      interests: userInfo.interests,
      profilePictureUrl: userInfo.profilePictureUrl,
      subscription: userInfo.subscription,
      subscriptionExpirationDate: userInfo.subscriptionExpirationDate,
      favoriteCourses: userInfo.favoriteCourses,
      description: userInfo.description,
      registerType: userInfo.registerType,
      loginType: userInfo.loginType,
    };

    // combines the build and save methods
    const newUser = await UserDb.create(user);

    return new UserModel(newUser.id, newUser.email, newUser.firstName, newUser.lastName,
      newUser.rol, newUser.location, newUser.interests, newUser.profilePictureUrl,
      newUser.subscription, newUser.subscriptionExpirationDate, newUser.favoriteCourses,
      newUser.description, newUser.registerType, newUser.loginType);
  }

  static async getUserById(id) {
    const user = await UserDb.findByPk(id);

    if (user && Object.keys(user).length !== 0) {
      return new UserModel(
        user.id,
        user.email,
        user.firstName,
        user.lastName,
        user.rol,
        user.location,
        user.interests,
        user.profilePictureUrl,
        user.subscription,
        user.subscriptionExpirationDate,
        user.favoriteCourses,
        user.description,
        user.registerType,
        user.loginType,
      );
    }
    return null;
  }

  static async getUserByEmail(email) {
    const result = await UserDb.findAll({
      where: {
        email,
      },
    });

    const user = result[0];

    if (user && Object.keys(user).length !== 0) {
      return new UserModel(
        user.id,
        user.email,
        user.firstName,
        user.lastName,
        user.rol,
        user.location,
        user.interests,
        user.profilePictureUrl,
        user.subscription,
        user.subscriptionExpirationDate,
        user.favoriteCourses,
        user.description,
        user.registerType,
        user.loginType,
      );
    }
    return null;
  }

  static async getAllUsers(a) {
    const users = await UserDb.findAll({
      where: a,
      truncate: false,
    });
    return users;
  }

  static async removeUser(id) {
    const result = await UserDb.destroy({
      where: {
        id,
      },
    });
    return result;
  }

  static async removeAllUsers() {
    const result = await UserDb.destroy({
      where: {},
      truncate: false,
    });
    return result;
  }

  static async updateUser(userInfo) {
    const result = await UserDb.update({
      email: userInfo.email,
      firstName: userInfo.firstserverName,
      lastName: userInfo.lastName,
      rol: userInfo.rol,
      location: userInfo.location,
      interests: userInfo.interests,
      profilePictureUrl: userInfo.profilePictureUrl,
      subscription: userInfo.subscription,
      subscriptionExpirationDate: userInfo.subscriptionExpirationDate,
      favoriteCourses: userInfo.favoriteCourses,
      description: userInfo.description,
      registerType: userInfo.registerType,
      loginType: userInfo.loginType,
    },
    {
      where: {
        id: userInfo.id,
      },
    });
    return result;
  }

  static async patchUser(id, params) {
    const result = await UserDb.update(params,
      {
        where: {
          id,
        },
      });
    return result;
  }
};
