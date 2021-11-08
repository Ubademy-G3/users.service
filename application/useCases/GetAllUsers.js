const { UnexpectedError } = require("../../errors/UnexpectedError");

module.exports = async (repository, params) => {
  try {
    return repository.getAllUsers(params);
  } catch (err) {
    throw new UnexpectedError(`Unexpected error happened when searching for all users ${err}`);
  }
};
