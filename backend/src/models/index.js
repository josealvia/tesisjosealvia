//import detallereunionmodel from './detallereunionmodel';
//import gastomodel from './gastomodel';
//import pagomodel from './pagomodel';
//import reunionmodel from './reunionmodel';
//import rubromodel from './rubromodel';
//import sociomodel from './sociomodel.js';
//import usuariomodel from './usuariomodel.js';


const {detallereunionmodel}= require('./detallereunionmodel');
const {gastomodel}= require('./gastomodel');
const {pagomodel}= require('./pagomodel');
const {reunionmodel}= require('./reunionmodel');
const {rubromodel}= require('./rubromodel');
const {sociomodel}= require('./sociomodel');
const {usuariomodel}= require('./usuariomodel');
const {detallepagomodel}= require('./detallepagomodel')
const {documentmodel}= require('./documentmodel');
const  {rolmodel} = require('./rolmodel');

usuariomodel.belongsTo(rolmodel,{foreignKey: "idrol"});
rolmodel.hasMany(usuariomodel,{foreignKey: "idrol"});

sociomodel.belongsTo(usuariomodel,{foreignKey:"idusuario"});
usuariomodel.hasMany(sociomodel,{foreignKey: "idusuario"});

gastomodel.belongsTo(usuariomodel,{foreignKey:"idusuario"});
usuariomodel.hasMany(gastomodel,{foreignKey:"idusuario"});

reunionmodel.belongsTo(usuariomodel,{foreignKey:"idusuario"});
usuariomodel.hasMany(reunionmodel,{foreignKey:"idusuario"});


pagomodel.belongsTo(sociomodel,{foreignKey:"idsocio"});
sociomodel.hasMany(pagomodel,{foreignKey:"idsocio"});

detallereunionmodel.belongsTo(sociomodel,{foreignKey:"idsocio"});
sociomodel.hasMany(detallereunionmodel,{foreignKey:"idsocio"});

gastomodel.belongsTo(rubromodel,{foreignKey:"idrubro"});
rubromodel.hasMany(gastomodel,{foreignKey:"idrubro"});



detallepagomodel.belongsTo(pagomodel,{foreignKey:"idpago"});
pagomodel.hasMany(detallepagomodel,{foreignKey:"idpago"});

detallepagomodel.belongsTo(rubromodel,{foreignKey:"idrubro"});
rubromodel.hasMany(detallepagomodel,{foreignKey:"idrubro"});

detallereunionmodel.belongsTo(reunionmodel,{foreignKey:"idreunion"});
reunionmodel.hasMany(detallereunionmodel,{foreignKey:"idreunion"});


module.exports={
    sociomodel,
    usuariomodel,
    detallereunionmodel,
    gastomodel,
    reunionmodel,
    rubromodel,
    pagomodel,
    documentmodel,
    detallepagomodel,
    rolmodel
    
}