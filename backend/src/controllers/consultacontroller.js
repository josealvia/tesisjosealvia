const { response, request } = require('express');
const {sociomodel, usuariomodel, gastomodel, rubromodel}= require('../models/index')


const consultacedula = async (req, res)=>{
    try {
        const cedula = await sociomodel.findAll({
            where:{
                cedulasocio:req.params.cedulasocio
            },
            include:[{
                model:usuariomodel,
                }],

        })
        res.json(cedula)
        
    } catch (error) {
        res.json({message: error.message})
        
    }

}

const consultaporfecha = async (req, res )=>{
    try {
        const fecha = await gastomodel.findAll({
            where:{
                fechagasto: req.params.fechagasto
            },
            include:[{
                model:usuariomodel,
            },
            {
                model: rubromodel,
            }]
        })
        res.json(fecha)
        
    } catch (error) {
        res.json({message: error.message})
    }
}




module.exports={
   consultacedula,
   consultaporfecha,
   
    
   
}
