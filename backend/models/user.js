/* ------------------------------------------------------------------------------------------------- */
// 'use strict';

// const { Model } = require('sequelize');

// module.exports = (sequelize, Datatypes) => {
//     sequelize.define('User', {
//         lastName: Sequelize.STRING,
//         firstName: Sequelize.STRING,
//         email: Sequelize.STRING, 
//         password: Sequelize.STRING,
//         isAdmin: Sequelize.TINYINT

//     })
// }

/* ------------------------------------------------------------------------------------------------- */
// Worked well - sequelize tuto 



module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        lastName: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        photo: { type: DataTypes.STRING, allowNull: true },
        isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, default: false }
    })
  
    return User;
};


/* ------------------------------------------------------------------------------------------------- */


// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//     class User extends Model {
//         static associate(models) {
//             // define association here
//         }
//     };
//     User.init(
//         {
//             lastname: { type: DataTypes.STRING, allowNull:false },
//             firstname: { type: DataTypes.STRING, allowNull:false },
//             email: { type: DataTypes.STRING, allowNull: false, unique: true },
//             password: { type: DataTypes.STRING, allowNull: false },
//             photo: { type: DataTypes.STRING, allowNull: true },
//             isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
//         },
//         {
//             sequelize, modelName: "User"
//         }
    
//     );
//     return User;

// };