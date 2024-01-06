const { response, request } = require('express');
const {sociomodel, usuariomodel, gastomodel, rubromodel}= require('../../models/index')

//contar los socios 

const totalsocio = async ( req, res)=>{
    try {
        const totalSocios = await sociomodel.count();
        res.json({totalSocios})
    } catch (error) {
        res.json({message: error.message})  
    }
}

module.exports={
    totalsocio
     
    
}
