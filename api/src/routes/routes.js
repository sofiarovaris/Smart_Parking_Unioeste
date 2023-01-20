const express = require('express');
const router = express.Router();

const vagaController = require('../controller/vagaController');

// rotas para listar, registrar e reservar as vagas
router.get('/listarVagas', vagaController.listarVagas);
router.post('/registrarVaga', vagaController.registrarVaga);
router.put('/reservarVaga/:idVaga', vagaController.reservarVaga);
module.exports = router;