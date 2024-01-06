const {Router} = require('express');
const router = Router();

const { totalreunion}= require('../../controllers/consultas/consultareunion')

router.get('/reunion',totalreunion )

module.exports= router;