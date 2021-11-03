const { BadRequest } = require("../../errors/BadRequest");
const { UnexpectedError } = require("../../errors/UnexpectedError");
const { UserNotFound } = require("../../errors/UserNotFound");

module.exports = async (repository, params, userInfo) => {
    if (!params.id) {
        throw new BadRequest("Missing required fields");
    }
    
    const userNotFound = await repository.getUser({email: params.id});
    if (!userNotFound) {
        throw new UserNotFound("User not found with given email");
    }
    const user = userInfo;
    user.id = params.id;
    try {
        return repository.updateUser(user);
    } catch (err) {
        throw new UnexpectedError(`Unexpected error happened when updating user ${err}`);
    }
};