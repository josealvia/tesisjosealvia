//importar la conexion de base de datos

//import db from "../database/db.js";

//import {DataTypes} from "sequelize";

const {DataTypes} = require('sequelize')
const {db} = require ('../database/db')

const pagomodel = db.define('pagos',{
    //nombreusuario: {type: DataTypes.STRING},
    //contraseña: {type: DataTypes.STRING},
    //nombrecompleto: {type: DataTypes.STRING},
    //correo: {type: DataTypes.STRING},
    //telefono: {type: DataTypes.STRING},
    cantidadpago: {type: DataTypes.DECIMAL},
    fechapago: {type: DataTypes.STRING},
    estadopago: {type: DataTypes.BOOLEAN},
    idsocio: {type: DataTypes.INTEGER},  
})
module.exports={
    pagomodel
}
   
