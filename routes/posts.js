const express = require('express');
const router = express.Router();
const { successHandler, errorHandler } = require('../handler');
const Post = require("../models/posts")

router.get('/',async (req, res) => {
  try{
    const posts = await Post.find({}); 
    successHandler(res,posts)
  }catch(error){
    errorHandler(res, error , 400)
  }

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
  try{
    await Post.deleteMany({});
    successHandler(res,[])
  }catch(error){
    errorHandler(res, error , 400)
  }
})

router.delete('/:id', (req, res) => {
  try{
    const id = req.params.id
    console.log(id)
    Post.findByIdAndDelete(id)
    .then(async()=>{
      const posts = await Post.find()
      successHandler(res,posts)
    }).catch((error)=>{
      throw error
    })
  }catch(error){
    errorHandler(res, error , 400)
  }

})

router.patch('/:id', (req, res) => {
  try{
    const id = req.params.id
    const data = req.body
    console.log(data)
    Post.findByIdAndUpdate(id, data)
    .then(async()=>{
      const posts = await Post.find(); 
      successHandler(res,posts)
    }).catch((error)=>{
      throw error
    })
  }catch(error){
    errorHandler(res, error , 400)
  }
})

module.exports = router;