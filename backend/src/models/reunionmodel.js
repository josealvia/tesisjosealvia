
const {DataTypes} = require('sequelize')
const {db} = require ('../database/db')

const reunionmodel = db.define('reuniones',{
    seccionreunion: {type: DataTypes.STRING},
    descripcionreunion: {type: DataTypes.STRING},
    fechareunion: {type: DataTypes.DATE},
    asistenciatomada: {type: DataTypes.BOOLEAN},
    lugarreunion: {type: DataTypes.STRING},
    idusuario: {type: DataTypes.INTEGER},
})
module.exports={
    reunionmodel
}
    