const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User ,  validateUpdateUser} = require("../models/User")

/**
 * @desc    Update User     
 * @route   /api/users/:id
 * @mrthod  PUT
 * @access  private
 */
const updateUser = asyncHandler(
  async  (req , res) => {
  const {error} = validateUpdateUser(req.body)
  if (error)
  {
    return res.status(400).json({message : error.details[0].message});
  }
  
  
  console.log(req.headers);
  if(req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password , salt);
  }
  
  const updatesUser = await User.findByIdAndUpdate(req.params.id , {
    $set  :{ 
      email : req.body.email ,
    username : req.body.username ,
    password : req.body.password , 
    }
  }, {new  :true}).select("-password");
  
  res.status(200).json(updatesUser);
  
    }
  )

/**
 * @desc    Get All Users     
 * @route   /api/users
 * @mrthod  GET
 * @access  private  (only Admin)
 */
  const getAllUsers = asyncHandler(
    async  (req , res) => {
  
    const users = await User.find().select("-password")
    
    res.status(200).json(users);
    
      }
    )


  /**
 * @desc    Get User by id
 * @route   /api/users/:id
 * @mrthod  GET
 * @access  private  (only Admin & user him self)
 */

    const getUserById = asyncHandler(
      async  (req , res) => {
     
      const user = await User.findById(req.params.id).select("-password");
      if(user)
      {
        res.status(200).json(user);
      } else {
      return res.status(404).json({message : "user not found"});
      }
      
    
      
        }
      )


  /**
 * @desc    Delete User
 * @route   /api/users/:id
 * @mrthod  DELETE
 * @access  private  (only Admin & user him self)
 */

      const deleteUser = asyncHandler(
        async  (req , res) => {
       
        const user = await User.findById(req.params.id).select("-password");
        if(user)
        {
          await User.findOneAndDelete(req.params.id);
          res.status(200).json({message : "user has been deleted"});
        } else {
        res.status(404).json({message : "user not found"});
        }
        
      
        
          }
        )


        module.exports = {

          updateUser ,
          getAllUsers ,
          getUserById ,
          deleteUser
        }