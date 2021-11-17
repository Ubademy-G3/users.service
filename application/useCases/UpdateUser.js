const { BadRequest } = require("../../errors/BadRequest");
const { UnexpectedError } = require("../../errors/UnexpectedError");
const { UserNotFound } = require("../../errors/UserNotFound");

module.exports = async (repository, params, userInfoBase) => {
  const userInfo = userInfoBase;
  if (!params.id) {
    throw new BadRequest("Missing required fields");
  }

  if (userInfo.subscription !== "Free") {
    const now = new Date();
    const expiration = new Date(now.setMonth(now.getMonth() + 1));
    userInfo.subscriptionExpirationDate = expiration;
  }

  const userNotFound = await repository.getUserById(params.id);
  if (!userNotFound) {
    throw new UserNotFound("User not found with given email");
  }
  const user = userInfo;
  user.id = params.id;
  try {
    const result = repository.updateUser(user);
    if (result) {
      return { message: "User updated successfully" };
    }
    throw new UnexpectedError("Unexpected error happened when updating user");
  } catch (err) {
    throw new UnexpectedError(`Unexpected error happened when updating user ${err}`);
  }
};
