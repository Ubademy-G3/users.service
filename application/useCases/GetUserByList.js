const { UserNotFound } = require("../../errors/UserNotFound");
const { UnexpectedError } = require("../../errors/UnexpectedError");
const logger = require("../logger")("GetUserByList.js");

module.exports = async (repository, params) => {
  const users = await repository.getUserByList(params.list);

  if (!users) {
    logger.warn(`User ${params.list} not found`);
    throw new UserNotFound("User Ids not found");
  }
  try {
    return users;
  } catch (err) {
    logger.error(`Critical error while getting users ${params.list}: `, err);
    throw new UnexpectedError(`Unexpected error happened when getting users ${err}`);
  }
};
