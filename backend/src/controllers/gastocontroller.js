

const { response, request } = require('express');
const {gastomodel,usuariomodel, rubromodel}= require('../models/index')

const getAllgasto = async (req, res)=>{
    try {
        const gastos = await gastomodel.findAll({
            include:[{
                model:usuariomodel,
                attributes: ["nombreusuario"],
            },
            { 
            model: rubromodel,
            attributes: ["nombrerubro"],

            }],
        })
        res.json(gastos)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

//mostrar un registro 
const getgasto = async (req, res)=>{
    try {
        const gasto= await gastomodel.findAll({
            where:{
                id:req.params.id
            },
            include:[{
                model:usuariomodel,
                attributes: ["nombreusuario", "nombrecompletousuario"],
            
            },
            { 
                model: rubromodel,
    
            }],
        })
        res.json(gasto[0])
    } catch (error) {
        res.json({message: error.message})       
    }
}

//crear un registro

const creategasto = async (req, res)=>{
    try {
        await gastomodel.create(req.body)
        res.json({
            "message": "Creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})       
    }
}

// actualizar un registro
const updategasto = async (req, res)=>{
    try {
        await gastomodel.update(req.body,{
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
const deletegasto = async (req, res)=>{
    try {
        await gastomodel.destroy({
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
    creategasto,
    deletegasto,
    getAllgasto,
    getgasto,
    updategasto
}



