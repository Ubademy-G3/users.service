const UserModel = require("../../domain/UserModel");
const db = require("../../infrastructure/db/Database");
const UserRepository = require("../../domain/UserRepository")
const UserDb = db.users;
const Op = db.Sequelize.Op;

module.exports = class extends UserRepository {
    static async createUser(userInfo){
        const user = {    
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            rol: userInfo.rol,
            location: userInfo.location,
            interests: userInfo.interests,
            profilePictureUrl: userInfo.profilePictureUrl,
            subscription: userInfo.subscription,
            subscriptionExpirationDate: userInfo.subscriptionExpirationDate,
            favoriteCourses: userInfo.favoriteCourses,
            coursesHistory: userInfo.coursesHistory
          };

        //combines the build and save methods
        const newUser = UserDb.create(user);
            

        return new UserModel(newUser.id, newUser.email, newUser.firstName, newUser.lastName, newUser.rol,
            newUser.location, newUser.interests, newUser.profilePictureUrl, newUser.subscription,
            newUser.subscriptionExpirationDate, newUser.favoriteCourses, newUser.coursesHistory);        
    }

    getUser(id){
        throw new Error("Method Not implemented");
    }

    static async getByEmail(email) {
        const user = await UserDb.findOne(email);
        console.log(email)
        console.log(user)
        if (user) {
          return new UserModel(
            user.id,
            user.email,
            user.firstName,
            user.lastName,
            user.rol,
            user.location,
            user.interests,
            user.profilePictureUrl,
            user.subscription,
            user.subscriptionExpirationDate,
            user.favoriteCourses,
            user.coursesHistory
          );
        }
        return null;
    }

    static async  getAllUsers(){
        const allUsers = UserDb.findAll();
        return allUsers;
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