const { createServer } = require('http')
const { Sequelize } = require('sequelize')
const PORT=8000

const sequelize = new Sequelize('blogposts', 'postgres', 'asd', {
    host: 'localhost',
    dialect: 'postgres'
})

try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database: ', error)
}

const server = new createServer((req, res) => {

})

server.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
})

server.on('close', () => {
    sequelize.close()
}) 