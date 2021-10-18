//const UsersController = require('../controllers/UsersController');

var express = require('express');
var router = express.Router();

// Home page route
router.get('/', function(req, res) {
  res.send('Página de inicio1');
});

// Id page route
router.get('/:id', function(req, res) {
  res.send('Acerca de esta wiki');
});

module.exports = router;