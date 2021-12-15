const { UserNotFound } = require("../../errors/UserNotFound");
const logger = require("../logger")("RemoveUser.js");

module.exports = async (repository, params) => {
  const user = await repository.removeUser(params.id);
  if (!user) {
    logger.warn(`User ${params.id} not found`);
    throw new UserNotFound("User Id not found");
  }
  logger.info("User deleted successfully");
  return { message: "User deleted successfully" };
};
