const { BadRequest } = require("../../errors/BadRequest");
const { UserNotFound } = require("../../errors/UserNotFound");

module.exports = async (repository, params) => {
  if (!params.id) {
    throw new BadRequest("Missing required field");
  }

  const user = await repository.removeUser(params.id);
  if (!user) {
    throw new UserNotFound("User Id not found");
  }
  return { message: "User deleted successfully" };
};
