const UserModel = require("../../domain/UserModel");
const db = require("../../infrastructure/db/Database");
const UserRepository = require("../../domain/UserRepository");
const User = require("../../domain/UserModel");
const UserDb = db.users;
//thats for operators like or, and, ecc. in conditionals like findAll where
//const Op = db.Sequelize.Op;

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
        const newUser = await UserDb.create(user);       

        return new UserModel(newUser.id, newUser.email, newUser.firstName, newUser.lastName, newUser.rol,
            newUser.location, newUser.interests, newUser.profilePictureUrl, newUser.subscription,
            newUser.subscriptionExpirationDate, newUser.favoriteCourses, newUser.coursesHistory);        
    }

    static async getUserById(id){
        const result = await UserDb.findAll({
            where: {
               id: id
            }
        });

        const user = result[0];
        
        if(user && Object.keys(user).length !== 0){
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
                )
        }
        return null;        
    }

    static async getUserByEmail(email) {
        const result = await UserDb.findAll({
            where: {
               email: email
            }
        });

        const user = result[0];
        
        
        if (user && Object.keys(user).length !== 0) {
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

    static async  getAllUsers(a){
        return await UserDb.findAll({
            where: a,
            truncate: false
          }
        );        
    }

    static async removeUser(id){
        return await UserDb.destroy({
            where: {
                id: id
            }
        });
    }

    static async removeAllUsers(){
        return await UserDb.destroy({
            where: {},
            truncate: false
          })        
        };

    static async updateUser(userInfo){
        return await UserDb.update({
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
            },
            {
                where: {
                    id: userInfo.id
                }
        });        
    }

    static async patchUser(id, params){
        return await UserDb.update(params,
            {
                where: {
                    id: id
                }
            }
        ); 
    }    
}   