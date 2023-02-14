var mongo=require('mongodb').MongoClient

mongo.connect('mongodb://127.0.0.1:27017/test?socketTimeoutMS=90000',(err,res)=>{
    if(err) throw err
    console.log(res)
})