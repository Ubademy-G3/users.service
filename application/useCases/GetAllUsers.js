const { UnexpectedError } = require("../../errors/UnexpectedError");
const logger = require("../logger")("GetAllUsers.js");

module.exports = async (repository, params) => {
  try {
    return repository.getAllUsers(params);
  } catch (err) {
    logger.error("Critical error whhile searching all users");
    throw new UnexpectedError(`Unexpected error happened when searching for all users ${err}`);
  }
};
