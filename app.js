const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
// environmental variables
const dotenv = require('dotenv');
dotenv.config();

// db url
const dbURI = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}.4lpm6.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;



//connect to db
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result)=>app.listen(4500)).catch((err)=>console.log(err));
// express app
const app = express();

// register view engine
app.set('view engine','ejs')
// app.set('views', 'views')
// listen for equests

// middleware and assets
app.use(express.static('public'))

// middleware to handle form data
app.use(express.urlencoded({extended: true}));

//middleware
app.use(morgan('dev'));

//routes
app.use('/blogs',blogRoutes)

//connect to mongoose

app.get('/',(req,res)=>{
res.redirect('/blogs');
})


app.get('/about',(req,res)=>{
  res.render('about', {title: "about"})
})

// redirects
//blogs


// 404 page similar to middleware
app.use((req,res)=>{
  res.status(404).render('404');

})