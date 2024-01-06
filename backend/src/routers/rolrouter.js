//import expres from 'express'

const {Router} = require('express');
const router = Router();

const {createrol,deleterol,getAllrol,getrol,updaterol}= require('../controllers/rolcontroller')


router.get('/',getAllrol)

router.get('/:id', getrol)

router.post('/',createrol)

router.put('/:id',updaterol)

router.delete('/:id',deleterol)

module.exports= router;