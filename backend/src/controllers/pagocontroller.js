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

/*const cobrarpago = async (req, res) => {
    const { id } = req.params;
    const { idrubro } = req.body;

    try {
        const todosLosRubros = await rubromodel.findAll();
        const rubrosSeleccionados = new Set(idrubro);

        // Filtra solo los rubros seleccionados
        const rubrosFiltrados = todosLosRubros.filter((rubro) =>
            rubrosSeleccionados.has(rubro.id)
        );


        const nuevasEntradas = rubrosFiltrados.map((rubro) => ({
            id: null,
            cantidaddetalle: rubro.totalrubro,
            idpago: id,
            idrubro: rubro.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

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
};*/


const cobrarpago = async (req, res) => {
    const { id } = req.params;
    const { idrubro } = req.body;

    try {
        // Verificar si el pago ya ha sido cobrado
        const pagoCobrado = await pagomodel.findOne({ where: { id: id, estadopago: true } });
        if (pagoCobrado) {
            return res.json({ message: 'Este pago ya ha sido cobrado anteriormente.' });
        }

        // Obtener el socio asociado al pago
        const socioAsociado = await pagomodel.findOne({
            where: { id: id },
            include: [{ model: sociomodel }],
        });

        if (!socioAsociado) {
            return res.json({ message: 'Pago no encontrado.' });
        }

        // Verificar si el rubro ya ha sido pagado por el socio actual
        const rubroYaPagadoPorSocio = await detallepagomodel.findOne({
            where: {
                '$pago.idsocio$': socioAsociado.socio.id,
                '$rubro.id$': idrubro,
                
            },
            include:[
                {
                    model:pagomodel,
                    require:true,
                    include:[
                        {
                            model:sociomodel,
                            
                        },
                    ],
                },
                {
                    model:rubromodel,
                    where: { id: idrubro },
                }
            ]
        });

        if (rubroYaPagadoPorSocio) {
            return res.json({ message: 'Este rubro ya ha sido pagado por este socio.' });
        }

        // Obtener todos los rubros pagados por cualquier socio
        const rubrosPagados = await detallepagomodel.findAll({
            where: {
                idrubro: idrubro,
            },
        });

        // Verificar si el socio actual ya ha pagado el rubro
        const socioYaPagado = rubrosPagados.some((rubroPagado) => rubroPagado.idpago === id);

        if (socioYaPagado) {
            return res.json({ message: 'Este socio ya ha pagado este rubro.' });
        }

        // Obtener todos los rubros
        const todosLosRubros = await rubromodel.findAll();

        // Filtrar solo los rubros seleccionados
        const rubrosSeleccionados = new Set(idrubro);
        const rubrosFiltrados = todosLosRubros.filter((rubro) => rubrosSeleccionados.has(rubro.id));

        // Crear nuevas entradas en detallepagomodel
        const nuevasEntradas = rubrosFiltrados.map((rubro) => ({
            id: null,
            cantidaddetalle: rubro.totalrubro,
            idpago: id,
            idrubro: rubro.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        // Actualizar el pago como cobrado
        await pagomodel.update(
            { estadopago: true },
            {
                where: { id: id },
            }
        );

        // Crear nuevas entradas en detallepagomodel
        await detallepagomodel.bulkCreate(nuevasEntradas);

        res.json({ message: 'Pago tomado exitosamente' });
    } catch (error) {
        res.json({ message: error.message });
    }
}


module.exports={
    createpago,
    deletepago,
    getAllpago,
    getapago,
    updatepago,
    cobrarpago
}



