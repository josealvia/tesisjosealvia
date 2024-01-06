//importar la conexion de base de datos

//import db from "../database/db.js";

//import {DataTypes} from "sequelize";

const {DataTypes} = require('sequelize')
const {db} = require ('../database/db')

const gastomodel = db.define('gastos',{
    //nombreusuario: {type: DataTypes.STRING},
    //contraseña: {type: DataTypes.STRING},
    //nombrecompleto: {type: DataTypes.STRING},
    //correo: {type: DataTypes.STRING},
    //telefono: {type: DataTypes.STRING},
    descripciongasto: {type: DataTypes.STRING},
    montogasto: {type: DataTypes.STRING},
    fechagasto: {type: DataTypes.STRING},
    idrubro: {type: DataTypes.INTEGER},
    idusuario: {type: DataTypes.INTEGER},
    
})
module.exports={
    gastomodel
}
    