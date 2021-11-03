const { UnexpectedError } = require("../../errors/UnexpectedError");

module.exports = async (repository) => {
    try {
        return repository.getAllUsers();
    } catch (err) {
        throw new UnexpectedError(`Unexpected error happened when searching for all users ${err}`);
    }
};