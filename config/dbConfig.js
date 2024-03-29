
//Set up default mongoose connection
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const connection = mongoose.connection;


connection.on("connected", ()=> {
    console.log("Mongodb connection is successfull");
})

connection.on("error",(error)=>{
    console.log("Error in Mongodb connection", error);
})


module.exports = mongoose;

