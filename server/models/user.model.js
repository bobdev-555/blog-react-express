const { Sequelize, DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        'users', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true,
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

    return User
}