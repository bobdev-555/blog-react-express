const express = require('express')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const validateToken = require('./middlewares/validateToken')

const app = express()

dotenv.config()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

require('./routes/user.routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`)
})

const db = require('./models')

db.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
  });

app.post("/user/generateToken", (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
    const token = jwt.sign(data, jwtSecretKey);
    res.send(token);
});


app.use(validateToken)

app.get("/user/validateToken", (req, res) => {
    res.send("Successfully Verified");
});


app.get('/', async (req, res) => {
    res.json({ message: "Welcome to postgresql application" })
})

app.on('close', () => {
    sequelize.close()
})