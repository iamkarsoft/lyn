const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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

//middleware
app.use(morgan('dev'));

//routes

//connect to mongoose
app.get('/add-blog',(req,res)=>{
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my blog',
    body: 'new more'
  });

  blog.save()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>console.log(err));
})
// get all blogs
app.get('/all-blogs',(req,res)=>{
  Blog.find()
  .then((result)=>{
    res.send(result)
  }).catch((err)=>console.log(err));
})

// find a single blog
app.get('/single-blog',(req,res)=>{
  Blog.findById('5f362b61bf7dcb2414c33a40')
  .then((result)=>{res.send(result)})
  .catch((err)=>console.log(err));
})
app.get('/',(req,res)=>{
  const blogs = [
    {title: 'Yoshi', snippet:'lorem10dfsfsdf fas'},
    {title: 'Yoshdsfdfsfisf sdfsfsf', snippet:'lorem10dfsfsdf fsdfsfdsfs fsdfasfdsfsfas'},
    {title: 'Yoshidfsf s', snippet:'lorem10dfsfsdf fsdfsdfsa fdfa fdasfsfas'},

  ]
  res.render('index',{title: 'Home',blogs})
})


app.get('/about',(req,res)=>{
  res.render('about', {title: "about"})
})

// redirects
app.get('/blogs/create',(req,res)=>{
  res.render('create', {title: "blog"});
})

// 404 page similar to middleware
app.use((req,res)=>{
  res.status(404).render('404');

})