SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema santauti
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `santauti` ;

-- -----------------------------------------------------
-- Schema santauti
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `santauti` DEFAULT CHARACTER SET utf8 ;
USE `santauti` ;

-- -----------------------------------------------------
-- Table `santauti`.`Pessoa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `santauti`.`Pessoa` ;

CREATE TABLE IF NOT EXISTS `santauti`.`Pessoa` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `CPF` VARCHAR(11) NOT NULL,
  `Nome` VARCHAR(20) NOT NULL,
  `Sobrenome` VARCHAR(60) NOT NULL,
  `Identidade` VARCHAR(12) NOT NULL,
  `DataNascimento` DATE NOT NULL,
  `Rua` VARCHAR(40) NULL,
  `Numero` INT NULL,
  `Bairro` VARCHAR(40) NULL,
  `Apartamento` INT NULL,
  `Cep` VARCHAR(10) NULL,
  `Cidade` VARCHAR(45) NULL,
  `Email` VARCHAR(45) UNIQUE NULL,
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC),
  UNIQUE INDEX `Identidade_UNIQUE` (`Identidade` ASC),
  PRIMARY KEY (`ID`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `santauti`.`Profissional`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `santauti`.`Profissional` ;

CREATE TABLE IF NOT EXISTS `santauti`.`Profissional` (
  `Registro` INT,
  `ID` INT NOT NULL,
  `Usuario` VARCHAR(60) NOT NULL,
  `Senha` VARCHAR(60) NOT NULL,
  `TipoProfissional` INT NOT NULL,
  `Ativo` BOOLEAN NOT NULL,
  `QRKey` VARCHAR(255) UNIQUE,
  UNIQUE INDEX `Usuario_UNIQUE` (`Usuario` ASC),
  UNIQUE INDEX `Registro_UNIQUE` (`Registro` ASC),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  CONSTRAINT `fk_Profissional`
  FOREIGN KEY (`ID`)
  REFERENCES `santauti`.`Pessoa` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`ID`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `santauti`.`Paciente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `santauti`.`Paciente` ;

CREATE TABLE IF NOT EXISTS `santauti`.`Paciente` (
  `ID` INT NOT NULL,
  `Leito` INT NOT NULL,
  `Box` INT NOT NULL,
  `Profissao` VARCHAR(45) NOT NULL,
  `Convenio` VARCHAR(45) NULL,
  `Internado` BOOLEAN NOT NULL,
  `Responsavel` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_Paciente_idx` (`Responsavel` ASC),
  CONSTRAINT `fk_Paciente`
  FOREIGN KEY (`Responsavel`)
  REFERENCES `santauti`.`Profissional` (`Registro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_Pessoa_idx` (`ID` ASC),
  CONSTRAINT `fk_Paciente_Pessoa`
  FOREIGN KEY (`ID`)
  REFERENCES `santauti`.`Pessoa` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `santauti`.`Internacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `santauti`.`Internacao` ;

CREATE TABLE IF NOT EXISTS `santauti`.`Internacao` (
  `ID` INT NOT NULL,
  `DataInternacao` DATETIME NOT NULL,
  `DataAlta` DATETIME,
  PRIMARY KEY (`ID`,`DataInternacao`),
  INDEX `fk_Internacao_idx` (`ID` ASC),
  CONSTRAINT `fk_Internacao`
  FOREIGN KEY (`ID`)
  REFERENCES `santauti`.`Paciente` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `santauti`.`Telefone`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `santauti`.`Telefone` ;

CREATE TABLE IF NOT EXISTS `santauti`.`Telefone` (
  `ID` INT NOT NULL,
  `Telefone` VARCHAR(45) NOT NULL,
  `TipoTelefone` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`ID`, `Telefone`),
  INDEX `fk_Telefone_idx` (`ID` ASC),
  CONSTRAINT `fk_Telefone`
  FOREIGN KEY (`ID`)
  REFERENCES `santauti`.`Pessoa` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `santauti`.`Fichas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `santauti`.`Fichas` ;

CREATE TABLE IF NOT EXISTS `santauti`.`Fichas` (
  `NroAtendimento` INT NOT NULL AUTO_INCREMENT,
  `Registro` INT NOT NULL,
  `IDPaciente` INT NOT NULL,
  `DataCriado` DATETIME NOT NULL,
  `DataModificado` DATETIME NOT NULL,
  UNIQUE INDEX `NroAtendimento_UNIQUE` (`NroAtendimento` ASC),
  PRIMARY KEY (`NroAtendimento`),
  INDEX `fk_Fichas_Profissional_idx` (`Registro` ASC),
  INDEX `fk_Fichas_Paciente_idx` (`IDPaciente` ASC),
  CONSTRAINT `fk_Fichas_Profissional`
  FOREIGN KEY (`Registro`)
  REFERENCES `santauti`.`Profissional` (`Registro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Fichas_Paciente`
  FOREIGN KEY (`IDPaciente`)
  REFERENCES `santauti`.`Paciente` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `santauti`.`Evolucao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `santauti`.`Evolucao` ;

CREATE TABLE IF NOT EXISTS `santauti`.`Evolucao` (
  `NroAtendimento` INT NOT NULL,
  `TipoEvolucao` VARCHAR(10) NOT NULL,
  `Analise` MEDIUMTEXT NULL,
  `Glicemia` TINYTEXT NULL,
  `UsoInsulina` TINYTEXT NULL,
  `EndocrinoObservacoes` MEDIUMTEXT NULL,
  `EventosSignificantes` MEDIUMTEXT NULL,
  `RaioxToraxData` DATETIME NULL,
  `RaioxToraxDescricao` TINYTEXT NULL,
  `EcocardiogramaData` DATETIME NULL,
  `EcocardiogramaDescricao` TINYTEXT NULL,
  `TomografiaToraxData` DATETIME NULL,
  `TomografiaToraxDescricao` TINYTEXT NULL,
  `TomografiaAbdomeData` DATETIME NULL,
  `TomografiaAbdomeDescricao` TINYTEXT NULL,
  `TomografiaCranioData` DATETIME NULL,
  `TomografiaCranioDescricao` TINYTEXT NULL,
  `EndoscopiaDigestivaData` DATETIME NULL,
  `EndoscopiaDigestivaDescricao` TINYTEXT NULL,
  `UrinaData` DATETIME NULL,
  `UrinaDescricao` TINYTEXT NULL,
  `EletrocefalogramaData` DATETIME NULL,
  `EletrocefalogramaDescricao` TINYTEXT NULL,
  `EletrocardiogramaData` DATETIME NULL,
  `EletrocardiogramaDescricao` TINYTEXT NULL,
  `CulturasDescricao` MEDIUMTEXT NULL,
  `ExameLaboratorialRealizado` DATETIME NULL,
  `Hemoglobina` INT NULL,
  `Hematocrito` INT NULL,
  `Leucocitos` INT NULL,
  `Promielocitos` INT NULL,
  `Mielocitos` INT NULL,
  `Metamielocitos` INT NULL,
  `Bastonetes` INT NULL,
  `Segmentados` INT NULL,
  `Eosinofilos` INT NULL,
  `Basofilos` INT NULL,
  `Linfocitos` INT NULL,
  `Monocitos` INT NULL,
  `Plaquetas` INT NULL,
  `Sodio` INT NULL,
  `Potassio` INT NULL,
  `Ureia` INT NULL,
  `Creatinina` INT NULL,
  `Magnesio` INT NULL,
  `Calcio` INT NULL,
  `Fosforo` INT NULL,
  `Cloro` INT NULL,
  `PCR` INT NULL,
  `Albumina` INT NULL,
  `TAP` INT NULL,
  `RNI` INT NULL,
  `TTPA` INT NULL,
  `Troponina` INT NULL,
  `CPK` INT NULL,
  `CKMB` INT NULL,
  `DimeroD` INT NULL,
  `Glicose` INT NULL,
  `Fibrogenio` INT NULL,
  `PH` INT NULL,
  `PCO2` INT NULL,
  `PO2` INT NULL,
  `HCO3` INT NULL,
  `Saturacao` INT NULL,
  `SaturacaoCentral` INT NULL,
  `PAO2` INT NULL,
  `FIO2` INT NULL,
  `Lactato` INT NULL,
  `BBT` INT NULL,
  `BBD` INT NULL,
  `TGO` INT NULL,
  `Procalcitonina` INT NULL,
  `TGP` INT NULL,
  `GGT` INT NULL,
  `FA` INT NULL,
  `ExameAbdome` TINYTEXT NULL,
  `DebitoSondas` TINYTEXT NULL,
  `Evacuacoes` TINYTEXT NULL,
  `Coagulograma` TINYTEXT NULL,
  `IndiceHematimetrico` TINYTEXT NULL,
  `RitmoHemodinamico` TINYTEXT NULL,
  `Frequencia` INT NULL,
  `Bulhas` TINYTEXT NULL,
  `PAM` INT NULL,
  `DrogasVasoativas` TINYTEXT NULL,
  `PVC` INT NULL,
  `SwanGanz` TINYTEXT NULL,
  `OxigenacaoTissular` TINYTEXT NULL,
  `CurvaTermica` TINYTEXT NULL,
  `AntibioticoInfeccioso` TINYTEXT NULL,
  `AntibioticoDias` INT NULL,
  `Interconsulta` MEDIUMTEXT NULL,
  `AcidoBase` TINYTEXT NULL,
  `AntibioticoMetabolico` TINYTEXT NULL,
  `FuncaoHepatica` TINYTEXT NULL,
  `NivelConsciencia` TINYTEXT NULL,
  `Pupilas` TINYTEXT NULL,
  `AberturaOcular` INT NULL,
  `RespostaVerbal` INT NULL,
  `RespostaMotora` INT NULL,
  `DeficitMotora` TINYTEXT NULL,
  `PIC` INT NULL,
  `PPC` INT NULL,
  `SJO2` INT NULL,
  `DoseSedativo` INT NULL,
  `EscalaRamsay` INT NULL,
  `DietaNutricao` TINYTEXT NULL,
  `OutrosComentariosNutricao` TINYTEXT NULL,
  `Planos` TINYTEXT NULL,
  `FamiliaresInteirados` TINYTEXT NULL,
  `Delirium` TINYTEXT NULL,
  `AcompanhamentoPsicologico` TINYTEXT NULL,
  `TerapiaOcupacional` TINYTEXT NULL,
  `Storm` TINYTEXT NULL,
  `Diurese` INT NULL,
  `Peso` INT NULL,
  `BalancoHidrico` INT NULL,
  `TipoDialise` VARCHAR(45) NULL,
  `VolumeDialise` INT NULL,
  `EscoriasRenais` TINYTEXT NULL,
  `ExameRespiratorio` TINYTEXT NULL,
  `ParametroVentilatorio` TINYTEXT NULL,
  `GasometriaArterial` TINYTEXT NULL,
  `RaioxTorax` TINYTEXT NULL,
  `PressaoCuff` INT NULL,
  `CanulaLatraquial` INT NULL,
  INDEX `fk_Evolucao_idx` (`NroAtendimento` ASC),
  PRIMARY KEY (`NroAtendimento`),
  CONSTRAINT `fk_Evolucao`
  FOREIGN KEY (`NroAtendimento`)
  REFERENCES `santauti`.`Fichas` (`NroAtendimento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `santauti`.`ListaProblemas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `santauti`.`ListaProblemas` ;

CREATE TABLE IF NOT EXISTS `santauti`.`ListaProblemas` (
  `IDListaProblemas` INT NOT NULL AUTO_INCREMENT,
  `IDPaciente` INT NOT NULL,
  `NroAtendimento` INT NOT NULL,
  `AntecedentesPessoais` MEDIUMTEXT NULL,
  `DiagnosticoEntrada` MEDIUMTEXT NULL,
  `Comentarios` MEDIUMTEXT NULL,
  `Descricao` TINYTEXT NULL,
  `DataDiagnosticado` DATETIME NULL,
  `DataResolvido` DATETIME NULL,
  INDEX `fk_ListaProblemas_idx` (`NroAtendimento` ASC),
  INDEX `fk_ListaProblemas_Paciente_idx` (`IDPaciente` ASC),
  PRIMARY KEY (`IDListaProblemas`),
  CONSTRAINT `fk_ListaProblemas_NroAtendimento`
  FOREIGN KEY (`NroAtendimento`)
  REFERENCES `santauti`.`Fichas` (`NroAtendimento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ListaProblemas_Paciente`
  FOREIGN KEY (`IDPaciente`)
  REFERENCES `santauti`.`Paciente` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `santauti`.`Dispositivos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `santauti`.`Dispositivos` ;

CREATE TABLE IF NOT EXISTS `santauti`.`Dispositivos`(
  `IDDispositivo` INT NOT NULL AUTO_INCREMENT,
  `IDPaciente` INT NOT NULL,
  `DispositivoDescricao` TINYTEXT NULL,
  `DataInicio` DATETIME NULL,
  `DataFim` DATETIME NULL,
  INDEX `Dispositivos_Paciente_idx` (`IDPaciente` ASC),
  CONSTRAINT `fk_Dispositivos`
  FOREIGN KEY (`IDPaciente`)
  REFERENCES `santauti`.`Paciente` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`IDDispositivo`))
  ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `santauti`.`Pendencias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `santauti`.`Pendencias` ;

CREATE TABLE IF NOT EXISTS `santauti`.`Pendencias` (
  `IDPendencias` INT NOT NULL AUTO_INCREMENT,
  `NroAtendimento` INT NOT NULL,
  `IDPaciente` INT NOT NULL,
  `Comentarios` MEDIUMTEXT NULL,
  `Descricao` TINYTEXT NULL,
  `DataDiagnosticado` DATETIME NULL,
  `DataResolvido` DATETIME NULL,
  INDEX `fk_Pendencias_idx` (`NroAtendimento` ASC),
  INDEX `fk_Pendencias_Paciente_idx` (`IDPaciente` ASC),
  PRIMARY KEY (`IDPendencias`),
  CONSTRAINT `fk_Pendencias`
  FOREIGN KEY (`NroAtendimento`)
  REFERENCES `santauti`.`Fichas` (`NroAtendimento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pendencias_Paciente`
  FOREIGN KEY (`IDPaciente`)
  REFERENCES `santauti`.`Paciente` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

#ADMIN
INSERT INTO Pessoa VALUES (1,'02483575145','ADMIN','ADMIN','ADMIN123','1994-09-11',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
#PACIENTE
INSERT INTO Pessoa VALUES (2,'123456798','Joao','Manioc','Joao123','1994-09-11','Joao Naves de Avila',632,'Sta Monica',NULL,'38410614','Uberlandia','joao@gmail.com');
INSERT INTO Pessoa VALUES (5,'987564231','Antonio','Fonseca Peixoto','Antonio123','1994-09-11','Joao Naves de Avila',632,'Sta Monica',NULL,'38410614','Uberlandia','antonio@gmail.com');
INSERT INTO Pessoa VALUES (6,'357159877','Lourdes','Da Silva','Lourdes123','1994-09-11','Joao Naves de Avila',632,'Sta Monica',NULL,'38410614','Uberlandia','lourdes@gmail.com');
#MEDICO
INSERT INTO Pessoa VALUES (3,'465879','Angelo','Caetano Fernandes','Angelo123','1968-11-30','Pedro Crosara Cherulli','271','Cazeca',NULL,'34567','Uberlandia','angelo@gmail.com');
INSERT INTO Pessoa VALUES (4,'62840673649','Neide','Garcia Cardoso','567678','1970-01-31','Itutinga',181,'Gravatas',NULL,'38410614','Uberlandia','neide@gmail.com');

INSERT INTO Profissional VALUES (1,1,'admin','U2FsdGVkX1/ReFEwS2yxxqw6imqy3IRzdLzjbOkoak4=',1,TRUE,NULL);
INSERT INTO Profissional VALUES (259687,3,'udiacf','U2FsdGVkX1/ReFEwS2yxxqw6imqy3IRzdLzjbOkoak4=',2,TRUE,NULL);
INSERT INTO Profissional VALUES (249687,4,'neide','U2FsdGVkX1/ReFEwS2yxxqw6imqy3IRzdLzjbOkoak4=',2,TRUE,NULL);

INSERT INTO Paciente VALUES (2,05,04,'Pedreiro','UNIMED',TRUE,249687);
INSERT INTO Paciente VALUES (5,01,02,'Jornalista','UNIMED',TRUE,249687);
INSERT INTO Paciente VALUES (6,02,01,'Bombeiro','PARTICULAR',TRUE,259687);
INSERT INTO Internacao VALUES (2,'2016-04-01 14:30','2016-05-01');
INSERT INTO Internacao VALUES (2,'2017-04-01 14:30',NULL);
INSERT INTO Fichas (Registro,IDPaciente,DataCriado,DataModificado) VALUES (249687,2,'2014-05-05 20:04','2014-05-05 20:04');
INSERT INTO Fichas (Registro,IDPaciente,DataCriado,DataModificado) VALUES (249687,2,'2017-05-05 10:04','2014-05-05 20:04');
INSERT INTO Fichas (Registro,IDPaciente,DataCriado,DataModificado) VALUES (249687,2,'2017-05-06 20:04','2014-05-05 20:04');
INSERT INTO Evolucao VALUES(1,"Diaria","Analise","Glicemia alta","Usando Insulina","Endocrino Observacoes","sem evento significante",'2016-05-05',"raioxToraxDescricao",'2016-05-05',"ecocardiograma descricao",'2016-05-05',"tomografia torax descricao",'2016-05-05',"tomografia abdome descricao",'2016-05-05',"tomografia cranio",'2016-05-05',"endoscopia digestiva",'2016-05-05',"urina descricao",'2016-05-05',"eletrocefalograma descricao",'2016-05-05',"eletrocardiograma descricao","culturas descricao",'2016-05-05',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,"texto1","texto2","texto3","texto4","texto5","texto6",1,"texto1",2,"texto2",3,"texto1","texto2","texto3","texto4",5,"texto1","texto2","texto3","texto4","texto5","texto6",6,7,8,"texto6",5,6,7,8,9,"texto1","texto2","texto3","texto4","texto5","texto6","texto7","texto8",1,2,3,"dialise",4,"texto1","texto2","texto3","texto4","texto5",1,2);
INSERT INTO Evolucao VALUES(2,"Diaria","Analise","Glicemia alta","Usando Insulina","Endocrino Observacoes","Paciente peidou",'2016-05-05',"raioxToraxDescricao",'2016-05-05',"ecocardiograma descricao",'2016-05-05',"tomografia torax descricao",'2016-05-05',"tomografia abdome descricao",'2016-05-05',"tomografia cranio",'2016-05-05',"endoscopia digestiva",'2016-05-05',"urina descricao",'2016-05-05',"eletrocefalograma descricao",'2016-05-05',"eletrocardiograma descricao","culturas descricao",'2016-05-05',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,"texto1","texto2","texto3","texto4","texto5","texto6",1,"texto1",2,"texto2",3,"texto1","texto2","texto3","texto4",5,"texto1","texto2","texto3","texto4","texto5","texto6",6,7,8,"texto6",5,6,7,8,9,"texto1","texto2","texto3","texto4","texto5","texto6","texto7","texto8",1,2,3,"dialise",4,"texto1","texto2","texto3","texto4","texto5",1,2);
INSERT INTO Evolucao VALUES(3,"Noturna","Analise","Glicemia alta","Usando Insulina","Endocrino Observacoes","Paciente ficou louco da cabeća",'2016-05-05',"raioxToraxDescricao",'2016-05-05',"ecocardiograma descricao",'2016-05-05',"tomografia torax descricao",'2016-05-05',"tomografia abdome descricao",'2016-05-05',"tomografia cranio",'2016-05-05',"endoscopia digestiva",'2016-05-05',"urina descricao",'2016-05-05',"eletrocefalograma descricao",'2016-05-05',"eletrocardiograma descricao","culturas descricao",'2016-05-05',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,"texto1","texto2","texto3","texto4","texto5","texto6",1,"texto1",2,"texto2",3,"texto1","texto2","texto3","texto4",5,"texto1","texto2","texto3","texto4","texto5","texto6",6,7,8,"texto6",5,6,7,8,9,"texto1","texto2","texto3","texto4","texto5","texto6","texto7","texto8",1,2,3,"dialise",4,"texto1","texto2","texto3","texto4","texto5",1,2);
INSERT INTO Dispositivos (IDPaciente,DispositivoDescricao,DataInicio,DataFim) VALUES (2,"Dreno de Torax",'2014-05-30 20:04',NULL);
INSERT INTO Dispositivos (IDPaciente,DispositivoDescricao,DataInicio,DataFim) VALUES (2,"Dreno de Abdominal",'2014-11-22 20:04',NULL);
INSERT INTO Dispositivos (IDPaciente,DispositivoDescricao,DataInicio,DataFim) VALUES (2,"Sonda Vesical",'2014-02-24 20:04','2014-05-06');
INSERT INTO Dispositivos (IDPaciente,DispositivoDescricao,DataInicio,DataFim) VALUES (2,"Traqueostomia",'2014-10-11 20:04','2014-05-06');
INSERT INTO Dispositivos (IDPaciente,DispositivoDescricao,DataInicio,DataFim) VALUES (2,"Venoclise",'2014-05-05 20:04','2014-05-06');
INSERT INTO Dispositivos (IDPaciente,DispositivoDescricao,DataInicio,DataFim) VALUES (2,"Cateter PAI",'2014-11-11 20:04',NULL);
INSERT INTO Dispositivos (IDPaciente,DispositivoDescricao,DataInicio,DataFim) VALUES (2,"Cateter Hemodialise",'2014-12-09 20:04',NULL);
INSERT INTO Dispositivos (IDPaciente,DispositivoDescricao,DataInicio,DataFim) VALUES (2,"Sonda Enteral",'2017-04-01 20:04',NULL);
INSERT INTO Dispositivos (IDPaciente,DispositivoDescricao,DataInicio,DataFim) VALUES (2,"Sonda Oroenteral",'2017-04-02 04:00',NULL);
INSERT INTO Dispositivos (IDPaciente,DispositivoDescricao,DataInicio,DataFim) VALUES (2,"Sonda Orograstrica",'2017-04-03 20:30','2017-04-05 21:00');
INSERT INTO Pendencias (NroAtendimento,IDPaciente,Comentarios,Descricao,DataDiagnosticado,DataResolvido) VALUES (1,2,"blablabla","a",'2014-05-05 20:04','2014-05-06');
INSERT INTO Pendencias (NroAtendimento,IDPaciente,Comentarios,Descricao,DataDiagnosticado,DataResolvido) VALUES (2,2,"blablabla","a",'2014-05-05 20:04',NULL);
INSERT INTO ListaProblemas (IDPaciente,NroAtendimento,AntecedentesPessoais,DiagnosticoEntrada,Comentarios,Descricao,DataDiagnosticado,DataResolvido) VALUES (2,1,"Cancer","Cancer estado avancado","Comentario","sem descricao",'2014-05-05 20:04','2014-05-06');
INSERT INTO ListaProblemas (IDPaciente,NroAtendimento,AntecedentesPessoais,DiagnosticoEntrada,Comentarios,Descricao,DataDiagnosticado,DataResolvido) VALUES (2,2,"Cancer","Cancer estado avancado","Comentario","sem descricao",'2014-05-05 20:04',NULL);
