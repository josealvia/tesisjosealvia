const {documentmodel} = require('../models/index');
const fs = require('fs')

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


//descargar 
const downloadFile = async (req, res) => {
    try {
        const document = await documentmodel.findByPk(req.params.id);

        if (!document) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        const fileStream = fs.createReadStream(document.path);
        fileStream.on('open', () => {
        res.setHeader('Content-Disposition', `attachment; filename=${document.name}`);
        res.setHeader('Content-Type', 'application/pdf'); // Cambia el tipo de contenido según el tipo de archivo

        fileStream.pipe(res);
        });
        fileStream.on('error', (error) => {
            console.error(error);
            return res.status(500).json({ error: 'Error al descargar el documento' });
        });

        fileStream.on('end', () => {
            res.end();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al descargar el documento' });
    }
};



module.exports={
    uploadFile,
    getAllFile,
    deleteFile,
    updatefile,
    downloadFile,
   
}