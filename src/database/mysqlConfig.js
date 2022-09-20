const db = require('../database/dbConfig');

const configurar = () => {
    
    return new Promise((aceito, rejeitado) => {
        db.query('CREATE TABLE IF NOT EXISTS `estacionamento`.`vaga` (`idVaga` INT NOT NULL AUTO_INCREMENT,`nomeVaga` VARCHAR(45) NOT NULL,`livre` TINYINT NOT NULL,`reservada` TINYINT NOT NULL,`fixa` TINYINT NOT NULL,`topico` VARCHAR(100) NOT NULL,PRIMARY KEY (`idVaga`)) ENGINE = InnoDB;', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

configurar();