const { Sequelize, DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define(
        'posts', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            // instanceMethods: {
            //     toJSON: function () {
            //       var values = Object.assign({}, this.get());
            //       delete values.password;
            //       return {'foo':'bar'};
            //     }
            //   }
        },
        
    )

    return Post
}