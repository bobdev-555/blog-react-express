const { Sequelize, DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        'users', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
            timestamps: false,
            instanceMethods: {
                toJSON: function () {
                  var values = Object.assign({}, this.get());
                  delete values.password;
                  return {'foo':'bar'};
                }
              }
        },
        
    )

    return User
}