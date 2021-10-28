const repository = require("../../persistence/repositories/UserRepositoryPostgres");

module.exports = (body) => {
    return repository.createUser(body);
}