const express = require('express');
const router = express.Router();


// controllers
const blogController = require('../controllers/blogController');

// get all blog post
router.get('/',blogController.blog_index)

// show create form
router.get('/create',blogController.blog_create);

//create new post
router.post('/', blogController.blog_post)

// show single blog
router.get('/:id',blogController.blog_details)


// delete blog
router.delete('/:id',blogController.blog_delete)

module.exports = router;