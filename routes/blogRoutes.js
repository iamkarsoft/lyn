const express = require('express');
const router = express.Router();
const Blog = require('./../models/blog');

// get all blog post
router.get('/',(req,res)=>{
  Blog.find().sort({createdAt: -1})
  .then((result)=>{
    res.render('index',{title: 'All Blogs', blogs: result})
  })
  .catch((err)=>console.log(err))
})

// show create form
router.get('/create',(req,res)=>{
  res.render('create', {title: "blog"});
})

//create new post
router.post('/',(req,res)=>{
  const blog = new Blog(req.body);
  blog.save()
  .then((result)=>{
    res.redirect('/blogs');
  }).catch((err)=>{
    console.log(err)
  })
})

// show single blog
router.get('/:id',(req,res)=>{
  const id = req.params.id;
  Blog.findById(id)
  .then((result)=>{
    res.render('details',{blog: result, title: 'Blog Details'})
  })
  .catch(err=>{
    console.log(err)
  })
})

// delete blog
router.delete('/:id',(req,res)=>{
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
  .then((result)=>{
    res.json({
      redirect: '/blogs'
    });
  })
  .catch(err=>
    console.log(err)
  )
})

module.exports = router;