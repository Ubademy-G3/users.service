const { UnexpectedError } = require("../../errors/UnexpectedError");
const { UserAlreadyExists } = require("../../errors/UserAlreadyExists");
const logger = require("../logger")("CreateNewUser.js");

module.exports = async (repository, userInfoBase) => {
  const userInfo = userInfoBase;

  if (userInfo.subscription !== "Free") {
    const now = new Date();
    const expiration = new Date(now.setMonth(now.getMonth() + 1));
    userInfo.subscriptionExpirationDate = expiration;
  } else {
    /* istanbul ignore next */
    userInfo.subscriptionExpirationDate = null;
  }

  const userAlreadyExists = await repository.getUserByEmail(userInfo.email);
  if (userAlreadyExists) {
    logger.warn("User already exists with email ", userInfo.email);
    throw new UserAlreadyExists("User already exists with given email");
  }
  try {
    return repository.createUser(userInfo);
  } catch (err) {
    logger.error("Critical error while creating user");
    throw new UnexpectedError(`Unexpected error happened when creating user ${err}`);
  }
};
