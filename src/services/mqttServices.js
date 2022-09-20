const db = require('../database/dbConfig');

const vagaOcupada = (topico, status) => {
    return new Promise((aceito, rejeitado) => {
        db.query('UPDATE vaga set reservada = ?, livre = ? WHERE topico = ?', [false, status, topico], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const vagaDesocupada = (topico, status) => {
    return new Promise((aceito, rejeitado) => {
        db.query('UPDATE vaga set livre = ? WHERE topico = ?', [status, topico], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}


module.exports = {
    vagaDesocupada,
    vagaOcupada
};