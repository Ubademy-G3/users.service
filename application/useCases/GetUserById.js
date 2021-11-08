const { BadRequest } = require("../../errors/BadRequest");
const { UserNotFound } = require("../../errors/UserNotFound");

module.exports = async (repository, params) => {
  if (!params.id) {
    throw new BadRequest("Missing required field");
  }

  const user = await repository.getUserById(params.id);
  if (!user) {
    throw new UserNotFound("User Id not found");
  }
  try {
    return user;
  } catch (err) {
    throw new UnexpectedError(`Unexpected error happened when getting user ${err}`);
  }
};
