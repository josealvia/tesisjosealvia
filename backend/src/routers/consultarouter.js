const {Router} = require('express');
const router = Router();

const { consultacedula, consultaporfecha}= require('../controllers/consultacontroller')

router.get('/:cedulasocio',consultacedula )
router.get('/consultafecha',consultaporfecha )

module.exports= router;