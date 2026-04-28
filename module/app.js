
const http=require('http');



const PORT=3006

http.createServer(function(req,res){
    res.write("<h1>hello welcome to Nodejs</h1>")
    res.end()
}).listen(PORT,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("server is running on port",`http://localhost:${PORT}`);
    }

})