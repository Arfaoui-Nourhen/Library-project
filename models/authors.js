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



/**
 * exepmle :: Suppose you have a User model. Every user has an email, 
 * but you also want the email's domain. For example, the domain portion of 'test@gmail.com' is 'gmail.com'.
 
  const userSchema = mongoose.Schema({
  email: String
});
// Create a virtual property `domain` that's computed from `email`.
userSchema.virtual('domain').get(function() {
  return this.email.slice(this.email.indexOf('@') + 1);
});
const User = mongoose.model('User', userSchema);

let doc = await User.create({ email: 'test@gmail.com' });
// `domain` is now a property on User documents.
doc.domain; // 'gmail.com'
 */