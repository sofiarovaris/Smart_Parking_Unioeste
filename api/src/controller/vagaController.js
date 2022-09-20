const vagaServices = require('../services/vagaServices');
const mqtt = require('../mqtt/mqtt');

const listarVagas = async (req, res) => {
    let json = {error:'', result:[]};

    let vagas = await vagaServices.listar();

    for(let i in vagas){
        json.result.push({
            idVaga: vagas[i].idVaga,
            nomeVaga: vagas[i].nomeVaga,
            livre: vagas[i].livre,
            reservada: vagas[i].reservada,
            fixa: vagas[i].fixa,
            topico: vagas[i].topico 
        });
    }
    
    res.json(json);
}

const registrarVaga = async(req, res) => {
    let json = {error:'', result:{}};

    let nomeVaga = req.body.nomeVaga;
    let topico = "/mva/dispositivo2/"+nomeVaga;

    if(nomeVaga && topico){
        await vagaServices.cadastrar(nomeVaga, 1, 0, 0, topico);
        mqtt.subscribe(topico);
        json.result = "Vaga cadastrada com sucesso!"
    }else{
        json.error = 'Campos não enviados!';
    }

    res.json(json);
}

const reservarVaga = async(req, res) => {
    let json = {error:'', result:{}};

    let idVaga = req.params.idVaga;
    let topico = req.body.topico;

    if(idVaga){
        await vagaServices.alterar(idVaga);
        mqtt.publish(topico+'/reservado', 'sim')
        json.result = 'Alterado com sucesso!';
    }else{
        json.error = 'Campos não enviados!';
    }

    res.json(json);
}

module.exports = {
    listarVagas,
    registrarVaga,
    reservarVaga
}