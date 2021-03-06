// User Schema
/* istanbul ignore file */
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
        values: ["student", "instructor", "admin"],
      }),
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
        values: ["free", "gold", "platinum"],
      }),
      defaultValue: "free",
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
    registerType: {
      type: Sequelize.ENUM({
        values: ["google", "not-google"],
      }),
      allowNull: true,
      defaultValue: "not-google",
    },
    loginType: {
      type: Sequelize.ENUM({
        values: ["google", "not-google"],
      }),
      allowNull: true,
      defaultValue: "not-google",
    },
    passwordChanged: {
      type: Sequelize.INTEGER,
    },
    wallet_id: {
      type: Sequelize.UUID,
    },
  });

  return User;
};
