const express = require('express');
const router = express.Router();
const multer = require('multer');
const {uploadFile, getAllFile, de, deleteFile, updatefile, openFile} = require('../controllers/documentcontroller')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


///rutas 
//metodo para subir archivo

router.post('/upload', upload.single('file'),uploadFile)
router.get('/', getAllFile)
router.put('/:id',updatefile)
router.delete('/:id',deleteFile)
module.exports = router;