const mongoose = require('mongoose')
//a schema in mongoDb or no sequel databases is like a table 
const path=require('path')
const coverImageBasePath='uploads/bookCovers'

//create Table Book
const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description:{
      type:String,
    },
    createdAt:{
      type:Date,
      required:true,
      default:Date.now
    },
    publishDate:{
      type:Date,
      required:true
    },
    pageCount:{
      type:Number,
      required:true
    },
    author:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Author'
    },
    coverImageName: {
      type: String,
      required: true
    },
  })

  bookSchema.virtual('coverImagePath').get(function(){
    //the raison why we used function() instead of arrow function is because
    // we need to access to this property which going to be linked to the actual book itself
    if (this.coverImageName != null) {
      return path.join('/', coverImageBasePath, this.coverImageName)
    }
  })

//the table name is book 
module.exports=mongoose.model('Book',bookSchema);
module.exports.coverImageBasePath=coverImageBasePath;