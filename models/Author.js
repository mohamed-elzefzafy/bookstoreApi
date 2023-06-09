
const mongoose = require("mongoose");
const joi = require("joi");


const AuthorSchema = new mongoose.Schema({
  firstName : {
    type : String ,
    required : true,
    trim : true,
    minlength : 3,
    maxlength : 200
  }, 
  lastName : {
    type : String ,
    required : true,
    trim : true,
    minlength : 3,
    maxlength : 200
  },
  nationality : {
    type : String ,
    required : true,
    trim : true,
    minlength : 2,
    maxlength : 100
  },
  image : {
    type : String ,
  default : "default-avatar.png"
  }
},
{
  timestamps : true
})


const Author = mongoose.model("Author" , AuthorSchema);


function validateCreateAuther(obj) {
  const schema = joi.object({
    firstName :  joi.string().trim().min(3).max(200).required(),
    lastName :   joi.string().trim().min(3).max(200).required(),
    nationality: joi.string().trim().min(3).max(200).required() ,
    image :      joi.string(),

  });
  return schema.validate(obj)
};


function validateUpdateAuther(obj) {
  const schema = joi.object({
    firstName :  joi.string().trim().min(3).max(200),
    lastName :   joi.string().trim().min(3).max(200),
    nationality: joi.string().trim().min(3).max(200) ,
    image :      joi.string().trim().min(3).max(200),

  });
  return schema.validate(obj)
}


module.exports = {
  Author ,
  validateCreateAuther , 
  validateUpdateAuther
}








