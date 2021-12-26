'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            models.Like.belongsTo(models.User, {
                foreignKey: 'user_id'
            }),
            models.Like.belongsTo(models.Post, {
                foreignKey: 'post_id'
            })
        }
    }
    Like.init(
        {
            user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'id'} },
            post_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Post', key: 'id'} }
        },
        {
            sequelize,
            modelName: 'Like',
        }
    );
    return Like;
};