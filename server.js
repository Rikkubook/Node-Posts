const express =require('express');
const app =express();
const bodyParser = require('body-parser'); //接收POST JSON內容

//管理Router
const postsRouter = require('./routes/posts'); 

const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});


const DB =  process.env.DATABASE_Cloud.replace('<password>',process.env.DATABASE_PASSWORD)
// 連接資料庫
mongoose.connect(DB)
.then(()=>{
  console.log('資料庫連線成功')
}).catch((error)=>{
  console.log(error)
})

// 中間層
  app.use(bodyParser.urlencoded({extended:true})); 
  app.use(bodyParser.json())
// 路由
  app.use('/posts', postsRouter);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log( `Server is running on port ${process.env.PORT}`)
});
