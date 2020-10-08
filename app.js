const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const passport = require('passport')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require("path")
dotenv.config()
const db = require('./db')
db.connect().then((res)=>{console.log(res)})
require('./utils/passport')
require('./utils/razorpay')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const { addUser, removeUser, getUser, getUsersInRoom, checkCurrentUser } = require('./users');
const Players = require('./models/Player')
const Management = require('./models/Management')
app.use(express.json())
app.use(passport.initialize())
app.use(cors())
app.use(function(_, res, next){
    res.setHeader('Access-Control-Allow-Origin' , '*')
    res.setHeader('Access-Control-Allow-Methods' , 'GET, POST, PUT, PATCH, OPTIONS ,DELETE')
    res.setHeader('Access-Control-Allow-Headers' , 'X-Requested-With, content-type, Authorization, XMLHttpRequest')
    res.setHeader('Access-Control-Allow-Credentials' , 'true')
    next()
})

app.use(require('./routers/apiRoutes/adminApiRoutes'))
app.use(require('./routers/apiRoutes/commonApiRoutes'))
app.use(require('./routers/apiRoutes/userApiRoutes'))
app.use(require('./routers/normalRoutes/userNormalRoutes'))
app.use(require('./routers/apiRoutes/productApiRoutes'))
app.use(require('./routers/apiRoutes/orderApiRoutes'))
app.use(require('./routers/apiRoutes/managerApiRoutes'))
app.use(require('./routers/apiRoutes/scheduleApiRoutes'))
app.use(require('./routers/normalRoutes/scheduleNormalRoute'))
app.use(require('./routers/apiRoutes/cartApiRoutes'))
app.use(require('./routers/normalRoutes/cartNormalRoutes'))
app.use(require('./routers/normalRoutes/productNormaiRoutes'))
app.use(require('./routers/apiRoutes/pendingOrderApiRoute'))
app.use(require('./routers/apiRoutes/playerApiRoutes'))
app.use(require('./routers/normalRoutes/playerNormalRoutes'))
app.use(require('./routers/normalRoutes/managementNormalRoutes'))
app.use(require('./routers/apiRoutes/hallOfFameApiRoutes'))
app.use(require('./routers/normalRoutes/hofNormalRoutes'))
app.use(require('./routers/apiRoutes/reviewApiRoutes'))
app.use(require('./routers/normalRoutes/reviewNormalRoutes'))


// app.get('/', (_, res)=>{res.status(200).json({Greetings: 'Welcome to Sports-Villa....!!!!!!!' })})

io.on('connection' , (socket)=>{
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if(error) return callback(error);
        
        Players.find({}).then(players =>{
            socket.emit('players', {players})
        })
        
        Players.findOne({currentAuction: true}).then(players =>{
            socket.emit('currentplayers', {players})
        })
        
        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `Hey ${user.name}, welcome to Auction.`});
        
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        
        socket.on('AuctionState',(_, callback)=>{
            io.to(user.room).emit('currentplayers', { players: null });
            callback()
        })
        
        socket.on('newAuctionState',(_, callback)=>{
            Players.findOne({currentAuction: true}).then(players =>{
                io.to(user.room).emit('currentplayers', { players });
            })  
            callback()
        })
        
        socket.on('currentBid',({soldPrice, teamId, playerId}, callback)=>{
            let team
            Management.findOne({_id: teamId }).then(m=>{
                team = m.teamName
                Players.updateOne({_id: playerId},{$set: {soldPrice, soldTeam: teamId, soldTeamName: team}}).then(u=>{
                    Players.findOne({currentAuction: true}).then(play =>{
                        if(play){
                            io.to(user.room).emit('currentplayers', {players: play})
                        }else{
                            socket.emit('trialError', {message: 'PLEASE USE YOUR CURRENT TAB FOR AUCTION'})
                        }
                    })
                })
            })
                callback()
            })
        
        let t
        
        socket.on('Timer',({timer}, callback)=>{
            t = timer
            callback()
        })
        
        setInterval(()=>{
            if(t <= 180 && t >= 0){
                io.to(user.room).emit('displayTimer', {tier: t})
                t = t-1
            }
        }, 1000)
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        if(user){
            io.to(user.room).emit('message', { user: user.name, text: message });
        }else{
            socket.emit('trialError', {message: 'PLEASE USE YOUR CURRENT TAB FOR AUCTION'})
        }
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
})
if(process.env.NODE_ENV === "production"){
    console.log(process.env.NODE_ENV)
    app.use(express.static(path.resolve(__dirname, "client", "build")))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

module.exports = {
    server
}