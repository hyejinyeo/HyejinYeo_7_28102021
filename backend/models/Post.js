'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            models.Post.belongsTo(models.User, {
                foreignKey: 'user_id'
                // foreignKey: {
                //     allowNull: false
                // }, onDelete:'CASCADE',
            })
        }
        //   models.Post.hasMany(models.Comment);
        //   models.Post.hasMany(models.Like);
    }
    Post.init(
        {
            imageUrl: { type: DataTypes.STRING, allowNull: true },
            giphyUrl: { type: DataTypes.STRING, allowNull: true },
            link: { type: DataTypes.STRING, allowNull: true },
            message: { type: DataTypes.TEXT, allowNull: false },
            // user_id: { type: DataTypes.BIGINT, allowNull: false },
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    return Post;
};