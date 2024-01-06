//import expres from 'express'
//import { createsocio, deletesocio, getAllsocio, getsocio, updatesocio } from '../controllers/sociocontroller.js'
const {Router} = require('express');
const router = Router();
const {checkAuth }= require('../middlewares/auth')

const {createsocio,deletesocio,getAllsocio,getsocio,updatesocio,}= require('../controllers/sociocontroller')


router.get('/', getAllsocio)

router.get('/:id', getsocio)

router.post('/',createsocio)

router.put('/:id',updatesocio)

router.delete('/:id',deletesocio)

module.exports= router;