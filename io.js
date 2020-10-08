const { io } = require('./app')
console.log(io)
module.exports = {
    socket(socket){
    console.log('Connection Enabled')
    
    }
}
