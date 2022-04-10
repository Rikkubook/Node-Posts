const http = require("http");
const Room = require("./models/room")
const mongoose = require('mongoose');

// 連接資料庫
mongoose.connect('mongodb+srv://rikkubook:rikku0305@cluster0.a15er.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
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
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS,DELETE'}

    let body = ''
    req.on('data', chunk =>{
      body+=chunk;
    })

      if(req.url =="/rooms" && req.method=="GET"){ //取得
        const rooms = await Room.find(); 
        res.writeHead(200, header)
        res.write(JSON.stringify({
          "status": "success",
          rooms
        }))
        res.end()
      }else if( req.url =="/rooms" && req.method=="POST"){
        req.on('end', async()=>{
          try{
            const data =JSON.parse(body);
            const newRoom = await Room.create( // 不產生新的實體
              {
                name: data.name,
                price: data.price,
                rating: data.rating,
              })
            res.writeHead(200, header)
            res.write(JSON.stringify({
              "status": "success",
              rooms: newRoom
            }))
            res.end()
          }catch(error){
            res.writeHead(400,header)
            res.write(JSON.stringify({
              "status": "false",
              "message": "欄位沒有正確，或沒有此ID",
              "error": error
            }))
            console.log(error)
            res.end()
          }
        })
      }else if( req.url =="/rooms" && req.method=="DELETE"){
        await Room.deleteMany({});
        res.writeHead(200, header)
        res.write(JSON.stringify({
          "status": "success",
          rooms: []
        }))
        res.end()
      }else if( req.url.startsWith('/rooms/') && req.method == 'DELETE'){
        const rooms = await Room.find(); 
        const id = req.url.split('/').pop();
        Room.findByIdAndDelete(id)
        .then(()=>{
          res.writeHead(200, header)
          res.write(JSON.stringify({
            "status": "success",
            rooms
          }))
          res.end()
        }).catch((error)=>{
          res.writeHead(400,header)
          res.write(JSON.stringify({
            "status": "false",
            "message": "欄位沒有正確，或沒有此ID",
            "error": error
          }))
          res.end()
        })
      }else if( req.url.startsWith('/rooms/') && req.method == 'PATCH'){
        const id = req.url.split('/').pop();
        req.on('end',async ()=>{ // 打進來的資料 確保組好了 body的資料
            const rooms = await Room.find(); 
            const data =JSON.parse(body);
            Room.findByIdAndUpdate(id, data)
            .then(()=>{
              res.writeHead(200, header)
              res.write(JSON.stringify({
                "status": "success",
                rooms
              }))
              res.end()
            }).catch((error)=>{
              console.log(error)
              res.writeHead(400,header)
              res.write(JSON.stringify({
                "status": "false",
                "message": "欄位沒有正確，或沒有此ID",
                "error": error
              }))
              res.end()
            })
        })
      }
      else if(req.method == "OPTIONS"){
        res.writeHead(200,header);
        res.end();
      }else{
        res.writeHead(400,header)
        res.write(JSON.stringify({
          "status": "false",
          "message": "無此路由",
          "error": error
        }))
        console.log(error)
        res.end()
      }
}
const server = http.createServer(requestListener);
server.listen(3005,()=>{
  console.log("Server is running on port 3005");
});