const { UnexpectedError } = require("../../errors/UnexpectedError");
const logger = require("../logger")("RemoveAllUsers.js");

module.exports = async (repository) => {
  try {
    repository.removeAllUsers();
    logger.info("All users deleted");
    return { message: "All users deleted successfully" };
  } catch (err) {
    logger.error("Critical error while removing all users: ", err);
    throw new UnexpectedError(`Unexpected error happened when removing all users ${err}`);
  }
};
