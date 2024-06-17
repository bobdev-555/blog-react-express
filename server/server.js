const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('blogposts', 'postgres', 'asd', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("An error occured in connection")
    })


const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: "Welcome to postgresql application" })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`)
})

app.on('close', () => {
    sequelize.close()
})