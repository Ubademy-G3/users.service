const { BadRequest } = require("../../errors/BadRequest");
const { UnexpectedError } = require("../../errors/UnexpectedError");
const { UserNotFound } = require("../../errors/UserNotFound");

module.exports = async (repository, params, userInfo) => {
  if (!params.id) {
    throw new BadRequest("Missing required fields");
  }

  const userNotFound = await repository.getUserById(params.id);
  if (!userNotFound) {
    throw new UserNotFound("User not found with given email");
  }

  try {
    const result = repository.patchUser(params.id, userInfo);
    if (result) {
      return { message: "User updated successfully" };
    }
    throw new UnexpectedError("Unexpected error happened when updating user");
  } catch (err) {
    throw new UnexpectedError(`Unexpected error happened when updating user ${err}`);
  }
};
