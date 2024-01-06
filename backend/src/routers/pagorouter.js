//import expres from 'express'
//import { createsocio, deletesocio, getAllsocio, getsocio, updatesocio } from '../controllers/sociocontroller.js'
const {Router} = require('express');
const router = Router();

const {createpago,deletepago,getAllpago,getapago,updatepago,cobrarpago}= require('../controllers/pagocontroller')


router.get('/',getAllpago)

router.get('/:id', getapago)

router.post('/',createpago)

router.put('/:id',updatepago)

router.delete('/:id',deletepago)

router.post('/:id/detallepago',cobrarpago)

module.exports= router;