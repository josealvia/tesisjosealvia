
const {Router}= require('express');
const router = Router();
const {createuser,getAlluser,deleteuser,getuser,updateuser}= require('../controllers/usuariocontroller')
const {checkAuth}= require('../middlewares/auth')

router.get('/'/*,checkAuth, */,getAlluser)

router.get('/:id'/*, checkAuth*/, getuser)

router.post('/'
    //body('nombreusuario').custom(existeUsuario),
    //check('correousuario').custom(existeEmail),
    //validarCampos
    , createuser)

router.put('/:id',updateuser)

router.delete('/:id',deleteuser)


module.exports = router;