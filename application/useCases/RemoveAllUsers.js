const { UnexpectedError } = require("../../errors/UnexpectedError");

module.exports = async (repository) => {
    try {
        repository.removeAllUsers();
        return { message: "All users deleted successfully" };
    } catch (err) {
        throw new UnexpectedError(`Unexpected error happened when removing all users ${err}`);
    }
};