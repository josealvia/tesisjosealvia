const { response, request } = require('express');
const {reunionmodel}= require('../../models/index')

//contar los socios 

const totalreunion = async ( req, res)=>{
    try {
        const totalReunion = await reunionmodel.count();
        res.json({totalReunion})
    } catch (error) {
        res.json({message: error.message})  
    }
}

module.exports={
    totalreunion
    
}
