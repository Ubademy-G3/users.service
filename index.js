const app = require("./app");
const db = require("./infrastructure/db/Database");
require("dotenv").config();

db.sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT, () => {
      // console.log(`App running on port ${process.env.PORT}`);
    });
  });