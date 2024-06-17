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

    const User = sequelize.define(
        'User',
        {
          // Model attributes are defined here
          firstName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
          },
        },
        {
          // Other model options go here
        },
      );
    
})

server.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
})

server.on('close', () => {
    sequelize.close()
}) 