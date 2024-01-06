const {response, request} = require('express');
const {usuariomodel, rolmodel}= require('../models/index');
const{compare,encrypt}= require('../helpers/handleBcrypt');
const{tokenSign}= require('../helpers/generateToken');

const loginCtrl = async (req, res)=>{
    try {
        const {
            correousuario,
            contraseñausuario}= req.body

        if (!correousuario || !contraseñausuario) {
            return res.status(400).send({ error: 'Email and password are required'});
            
        }
        
        const user = await usuariomodel.findOne({
            
            where:{
                correousuario:correousuario
            },
            include: rolmodel
        });
        if(!user){
            return res.status(404).send({error: 'user not found'})
            
        }
        const checkPassword = await compare(contraseñausuario, user.contraseñausuario)
        console.log('User Role:', user.role.nombrerol);

        const token = await tokenSign({userId: user.id, rol: user.role.nombrerol, user: user.nombreusuario })
        console.log('Generated Token:', token); 
        if(checkPassword){
            return res.send({
                data: user,
                token
            })
        }
        else{
            return res.status(409).send({
                error:'Invalid contraseña'
            });
        }
 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
        
    }
}

const registerCtrl = async(req,res )=>{
    try {
        const {nombreusuario,
            contraseñausuario,
            nombrecompletousuario,
            correousuario,
            telefonousuario,
            idrol}= req.body
        const passwordHash = await encrypt(contraseñausuario)
        const registerUser = await usuariomodel.create({
            nombreusuario,
            contraseñausuario: passwordHash,
            nombrecompletousuario,
            correousuario,
            telefonousuario,
            idrol

        })
        res.send({data: registerUser})
        
    } catch (error) {
        res.json({message: error.message})
    }
}

const editarCtrl = async(req,res )=>{
    try {
        const {nombreusuario,
            contraseñausuario,
            nombrecompletousuario,
            correousuario,
            telefonousuario,
            idrol}= req.body
        const passwordHash = await encrypt(contraseñausuario)
        const editarUser = await usuariomodel.update({
            where:{id: req.params.id},
            nombreusuario,
            contraseñausuario: passwordHash,
            nombrecompletousuario,
            correousuario,
            telefonousuario,
            idrol

        })
        res.send({data: editarUser})
        
    } catch (error) {
        res.json({message: error.message})
    }
}

module.exports={
    registerCtrl,
    loginCtrl,
    editarCtrl

}