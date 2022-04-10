const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema(
  {
      name: String,
      image: String,
      content: {
          type: String,
      },
      likes: Number,
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