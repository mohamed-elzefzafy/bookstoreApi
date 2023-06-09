const {Book} = require("./models/Book");
const {books , authors} = require("./data");
const {Author} = require("./models/Author")
const connectToDB = require("./config/db")
require("dotenv").config();

//connection to db
connectToDB();

//import books (seeding database)
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("books imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const removeBooks = async () => {
try {
  await Book.deleteMany();
  console.log("books removed");
} catch (error) {
  console.log(error);
  process.exit(1);
}
}






//import authors (seeding database)
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("authors imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}



if(process.argv[2] === "-import")
{
  importBooks();
}

else if (process.argv[2] === "-remove")
{
  removeBooks();
}


else if (process.argv[2] === "-import-authors")
{
  importAuthors();
}
