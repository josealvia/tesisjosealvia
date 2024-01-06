const { response, request } = require('express');
const {reunionmodel, usuariomodel}= require('../../models/index')


const consultareunionfecha = async (req, res)=>{
    try {
        const consultareunion = await reunionmodel.findAll({
                where:{
                    fechareunion:req.params.fechareunion
                },
                include:[{
                    model:usuariomodel
                }]

        })
        res.json(consultareunion)
        
    } catch (error) {
        res.json({message: error.message})
        
    }

}

module.exports={
    consultareunionfecha,
   
}
 