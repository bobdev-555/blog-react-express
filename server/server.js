const { createServer } = require('http')
const { Sequelize } = require('sequelize')
const PORT=8000

const sequelize = new Sequelize('blogposts', 'postgres', 'asd', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate()
    .then(() => {
        console.log("It's connected to Database");
    })
    .catch(() => {
        console.log("An error occured")
    })

const server = new createServer((req, res) => {
    
})

server.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
})

server.on('close', () => {
    sequelize.close()
}) 