const { server } = require('./app')
const PORT = process.env.PORT || 1234
server.listen(PORT, ()=> console.log(`Server connected successfully at port ${PORT}....!!!`))