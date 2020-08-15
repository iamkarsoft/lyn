const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const dbURI = 'mongodb+srv://kofiramos:hellofresh@lyn.4lpm6.mongodb.net/lyn?retryWrites=true&w=majority';



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
app.use(blogRoutes)

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