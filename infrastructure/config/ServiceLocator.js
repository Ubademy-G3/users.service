const UserRepositoryPostgres = require("../../persistence/repositories/UserRepositoryPostgres");

function buildServices() {
  return {
    userRepository: UserRepositoryPostgres,
  };
}

module.exports = buildServices();
