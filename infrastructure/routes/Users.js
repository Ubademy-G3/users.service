const express = require("express");

const router = express.Router();

const users = require("../../application/controllers/UserController");

// Create a new user
router.post("/", users.create);

// Retrieve all users
router.get("/", users.getAll);

// Retrieve a single user with id
router.get("/:id", users.getById);

// Update a user with id
router.put("/:id", users.update);

// Delete a user with id
router.delete("/:id", users.delete);

// Delete all users
router.delete("/", users.deleteAll);

module.exports = router;

