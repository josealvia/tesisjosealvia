//import modelo

//import sociomodel from "../models/sociomodel.js"; 
//import {usuariomodel, sociomodel } from "../models/index.js"; 
 
//metodos crud

//mostrar todos los registros

const { response, request } = require('express');
const {pagomodel,detallepagomodel, sociomodel, rubromodel}= require('../models/index')

const getAllpago = async (req, res)=>{
    try {
        const pagos = await pagomodel.findAll({
            /*where:{
                estadopago: 1,

            },*/
            include:[{
                model:sociomodel,
                required:true,
            },
            {
                model:detallepagomodel,
                include:[{
                    model:rubromodel
                }
                ]

            }

            ],
        })
        res.json(pagos)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

//mostrar un registro 
const getapago = async (req, res)=>{
    try {
        const pago= await pagomodel.findAll({
            where:{
                id:req.params.id
            },
            include:[{
                model:sociomodel,
            
            },
            {
                model:detallepagomodel,
                include:[{
                    model:rubromodel
                }
                ]

            }
            ],
        })
        res.json(pago[0])
    } catch (error) {
        res.json({message: error.message})       
    }
}

//crear un registro

const createpago = async (req, res)=>{
    try {
        await pagomodel.create(req.body)
        res.json({
            "message": "Creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})       
    }
}

// actualizar un registro
const updatepago = async (req, res)=>{
    try {
        await pagomodel.update(req.body,{
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
const deletepago = async (req, res)=>{
    try {
        await pagomodel.destroy({
            where: {id:req.params.id}
        })
        res.json({
            "message": "Eliminado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
        
    }
};

const cobrarpago = async (req, res) => {
    const { id } = req.params;
    const { idrubro } = req.body;

    try {
        const todosLosRubros = await rubromodel.findAll();
        const rubrosSeleccionados = new Set(idrubro);

        // Filtra solo los rubros seleccionados
        const rubrosFiltrados = todosLosRubros.filter((rubro) =>
            rubrosSeleccionados.has(rubro.id)
        );

       /* let totalCantidaddetalle = 0;

        // Calcula el total solo para los rubros seleccionados
        rubrosFiltrados.forEach(rubro => {
            totalCantidaddetalle += rubro.totalrubro;
        });*/

        const nuevasEntradas = rubrosFiltrados.map((rubro) => ({
            id: null,
            cantidaddetalle: rubro.totalrubro,
            idpago: id,
            idrubro: rubro.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        /*await detallepagomodel.destroy({
            where: { idpago: id }
        });*/

        const pago = await pagomodel.findOne({ where: { id: id, estadopago: true } });
        if (pago) {
            return res.json({ message: 'Este pago ya ha sido cobrado anteriormente.' });
        }else{
            await detallepagomodel.bulkCreate(nuevasEntradas);
            // Marcar el pago como cobrado
            await pagomodel.update(
            { estadopago: true },
            {
                where: { id: id },
            }
        );
        res.json({ message: 'pago tomada exitosamente' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports={
    createpago,
    deletepago,
    getAllpago,
    getapago,
    updatepago,
    cobrarpago
}



