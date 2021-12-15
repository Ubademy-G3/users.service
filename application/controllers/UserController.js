const { validate } = require("jsonschema");
const createUser = require("../useCases/CreateNewUser");
const getAllUsers = require("../useCases/GetAllUsers");
const getUserById = require("../useCases/GetUserById");
const removeAllUsers = require("../useCases/RemoveAllUsers");
const removeUser = require("../useCases/RemoveUser");
const updateUser = require("../useCases/UpdateUser");
const patchUser = require("../useCases/PatchUser");
const USER_CREATION_SCHEMA = require("../../domain/UserSchema.json");
const USER_UPDATE_SCHEMA = require("../../domain/UpdateUserSchema.json");

const { UserAlreadyExists } = require("../../errors/UserAlreadyExists");
const { UserNotFound } = require("../../errors/UserNotFound");

const serializer = require("../serializers/UserSerializer");
const logger = require("../logger")("UserController.js");

exports.create = (req, res) => {
  const apiKey = req.get("authorization");
  logger.debug("Create new user");
  if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (!validate(req.body, USER_CREATION_SCHEMA).valid) {
    logger.warn("Invalid fields");
    return res.status(400).json({ message: "Invalid fields" });
  }
  const repository = req.app.serviceLocator.userRepository;

  createUser(repository, req.body)
    .then((user) => res.status(200).json(serializer(user)))
    .catch((err) => {
      if (err instanceof UserAlreadyExists) {
        logger.warn("User already exists");
        return res.status(409).send({ message: err.message });
      }
      logger.error("Critical error while creating user: "+ err.message);
      return res.status(500).send({ message: err.message });
    });
  return 0;
};

exports.getAll = (req, res) => {
  const apiKey = req.get("authorization");
  logger.debug("Get all users");
  if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }
  const repository = req.app.serviceLocator.userRepository;

  getAllUsers(repository, req.query)
    .then((users) => res.status(200).json(serializer(users)))
    .catch((err) => res.status(500).send({ message: err.message }));
  return 0;
};

exports.getById = (req, res) => {
  const apiKey = req.get("authorization");
  logger.debug("Get user by id");
  if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }
  const repository = req.app.serviceLocator.userRepository;
  getUserById(repository, req.params)
    .then((user) => res.status(200).json(serializer(user)))
    .catch((err) => {
      if (err instanceof UserNotFound) {
        return res.status(404).send({ message: err.message });
      }
      logger.error("Critical error while getting user by id: " + err.message);
      return res.status(500).send({ message: err.message });
    });
  return 0;
};

exports.update = (req, res) => {
  const apiKey = req.get("authorization");
  logger.debug("Update user");
  if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (!validate(req.body, USER_UPDATE_SCHEMA).valid) {
    logger.warn("Invalid fields");
    return res.status(400).json({ message: "Invalid fields" });
  }

  const repository = req.app.serviceLocator.userRepository;

  updateUser(repository, req.params, req.body)
    .then((msg) => res.status(200).json(msg))
    .catch((err) => {
      if (err instanceof UserNotFound) {
        return res.status(404).send({ message: err.message });
      }
      logger.error("Critical error while updating user: "+ err.message);
      return res.status(500).send({ message: err.message });
    });
  return 0;
};

exports.patch = (req, res) => {
  const apiKey = req.get("authorization");
  logger.debug("Patch user");
  if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (!validate(req.body, USER_UPDATE_SCHEMA).valid) {
    logger.warn("Invalid fields");
    return res.status(400).json({ message: "Invalid fields" });
  }

  const repository = req.app.serviceLocator.userRepository;

  patchUser(repository, req.params, req.body)
    .then((msg) => res.status(200).json(msg))
    .catch((err) => {
      if (err instanceof UserNotFound) {
        return res.status(404).send({ message: err.message });
      }
      logger.error("Critical error while patching user: "+ err.message);
      return res.status(500).send({ message: err.message });
    });
  return 0;
};

exports.delete = (req, res) => {
  const apiKey = req.get("authorization");
  logger.debug("Delete user");
  if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }
  const repository = req.app.serviceLocator.userRepository;

  removeUser(repository, req.params)
    .then((msg) => res.status(200).json(msg))
    .catch((err) => {
      if (err instanceof UserNotFound) {
        return res.status(404).send({ message: err.message });
      }
      logger.error("Critical error while deleting user: "+ err.message);
      return res.status(500).send({ message: err.message });
    });
  return 0;
};

exports.deleteAll = (req, res) => {
  const apiKey = req.get("authorization");
  if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }
  const repository = req.app.serviceLocator.userRepository;

  removeAllUsers(repository)
    .then((msg) => res.status(200).json(msg))
    .catch((err) => res.status(500).send({ message: err.message }));
  return 0;
};
