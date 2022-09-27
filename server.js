if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();
const indexRouter = require("./routes/index");
const auhtorsRouter = require("./routes/authors");
const bodyParser=require('body-parser');
// EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressEjsLayouts);
app.use(express.static("public"));
/*This object will contain key-value pairs,where the value can be 
a string or array (when extended is false),or any type (when extended is true)*/
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

const mongoose = require("mongoose");
//create the connection
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
});
//acces the connection
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("conncted to mongoose"));

app.use("/", indexRouter);
app.use("/authors", auhtorsRouter);
app.listen(process.env.PORT || 3000);
