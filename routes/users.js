const express = require("express");
const router = express.Router();
const {verifyToken , verifyTokenAndAuthorization  , verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const { updateUser, getAllUsers, getUserById, deleteUser } = require("../controllers/userController");


// /api/users
router.route("/").get(verifyTokenAndAdmin , getAllUsers)



// /api/users/:id 
router.route("/:id")
      .put(verifyTokenAndAuthorization , updateUser)
      .get(verifyTokenAndAuthorization , getUserById)
      .delete( verifyTokenAndAuthorization , deleteUser)


    



module.exports = router;