const express = require("express");
const logger = require("./middlewares/logger");
const {notFound , errorHandler} = require("./middlewares/errors")
require("dotenv").config();
const connectToDB = require("./config/db");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

// connection to db 
connectToDB();

// init app 
const app = express();

// static folder 
app.use(express.static(path.join(__dirname , "images")));
//apply middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(logger);
// cors 
app.use(cors());
//helmet
app.use(helmet());

//set view engine
app.set("view engine" , "ejs");

//routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors" , require("./routes/authors"));
app.use("/api/auth" ,  require("./routes/auth"));
app.use("/api/users" , require("./routes/users"));
app.use("/api/upload" , require("./routes/upload"));
app.use("/password" , require("./routes/password"));
//error handler
app.use(notFound)

app.use(errorHandler)
// create server express js 

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`server is running in ${process.env.MODE_ENV} on port ${PORT}`)    );