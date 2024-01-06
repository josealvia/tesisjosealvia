
//importar la conexion de base de datos

//import db from "../database/db.js";

//import {DataTypes} from "sequelize";
const {DataTypes} = require('sequelize')
const {db} = require ('../database/db')

const rubromodel = db.define('rubros',{
    //nombreusuario: {type: DataTypes.STRING},
    //contraseña: {type: DataTypes.STRING},
    //nombrecompleto: {type: DataTypes.STRING},
    //correo: {type: DataTypes.STRING},
    //telefono: {type: DataTypes.STRING},
    nombrerubro: {type: DataTypes.STRING},
    totalrubro: {type: DataTypes.DECIMAL},
})
module.exports={
    rubromodel
}