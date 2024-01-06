const express= require('express');
const morgan = require('morgan');
const cors = require('cors');
const {db}= require('./database/db')


//import express from "express";
//import morgan from "morgan";
//import cors from 'cors'
//import db from "./database/db.js"

//import userrouter from './routers/usuariorouter.js'
//import sociorouter from './routers/sociorouter.js'


const app = express();

//const PORT = require('./config/index.js')


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({extended: false}));

const {usuariorouter, 
      sociorouter, 
      rubroroute,
      gastorouter,
      reunionrouter,
      pagorouter,
      detallereunionrouter,
      rolrouter,
      authrouter,
      consultas,
      documentrouter,
      detallepagorouter,
      consultasocioroute,
      consultareunionroute,
      consultapagocedularoute,
      consultareunionfecharoute,
      consultagastofecharoute,
      consultatrecaudacion,
      consultatgasto,
      consultatdocumento
      

    } = require('./routers/index');
const { PORT } = require('./config');

app.use('/usuario',usuariorouter);
app.use('/socio',sociorouter);
app.use('/rubro', rubroroute);
app.use('/gasto',gastorouter);
app.use('/reunion', reunionrouter);
app.use('/pago', pagorouter);
app.use('/detallereunion', detallereunionrouter);
app.use('/rol', rolrouter);
app.use('/auth', authrouter);
app.use('/consulta', consultas);
app.use('/document', documentrouter);
app.use('/detallepago', detallepagorouter);
app.use('/consultasocio', consultasocioroute);
app.use('/consultareunion', consultareunionroute);
app.use('/consultapagocedula', consultapagocedularoute);
app.use('/consultareunion', consultareunionfecharoute);
app.use('/consultagasto', consultagastofecharoute);
app.use('/consultatrecaudacion', consultatrecaudacion);
app.use('/consultatgasto', consultatgasto);
app.use('/consultatdocumento', consultatdocumento)



try {
    db.authenticate()
    console.log('conexion exitosa');
    
} catch (error) {
    console.log('error');
    
}

//const {PORT}= require('./config');


//rutas

//const router = require('./routers/usuariorouter');

//app.set('port', port);

//app.use(morgan('dev'));

//app.use('/usuario',router);

//app.use(express.urlencoded({extended: false}));
//app.use(express.json())


//app.listen(app.get('port'),()=>{
 //   console.log(`Servidor corriendo en el puerto ${PORT}`)
//});


app.listen(PORT, ()=>{
  console.log('Server UP running in ', PORT)
})