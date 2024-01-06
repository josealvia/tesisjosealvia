const { response, request } = require('express');
const {documentmodel}= require('../../models/index')

//contar las recaudaciones 

const totaldocumento = async ( req, res)=>{
    try {
        const totalDocumento = await documentmodel.count();
        res.json({totalDocumento})
    } catch (error) {
        res.json({message: error.message})  
    }
}

module.exports={
    totaldocumento
      
}