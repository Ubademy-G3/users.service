const express = require('express');
const { Client } = require('pg');
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const app = express();

const users = require('./infrastructure/routes/users.js');

var client;
if (process.env.NODE_ENV !== 'stage') {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      query_timeout: 1000,
      statement_timeout: 1000,
      ssl: false
    }); 
} else {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      query_timeout: 1000,
      statement_timeout: 1000,
      ssl: {
        rejectUnauthorized: false
      }
    });
}

client.connect();

app.use('/users', users);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/ping', (req, res) => res.send('Pong!'));

app.get('/status', (req, res) => 
    client.query('SELECT NOW()', (err) => res.send({ service: 'UP', db: err ? 'DOWN' : 'UP' }))
);

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`); 
});

