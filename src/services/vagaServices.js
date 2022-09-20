const db = require('../database/dbConfig');

const listar = () => {
    return new Promise((aceito, rejeitado) => {
        db.query('SELECT * FROM vaga', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const cadastrar = (nomeVaga, livre, reservada, fixa, topico) => {
    return new Promise((aceito, rejeitado) => {
        db.query('INSERT INTO vaga (nomeVaga, livre, reservada, fixa, topico) VALUES (?, ?, ?, ?, ?)', [nomeVaga, livre, reservada, fixa, topico], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertCodigo);
        });
    });
}

const alterar = (idVaga) => {
    return new Promise((aceito, rejeitado) => {
        db.query('UPDATE vaga set reservada = ? WHERE idVaga = ?', [true, idVaga], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

module.exports = {
    listar,
    cadastrar,
    alterar
};