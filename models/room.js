const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
      name: String,
      price:{
          type: Number,
          required: [true,"價格必填"]
      },
      rating: Number,
      createAt:{
        type: Date,
        default: Date.now,
        select: false
      }
    },
    {
      versionKey: false, // __v: 引藏
      //collection: 'room' ,// 指定資料夾名稱 此時就不會管 model('Room') 的名稱
    }
  )

const Room =mongoose.model('Room',roomSchema) // 單數 Room->rooms

module.exports = Room;