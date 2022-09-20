require('dotenv').config({path:'./.env'});
require('./database/mysqlConfig');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use('/mva',routes);

const port = process.env.NODE_LOCAL_PORT || 3000;

server.listen(port, () => {
    console.log(`Servidor rodando na porta:${port}`);
})