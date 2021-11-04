const { restart } = require("nodemon");

const createUser = require("../useCases/CreateNewUser");
const getAllUsers = require("../useCases/GetAllUsers");
const getUserById = require("../useCases/GetUserById");
const removeAllUsers = require("../useCases/RemoveAllUsers");
const removeUser = require("../useCases/RemoveUser");
const updateUser = require("../useCases/UpdateUser");
const patchUser = require("../useCases/PatchUser");

const { BadRequest } = require("../../errors/BadRequest");
const { UserAlreadyExists } = require("../../errors/UserAlreadyExists");
const { UserNotFound } = require("../../errors/UserNotFound");

const serializer = require("../serializers/UserSerializer");


exports.create = async (req, res) => {	 

	const apiKey = req.get("authorization");
	if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY){
		return res.status(401).send({message : "Unauthorized"});
	} else {
    const repository = req.app.serviceLocator.userRepository;

    createUser(repository, req.body)
    .then(user => res.status(200).json(serializer(user)))
    .catch(err => {
        if (err instanceof UserAlreadyExists) {
            return res.status(409).send({ message: err.message });
        }
    	if (err instanceof BadRequest) {
        	return res.status(400).send({ message: err.message });
    	}
        console.log(err);
        return res.status(500).send({ message: err.message });
    	});
  	}
};

exports.getAll = async (req, res) => {

	const apiKey = req.get("authorization");
	if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY){
		return res.status(401).send({message : "Unauthorized"});
  	} else {
        const repository = req.app.serviceLocator.userRepository;

        getAllUsers(repository, req.query)
      	    .then(users => res.status(200).json(serializer(users))) 
      	    .catch(err => {
       		    return res.status(500).send({ message: err.message });
     	    });      
  	}
};

exports.getById = (req, res) => {
	const apiKey = req.get("authorization");
    if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
        return res.status(401).send({message : "Unauthorized"});
    } else {
        const repository = req.app.serviceLocator.userRepository;
        getUserById(repository, req.params)
        .then((user) => res.status(200).json(serializer(user)))
        .catch((err) => {
            if (err instanceof UserNotFound) {
                return res.status(404).send({ message: err.message });
            }
            return res.status(500).send({ message: err.message });
        });
    }    
};

exports.update = (req, res) => {    
    const apiKey = req.get("authorization");
    if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
        return res.status(401).send({message : "Unauthorized"});
    } else {
        const repository = req.app.serviceLocator.userRepository;

        updateUser(repository, req.params, req.body)
            .then((msg) => res.status(200).json(msg))
            .catch((err) => {
                if (err instanceof UserNotFound) {
                    return res.status(404).send({ message: err.message });
                }
                if (err instanceof BadRequest) {
                    return res.status(400).send({ message: err.message });
                }
            return res.status(500).send({ message: err.message });
        });
    }
};

exports.patch = (req, res) => {    
    const apiKey = req.get("authorization");
    if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
        return res.status(401).send({message : "Unauthorized"});
    } else {
        const repository = req.app.serviceLocator.userRepository;

        patchUser(repository, req.params, req.body)
            .then((msg) => res.status(200).json(msg))
            .catch((err) => {
                if (err instanceof UserNotFound) {
                    return res.status(404).send({ message: err.message });
                }
                if (err instanceof BadRequest) {
                    return res.status(400).send({ message: err.message });
                }
            return res.status(500).send({ message: err.message });
        });
    }
};

exports.delete = (req, res) => {    
    const apiKey = req.get("authorization");
    if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY) {
        return res.status(401).send({message : "Unauthorized"});
    } else {
        const repository = req.app.serviceLocator.userRepository;

        removeUser(repository, req.params)
            .then((msg) => res.status(200).json(msg))
            .catch((err) => {
                if (err instanceof UserNotFound) {
                    return res.status(404).send({ message: err.message });
                }
                if (err instanceof BadRequest) {
                    return res.status(400).send({ message: err.message });
                }
            return res.status(500).send({ message: err.message });
        });
    }
};

exports.deleteAll = (req, res) => {
    const apiKey = req.get("authorization");
	if (!apiKey || apiKey !== process.env.USERSERVICE_APIKEY){
		return res.status(401).send({message : "Unauthorized"});
  	} else {
    const repository = req.app.serviceLocator.userRepository;

    removeAllUsers(repository)
      	.then(msg => res.status(200).json(msg)) 
      	.catch(err => {
       		return res.status(500).send({ message: err.message });
     	});      
  	}
};
