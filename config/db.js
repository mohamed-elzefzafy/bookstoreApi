const mongoose = require("mongoose");

async function connectToDB() {


    try {
       await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongo db");
    } catch (error) {
        console.log("coneection failed to mongo" , error)
    }
    
}


module.exports = connectToDB;