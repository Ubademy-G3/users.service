const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const users = require("./infrastructure/routes/Users");
const db = require("./infrastructure/db/Database");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", users);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.serviceLocator = require("./infrastructure/config/ServiceLocator");

db.sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    // console.log(`App running on port ${process.env.PORT}`);
  });
});

module.exports = app;
