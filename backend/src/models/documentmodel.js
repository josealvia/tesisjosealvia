const {DataTypes} = require('sequelize')
const {db} = require ('../database/db')


const documentmodel = db.define('documents',{
   
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

module.exports={
    documentmodel
}
