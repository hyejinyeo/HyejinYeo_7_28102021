'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            models.Comment.belongsTo(models.User, { foreignKey: 'user_id' }),
            models.Comment.belongsTo(models.Post, { foreignKey: 'post_id' })
        }
    }
    Comment.init(
        {
            message: { type: DataTypes.TEXT, allowNull: false }, 
            user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'id'} },
            post_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Post', key: 'id'} }
        },
        {
            sequelize,
            modelName: 'Comment',
        }
    );
    return Comment;
};