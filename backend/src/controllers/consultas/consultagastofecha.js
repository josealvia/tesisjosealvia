const { response, request } = require('express');
const {usuariomodel,gastomodel, rubromodel}= require('../../models/index')


const consultagastofecha = async (req, res)=>{
    try {
        const gastofecha = await gastomodel.findAll({
            where: { 
                fechagasto:req.params.fechagasto
            },
            
            include:[{
                model:usuariomodel,
                },
            {
                model:rubromodel
            }],

        })
        res.json(gastofecha)
        
    } catch (error) {
        res.json({message: error.message})
        
    }

}

module.exports={
    consultagastofecha,
   
}
 