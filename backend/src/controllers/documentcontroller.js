const {documentmodel} = require('../models/index');

const uploadFile = async(req, res)=>{
    try {
        const { filename, path } = req.file;
        const document = await documentmodel.create({
            name: filename,
            path: path,
    });
    return res.json(document);   
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al cargar el documento' });
        
    }

}

const getAllFile = async (req, res)=>{
    try {
        const documents = await documentmodel.findAll(); // Encuentra todos los documentos en la base de datos
        return res.json(documents);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener los documentos' });
      }
}

const updatefile = async (req, res)=>{
    try {
        await documentmodel.update(req.body,{
            where:{ id: req.params.id}

        })
        res.json({
            "message":"Editado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
        
    }
}

const deleteFile = async (req, res)=>{
    try {
        await documentmodel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message": "Eliminado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
        
    }
};



module.exports={
    uploadFile,
    getAllFile,
    deleteFile,
    updatefile,
   
}