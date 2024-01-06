const {Router} = require('express');
const router = Router();

const { totalrecaudacion}= require('../../controllers/consultas/consultatrecaudacion')

router.get('/recaudacion',totalrecaudacion )

module.exports= router;