// User Schema

module.exports = (database, Sequelize) => {
  const User = database.define("user", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    rol: {
      type: Sequelize.ENUM({
        values: ['Student', 'Instructor']
        })
    },
    location: {
      type: Sequelize.STRING,
    },
    interests: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    profilePictureUrl: {
      type: Sequelize.STRING,
    },
    subscription: {
      type: Sequelize.ENUM({
        values: ['Free', 'Gold', 'Platinum']
      })
    },
    subscriptionExpirationDate: {
      type: Sequelize.DATE,
    },
    favoriteCourses: {
      type: Sequelize.ARRAY(Sequelize.UUID),
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
