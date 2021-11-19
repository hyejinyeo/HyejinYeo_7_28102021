/* ------------------------------------------------------------------------------------------------- */
// 'use strict';

// const { Model } = require('sequelize');

// module.exports = (sequelize, Datatypes) => {
//     class User extends Model {
//         static associate(models) {
//             models.User.hasMany(models.Post);
//             models.User.hasMany(models.Like);
//             models.User.hasMany(models.Comment);
//         }
//     }
//     User.init({

//     })
// }

/* ------------------------------------------------------------------------------------------------- */

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        lastName: Sequelize.STRING,
        firstName: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        isAdmin: Sequelize.TINYINT
      })
  
    return User;
};


/* ------------------------------------------------------------------------------------------------- */