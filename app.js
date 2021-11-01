const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const users = require("./infrastructure/routes/Users");
const db = require("./infrastructure/db/Database");
//require("./infrastrucure/routes/Users")(app);
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000"
}; 
const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", users);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.sequelize.sync({ force: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
  });
});
