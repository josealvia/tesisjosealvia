const { response, request } = require('express');
const {gastomodel}= require('../../models/index')

//contar las recaudaciones 

const totalgasto = async ( req, res)=>{
    try {
        const totalGasto = await gastomodel.count();
        res.json({totalGasto})
    } catch (error) {
        res.json({message: error.message})  
    }
}

module.exports={
    totalgasto
      
}
