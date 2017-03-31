/**
 * Created by raphael on 3/14/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Evolucao = sequelize.define('Evolucao', {
        NroAtendimento: {//PK and FK to Fichas
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            reference: {
                model: 'Fichas',
                key: 'NroAtendimento'
            }
        },
        TipoEvolucao:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Analise:{
            type: DataTypes.TEXT
        },
        Glicemia: {
            type: DataTypes.TEXT
        },
        UsoInsulina: {
            type: DataTypes.TEXT
        },
        EndocrinoObservacoes:{
            type: DataTypes.TEXT
        },
        EventosSignificantes:{
            type: DataTypes.TEXT
        },
        RaioxToraxData:{
            type: DataTypes.DATE
        },
        RaioxToraxDescricao: {
            type: DataTypes.TEXT
        },
        EcocardiogramaData:{
            type: DataTypes.DATE
        },
        EcocardiogramaDescricao: {
            type: DataTypes.TEXT
        },
        TomografiaToraxData: {
            type: DataTypes.DATE
        },
        TomografiaToraxDescricao:{
            type: DataTypes.TEXT
        },
        TomografiaAbdomeData:{
            type: DataTypes.DATE
        },
        TomografiaAbdomeDescricao:{
            type: DataTypes.TEXT
        },
        TomografiaCranioData:{
            type: DataTypes.DATE
        },
        TomografiaCranioDescricao:{
            type: DataTypes.TEXT
        },
        EndoscopiaDigestivaData:{
            type: DataTypes.DATE
        },
        EndoscopiaDigestivaDescricao:{
            type: DataTypes.TEXT
        },
        UrinaData:{
            type: DataTypes.DATE
        },
        UrinaDescricao:{
            type: DataTypes.TEXT
        },
        EletrocefalogramaData:{
            type: DataTypes.DATE
        },
        EletrocefalogramaDescricao:{
            type: DataTypes.TEXT
        },
        EletrocardiogramaData:{
            type: DataTypes.DATE
        },
        EletrocardiogramaDescricao:{
            type: DataTypes.TEXT
        },
        CulturasDescricao:{
            type: DataTypes.TEXT
        },
        ExameLaboratorialRealizado:{
            type: DataTypes.DATE
        },
        Hemoglobina:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Hematocrito:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Leucocitos:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Promielocitos:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Mielocitos:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Metamielocitos:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Bastonetes:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Segmentados:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Eosinofilos:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Basofilos:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Linfocitos:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Monocitos:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Plaquetas:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Sodio:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Potassio:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Ureia:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Creatinina:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Magnesio:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Calcio:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Fosforo:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Cloro:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        PCR:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Albumina:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        TAP:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        RNI:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        TTPA:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Troponina:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        CPK:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        CKMB:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        DimeroD:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Glicose:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Fibrogenio:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        PH:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        PCO2:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        PO2:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        HCO3:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Saturacao:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        SaturacaoCentral:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        PAO2:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        FIO2:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Lactato:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        BBT:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        BBD:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        TGO:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Procalcitonina:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        TGP:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        GGT:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        FA:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        ExameAbdome:{
            type: DataTypes.TEXT
        },
        DebitoSondas:{
            type: DataTypes.TEXT
        },
        Evacuacoes:{
            type: DataTypes.TEXT
        },
        Coagulograma:{
            type: DataTypes.TEXT
        },
        IndiceHematimetrico:{
            type: DataTypes.TEXT
        },
        RitmoHemodinamico:{
            type: DataTypes.TEXT
        },
        Frequencia:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Bulhas:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        PAM:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        DrogasVasoativas:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        PVC:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        SwanGanz:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        OxigenacaoTissular:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        CurvaTermica:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        AntibioticoInfeccioso:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        AntibioticoDias:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        Interconsulta:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        AcidoBase:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        AntibioticoMetabolico:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        FuncaoHepatica:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        NivelConsciencia:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        Pupilas:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        AberturaOcular:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        RespostaVerbal:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        RespostaMotora:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        DeficitMotora:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        PIC:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        PPC:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        SJO2:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        DoseSedativo:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        EscalaRamsay:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        DietaNutricao:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        OutrosComentariosNutricao:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        Planos:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        FamiliaresInteirados:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        Delirium:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        AcompanhamentoPsicologico:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        TerapiaOcupacional:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        Storm:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        Diurese:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        Peso:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        BalancoHidrico:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        TipoDialise:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        VolumeDialise:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        EscoriasRenais:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        ExameRespiratorio:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        ParametroVentilatorio:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        GasometriaArterial:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        RaioxTorax:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        PressaoCuff:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        CanulaLatraquial:{
            type: DataTypes.INTEGER,
            allowNull:true
        }
    }, {
        classMethods: {
            associate: function (models) {
                Evolucao.belongsTo(models.Fichas,{
                    foreignKey: 'NroAtendimento'
                });
            }
        },
        tableName: 'Evolucao',
        timestamps:false
    });
    return Evolucao;
};