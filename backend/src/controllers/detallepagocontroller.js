//import modelo

//import sociomodel from "../models/sociomodel.js"; 
//import {usuariomodel, sociomodel } from "../models/index.js"; 
 
//metodos crud

//mostrar todos los registros

const { response, request } = require('express');
const {pagomodel, rubromodel, detallepagomodel, sociomodel}= require('../models/index')

const getAlldetpago = async (req, res)=>{
    try {
        const detallespago = await detallepagomodel.findAll({
            include:[{
                model:pagomodel,
                required:true,
                include:[{
                    model: sociomodel
                }]
                
            },
            { 
            model: rubromodel,

            }],
        })
        res.json(detallespago)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

//mostrar un registro 
const getdetpago = async (req, res)=>{
    try {
        const detallepago= await detallepagomodel.findAll({
            where:{
                id:req.params.id
            },
            include:[{
                model:pagomodel,
                include:[{
                    model: sociomodel
                }]
               
            
            },
            { 
                model: rubromodel,
    
            }],
        })
        res.json(detallepago[0])
    } catch (error) {
        res.json({message: error.message})       
    }
}

//crear un registro

const createdetpago = async (req, res)=>{
    try {
        await detallepagomodel.create(req.body)
        res.json({
            "message": "Creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})       
    }
}

// actualizar un registro
const updatedetpago = async (req, res)=>{
    try {
        await detallepagomodel.update(req.body,{
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
const deletedetpago = async (req, res)=>{
    try {
        await detallepagomodel.destroy({
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
    createdetpago,
    getAlldetpago,
    getdetpago,
    updatedetpago,
    deletedetpago
}


