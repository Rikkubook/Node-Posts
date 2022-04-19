const express = require('express');
const router = express.Router();
const { successHandler, errorHandler } = require('../handler');
const Post = require("../models/posts")

router.get('/',async (req, res) => {
  const posts = await Post.find({}); 
  successHandler(res,posts)
})
router.post('/',async (req, res) => {
  try{
    const data = req.body
    const newPost = await Post.create(
      {
        name: data.name,
        image: data.image,
        content: data.content,
        likes: data.likes,
        comments: data.comments,
        createdAt: data.createdAt,
        type: data.type,
        tags: data.tags,
      })
    successHandler(res, newPost);
  }catch(error){
    errorHandler(res, error , 400)
  }
})
router.delete('/',async (req, res) => {
  await Post.deleteMany({});
  successHandler(res,[])
})
router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Post.findByIdAndDelete(id)
  .then(async()=>{
    const posts = await Post.find()
    successHandler(res,posts)
  }).catch((error)=>{
    errorHandler(res, error , 400)
  })
})
router.patch('/:id', (req, res) => {
  const id = req.params.id
  const data = req.body
  console.log(data)
  Post.findByIdAndUpdate(id, data)
  .then(async()=>{
    const posts = await Post.find(); 
    successHandler(res,posts)
  }).catch((error)=>{
    errorHandler(res, error , 400)
  })
})

module.exports = router;