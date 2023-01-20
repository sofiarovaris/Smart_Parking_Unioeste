const mqtt = require('mqtt');
require('dotenv').config({path:'../.env'});

const host = process.env.MQTT_HOST;
const port = process.env.MQTT_PORT;

const connectUrl = `mqtt://${host}:${port}`;

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const client = conectaMqtt();

//funcao que conecta o MQTT
function conectaMqtt(){
    const client = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    //quando receber uma mensagem nos tópicos inscritos
    client.on('message', async (topic, payload) => {
        console.log('Received Message:', topic, payload.toString());
        if(payload.toString() == 's'){ //tem carro na vaga
            parkingStatus(topic, false); //livre falso
        }else if(payload.toString() == 'n'){ //nao tem carro na vaga
            parkingStatus(topic, true); //livre vdd
        }
    });
    console.log('MQTT Conectado');
    return client;
}

//funcao para publicar uma mensagem em um tópico
const publish = async (topic, param) => {
    if(client.connected == true){
        client.publish(topic, param, { qos: 0, retain: false }, (error) => {
            if (error) {
              console.error(error);
            }
        })
    }
}

//funcao para se inscrever em um topico
const subscribe = async (topic) => {
    var topicRes = topic + '/reservado';

    if(client.connected == true){
        console.log('mqtt conected');
        client.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`);
        })
        client.subscribe([topicRes], () => {
            console.log(`Subscribe to topic '${topicRes}`);
        })
    }

}

// funcao para se desinscrever do topico
const unsubscribe = async (topic) => {
    var topicRes = topic + '/reservado';

    if(client.connected == true){
        client.unsubscribe([topic], () => {
            console.log(`Unsubscribe to topic '${topic}'`);
        })
        client.unsubscribe([topicRes], () => {
            console.log(`Unsubscribe to topic '${topicRes}`);
        })
    }
}

//funcao que se inscreve em todos os topicos contidos no banco de dados
const subscribeAllFromDB = async () => {
    const vagaServices = require('../services/vagaServices');
    let vagas = await vagaServices.listar();
    
    for(let i in vagas){
        client.subscribe([vagas[i].topico], () => {
            console.log(`Subscribe to topic '${vagas[i].topico}`)
        });
        client.subscribe([vagas[i].topico+'/reservado'], () => {
            console.log(`Subscribe to topic '${vagas[i].topico+'/reservado'}`)
        });
    }
}

// funcao que verifica o status das vagas
function parkingStatus(topic, status){
    const mqttServices = require('../services/mqttServices');
    if(status == false){
        mqttServices.vagaOcupada(topic, status);
        publish(topic+'/reservado', 'nao');
    }else{
        mqttServices.vagaDesocupada(topic, status);
    }
}

module.exports = {
    publish,
    subscribe,
    subscribeAllFromDB,
    unsubscribe
}