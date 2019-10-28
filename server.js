const express = require('express'); 
const bodyParser = require('body-parser');
const logger = require('morgan');
const users = require('./routes/route');
const authUsers = require('./routes/authRoute');
const mongoose = require('./config/database');
var jwt = require('jsonwebtoken');
const app = express();
app.set('secretKey', 'nodeRestApi'); 

mongoose.connection.on('error', console.error.bind(console, 'Unable to connect to database. '));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
res.json({"BasicWebApi" : "A basic Web Api."});
});

// No authentication needed:
app.use('/users', users);
// Authentication required: 
app.use('/authUsers', validateUser, authUsers);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      req.body.userId = decoded.id;
      next();
    }
  });
  
}
// explicit 404 error handling because express doesn't seem to handle it. 
app.use(function(req, res, next) {
 let err = new Error('Not found. ');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
 console.log(err);
  if(err.status === 404)
   res.status(404).json({message: "404: Not found. "});
  else 
    res.status(500).json({message: "Internal Server Error! "});
});

app.listen(3600, function(){
 console.log('Node server is now active on port 3600. ');
});
