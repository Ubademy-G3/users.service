const { UnexpectedError } = require("../../errors/UnexpectedError");
const { UserNotFound } = require("../../errors/UserNotFound");
const logger = require("../logger")("PatchUser.js");

module.exports = async (repository, params, userInfoBase) => {
  const userInfo = userInfoBase;

  if (userInfo.subscription && userInfo.subscription !== "Free") {
    const now = new Date();
    const expiration = new Date(now.setMonth(now.getMonth() + 1));
    userInfo.subscriptionExpirationDate = expiration;
  }

  const userNotFound = await repository.getUserById(params.id);
  if (!userNotFound) {
    logger.warn(`User ${params.id} not found`);
    throw new UserNotFound("User ID not found");
  }

  try {
    const result = repository.patchUser(params.id, userInfo);
    if (result) {
      logger.info("User patched successfully");
      return { message: "User updated successfully" };
    }
    logger.error(`Critical error while updating user ${params.id}`);
    throw new UnexpectedError("Unexpected error happened when updating user");
  } catch (err) {
    logger.error(`Critical error while updating user ${params.id}. `, err);
    throw new UnexpectedError(`Unexpected error happened when updating user ${err}`);
  }
};
