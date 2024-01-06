
//importar la conexion de base de datos

//import db from "../database/db.js";

//import {DataTypes} from "sequelize";
//import sociomodel from "./sociomodel.js";
const {DataTypes} = require('sequelize')
const {db} = require ('../database/db')


const usuariomodel = db.define('usuarios',{
    //nombreusuario: {type: DataTypes.STRING},
    //contraseña: {type: DataTypes.STRING},
    //nombrecompleto: {type: DataTypes.STRING},
    //correo: {type: DataTypes.STRING},
    //telefono: {type: DataTypes.STRING},
    nombreusuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true},
    
    contraseñausuario: {type: DataTypes.STRING},
    nombrecompletousuario: {type: DataTypes.STRING},
    correousuario: {type: DataTypes.STRING},
    telefonousuario: {type: DataTypes.STRING},
})

//usuariomodel.hasMany(sociomodel,{foreignKey: "id"});


module.exports={
    usuariomodel
}    
