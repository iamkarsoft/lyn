const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine','ejs')
// app.set('views', 'views')
// listen for equests

app.listen(4500);


//routes
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

// 404 page
app.use((req,res)=>{
  res.status(404).render('404');

})