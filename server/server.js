const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')

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


const User = sequelize.define(
    'users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            defaultValueL: 1,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false
    },
)

User.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.json({ message: "Welcome to postgresql application" })
    const jane = await User.create({name: 'Sfdd', password: 'asdascasx' });
    console.log("Jane's auto-generated ID:", jane.id);
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`)
})

app.on('close', () => {
    sequelize.close()
})