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

// middleware to handle form data
app.use(express.urlencoded({extended: true}));

//middleware
app.use(morgan('dev'));

//routes

//connect to mongoose

app.get('/',(req,res)=>{
res.redirect('/blogs');
})


app.get('/about',(req,res)=>{
  res.render('about', {title: "about"})
})

// redirects
//blogs

app.get('/blogs',(req,res)=>{
  Blog.find().sort({createdAt: -1})
  .then((result)=>{
    res.render('index',{title: 'All Blogs', blogs: result})
  })
  .catch((err)=>console.log(err))
})
app.get('/blogs/create',(req,res)=>{
  res.render('create', {title: "blog"});
})

//post request
app.post('/blogs',(req,res)=>{
  const blog = new Blog(req.body);
  blog.save()
  .then((result)=>{
    res.redirect('/blogs');
  }).catch((err)=>{
    console.log(err)
  })
})


app.get('/blogs/:id',(req,res)=>{
  const id = req.params.id;
  Blog.findById(id)
  .then((result)=>{
    res.render('details',{blog:result, title: 'Blog Details'})
  })
  .catch(err=>{
    console.log(err)
  })
})

app.delete('/blogs/:id',(req,res)=>{
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
  .then((result)=>{
    res.json({
      redirect:'/blogs'
    })
  })
  .catch(err=>
    console.log(err)
  )
})
// 404 page similar to middleware
app.use((req,res)=>{
  res.status(404).render('404');

})