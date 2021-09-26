const express = require('express');

 const app = express();
 
 const port = process.env.PORT;
 
 app.get('/', (req, res) => {
   res.status(200).send({
     success: 'true',
     message: 'Docker listo.',
     version: '1.0.0',
   });
 });
 
 app.listen(port);
 console.log('Aplicacion ejecutando en el puerto: ok', port);