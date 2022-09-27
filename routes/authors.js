const express=require('express')
const router=express.Router()
const Author=require('../models/authors')
//get all authors
router.get('/',async(req,res)=>{
//that empty javascript abject says that we have no condition 
 //and inside that object is that we put our where condition for our object 
try {
    let searchBar={};
    if(req.query.name != null && req.query.name !== ""){
        searchBar.name=new RegExp(req.query.name,'i');
    }
    
    const authors= await Author.find(searchBar);
    res.render('authors/index',{ authors : authors})
} catch  {
    res.redirect('/')
}
})


//get new author
router.get('/new',(req,res)=>{
    res.render('authors/new',{author : new Author()})
    })
    
//create new auhtor
router.post('/', async (req, res) => {
    const author = new Author({
      name: req.body.name
    })
    try {
      const newAuthor = await author.save()
      // res.redirect(`authors/${newAuthor.id}`)
      console.log(newAuthor)
      res.redirect(`authors`)
    } catch {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }
  })
    

module.exports=router   