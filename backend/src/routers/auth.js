const {Router}= require('express');
const router = Router();
const {registerCtrl,loginCtrl, editarCtrl }= require('../controllers/auth')

router.post('/login', loginCtrl)

router.post('/register', registerCtrl)

router.post('/:id', editarCtrl)


module.exports = router;