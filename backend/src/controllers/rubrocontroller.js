//import modelo

//import usuariomodel from "../models/usuariomodel.js";

//metodos crud

//mostrar todos los registros

const {response, request} = require('express');
const {rubromodel}= require('../models/index')

const getAllrubro = async (req, res)=>{
    try {
        const rubros= await rubromodel.findAll()
        res.json(rubros)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

//mostrar un registro 
const getrubro = async (req, res)=>{
    try {
        const rubro= await rubromodel.findAll({
            where:{id:req.params.id}
        })
        res.json(rubro[0])
    } catch (error) {
        res.json({message: error.message})       
    }
}

//crear un registro

const createrubro = async (req, res)=>{
    try {
        await rubromodel.create(req.body)
        res.json({
            "message": "Creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})       
    }
}

// actualizar un registro
const updaterubro = async (req, res)=>{
    try {
        await rubromodel.update(req.body,{
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
const deleterubro = async (req, res)=>{
    try {
        await rubromodel.destroy({
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
    createrubro,
    deleterubro,
    getAllrubro,
    getrubro,
    updaterubro
}



