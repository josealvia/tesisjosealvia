//import modelo

//import sociomodel from "../models/sociomodel.js"; 
//import {usuariomodel, sociomodel } from "../models/index.js"; 
 
//metodos crud

//mostrar todos los registros

const { response, request } = require('express');
const {reunionmodel,usuariomodel, sociomodel,detallereunionmodel,}= require('../models/index')

const getAllreunion = async (req, res)=>{
    try {
        const reuniones = await reunionmodel.findAll({
            include:[{
                model:usuariomodel,
                
            },
            {
                model:detallereunionmodel,
                include:[
                    {
                        model:sociomodel
                    }
                ]

            }],
        })
        res.json(reuniones)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

//mostrar un registro 
const getreunion = async (req, res)=>{
    try {
        const reunion= await reunionmodel.findAll({
            where:{
                id:req.params.id
            },
            include:[{
                model:usuariomodel,
                attributes: ["nombreusuario", "nombrecompletousuario"]
            },
            {
                model:detallereunionmodel,
                include:[
                    {
                        model:sociomodel
                    }
                ]

            }],
            
        })
        res.json(reunion[0])
    } catch (error) {
        res.json({message: error.message})       
    }
}

//crear un registro

const createreunion = async (req, res)=>{
    try {
        const nuevareunion = await reunionmodel.create(req.body);
        const socios = await sociomodel.findAll();
        res.json({reunion: nuevareunion, socios})
        //res.json({
          //  "message": "Creado correctamente"
        //})
    } catch (error) {
        res.json({message: error.message})       
    }
}

// actualizar un registro
const updatereunion = async (req, res)=>{
    try {
        await reunionmodel.update(req.body,{
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
const deletereunion = async (req, res)=>{
    try {
        await reunionmodel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message": "Eliminado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
        
    }
};

// tomar asistencia
const tomarasistencia = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
  
    try {
        // Verificar si la asistencia ya se ha tomado para esta reunión
        const reunionExistente = await reunionmodel.findByPk(id);

        /*if (!reunionExistente) {
            return res.status(404).json({ error: 'Reunión no encontrada' });
        }*/
        // Obtener la lista completa de socios para la reunión
        const todosLosSocios = await sociomodel.findAll();

        // Crear un conjunto de IDs de los socios que asistieron
        const sociosAsistentes = new Set(data);

        // Crear nuevas entradas para todos los socios con sus respectivos valores de asistencia
        const nuevasEntradas = todosLosSocios.map((socio) => ({
            id: null,
            asistencia: sociosAsistentes.has(socio.id) ? 1 : 0,
            idsocio: socio.id,
            idreunion: id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));



      // Eliminar todas las entradas existentes para esta reunión
      /*await detallereunionmodel.destroy({
        where: { idreunion: id }
      });*/
  
      // Crear nuevas entradas para los asistentes
      
        const reunion = await reunionmodel.findOne({ where: { id: id, asistenciatomada: true } });
        if (reunion) {
            return res.json({ message: 'Este pago ya ha sido cobrado anteriormente.' });
        }else{
            await detallereunionmodel.bulkCreate(nuevasEntradas);
            // Marcar el pago como cobrado
            await reunionmodel.update(
            { asistenciatomada: true },
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
    createreunion,
    deletereunion,
    getAllreunion,
    getreunion,
    updatereunion,
    tomarasistencia
    
}



