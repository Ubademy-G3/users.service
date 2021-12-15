const { UserNotFound } = require("../../errors/UserNotFound");
const { UnexpectedError } = require("../../errors/UnexpectedError");
const logger = require("../logger")("GetUserById.js");

module.exports = async (repository, params) => {
  const user = await repository.getUserById(params.id);

  if (!user) {
    logger.warn("User "+ params.id+" not found");
    throw new UserNotFound("User Id not found");
  }
  try {
    return user;
  } catch (err) {
    logger.error("Critical error while getting user "+params.id+": ", err);
    throw new UnexpectedError(`Unexpected error happened when getting user ${err}`);
  }
};
