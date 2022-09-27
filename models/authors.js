const mongoose = require('mongoose')
//a schema in mongoDb or no sequel databases is like a table 

//create Table Author
const authorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  })

//the table name is Author 
module.exports=mongoose.model('Author',authorSchema)