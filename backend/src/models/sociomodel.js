
const {DataTypes} = require('sequelize')
const {db} = require ('../database/db')

const sociomodel = db.define('socios',{
    cedulasocio: {type: DataTypes.STRING, unique:true},
    nombresocio: {type: DataTypes.STRING},
    apellidosocio: {type: DataTypes.STRING},
    direccionsocio: {type: DataTypes.STRING},
    telefonosocio: {type: DataTypes.STRING},
    correosocio: {type: DataTypes.STRING},
    idusuario: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
})


module.exports={
    sociomodel
}
    