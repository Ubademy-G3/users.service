const { UnexpectedError } = require("../../errors/UnexpectedError");
const { UserNotFound } = require("../../errors/UserNotFound");
const logger = require("../logger")("UpdateUser.js");

module.exports = async (repository, params, userInfoBase) => {
  const userInfo = userInfoBase;

  if (userInfo.subscription !== "Free") {
    const now = new Date();
    const expiration = new Date(now.setMonth(now.getMonth() + 1));
    userInfo.subscriptionExpirationDate = expiration;
  }

  const userNotFound = await repository.getUserById(params.id);
  if (!userNotFound) {
    logger.warn(`User ${userInfo.id} not found`);
    throw new UserNotFound("User not found with given id");
  }
  const user = userInfo;
  user.id = params.id;
  try {
    const result = repository.updateUser(user);
    if (result) {
      logger.info("User updated successfully");
      return { message: "User updated successfully" };
    }
    logger.error(`Critical error while updating user ${user.id}`);
    throw new UnexpectedError("Unexpected error happened when updating user");
  } catch (err) {
    logger.error(`Critical error while updating user ${user.id}. `, err);
    throw new UnexpectedError(`Unexpected error happened when updating user ${err}`);
  }
};
