'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            models.Post.belongsTo(models.User, {
                foreignKey: 'user_id',
                // onDelete:'CASCADE',
            }),
            models.Post.hasMany(models.Like, { foreignKey: 'post_id' });
            //   models.Post.hasMany(models.Comment);
        }
        
        
    }
    Post.init(
        {
            imageUrl: { type: DataTypes.STRING, allowNull: true },
            giphyUrl: { type: DataTypes.STRING, allowNull: true },
            link: { type: DataTypes.STRING, allowNull: true },
            message: { type: DataTypes.TEXT, allowNull: false },
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    return Post;
};