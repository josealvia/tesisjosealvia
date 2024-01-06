//import expres from 'express'
//import { createsocio, deletesocio, getAllsocio, getsocio, updatesocio } from '../controllers/sociocontroller.js'
const {Router} = require('express');
const router = Router();

const {createrubro,deleterubro,getAllrubro,getrubro,updaterubro}= require('../controllers/rubrocontroller')


router.get('/',getAllrubro)

router.get('/:id', getrubro)

router.post('/',createrubro)

router.put('/:id',updaterubro)

router.delete('/:id',deleterubro)

module.exports= router;