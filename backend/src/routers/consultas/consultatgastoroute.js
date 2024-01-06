const {Router} = require('express');
const router = Router();

const { totalgasto}= require('../../controllers/consultas/consultatgasto')

router.get('/gasto',totalgasto )

module.exports= router;