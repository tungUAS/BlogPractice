var express = require('express');
var router = express.Router();
const postController = require('../controller/post.controller')

router.get('/getPosts',postController.getAllBlogPosts);

router.get('/getPostsByCat',postController.getBlogPostsByCat);

module.exports = router;
