var express=require('express')
const { leaveRoom } = require('../../breakout_socket/breakout_socket/utils/users')
var app=express()
var bodyparser=require('body-parser')
const server=require('http').createServer(app)
const io=require('socket.io')(server,{cors:{origin:"*"}})
app.use(bodyparser.json())
var users=[]
var message=[]
var room=[]
var data={
    roomnumber:0,
    userss:users.length

}
var roomID=1

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:false}))
var fg={
    "data":users
}
function addmembers(data){
    users.push(data)

}
app.get('/',(req,res)=>{

    
    res.render("createrooms.ejs",{
        "titles":"titels",
        "data":room
    })
app.post('/add-members',(req,res)=>{
    var name=req.body.name
    users.push(name)
    console.log(name)
})
app.get('/:id',(req,res)=>{
    var a=req.params.id
    res.render('index.ejs',{
        "data":users
    })
    

})
app.post('/add',(req,res)=>{
    var name=req.body.name
    room.push(name)
    console.log(name)
    res.redirect(`/`)
})
    

    
})
app.get('/home',(req,res)=>{
    res.render("home.ejs")

})
server.listen(8001,()=>{
    console.log("server")
})
io.on("connection",(socket)=>{    
    const session = socket.request.session;
    //session.connections++;
    //session.save();
    console.log(session)                          
    
    console.log("Total users ",users.length)
    //users.(socket.id)
    console.log("user Added "+socket.id)
    socket.broadcast.emit("hi")
    socket.join("roomno: "+roomID)
    io.sockets.in("room-"+roomID).emit('connectToRoom', "You are in room no. "+roomID);
    console.log(roomID)

    socket.on('new-user',name=>{
        users[socket.id]=name
        socket.broadcast.emit("user-connected",name)

    })

    
  
    
    socket.on("new-user",(username)=>{
        //users.add(username)
        io.emit("useradded",[...users])
    })
    socket.on('create',(room)=>{
        socket.join(room)
        console.log(room)
    })


    //socket.on('message',(data)=>{
      //  socket.broadcast.emit('message',data)
        //console.log(data)
    //})
    socket.on('disconnect',(username)=>{                                      //when page refresh
        io.emit("disonnect",username)
        console.log("disconnected ",username)
    })
    socket.on('chat-message',(messages)=>{                            //store and display message
        
        io.emit("chat-message",messages)
        console.log(users[0])
        
    })
    socket.on('memberslist',(data)=>{
        io.emit('memberslist',data)
        console.log(data)
    })
    socket.on("room",()=>{
        console.log(Math.random())
        io.emit("roomID",Math.random())
    })
    //socket.on("ping",(count)=>{
      //  console.log(count)

    //})
    socket.on("username",(user)=>{
        console.log(user)
        io.emit("username",user)
    })
    socket.on("kill",(msg)=>{
        io.emit("kill",msg)
        
        
    })
    socket.on("list",(list)=>{
        io.emit(list)
        console.log(list)
        
    })
    

    
    
    


})






