const { UserNotFound } = require("../../errors/UserNotFound");

module.exports = async (repository, params) => {
  const user = await repository.removeUser(params.id);
  if (!user) {
    throw new UserNotFound("User Id not found");
  }
  return { message: "User deleted successfully" };
};
