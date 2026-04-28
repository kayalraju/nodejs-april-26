
const fs=require('fs');

const path=require('path');




//console.log(path);

const path1=path.join(__dirname,'test.txt');
console.log(path1);





//create file
// fs.writeFile('test.txt','hello welcome to webslkitters',function(error){

//     if(error){
//         console.log(error);
        
//     }else{
//         console.log('file creted successfully');
        
//     }

// })


// //read file
// fs.readFile('test.txt','utf-8',function(error,data){
//     if(error){
//         console.log(error);
        
//     }else{
//         console.log(data);
        
//     }
// })   


//update file


// fs.appendFile('test.txt',' my name is raju',function(error){

//     if(error){
//         console.log(error);
        
//     }else{
//         console.log('file updated successfully');
        
//     }
// })
//delete file 