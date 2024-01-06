//import modelo

//import sociomodel from "../models/sociomodel.js"; 
//import {usuariomodel, sociomodel } from "../models/index.js"; 
 
//metodos crud

//mostrar todos los registros

const { response, request } = require('express');
const {sociomodel,usuariomodel}= require('../models/index')



const getAllsocio = async (req, res)=>{
    try {
        const socios = await sociomodel.findAll({
            include:[{
                model:usuariomodel,
                attributes: ["nombreusuario"]}],
            
        })
        res.json(socios)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

//mostrar un registro 
const getsocio = async (req, res)=>{
    try {
        const socio= await sociomodel.findAll({
            where:{
                id:req.params.id
            },
            include:[{
                model:usuariomodel,
           
            }],
            
        })
        res.json(socio[0])
    } catch (error) {
        res.json({message: error.message})       
    }
}

//crear un registro

const createsocio = async (req, res)=>{
    try {
        await sociomodel.create(req.body)
        res.json({
            "message": "Creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})       
    }
}

// actualizar un registro
const updatesocio = async (req, res)=>{
    try {
        await sociomodel.update(req.body,{
            where:{ id: req.params.id}

        })
        res.json({
            "message":"Editado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
        
    }
}


//eliminar un registro
const deletesocio = async (req, res)=>{
    try {
        await sociomodel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message": "Eliminado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
        
    }
};



module.exports={
    createsocio,
    deletesocio,
    getAllsocio,
    getsocio,
    updatesocio,
    
    
   
}



