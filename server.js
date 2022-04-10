const http = require("http");
const Room = require("./models/room")
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});

const { SuccessHandler, ErrorHandler } = require('./resHandle');

const DB =  process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)
// 連接資料庫
mongoose.connect(DB)
.then(()=>{
  console.log('資料庫連線成功')
}).catch((error)=>{
  console.log(error)
})
  //連到資料庫名稱



const requestListener =async (req,res) => {
  const header = {
    'Content-Type': 'application/json' ,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS,DELETE'
  }

    let body = ''
    req.on('data', chunk =>{
      body+=chunk;
    })

      if(req.url =="/rooms" && req.method=="GET"){ //取得
        const rooms = await Room.find(); 
        SuccessHandler(res,rooms)
      }else if( req.url =="/rooms" && req.method=="POST"){
        req.on('end', async()=>{
          try{
            const data =JSON.parse(body);
            const newRoom = await Room.create(
              {
                name: data.name,
                price: data.price,
                rating: data.rating,
              })
            SuccessHandler(res,newRoom)
          }catch(error){
            ErrorHandler(res, error , 400)
          }
        })
      }else if( req.url =="/rooms" && req.method=="DELETE"){
        await Room.deleteMany({});
        SuccessHandler(res,[])
      }else if( req.url.startsWith('/rooms/') && req.method == 'DELETE'){
        const rooms = await Room.find(); 
        const id = req.url.split('/').pop();
        Room.findByIdAndDelete(id)
        .then(()=>{
          SuccessHandler(res,rooms)
        }).catch((error)=>{
          ErrorHandler(res, error , 400)
        })
      }else if( req.url.startsWith('/rooms/') && req.method == 'PATCH'){
        const id = req.url.split('/').pop();
        req.on('end',async ()=>{ // 打進來的資料 確保組好了 body的資料
            const data =JSON.parse(body);
            Room.findByIdAndUpdate(id, data)
            .then(async()=>{
              const rooms = await Room.find(); 
              SuccessHandler(res,rooms)
            }).catch((error)=>{
              ErrorHandler(res, error , 400)
            })
        })
      }
      else if(req.method == "OPTIONS"){
        SuccessHandler(res,null)
      }else{
        ErrorHandler(res,{},400)
      }
}
const server = http.createServer(requestListener);
server.listen(process.env.PORT,()=>{
  console.log(  `Server is running on port ${process.env.PORT}`);
});