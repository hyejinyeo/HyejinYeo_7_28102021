'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            models.Like.belongsTo(models.User, {
                foreignKey: 'user_id'
                // foreignKey: {
                //     allowNull: false
                // }, onDelete:'CASCADE',
            }),
            models.Like.belongsTo(models.Post, {
                foreignKey: 'post_id'
                // foreignKey: {
                //     allowNull: false,   
                // }, onDelete:'CASCADE',
            })
        }
    }
    Like.init(
        {
            user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'id'} },
            post_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Post', key: 'id'} }
            // id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
            // user_id: { type: DataTypes.INTEGER, allowNull: false },
            // post_id: { type: DataTypes.INTEGER, allowNull: false }
        },
        {
            sequelize,
            modelName: 'Like',
        }
    );
    return Like;
};