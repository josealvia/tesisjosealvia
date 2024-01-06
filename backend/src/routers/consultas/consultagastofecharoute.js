const {Router} = require('express');
const router = Router();

const { consultagastofecha}= require('../../controllers/consultas/consultagastofecha')

router.get('/:fechagasto',consultagastofecha )


module.exports= router;