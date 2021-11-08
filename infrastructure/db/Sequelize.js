//User Schema

module.exports = (database, Sequelize) => {
  const User = database.define("user", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
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
      type: Sequelize.ARRAY(Sequelize.STRING)
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
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    coursesHistory: {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    }
  });

  return User;
};