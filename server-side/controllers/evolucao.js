/**
 * Created by raphael on 4/10/17.
 */

const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
var models = require('../models/index');
const moment = require('moment');

module.exports = function(app){

    Fichas = app.serverSide.models.index.Fichas;
    ListaProblemas = app.serverSide.models.index.ListaProblemas;
    Pendencias = app.serverSide.models.index.Pendencias;
    Evolucao = app.serverSide.models.index.Evolucao;
    Dispositivos = app.serverSide.models.index.Dispositivos;
    Internacao = app.serverSide.models.index.Internacao;
    var evolucaoController = {
        getAllEvolucaoByIdPacientePorInternacaoMaisRecente: function (req,res) {
            try{
                Jwt.verify(req.headers.access_token, privateKey);
                Fichas.findAll({
                    include:[
                        {model: ListaProblemas,required:false},
                        {model: Pendencias,required:false},
                        {model: Evolucao,required:true}
                    ],
                    where:{
                        IDPaciente: req.query.idPaciente
                    }
                }).then(function (result) {
                    Internacao.findOne({
                        where:{
                            ID: req.query.idPaciente,
                            DataAlta: null
                        }
                    }).then(function (results) {
                        res.json(filtrarFichasEvolucao(result,results.dataValues.DataInternacao));
                    });
                });
            }catch(err){
                res.sendStatus(401);
            }
        },
        salvarFichaEvolucao: function (req,res) {
            try {
                Jwt.verify(req.headers.access_token, privateKey);
                Fichas.create({
                    Registro: parseInt(req.query.RegistroMedico),
                    IDPaciente: parseInt(req.query.idPaciente),
                    DataCriado: moment().format('YYYY-MM-DD H:m:s'),
                    DataModificado: moment().format('YYYY-MM-DD H:m:s')
                }).then(function (result) {
                    console.log(req.body);
                    Evolucao.create({
                        /**Parte relacioanda com Ficha**/
                        NroAtendimento: result.dataValues.NroAtendimento,

                        TipoEvolucao: 'Diurno',/*req.body.tipoFicha,*/

                         /**Eventos Significantes**/
                        EventosSignificantes: req.body.eventosSignificantes !== null ? req.body.eventosSignificantes : null,

                        /**Neurologico**/
                        NivelConsciencia: req.body.neurologico !== undefined ? req.body.neurologico.NivelConsciencia : null,
                        Pupilas: req.body.neurologico !== undefined ? req.body.neurologico.Pupilas : null,
                        AberturaOcular: req.body.neurologico !== undefined ? req.body.neurologico.AberturaOcular : null,
                        RespostaVerbal: req.body.neurologico !== undefined ? req.body.neurologico.RespostaVerbal : null,
                        RespostaMotora: req.body.neurologico !== undefined ? req.body.neurologico.RespostaMotora : null,
                        DeficitMotora: req.body.neurologico !== undefined ? req.body.neurologico.DeficitMotora : null,
                        PIC: req.body.neurologico !== undefined ? req.body.neurologico.PIC : null,
                        PPC: req.body.neurologico !== undefined ? req.body.neurologico.PPC : null,
                        SJO2: req.body.neurologico !== undefined ? req.body.neurologico.SJO2 : null,
                        DoseSedativo: req.body.neurologico !== undefined ? req.body.neurologico.DoseSedativo : null,
                        EscalaRamsay: req.body.neurologico !== undefined ? req.body.neurologico.EscalaRamsay : null,

                        /**Hemodinamica**/
                        RitmoHemodinamico: req.body.hemodinamica !== undefined ? req.body.hemodinamica.Ritmo : null,
                        Frequencia: req.body.hemodinamica !== undefined ? req.body.hemodinamica.Frequencia : null,
                        Bulhas: req.body.hemodinamica !== undefined ? req.body.hemodinamica.Bulhas : null,
                        PAM: req.body.hemodinamica !== undefined ? req.body.hemodinamica.PAM : null,
                        DrogasVasoativas: req.body.hemodinamica !== undefined ? req.body.hemodinamica.DrogasVasoativas : null,
                        PVC: req.body.hemodinamica !== undefined ? req.body.hemodinamica.PVC : null,
                        SwanGanz: req.body.hemodinamica !== undefined ? req.body.hemodinamica.SwanGanz : null,
                        OxigenacaoTissular: req.body.hemodinamica !== undefined ? req.body.hemodinamica.OxigenacaoTissular : null,

                        /**Respiratorio**/
                        ExameRespiratorio: req.body.respiratorio !== undefined ? req.body.respiratorio.ExameRespiratorio : null,
                        ParametroVentilatorio: req.body.respiratorio !== undefined ? req.body.respiratorio.ParametroVentilatorio : null,
                        GasometriaArterial: req.body.respiratorio !== undefined ? req.body.respiratorio.GasometriaArterial : null,
                        RaioxTorax: req.body.respiratorio !== undefined ? req.body.respiratorio.RaioxTorax : null,
                        PressaoCuff: req.body.respiratorio !== undefined ? req.body.respiratorio.PressaoCuff : null,
                        CanulaLatraquial: req.body.respiratorio !== undefined ? req.body.respiratorio.CanulaLatraquial : null,

                        /**Gastrointestinal**/
                        ExameAbdome: req.body.gastrointestinal !== undefined ? req.body.gastrointestinal.ExameAbdome : null,
                        DebitoSondas: req.body.gastrointestinal !== undefined ? req.body.gastrointestinal.DebitoSondas : null,
                        Evacuacoes: req.body.gastrointestinal !== undefined ? req.body.gastrointestinal.Evacuacoes : null,

                        /**Renal**/
                        Diurese: req.body.renal !== undefined ? req.body.renal.Diurese : null,
                        Peso: req.body.renal !== undefined ? req.body.renal.Peso : null,
                        BalancoHidrico: req.body.renal !== undefined ? req.body.renal.BalancoHidrico : null,
                        TipoDialise: req.body.renal !== undefined ? req.body.renal.TipoDialise : null,
                        VolumeDialise: req.body.renal !== undefined ? req.body.renal.VolumeDialise : null,
                        EscoriasRenais: req.body.renal !== undefined ? req.body.renal.EscoriasRenais : null,

                        /**Hematologico**/
                        Coagulograma: req.body.hematologico !== undefined ? req.body.hematologico.Coagulograma : null,
                        IndiceHematimetrico: req.body.hematologico !== undefined ? req.body.hematologico.IndiceHematimetrico : null,

                        /**Endocrino**/
                        Glicemia: req.body.endocrino !== undefined ? req.body.endocrino.Glicemia : null,
                        UsoInsulina: req.body.endocrino !== undefined ? req.body.endocrino.Insulina : null,
                        EndocrinoObservacoes: req.body.endocrino !== undefined ? req.body.endocrino.Observacoes : null,

                        /**Infeccioso**/
                        CurvaTermica: req.body.infeccioso !== undefined ? req.body.infeccioso.CurvaTermica : null,
                        AntibioticoInfeccioso: req.body.infeccioso !== undefined ? req.body.infeccioso.AntibioticoInfeccioso : null,
                        AntibioticoDias: req.body.infeccioso !== undefined ? req.body.infeccioso.AntibioticoDias : null,

                        /**Metabolico**/
                        AcidoBase: req.body.metabolico !== undefined ? req.body.metabolico.AcidoBase : null,
                        AntibioticoMetabolico: req.body.metabolico !== undefined ? req.body.metabolico.AntibioticoMetabolico : null,
                        FuncaoHepatica: req.body.metabolico !== undefined ? req.body.metabolico.FuncaoHepatica : null,

                        /**Nutricao**/
                        DietaNutricao: req.body.nutricao !== undefined ? req.body.nutricao.Dieta : null,
                        OutrosComentariosNutricao: req.body.nutricao !== undefined ? req.body.nutricao.Observacoes : null,

                        /**PsicoSocial**/
                        FamiliaresInteirados: req.body.psicosocial !== undefined ? req.body.psicosocial.FamiliaresInteirados : null,
                        Delirium: req.body.psicosocial !== undefined ? req.body.psicosocial.Delirium : null,
                        AcompanhamentoPsicologico: req.body.psicosocial !== undefined ? req.body.psicosocial.AcompanhamentoPsicologico : null,
                        TerapiaOcupacional: req.body.psicosocial !== undefined ? req.body.psicosocial.TerapiaOcupacional : null,
                        Storm: req.body.psicosocial !== undefined ? req.body.psicosocial.Storm : null,

                        /**Analise**/
                        Analise: req.body.Analise !== undefined ? req.body.Analise : null,

                        /**Interconsulta**/
                        Interconsulta: req.body.InterConsulta !== undefined ? req.body.InterConsulta : null,

                        /**Planos**/
                        Planos: req.body.Planos !== undefined ? req.body.Planos : null

                        /**ExamesLaboratoriais**/
                        /**| ExameLaboratorialRealizado   | date        | YES  |     | NULL    |       |
                         | Hemoglobina                  | int(11)     | YES  |     | NULL    |       |
                         | Hematocrito                  | int(11)     | YES  |     | NULL    |       |
                         | Leucocitos                   | int(11)     | YES  |     | NULL    |       |
                         | Promielocitos                | int(11)     | YES  |     | NULL    |       |
                         | Mielocitos                   | int(11)     | YES  |     | NULL    |       |
                         | Metamielocitos               | int(11)     | YES  |     | NULL    |       |
                         | Bastonetes                   | int(11)     | YES  |     | NULL    |       |
                         | Segmentados                  | int(11)     | YES  |     | NULL    |       |
                         | Eosinofilos                  | int(11)     | YES  |     | NULL    |       |
                         | Basofilos                    | int(11)     | YES  |     | NULL    |       |
                         | Linfocitos                   | int(11)     | YES  |     | NULL    |       |
                         | Monocitos                    | int(11)     | YES  |     | NULL    |       |
                         | Plaquetas                    | int(11)     | YES  |     | NULL    |       |
                         | Sodio                        | int(11)     | YES  |     | NULL    |       |
                         | Potassio                     | int(11)     | YES  |     | NULL    |       |
                         | Ureia                        | int(11)     | YES  |     | NULL    |       |
                         | Creatinina                   | int(11)     | YES  |     | NULL    |       |
                         | Magnesio                     | int(11)     | YES  |     | NULL    |       |
                         | Calcio                       | int(11)     | YES  |     | NULL    |       |
                         | Fosforo                      | int(11)     | YES  |     | NULL    |       |
                         | Cloro                        | int(11)     | YES  |     | NULL    |       |
                         | PCR                          | int(11)     | YES  |     | NULL    |       |
                         | Albumina                     | int(11)     | YES  |     | NULL    |       |
                         | TAP                          | int(11)     | YES  |     | NULL    |       |
                         | RNI                          | int(11)     | YES  |     | NULL    |       |
                         | TTPA                         | int(11)     | YES  |     | NULL    |       |
                         | Troponina                    | int(11)     | YES  |     | NULL    |       |
                         | CPK                          | int(11)     | YES  |     | NULL    |       |
                         | CKMB                         | int(11)     | YES  |     | NULL    |       |
                         | DimeroD                      | int(11)     | YES  |     | NULL    |       |
                         | Glicose                      | int(11)     | YES  |     | NULL    |       |
                         | Fibrogenio                   | int(11)     | YES  |     | NULL    |       |
                         | PH                           | int(11)     | YES  |     | NULL    |       |
                         | PCO2                         | int(11)     | YES  |     | NULL    |       |
                         | PO2                          | int(11)     | YES  |     | NULL    |       |
                         | HCO3                         | int(11)     | YES  |     | NULL    |       |
                         | Saturacao                    | int(11)     | YES  |     | NULL    |       |
                         | SaturacaoCentral             | int(11)     | YES  |     | NULL    |       |
                         | PAO2                         | int(11)     | YES  |     | NULL    |       |
                         | FIO2                         | int(11)     | YES  |     | NULL    |       |
                         | Lactato                      | int(11)     | YES  |     | NULL    |       |
                         | BBT                          | int(11)     | YES  |     | NULL    |       |
                         | BBD                          | int(11)     | YES  |     | NULL    |       |
                         | TGO                          | int(11)     | YES  |     | NULL    |       |
                         | Procalcitonina               | int(11)     | YES  |     | NULL    |       |
                         | TGP                          | int(11)     | YES  |     | NULL    |       |
                         | GGT                          | int(11)     | YES  |     | NULL    |       |
                         | FA                           | int(11)     | YES  |     | NULL    |       |**/

                        /**Exames
                         * | RaioxToraxData               | datetime    | YES  |     | NULL    |       |
                         | RaioxToraxDescricao          | tinytext    | YES  |     | NULL    |       |
                         | EcocardiogramaData           | datetime    | YES  |     | NULL    |       |
                         | EcocardiogramaDescricao      | tinytext    | YES  |     | NULL    |       |
                         | TomografiaToraxData          | datetime    | YES  |     | NULL    |       |
                         | TomografiaToraxDescricao     | tinytext    | YES  |     | NULL    |       |
                         | TomografiaAbdomeData         | datetime    | YES  |     | NULL    |       |
                         | TomografiaAbdomeDescricao    | tinytext    | YES  |     | NULL    |       |
                         | TomografiaCranioData         | datetime    | YES  |     | NULL    |       |
                         | TomografiaCranioDescricao    | tinytext    | YES  |     | NULL    |       |
                         | EndoscopiaDigestivaData      | datetime    | YES  |     | NULL    |       |
                         | EndoscopiaDigestivaDescricao | tinytext    | YES  |     | NULL    |       |
                         | UrinaData                    | datetime    | YES  |     | NULL    |       |
                         | UrinaDescricao               | tinytext    | YES  |     | NULL    |       |
                         | EletrocefalogramaData        | datetime    | YES  |     | NULL    |       |
                         | EletrocefalogramaDescricao   | tinytext    | YES  |     | NULL    |       |
                         | EletrocardiogramaData        | datetime    | YES  |     | NULL    |       |
                         | EletrocardiogramaDescricao   | tinytext    | YES  |     | NULL    |       |
                         | CulturasDescricao            | mediumtext  | YES  |     | NULL    |       |
                         */
                    }).then(function () {
                        res.sendStatus(200);
                    })
                })
            } catch (err) {
                res.sendStatus(401);
            }
        }
    };
    function filtrarFichasEvolucao(fichas,date){
         for(var i=fichas.length-1;i>=0;i--)
             if (fichas[i].DataCriado < date)
                 fichas.splice(i, 1);
        return fichas;
    }
    return evolucaoController;
};
