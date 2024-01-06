

const {DataTypes} = require('sequelize')
const {db} = require ('../database/db')

const detallepagomodel = db.define('detalle_pagos',{
    cantidaddetalle: {type: DataTypes.DECIMAL},
    idpago: {type: DataTypes.INTEGER},
    idrubro: {type: DataTypes.INTEGER},
    
})
module.exports={
    detallepagomodel
}
    