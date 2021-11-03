const { BadRequest } = require("../../errors/BadRequest");
const { UnexpectedError } = require("../../errors/UnexpectedError");
const { UserAlreadyExists } = require("../../errors/UserAlreadyExists");

module.exports = async (repository, userInfo) => {
    if (!userInfo.email || !userInfo.firstName || !userInfo.lastName) {
        throw new BadRequest("Missing required fields");
      }
    
      const userAlreadyExists = await repository.getByEmail({email: userInfo.email});
      if (userAlreadyExists) {
        throw new UserAlreadyExists("User already exists with given email");
      }
      try {
        return repository.createUser(userInfo);
      } catch (err) {
        throw new UnexpectedError(`Unexpected error happened when creating user ${err}`);
      }
};