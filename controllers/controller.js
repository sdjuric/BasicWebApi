const userModel = require('../models/model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

module.exports = {
 create: function(req, res, next) {
  userModel.create({ firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password, email: req.body.email, dateOfBirth: req.body.dateOfBirth, favouriteColour: req.body.favouriteColour }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "User added", data: null});
    });
 },
 
authenticate: function(req, res, next) {
  userModel.findOne({email:req.body.email}, function(err, userInfo){
    if (err) {
      next(err);
    } else {
      if(bcrypt.compareSync(req.body.password, userInfo.password)) {
        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
        res.json({status:"success", message: "User found. ", data:{user: userInfo, token:token}});
      }else{
        res.json({status:"error", message: "Invalid credentials", data:null});
      }
    }
  });
 },

getById: function(req, res, next) {
  userModel.findById(req.params.userId, function(err, userInfo){
   if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "User found. ", data:{user: userInfo}});
   }
  });
 },
 
getAll: function(req, res, next) {
  let userList = [];
userModel.find({}, function(err, users){
   if (err){
    next(err);
   } else{
    for (let user of users) {
     userList.push({id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, dateOfBirth: user.dateOfBirth, favouriteColour: user.favouriteColour});
    }
    res.json({status:"success", message: "Users found. ", data:{users: userList}});
   }
  });
 }
}
