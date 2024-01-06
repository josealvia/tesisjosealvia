//import expres from 'express'
//import { createsocio, deletesocio, getAllsocio, getsocio, updatesocio } from '../controllers/sociocontroller.js'
const {Router} = require('express');
const router = Router();

const {createreunion,deletereunion,getAllreunion,getreunion,updatereunion,tomarasistencia}= require('../controllers/reunioncontroller')


router.get('/',getAllreunion)

router.get('/:id', getreunion)

router.post('/',createreunion)

router.put('/:id',updatereunion)

router.delete('/:id',deletereunion),

router.post('/:id/tomarasistencia', tomarasistencia)



//ruta para obtener la lista de socios


module.exports= router;