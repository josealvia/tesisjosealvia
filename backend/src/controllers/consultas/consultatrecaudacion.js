const { response, request } = require('express');
const {pagomodel}= require('../../models/index')

//contar las recaudaciones 

const totalrecaudacion = async ( req, res)=>{
    try {
        const totalRecaudacion = await pagomodel.count();
        res.json({totalRecaudacion})
    } catch (error) {
        res.json({message: error.message})  
    }
}

module.exports={
    totalrecaudacion
      
}
