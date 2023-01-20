const mysql = require('mysql2');
const util = require('util');
require('dotenv').config({path:'../.env'});

// arquivo de conexao com o banco de dados

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port : process.env.DB_PORT
});

connection.getConnection((error, connection) => {
    if(error){
        throw error;
    }else{
        console.log('Conectado ao Banco de dados');
        const mqttController = require('../mqtt/mqtt');
        mqttController.subscribeAllFromDB();
        if (connection) connection.release();
        return;
    } 
});

connection.query = util.promisify(connection.query);

module.exports = connection;