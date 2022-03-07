const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const excluir = async function ({ idLmcCab, idLoja }) {

    const lmcSituacao = await useDB({
        query: `select * from Cd_Lmcsituacao  WHERE lmccab_fk=${idLmcCab}  and loja_Fk=${idLoja}`
    });

    const tanqueMedicao = await useDB({
        query: `select * from Cd_Tanque_Medicao  WHERE lmccab_Fk=${idLmcCab}  and loja_fk=${idLoja}`
    });

    const lmcDet = await useDB({
        query: `select * from Cd_Lmcdet  WHERE lmccab_fk=${idLmcCab}  and loja_Fk=${idLoja}`
    });

    const lmcEstoque = await useDB({
        query: `select * from Cd_Lmcestoque WHERE lmccab_fk=${idLmcCab}  and loja_Fk=${idLoja}`
    });

    const lmcCab = await useDB({
        query: `select * from Cd_Lmccab  WHERE id_Lmccab=${idLmcCab}  and loja_Fk=${idLoja}`
    });

    return { code: 200, results: { lmcSituacao, tanqueMedicao, lmcDet, lmcEstoque, lmcCab } }

};

const listar = async function ({ idLoja, tipoData, dataInicial, dataFinal }) {

    const lmcDet = await useDB({
        query: `select * from Cd_Lmcdet  where loja_Fk=${idLoja} and (cast(${tipoData} as date)  between '${dataInicial}'  and '${dataFinal}') order by ${tipoData} desc`
    });

    /*  String tp = "";
     if (tipocombustivel != null) {
         tp = " and vo.tipocombustivelFk=" + tipocombustivel.getIdTipocombustivel() + " ";
     }
         Session sessao = null;
         Transaction tx;
     try {
             SimpleDateFormat sdv = new SimpleDateFormat("yyyy-MM-dd");
 
         sessao = Util.pegaSessaoAtual();
         tx = sessao.beginTransaction();
 
             String tdata = " vo.cdLmccab.datainicioLmccab ";
         if (tipodata.equals("A")) {
             tdata = " vo.cdLmccab.datainicioLmccab ";
         } else {
             tdata = " vo.cdLmccab.datafechamentoLmccab ";
         }
 
             String sit = "  ";
         if (tiposituacao.equals("A")) {
             sit = " and  vo.cdLmccab.datafechamentoLmccab is null ";
         }
 
         if (tiposituacao.equals("F")) {
             sit = " and vo.cdLmccab.datafechamentoLmccab is not null ";
         } */

    return { code: 200, results: { lmcDet } }

};

const inserircab = async function ({ idLoja, insertLmccabData, insertLmcSituacaoData, insertLmcDetData, insertLmcEstoqueData }) {

    let statusInsert, statusInsert2, statusInsert3, statusInsert4;

    const idLmcCab = await useDB({
        query: `SELECT max(id_lmccab)+1 as idc FROM public.cd_lmccab   where loja_fk=${idLoja} `
    });

    const insertLmccab = await useDB({
        query: `INSERT INTO public.cd_lmccab( 
            id_lmccab, 
            loja_fk, 
            datamovimento_lmccab, 
            datainicio_lmccab,  
            datafechamento_lmccab, 
            usuarioaltera, 
            dataaltera, 
            situacao, 
            vendasdodia)VALUES (
                ${idLmcCab[0].idc}, 
                ${insertLmccabData.loja_fk}, 
                '${insertLmccabData.datamovimento_lmccab}', 
                '${insertLmccabData.datainicio_lmccab}',  
                '${insertLmccabData.datafechamento_lmccab}', 
                ${insertLmccabData.usuarioaltera}, 
                '${insertLmccabData.dataaltera}', 
                'F',
                ${insertLmccabData.vendasdodia});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const idLmcSituacao = await useDB({
        query: `SELECT max(id_lmcsituacao)+1 as idc FROM public.cd_lmcsituacao  where loja_fk=${idLoja}`
    });

    const insertLmcSituacao = await useDB({
        query: `INSERT INTO public.cd_lmcsituacao(  
            id_lmcsituacao, 
            loja_fk, 
            tipocombustivel_fk, 
            lmccab_fk, 
            situacao,   
            pagina,  
            valor_unitario) VALUES (
                ${idLmcSituacao[0].idc}, 
                ${insertLmcSituacaoData.loja_fk}, 
                ${insertLmcSituacaoData.tipocombustivel_fk}, 
                ${insertLmcSituacaoData.lmccab_fk}, 
                'P',    
                0, 
                ${insertLmcSituacaoData.valor_unitario} );`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const idLmcDet = await useDB({
        query: `SELECT max(id_lmcdet)+1 as idc FROM public.cd_lmcdet  where loja_fk=${idLoja} `
    });

    const insertLmcDet = await useDB({
        query: `INSERT INTO public.cd_lmcdet( 
            id_lmcdet, 
            loja_fk, 
            tipocombustivel_fk, 
            bico_fk, 
            lmccab_fk, 
            encerranteinicial,   
            encerrantefinal, 
            afericao, 
            tanque, 
            usuarioaltera, 
            dataaltera,   
            bomba, 
            valorproduto, 
            qtdabertura, 
            qtdfechamento, 
            situacao, 
            valor_unitario)    VALUES (
                ${idLmcDet[0].idc}, 
                ${insertLmcDetData.loja_fk},
                ${insertLmcDetData.tipocombustivel_fk},  
                ${insertLmcDetData.bico_fk}, 
                ${insertLmcDetData.lmccab_fk},
                ${insertLmcDetData.encerranteinicial}, 
                ${insertLmcDetData.encerrantefinal},   
                ${insertLmcDetData.afericao}, 
                ${insertLmcDetData.tanque}, 
                ${insertLmcDetData.usuarioaltera}, 
                '${insertLmcDetData.dataaltera}', 
                ${insertLmcDetData.bomba},  
                ${insertLmcDetData.valorproduto}, 
                ${insertLmcDetData.qtdabertura}, 
                ${insertLmcDetData.qtdfechamento}, 
                'P', 
                ${insertLmcDetData.valor_unitario});`
    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    const idLmcEstoque = await useDB({
        query: `SELECT max(id_lmcestoque)+1 as idc  FROM public.cd_lmcestoque   where loja_fk=${idLoja} `
    });

    const insertLmcEstoque = await useDB({
        query: `INSERT INTO public.cd_lmcestoque( 
            id_lmcestoque, 
            loja_fk, 
            tipocombustivel_fk, 
            lmccab_fk, 
            estoqueinicial,  
            estoquefinal, 
            tanque, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idLmcEstoque[0].idc}, 
                ${insertLmcEstoqueData.loja_fk}, 
                ${insertLmcEstoqueData.tipocombustivel_fk}, 
                ${insertLmcEstoqueData.lmccab_fk}, 
                ${insertLmcEstoqueData.estoqueinicial},  
                ${insertLmcEstoqueData.estoquefinal}, 
                ${insertLmcEstoqueData.tanque}, 
                ${insertLmcEstoqueData.usuarioaltera}, 
                '${insertLmcEstoqueData.dataaltera}');`
    }).then(() => {
        statusInsert4 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert4 = err.message;
    });

    return { code: 200, results: { idLmcCab, statusInsert, idLmcSituacao, statusInsert2, idLmcDet, statusInsert3, idLmcEstoque, statusInsert4 } }

};

const verificar = async function ({ idLoja, dataMovimento, dataHora, idBico, idTanque }) {

    const lmcCab = await useDB({
        query: `select * from Cd_Lmccab where loja_fk=${idLoja} and datamovimento_Lmccab='${dataMovimento}' `
    });

    const bico = await useDB({
        query: ` select * from Cd_Bico where loja_Fk=${idLoja} and ativo_Bic='S' order by numero_Bic asc`
    });

    const abastecimento = await useDB({
        query: `SELECT  loja_fk, bico_fk, cast(datahora as date),   MIN(encerrantedepois) as ei,  SUM(qtd) as volume, MAX(encerrantedepois) as ef,  max(valorunit)  FROM public.vd_abastecimentos   where loja_fk=${idLoja} AND status_abastecimento!='R'  and cast(datahora as date)='${dataHora}'  and bico_fk=${idBico}   group by  loja_fk, bico_fk, cast(datahora as date)  order by cast(datahora as date)`
    });

    const abastecimento2 = await useDB({
        query: `SELECT  MAX(encerrantedepois) as ef  FROM public.vd_abastecimentos   where loja_fk=${idLoja}  AND status_abastecimento!='R'  and cast(datahora as date)='${dataHora}'  and bico_fk=${idBico}`
    });

    const abastecimentoVolume = await useDB({
        query: `SELECT  SUM(qtd) as volume  FROM public.vd_abastecimentos   where loja_fk=${idLoja}   AND status_abastecimento='A'  and bico_fk=${idBico}  and cast(datahora as date)='${dataHora}'`
    });

    const tanque = await useDB({
        query: ` select * from Cd_Tanque where loja_Fk=${idLoja} order by numero_Tanque asc`
    });

    const abastecimentoVolume2 = await useDB({
        query: `SELECT  SUM(qtd) as volume  FROM public.vd_abastecimentos as vd  inner join cd_bico as b on (b.id_bico=vd.bico_fk and vd.loja_fk=b.loja_fk)  where vd.loja_fk=${idLoja}  and status_abastecimento!='R'  and status_abastecimento!='A' and tanque_fk=${idTanque}  and cast(datahora as date)='${dataHora}'`
    });

    return { code: 200, results: { lmcCab, bico, abastecimento, abastecimento2, abastecimentoVolume, tanque, abastecimentoVolume2 } }

};

const pegartanque = async function ({ idLoja, idTanque }) {

    const tanque = await useDB({
        query: `select numero_tanque from cd_tanque  where loja_fk=${idLoja}  and id_tanque=${idTanque} `
    });

    return { code: 200, results: { tanque } }

};

const listardetalhe = async function ({ idLoja, idLmcCab, insertLmcSituacaoData, dataMovimento, idTipoComb, idBico, dataHora }) {

    let statusInsert

    const lmcDet = await useDB({
        query: `select * from  Cd_Lmcdet where loja_fk=${idLoja} and lmccab_fk=${idLmcCab} order by bico_Fk asc`
    });

    const lmcSituacao = await useDB({
        query: `select * from  Cd_Lmcsituacao where loja_fk=${idLoja} and lmccab_fk =${idLmcCab} order by tipocombustivel_Fk asc`
    });


    const bico = await useDB({
        query:`select  distinct(t.tipocombustivel_fk), b.precovar_bic   from cd_bico b   inner join cd_tanque t on b.tanque_fk = t.id_tanque  where b.loja_fk =${idLoja}`
    });

    const idLmcSituacao = await useDB({
        query: `SELECT max(id_lmcsituacao)+1 as idc FROM public.cd_lmcsituacao  where loja_fk=${idLoja}`
    });

    const insertLmcSituacao = await useDB({
        query: `INSERT INTO public.cd_lmcsituacao(  
            id_lmcsituacao, 
            loja_fk, 
            tipocombustivel_fk, 
            lmccab_fk, 
            situacao,   
            pagina,  
            valor_unitario) VALUES (
                ${idLmcSituacao[0].idc}, 
                ${insertLmcSituacaoData.loja_fk}, 
                ${insertLmcSituacaoData.tipocombustivel_fk}, 
                ${insertLmcSituacaoData.lmccab_fk}, 
                'P',    
                0, 
                ${insertLmcSituacaoData.valor_unitario} );`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const compraComb = await useDB({
        query: `select Fn_Compra_Combustiveldet.* from  Fn_Compra_Combustiveldet, fn_Compra_Cabecalho where Fn_Compra_Combustiveldet.loja_Fk=${idLoja} and cast(fn_Compra_Cabecalho.dataentradasaida_Compracab as date) ='${dataMovimento}' and fn_Compra_Cabecalho.status_Compracab='F' order by tanque asc `
    });

    const lmcSituacao2 = await useDB({
        query:`select  * from Cd_Lmcsituacao where lmccab_fk=${idLmcCab} and  loja_Fk=${idLoja}  and tipocombustivel_Fk=${idTipoComb}`
    });

    const abastecimento = await useDB({
        query:`SELECT min(encerranteantes) as total FROM public.vd_abastecimentos  where loja_fk=${idLoja} and bico_fk=${idBico} and cast(datahora as date) ='${dataHora}'`
    });

    const abastecimento2 = await useDB({
        query:`SELECT sum(qtd) as total FROM public.vd_abastecimentos  where loja_fk=${idLoja} and bico_fk=${idBico} and cast(datahora as date) =  '${dataHora}'  and status_abastecimento='A'`
    });

    const lmcEstoque = await useDB({
        query:`select * from  Cd_Lmcestoque where loja_fk=${idLoja} and lmccab_fk=${idLmcCab} order by tipocombustivel_Fk asc`
    });

    const tanqueMedicao = await useDB({
        query:`select * from  Cd_Tanque_Medicao where loja_fk=${idLoja} and  lmccab_Fk=${idLmcCab} order by dataaltera desc`
    });

    return { code: 200, results: { lmcDet, lmcSituacao, bico, idLmcSituacao, statusInsert, compraComb, lmcSituacao2, abastecimento, abastecimento2, lmcEstoque, tanqueMedicao } }

};

module.exports = {
    excluir,
    listar,
    inserircab,
    verificar,
    pegartanque,
    listardetalhe
}