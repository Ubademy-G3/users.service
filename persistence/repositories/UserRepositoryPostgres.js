const UserModel = require("../../domain/UserModel");
const db = require("../../infrastructure/db/Database");
const UserRepository = require("../../domain/UserRepository")
const User = db.users;
const Op = db.Sequelize.Op;

//const client = require("../infrastructure/db/Database");

module.export = class extends UserRepository {
    constructor(){
        super();
    }

    createUser(body){
        const UserBody = {    
            id: body.id,
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            rol: body.rol,
            location: body.location,
            interests: body.interests,
            profilePictureUrl: body.profilePictureUrl,
            subscription: body.subscription,
            subscriptionExpirationDate: body.subscriptionExpirationDate,
            favoriteCourses: body.favoriteCourses,
            coursesHistory: body.coursesHistory
          };
        const NewUser = User.create(UserBody)
            .then(data => {
            res.send(data);
            });
        /*const {UUID, email, first_name, last_name, rol,
            location, interests, profile_picture_url, subscription,
            subscription_expiration_date, favorite_courses, courses_history} = user;
        const NewUser = await client.query(
            "INSERT INTO users (UUID, email, first_name, last_name, rol,\
            location, interests, profile_picture_url, subscription,\
            subscription_expiration_date, favorite_courses, courses_history) \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
            [UUID, email, first_name, last_name, rol,
            location, interests, profile_picture_url, subscription,
            subscription_expiration_date, favorite_courses, courses_history])*/

        return new UserModel(NewUser.id, NewUser.email, NewUser.firstName, NewUser.lastName, NewUser.rol,
            NewUser.location, NewUser.interests, NewUser.profilePictureUrl, NewUser.subscription,
            NewUser.subscriptionExpirationDate, NewUser.favoriteCourses, NewUser.coursesHistory);        
    }

    getUser(id){
        /*const response = await client.query(
            'SELECT * FROM products WHERE productid = $1', [productId]); 
        return response;*/
        throw new Error("Method Not implemented");
    }

    getAllUsers(){
        throw new Error("Method Not implemented");
    }

    removeUser(id){
        throw new Error("Method Not implemented");
    }

    removeAllUsers(){
        throw new Error("Method Not implemented");
    }

    updateUser(user){
        throw new Error("Method Not implemented");
    }
}   