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
        //   models.Post.hasMany(models.Comment);
        //   models.Post.hasMany(models.Like);
    }
    Like.init(
        {
        },
        {
            sequelize,
            modelName: 'Like',
        }
    );
    return Like;
};