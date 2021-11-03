const { restart } = require("nodemon");
const create = require("../useCases/CreateNewUser");
const findAll = require("../useCases/GetAllUsers");
const { BadRequest } = require("../../errors/BadRequest");
const { UserAlreadyExists } = require("../../errors/UserAlreadyExists");
const { UserNotFound } = require("../../errors/UserNotFound");
const serializer = require("../serializers/UserSerializer");

// Create and Save a new User
exports.create = async (req, res) => {
	// Validate request  

	const apiKey = req.get("authorization");
	if (apiKey !== process.env.USERSERVICE_APIKEY){
		return res.status(401,"Unauthorized");
	} else {

    const repository = req.app.serviceLocator.userRepository;

    create(repository, req.body)
    	.then(user => res.status(200).json(serializer(user)))
    	.catch(err => {
        	if (err instanceof UserAlreadyExists) {
				return res.status(409).send({ message: err.message });
			}
			if (err instanceof BadRequest) {
				return res.status(400).send({ message: err.message });
			}
        return res.status(500).send({ message: err.message });
      });
  

	// Save User in the database
	/*User.create(user)
	.then(data => {
	  res.send(data);
	});
	.catch(err => {
	  res.status(500).send({
	    message:
	      err.message || "Some error occurred while creating the User."
	  });
	});*/
  }
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
	//const id = req.query.id;
	//var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;

	const apiKey = req.get("authorization");
	if (apiKey !== process.env.USERSERVICE_APIKEY){
		return res.status(401,"Unauthorized");
  	} else {

    const repository = req.app.serviceLocator.userRepository;

    findAll(repository)
      	.then(users => res.status(200).json(serializer(users))) 
      	.catch(err => {
       		return res.status(500).send({ message: err.message });
     	});      
  	}
};
/*
// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    });/*
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });*/
//};
/*
// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    });/*
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });*/
//};
/*
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    });/*
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });*/
//};
/*
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    });/*
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });*/
//};
