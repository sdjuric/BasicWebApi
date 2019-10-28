const authUserModel = require('../models/model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

module.exports = {
	
getAll: function(req, res, next) {
  let userList = [];
authUserModel.find({}, function(err, users){
   if (err){
    next(err);
   } else{
    for (let user of users) {
     userList.push({id: user._id, firstName: user.firstName, lastName: user.lastName, password: user.password, email: user.email, dateOfBirth: user.dateOfBirth, favouriteColour: user.favouriteColour});
    }
    res.json({status:"success", message: "Users found. ", data:{users: userList}});
   }
  });
 },
	
updateEmail: function(req, res, next) {
  authUserModel.findByIdAndUpdate(req.params.userId,{email:req.body.email}, function(err, userInfo){
    if(err)
      next(err);
    else {
      res.json({status:"success", message: "User updated. ", data:null});
    }
  });
 },
 deleteById: function(req, res, next) {
  authUserModel.findByIdAndRemove(req.params.userId, function(err, userInfo){
   if(err)
    next(err);
   else {
    res.json({status:"success", message: "User deleted. ", data:null});
   }
  });
 }
}
