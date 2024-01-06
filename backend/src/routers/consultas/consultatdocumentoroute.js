const {Router} = require('express');
const router = Router();

const { totaldocumento}= require('../../controllers/consultas/consultatdocumento')

router.get('/doc',totaldocumento )

module.exports= router;