const {Router} = require('express');
const router = Router();

const { totalsocio}= require('../../controllers/consultas/consultasocio')

router.get('/socio',totalsocio )

module.exports= router;