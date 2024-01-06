/*const {usuariomodel}= require ('../models/index')
const { response, request } = require('express');

const existeEmail = async(req, res)=>{
    try {
        const result = await usuariomodel.findOne({
            where:{correousuario:req.paramscorreousuario}
        });
        if (!result ==null){
            throw new Error ('El correo ya existe'+result);
        }
        
    } catch (error) {
        
    }
    //const result = await usuariomodel.findOne(req.body,{where:
    //{correousuario:req.paramscorreousuario}});
    //if(!result == null){
     //   throw new Error ('El correo ya existe'+result);
    //}
};

const existeUsuario = async (req)=>{
    const result = await usuariomodel.findOne(req.body,{where:{
        nombreusuario:req.params.nombreusuario,
        activo : 1
    }});
    if(result ==null){
        throw new Error (' usuario ya existe');
    }
}

module.exports ={
    existeEmail,
    existeUsuario
};*/