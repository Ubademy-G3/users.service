const { UnexpectedError } = require("../../errors/UnexpectedError");
const { UserNotFound } = require("../../errors/UserNotFound");

module.exports = async (repository, params, userInfoBase) => {
  const userInfo = userInfoBase;

  if (userInfo.subscription && userInfo.subscription !== "Free") {
    const now = new Date();
    const expiration = new Date(now.setMonth(now.getMonth() + 1));
    userInfo.subscriptionExpirationDate = expiration;
  }

  const userNotFound = await repository.getUserById(params.id);
  if (!userNotFound) {
    throw new UserNotFound("User ID not found");
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
