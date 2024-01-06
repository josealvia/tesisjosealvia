const {Router} = require('express');
const router = Router();

const { consultareunionfecha}= require('../../controllers/consultas/consultareunionfecha')

router.get('/:fechareunion',consultareunionfecha )


module.exports= router;