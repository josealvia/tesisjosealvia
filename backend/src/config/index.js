if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

module.exports = {

    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD:process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'prueba',
    DB_PORT: process.env.DB_PORT || 3306



};

