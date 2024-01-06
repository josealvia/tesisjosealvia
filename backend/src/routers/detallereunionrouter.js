//import expres from 'express'
//import { createsocio, deletesocio, getAllsocio, getsocio, updatesocio } from '../controllers/sociocontroller.js'
const {Router} = require('express');
const router = Router();

const {createdetreunion,deletedetreunion,getAlldetreunion,getdetreunion,updatedetreunion}= require('../controllers/detallereunioncontroller')


router.get('/',getAlldetreunion)

router.get('/:id', getdetreunion)

router.post('/',createdetreunion)

router.put('/:id',updatedetreunion)

router.delete('/:id',deletedetreunion)

module.exports= router;