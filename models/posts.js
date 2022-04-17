const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema(
  {
      name: {
        type: String,
        required: [true,"名稱必填"]
      },
      image: String,
      content: {
        type: String,
        required: [true,"內文必填"]
      },
      likes: {
        type: Number,
        default: 0
      },
      comments: Number,
      createAt: {
        type: Date,
        default: Date.now,
        select: false
      },
      type: {
        type: Array,
        required: [true,"屬性必填"]
      },
      tags: Array
    },
    {
      versionKey: false, // __v: 引藏
    }
  )

const Post =mongoose.model('Post',postsSchema) // 單數 Room->rooms

module.exports = Post;