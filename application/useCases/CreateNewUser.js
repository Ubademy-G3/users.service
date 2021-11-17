const { BadRequest } = require("../../errors/BadRequest");
const { UnexpectedError } = require("../../errors/UnexpectedError");
const { UserAlreadyExists } = require("../../errors/UserAlreadyExists");

module.exports = async (repository, userInfoBase) => {
  const userInfo = userInfoBase;
  if (!userInfo.email || !userInfo.firstName || !userInfo.lastName) {
    throw new BadRequest("Missing required fields");
  }

  if (userInfo.subscription !== "Free") {
    const now = new Date();
    const expiration = new Date(now.setMonth(now.getMonth() + 1));
    userInfo.subscriptionExpirationDate = expiration;
  } else {
    userInfo.subscriptionExpirationDate = null;
  }

  const userAlreadyExists = await repository.getUserByEmail(userInfo.email);
  if (userAlreadyExists) {
    throw new UserAlreadyExists("User already exists with given email");
  }
  try {
    return repository.createUser(userInfo);
  } catch (err) {
    throw new UnexpectedError(`Unexpected error happened when creating user ${err}`);
  }
};
