const asyncHandler = require("express-async-handler");
const {   Book , validateCreateBook , validateUpdateBook} = require("../models/Book");

/**
 * @desc    Get all books
 * @route   /api/authors
 * @mrthod  GET
 * @access  public
 */
const getAllBooks = asyncHandler(
  async  (req , res)=>{
       const {minprice , maxprice} = req.query;
       let books;
       if (minprice , maxprice)
       {
        books = await Book.find({price : {$gte : minprice , $lte : maxprice}})
        .populate("author" , ["_id ", "firstName" , "lastName"]);
       }
       else {
        books = await Book.find()
        .populate("author" , ["_id ", "firstName" , "lastName"]);
       }
  
      res.status(200).json(books);
    }
  )



/**
 * @desc    Get book by id
 * @route   /api/books/:id
 * @mrthod  GET
 * @access  public
 */

  const getBookById = asyncHandler(
    async  (req , res)=>{
        const book = await Book.findById(req.params.id).populate("auther");
        if (book)
        {
          res.status(200).json(book);
        } else {
          res.status(404).json({message : "book not found !!"});
        }
        
      }
    )


/**
 * @desc    create new book
 * @route   /api/books
 * @mrthod  POST
 * @access  private  (only Admins)
 */
    const createBook =  asyncHandler(
      async  (req , res)=>{
      
          //joi validation
        const {error} = validateCreateBook(req.body);
        if (error)
        {
          return res.status(400).json({message : error.details[0].message});
        }
        
          const book = new Book(
            {
              title : req.body.title,
              author : req.body.auther,
              description : req.body.description,
              price : req.body.price,
              cover : req.body.cover,
          
            }
          )
       const result = await  book.save();
        res.status(201).json(result);
        
        }
      )

/**
 * @desc    update a book
 * @route   /api/books/:id
 * @mrthod  PUT
 * @access  private  (only Admins)
 */

      const updateBook =  asyncHandler(
        async  (req , res)=> {
            const {error} = validateUpdateBook(req.body);
            if (error)
            {
            return  res.status(400).json({message : error.details[0].message});
            }
        
          const updatedBook = await Book.findByIdAndUpdate(req.params.id , {
            $set : {
              title : req.body.title,
              author : req.body.auther,
              description : req.body.description,
              price : req.body.price,
              cover : req.body.cover
            }
          } , {new : true});
        
          res.status(200).json(updatedBook);
          
          }
        )

/**
 * @desc    delete book
 * @route   /api/books/:id
 * @mrthod  DELETE
 * @access  private  (only Admins)
 */
        const deleteBook = asyncHandler(
          async  (req , res) => {
              const book = await Book.findById(req.params.id)
              if (book) {
               await Book.findByIdAndDelete(req.params.id);
                res.status(200).json({message : "book has been deleted"});
              } else {
                res.status(404).json({message : "book not found" });
              }
            }
          )


  module.exports = {
    getAllBooks ,
    getBookById , 
    createBook , 
    updateBook ,
    deleteBook
  }