const {Router} = require('express');
const router = Router();

const { consultapagocedula}= require('../../controllers/consultas/consultapagocedula')

router.get('/:cedulasocio',consultapagocedula )


module.exports= router;