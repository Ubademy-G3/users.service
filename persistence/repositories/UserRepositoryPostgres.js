const UserModel = require("../../domain/UserModel");
const db = require("../../infrastructure/db/Database");
const UserRepository = require("../../domain/UserRepository");
const logger = require("../../application/logger")("UserRepositoryPostgres.js");

const UserDb = db.users;
// thats for operators like or, and, ecc. in conditionals like findAll where
const Op = db.Sequelize.Op;

module.exports = class extends UserRepository {
  static async createUser(userInfo) {
    logger.debug("Creating new user");
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
      passwordChanged: 0,
      wallet_id: userInfo.walletId,
    };

    // combines the build and save methods
    const newUser = await UserDb.create(user);
    logger.info("Added new user");
    logger.debug(`Data of the new user: ${user}`);

    return new UserModel(newUser.id, newUser.email, newUser.firstName, newUser.lastName,
      newUser.rol, newUser.location, newUser.interests, newUser.profilePictureUrl,
      newUser.subscription, newUser.subscriptionExpirationDate, newUser.favoriteCourses,
      newUser.description, newUser.registerType, newUser.loginType, newUser.passwordChanged,
      newUser.wallet_id);
  }

  static async getUserById(id) {
    const user = await UserDb.findByPk(id);
    logger.debug(`Getting user with id: ${id}`);

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
        user.passwordChanged,
        user.wallet_id,
      );
    }
    return null;
  }

  static async getUserByList(idList) {
    const result = await UserDb.findAll({
      where: {
        id: {
          [Op.or]: [idList]
          },
      },
    });

    if (result[0] && Object.keys(result[0]).length !== 0) {
      var userList = []
      for (let user of result) {
        userList.append(new UserModel(
          user[0].id,
          user[0].email,
          user[0].firstName,
          user[0].lastName,
          user[0].rol,
          user[0].location,
          user[0].interests,
          user[0].profilePictureUrl,
          user[0].subscription,
          user[0].subscriptionExpirationDate,
          user[0].favoriteCourses,
          user[0].description,
          user[0].registerType,
          user[0].loginType,
          user[0].passwordChanged,
          user[0].wallet_id,
        ));
      }
      return userList
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
    logger.debug(`Get user with email: ${email}`);

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
        user.passwordChanged,
        user.wallet_id,
      );
    }
    return null;
  }

  static async getAllUsers(a) {
    const users = await UserDb.findAll({
      where: a,
      truncate: false,
    });
    logger.debug("Getting all users");
    return users;
  }

  static async removeUser(id) {
    logger.debug(`Deleting user ${id}`);
    const result = await UserDb.destroy({
      where: {
        id,
      },
    });
    return result;
  }

  static async removeAllUsers() {
    logger.debug("Deleting all users");
    const result = await UserDb.destroy({
      where: {},
      truncate: false,
    });
    return result;
  }

  static async updateUser(userInfo) {
    logger.debug(`Updating user ${userInfo.id}`);
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
      passwordChanged: userInfo.passwordChanged,
      wallet_id: userInfo.walletId,
    },
    {
      where: {
        id: userInfo.id,
      },
    });
    return result;
  }

  static async patchUser(id, params) {
    if ({}.propertyIsEnumerable.call(params, "passwordChanged")) {
      if (params.passwordChanged === 1) {
        const userWithId = await this.getUserById(id);
        params.passwordChanged = userWithId.passwordChanged + 1;
      }
    }
    logger.debug(`Patching user: ${id}`);
    const result = await UserDb.update(params,
      {
        where: {
          id,
        },
      });
    return result;
  }
};
