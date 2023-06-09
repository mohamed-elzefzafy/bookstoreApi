const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const { getAllAuthors, getAuthorById, createAuther, updateAuther, deleteAuthor } = require("../controllers/authorController");


// api/authors
router.route("/")
      .get( getAllAuthors)
      .post(  verifyTokenAndAdmin ,createAuther);


// api/authors/:id 


router.route("/:id")
      .get( getAuthorById)
      .put(verifyTokenAndAdmin , updateAuther)
      .delete( verifyTokenAndAdmin , deleteAuthor)








module.exports = router;