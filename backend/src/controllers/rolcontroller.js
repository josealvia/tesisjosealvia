//import modelo

//import usuariomodel from "../models/usuariomodel.js";

//metodos crud

//mostrar todos los registros

const {response, request} = require('express');
const {rolmodel}= require('../models/index')

const getAllrol = async (req, res)=>{
    try {
        const roles= await rolmodel.findAll()
        res.json(roles)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

//mostrar un registro 
const getrol = async (req, res)=>{
    try {
        const rol= await rolmodel.findAll({
            where:{id:req.params.id}
        })
        res.json(rol[0])
    } catch (error) {
        res.json({message: error.message})       
    }
}

//crear un registro

const createrol = async (req, res)=>{
    try {
        await rolmodel.create(req.body)
        res.json({
            "message": "Creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})       
    }
}

// actualizar un registro
const updaterol = async (req, res)=>{
    try {
        await rolmodel.update(req.body,{
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
const deleterol = async (req, res)=>{
    try {
        await rolmodel.destroy({
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
    createrol,
    deleterol,
    getAllrol,
    getrol,
    updaterol
}
