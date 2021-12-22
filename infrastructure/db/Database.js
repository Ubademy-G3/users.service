/* istanbul ignore file */
const Sequelize = require("sequelize");
const seq = require("./Sequelize");

if (process.env.NODE_ENV !== "testing") {
  let database = null;

  if (process.env.NODE_ENV !== "stage") {
    database = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      operatorsAliases: Sequelize.Op,
      // operatorsAliases: 0,
      define: { timestamp: false },
    });
  } else {
    database = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      operatorsAliases: Sequelize.Op,
      // operatorsAliases: 0,
      define: { timestamp: false },
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
  }

  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = database;

  db.users = seq(database, Sequelize);

  module.exports = db;
}
