const express = require("express");
const router = express.Router();
const Books = require("../models/books");
const Authors = require("../models/authors");
//path.join : Join several segments into one path
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
/*const upload = multer({
  /1-where is the upload is going to be :destination
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(
      null,
    /  all we want to do is accept image file so true if accepted else:false/ imageMimeTypes.includes(
        file.mimetype
      )
    );
  },
});
*/



//get all books
router.get("/", async (req, res) => {
  let query=Books.find()
 try {
  if(req.query.title != null && req.query.title !== '')
  {
    query=query.regex('title',new RegExp(req.query.title , 'i'))
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore !== '') {
    query = query.lte('publishDate', req.query.publishedBefore)
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter !== '') {
    query = query.gte('publishDate', req.query.publishedAfter)
  }
  const books=await query.exec()
  res.render('books/index',{
    books:books,
    searchBar : req.query
  })
 } catch  {
  res.redirect('/')
 }
});

// New Books Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Books())
})

// Create Books Route
router.post('/', async (req, res) => {
 // const fileName = req.file != null ? req.file.filename : null
  const book = new Books({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
   // coverImageName: fileName,
    description: req.body.description
  })
  saveCover(book , req.body.cover)

  try {
    const newBook = await book.save()
    // res.redirect(`books/${newBook.id}`)
    res.redirect(`books`)
  } catch {
   
    renderNewPage(res, book, true)
  }
})
function saveCover(book,coverEncoded){
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64')
    book.coverImageType = cover.type
  }
}

// function removeBookCover(fileName) {
//   fs.unlink(path.join(uploadPath, fileName), err => {
//     if (err) console.error(err)
//   })
// }

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Authors.find({})
    const params = {
      authors: authors,
      book: book
    }
    if (hasError) params.errorMessage = 'Error Creating Books'
    res.render('books/new', params)
  } catch {
    res.redirect('/books')
  }
}

module.exports = router