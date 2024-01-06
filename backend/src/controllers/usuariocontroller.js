//import modelo

//import usuariomodel from "../models/usuariomodel.js";

//metodos crud

//mostrar todos los registros

const {response, request} = require('express');
const {usuariomodel, rolmodel}= require('../models/index')

const getAlluser = async (req, res)=>{
    try {
        const usuarios= await usuariomodel.findAll({
            include: rolmodel
        })
        res.json(usuarios)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

//mostrar un registro 
const getuser = async (req, res)=>{
    try {
        const usuario= await usuariomodel.findAll({
            
            where:{id:req.params.id,  },
            include: rolmodel
        })
        res.json(usuario[0])
    } catch (error) {
        res.json({message: error.message})       
    }
}

//crear un registro

const createuser = async (req, res)=>{
    try {
        await usuariomodel.create(req.body)
        res.json({
            "message": "Creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})       
    }
}

// actualizar un registro
const updateuser = async (req, res)=>{
    try {
        await usuariomodel.update(req.body,{
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
const deleteuser = async (req, res)=>{
    try {
        await usuariomodel.destroy({
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
    createuser,
    deleteuser,
    getAlluser,
    getuser,
    updateuser
}



