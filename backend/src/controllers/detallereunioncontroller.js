//import modelo

//import sociomodel from "../models/sociomodel.js"; 
//import {usuariomodel, sociomodel } from "../models/index.js"; 
 
//metodos crud

//mostrar todos los registros

const { response, request } = require('express');
const {detallereunionmodel, sociomodel, reunionmodel}= require('../models/index')

const getAlldetreunion = async (req, res)=>{
    try {
        const detallesreunion = await detallereunionmodel.findAll({
            include:[{
                model:sociomodel,
                required:true,
                
            },
            { 
            model: reunionmodel,

            }],
        })
        res.json(detallesreunion)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

//mostrar un registro 
const getdetreunion = async (req, res)=>{
    try {
        const detallereunion= await detallereunionmodel.findAll({
            where:{
                id:req.params.id
            },
            include:[{
                model:sociomodel,
               
            
            },
            { 
                model: reunionmodel,
    
            }],
        })
        res.json(detallereunion[0])
    } catch (error) {
        res.json({message: error.message})       
    }
}

//crear un registro

const createdetreunion = async (req, res)=>{
    try {
        await detallereunionmodel.create(req.body)
        res.json({
            "message": "Creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})       
    }
}

// actualizar un registro
const updatedetreunion = async (req, res)=>{
    try {
        await detallereunionmodel.update(req.body,{
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
const deletedetreunion = async (req, res)=>{
    try {
        await detallereunionmodel.destroy({
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
    createdetreunion,
    deletedetreunion,
    getAlldetreunion,
    getdetreunion,
    updatedetreunion
}


