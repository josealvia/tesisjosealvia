//import { Sequelize } from "sequelize";
const {Sequelize} = require('sequelize')
const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} = require ('../config')

/*if(process.env.NODE_ENV ==='production'){
    db = new Sequelize({
        database: DB_NAME,
        username: DB_USER,
        password:DB_PASSWORD,
        host:DB_HOST,
        port:DB_PORT,
        dialect: 'mysql',
    });
    }else{
        db = new Sequelize('prueba','Administrador','Jose$252000',{
        host:'bdtesis.mysql.database.azure.com',
        port: 3306,
        dialect:'mysql'

    });

}*/
const db = new Sequelize('prueba','root','',{
    host:'localhost',
    dialect:'mysql'

})


module.exports={
    db
}