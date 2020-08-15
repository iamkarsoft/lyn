const Blog = require('./../models/blog');


// all blog post
const blog_index = (req,res)=>{
Blog.find().sort({createdAt: -1})
  .then((result)=>{
    res.render('index',{title: 'All Blogs', blogs: result})
  })
  .catch((err)=>console.log(err));
}

// create form
const blog_create = (req,res)=>{
   res.render('create', {title: "blog"});
}

// post blog

const blog_post = (req,res)=>{
    const blog = new Blog(req.body);
  blog.save()
  .then((result)=>{
    res.redirect('/blogs');
  }).catch((err)=>{
    console.log(err)
  })
}

// blog details
const blog_details = (req,res)=>{
    const id = req.params.id;
  Blog.findById(id)
  .then((result)=>{
    res.render('details',{blog: result, title: 'Blog Details'})
  })
  .catch(err=>{
    console.log(err)
  })
}

// blog delete
const blog_delete = (req,res)=>{
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
}


module.exports = {
  blog_index,
  blog_create,
  blog_post,
  blog_details,
  blog_delete
}