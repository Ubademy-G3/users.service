//User Table Schema

module.exports = (database, Sequelize) => {
  const User = database.define("user", {
    id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    rol: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    interests: {
      type: Sequelize.ARRAY(DataTypes.STRING)
    },
    profilePictureUrl: {
      type: Sequelize.STRING
    },
    subscription: {
      type: Sequelize.STRING
    },
    subscriptionExpirationDate: {
      type: Sequelize.STRING
    },
    favoriteCourses: {
      type: Sequelize.ARRAY(DataTypes.UUID)
    },
    coursesHistory: {
      type: Sequelize.ARRAY(DataTypes.UUID)
    }
  });

  return User;
};