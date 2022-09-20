const mysql = require('mysql2');
const util = require('util');
require('dotenv').config({path:'../.env'});

const connection = mysql.createPool({
    host: '172.17.0.1',
    user: 'root',
    password: 'mysql12345',
    database: 'estacionamento',
    port : 3306
});

connection.getConnection((error, connection) => {
    if(error){
        throw error;
    }else{
        console.log('Conectado ao Banco de dados: estacionamento');
        const mqttController = require('../mqtt/mqtt');
        mqttController.subscribeAllFromDB();
        if (connection) connection.release();
        return;
    } 
});

connection.query = util.promisify(connection.query);

module.exports = connection;