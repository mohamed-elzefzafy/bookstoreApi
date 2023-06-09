const asyncHandler = require("express-async-handler");
const {Author , validateCreateAuther , validateUpdateAuther} = require("../models/Author")



/**
 * @desc    Get all authors
 * @route   /api/authors
 * @mrthod  GET
 * @access  public
 */
const getAllAuthors =  asyncHandler(
  async (req , res)=> {
    const {pageNumber} = req.query;

    const authorsPerPage = 2;

      const autherList = await Author.find().skip((pageNumber - 1) * authorsPerPage ).limit(authorsPerPage);
      res.status(200).json(autherList);
   }
 )


/**
 * @desc    Get  author by id
 * @route    /api/authors
 * @mrthod  GET
 * @access  public
 */
const getAuthorById = asyncHandler(
  async (req , res) => {

      const  author = await Author.findById(req.params.id)
      if (author)
      {
         res.status(200).json(author);
       } else {
        res.status(404).json({message : "auther not found"});
      }
    }
)

/**
 * @desc    create new author
 * @route    /api/authors
 * @mrthod  POST
 * @access  private  (only Admins)
 */

const createAuther =  asyncHandler(
  async (req , res) => {
    const {error} = validateCreateAuther(req.body)
    if (error)
    {
      return res.status(400).json({message : error.details[0].message})
    }
   

      const author = new Author({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        nationality : req.body.nationality,
        image : req.body.image,
    })
  
  
   const result =  await author.save();
      res.status(201).json(result);
  

  
  
  }
)





/**
 * @desc    update an author 
 * @route    /api/authors/:id
 * @mrthod  PUT
 * @access  private  (only Admins)
 */

const updateAuther = asyncHandler(
  async (req , res) => {
    const {error} = validateUpdateAuther(req.body)
    if (error)
    {
     return res.status(400).json({message : error.details[0].message})
   }
   

     const author = await Author.findByIdAndUpdate(req.params.id , {
       $set : {
         firstName : req.body.firstName ,
         lastName : req.body.lastName, 
         nationality : req.body.nationality , 
         image : req.body.image
       }  
       } , {new : true});
     res.status(200).json(author);
    }
 )


/**
 * @desc    delete an author
 * @route    /api/authors/:id
 * @mrthod  DELETE
 * @access  private  (only Admins)
 */

 const deleteAuthor = asyncHandler(
  async (req , res) => {
      const author = await Author.findById(req.params.id)
      if (author) 
      {
       await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "auther has been deleted"});
      } else {
        res.status(404).json({message : "auther not found"});
      }
  
     }
 )


 module.exports = {
  getAllAuthors ,
  getAuthorById ,
  createAuther ,
  updateAuther , 
  deleteAuthor
 }