//import expres from 'express'
//import { createsocio, deletesocio, getAllsocio, getsocio, updatesocio } from '../controllers/sociocontroller.js'
const {Router} = require('express');
const router = Router();

const {createdetpago,deletedetpago,getAlldetpago,getdetpago,updatedetpago}= require('../controllers/detallepagocontroller')


router.get('/',getAlldetpago)

router.get('/:id', getdetpago)

router.post('/',createdetpago)

router.put('/:id',updatedetpago)

router.delete('/:id',deletedetpago)


module.exports= router;