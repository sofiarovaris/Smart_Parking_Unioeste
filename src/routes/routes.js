const express = require('express');
const router = express.Router();

const vagaController = require('../controller/vagaController');

router.get('/listarVagas', vagaController.listarVagas);
router.post('/registrarVaga', vagaController.registrarVaga);
router.put('/reservarVaga/:idVaga', vagaController.reservarVaga);
module.exports = router;