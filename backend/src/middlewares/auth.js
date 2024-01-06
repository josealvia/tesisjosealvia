const { verifyToken }= require ('../helpers/generateToken');


const checkAuth = async (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        if(tokenData.id){
            next();
        }else{
            res.status(409)
            res.send({error: 'no pasa'})
        }
        
    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({error: 'no pasa'})
        
    }
}

module.exports={
    checkAuth
}