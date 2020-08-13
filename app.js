const express = require('express');
const morgan = require('morgan');

const DBURI = mongodb+srv://kofiramos:<password>@lyn.4lpm6.mongodb.net/<dbname>?retryWrites=true&w=majority;


// express app
const app = express();

// register view engine
app.set('view engine','ejs')
// app.set('views', 'views')
// listen for equests

app.listen(4500);

// middleware and assets
app.use(express.static('public'))

//middleware
app.use(morgan('dev'));

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

// 404 page similar to middleware
app.use((req,res)=>{
  res.status(404).render('404');

})