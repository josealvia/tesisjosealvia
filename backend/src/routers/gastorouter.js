//import expres from 'express'
//import { createsocio, deletesocio, getAllsocio, getsocio, updatesocio } from '../controllers/sociocontroller.js'
const {Router} = require('express');
const router = Router();

const {creategasto,deletegasto,getAllgasto,getgasto,updategasto}= require('../controllers/gastocontroller')


router.get('/',getAllgasto)

router.get('/:id', getgasto)

router.post('/',creategasto)

router.put('/:id',updategasto)

router.delete('/:id',deletegasto)

module.exports= router;