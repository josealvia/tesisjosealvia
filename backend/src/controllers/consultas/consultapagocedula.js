const { response, request } = require('express');
const {sociomodel,pagomodel}= require('../../models/index')


const consultapagocedula = async (req, res)=>{
    try {
        const pagocedula = await pagomodel.findAll({
            
            include:[{
                model:sociomodel,
                where:{
                    cedulasocio:req.params.cedulasocio
                },
                }],

        })
        res.json(pagocedula)
        
    } catch (error) {
        res.json({message: error.message})
        
    }

}

module.exports={
    consultapagocedula,
   
}
 