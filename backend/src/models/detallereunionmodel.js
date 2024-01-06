

const {DataTypes} = require('sequelize')
const {db} = require ('../database/db')

const detallereunionmodel = db.define('detalle_reuniones',{
    asistencia: {type: DataTypes.BOOLEAN},
    idsocio: {type: DataTypes.INTEGER},
    idreunion: {type: DataTypes.INTEGER},
    
})
module.exports={
    detallereunionmodel
}
    