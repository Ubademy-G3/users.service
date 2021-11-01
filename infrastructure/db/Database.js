const Sequelize = require("sequelize");
const ENVIRONMENT = process.env.NODE_ENV;

let database = null;

if (process.env.NODE_ENV !== "stage") {
  
  database = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres',
		operatorsAliases: Sequelize.Op,
		define: {timestamp: false}
  })

} else {
  database = new Sequelize(process.env.DATABASE_URL ,{
		dialect: 'postgres',
		operatorsAliases: Sequelize.Op,
	  define: { timestamp: false },
		ssl: true,
		dialectOptions: {
			ssl: {
      	require: true,
      	rejectUnauthorized: false
    	}
		},
  })
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = database;

db.users = require("./Sequelize")(database, Sequelize);

module.exports = db 

