const mongoose = require('mongoose')
//a schema in mongoDb or no sequel databases is like a table 

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
    coverImage: {
      type: Buffer,
      required: true
    },
    
      coverImageType:{
        type:String,
        required :true
      }
     
  })

  bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

//the table name is book 
module.exports=mongoose.model('Book',bookSchema);