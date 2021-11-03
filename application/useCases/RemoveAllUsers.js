const { UnexpectedError } = require("../../errors/UnexpectedError");

module.exports = async (repository) => {
    try {
        return repository.removeAllUsers();
    } catch (err) {
        throw new UnexpectedError(`Unexpected error happened when removing all users ${err}`);
    }
};