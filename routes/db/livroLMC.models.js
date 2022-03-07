const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const totalizarperdasesobras = async function ({ idLoja, dataInicial, dataFinal, idTipoComb }) {

    const lmcSituacao = await useDB({
        query: `SELECT descricao_tipcomb, sum(perdas_sobras) as qt,tipocombustivel_fk  FROM public.cd_lmcsituacao as s  inner join cd_lmccab as cab on cab.id_lmccab=s.lmccab_fk  inner join cd_tipocombustivel as tp on tp.id_tipocombustivel=s.tipocombustivel_fk where s.loja_fk=${idLoja}  and cab.loja_fk=${idLoja} and s.situacao='F' and (datamovimento_lmccab between '${dataInicial}'  and '${dataFinal}' ) group by descricao_tipcomb,tipocombustivel_fk`
    });

    const lmcSituacao2 = await useDB({
        query: `SELECT datamovimento_lmccab , perdas_sobras as p,perdas_sobras as s FROM public.cd_lmcsituacao as s inner join cd_lmccab as cab on cab.id_lmccab=s.lmccab_fk inner join cd_tipocombustivel as tp on tp.id_tipocombustivel=s.tipocombustivel_fk where s.loja_fk=${idLoja}  and cab.loja_fk=${idLoja} and s.situacao='F' and (datamovimento_lmccab between  '${dataInicial}'  and  '${dataFinal}') and tipocombustivel_fk=${idTipoComb} order by datamovimento_lmccab asc `
    });

    return { code: 200, results: { lmcSituacao, lmcSituacao2 } }

};

const intervencaobico = async function ({ idLoja, idLmcInterven }) {

    const intervenBico = await useDB({
        query: `select * from Cd_Lmc_Interven_Bico where loja_fk=${idLoja} and lmcinterven_fk=${idLmcInterven} order by bico_Fk asc`
    });

    return { code: 200, results: { intervenBico } }

};

const intervencaolacre = async function ({ idLoja, idLmcInterven }) {

    const intervenLacre = await useDB({
        query: `select * from Cd_Lmc_Interven_Lacre where loja_fk=${idLoja} and lmcinterven_fk=${idLmcInterven} order by bomba_Fk asc`
    });

    return { code: 200, results: { intervenLacre } }

};

const listardetalhe = async function ({ idLoja, dataEntradaSaida, numTanque, idLmcCab, insertLmcSituacaoData, idCompraCab, idTipoComb, idBico, datahora, idTanque }) {

    let statusInsert;

    const fatura = await useDB({
        query: `select nfe_fatura.* from Nfe_Fatura, nfe_cabecalho where nfe_Cabecalho.tipooperacao_Nfecab='3' and nfe_Cabecalho.statusnota_Nfecab='5' and tipo='tanque' and nfe_Fatura.loja_Fk=${idLoja}  and cast(nfe_Cabecalho.dataentradasaida_Nfecab as date)='${dataEntradaSaida}' and nfe_fatura.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    const tanque = await useDB({
        query: `select * from Cd_Tanque where numero_Tanque=${numTanque} and loja_Fk=${idLoja} `
    });

    const lmcDet = await useDB({
        query: `select * from  Cd_Lmcdet where loja_fk=${idLoja} and lmccab_fk =${idLmcCab} order by bico_Fk asc`
    });

    const lmcSituacao = await useDB({
        query: `select * from  Cd_Lmcsituacao where loja_fk=${idLoja} and lmccab_fk=${idLmcCab} order by tipocombustivel_Fk asc`
    });

    const bico = await useDB({
        query: `select  distinct(t.tipocombustivel_fk), b.precovar_bic   from cd_bico b   inner join cd_tanque t on b.tanque_fk = t.id_tanque  where b.loja_fk =${idLoja}`
    });

    const tipoComb = await useDB({
        query: `select  distinct(t.tipocombustivel_fk), b.precovar_bic   from cd_bico b   inner join cd_tanque t on b.tanque_fk = t.id_tanque  where b.loja_fk =${idLoja}`
    });

    const idLmcSituacao = await useDB({
        query: `select max(id_lmcsituacao)+1 as idc from cd_lmcsituacao where loja_fk=${idLoja} `
    });

    const insertLmcSituacao = await useDB({
        query: `INSERT INTO cd_lmcsituacao( 
            id_lmcsituacao, 
            loja_fk, 
            tipocombustivel_fk,  
            lmccab_fk, 
            situacao, 
            pagina, 
            valor_unitario)  VALUES (
                ${idLmcSituacao[0].idc}, 
                ${insertLmcSituacaoData.loja_fk}, 
                ${insertLmcSituacaoData.tipocombustivel_fk},
                ${insertLmcSituacaoData.lmccab_fk}, 
                'P', 
                0, 
                ${insertLmcSituacaoData.valor_unitario})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const compraCombDet = await useDB({
        query: `select Fn_Compra_Combustiveldet.* from  Fn_Compra_Combustiveldet, fn_compra_cabecalho, fn_compra_detalhe where fn_compra_combustiveldet.loja_Fk=${idLoja} and cast(fn_Compra_Cabecalho.dataentradasaida_Compracab as date) ='${dataEntradaSaida}' and fn_Compra_Cabecalho.status_Compracab='F' and fn_Compra_Cabecalho.modelo_Compracab='55' and Fn_Compra_Combustiveldet.compradet_fk = fn_compra_detalhe.id_compradet and fn_compra_detalhe.compracab_fk = fn_compra_cabecalho.id_compracab order by tanque asc `
    });

    const docRef = await useDB({
        query: `SELECT  numerodocfiscal_nfecab,chaveacesso_nfecab  FROM public.nfe_docreferenciado as d  inner join nfe_cabecalho as cab on d.nfe_cabecalho_fk=cab.id_nfe_cabecalho   where compracab_fk=${idCompraCab} and d.loja_fk=${idLoja} and cab.loja_fk=${idLoja}  and statusnota_nfecab='5' and  tipooperacao_nfecab='5'`
    });

    const lmcSituacao2 = await useDB({
        query: `select * from Cd_Lmcsituacao where lmccab_fk=${idLmcCab} and  loja_Fk=${idLoja}  and tipocombustivel_Fk=${idTipoComb} `
    });

    const abastecimento = await useDB({
        query: `SELECT min(encerranteantes) as total FROM public.vd_abastecimentos  where loja_fk=${idLoja} and bico_fk=${idBico} and cast(datahora as date) =  '${datahora}'`
    });

    const qtdAbastecimento = await useDB({
        query: `SELECT sum(qtd) as total FROM public.vd_abastecimentos  where loja_fk=${idLoja} and bico_fk=${idBico} and cast(datahora as date) =  '${datahora}'  and status_abastecimento='A'`
    });

    const lmcEstoque = await useDB({
        query: `select * from  Cd_Lmcestoque where loja_fk=${idLoja} and lmccab_fk =${idLmcCab} order by tipocombustivel_fk asc`
    });

    const abastecimentoTanque = await useDB({
        query: `SELECT id_tanque,sum(qtd) as l   FROM public.vd_abastecimentos as v inner join cd_bico as b on (b.id_bico=v.bico_fk and b.loja_fk=v.loja_fk) inner join cd_tanque as t on (b.tanque_fk=t.id_tanque and b.loja_fk=t.loja_fk) where  (cast(datahora as date)= '${datahora}')  and v.loja_fk=${idLoja}  and b.loja_fk=${idLoja}  and t.loja_fk=${idLoja}  group by id_tanque order by id_tanque;`
    });

    const tanque2 = await useDB({
        query: `select * from Cd_Tanque where  id_Tanque=${idTanque} and loja_Fk=${idLoja} `
    });

    const lmcInterven = await useDB({
        query: `select * from  Cd_Lmc_Interven where loja_fk=${idLoja} and lmccab_fk=${idLmcCab} order by id_Lmc_Interven asc`
    });

    const tanqueMedicao = await useDB({
        query: `select * from  Cd_Tanque_Medicao where loja_fk=${idLoja} and  lmccab_Fk=${idLmcCab} order by dataaltera desc`
    });

    return { code: 200, results: { fatura, tanque, lmcDet, lmcSituacao, bico, tipoComb, idLmcSituacao, statusInsert, compraCombDet, docRef, lmcSituacao2, abastecimento, qtdAbastecimento, lmcEstoque, abastecimentoTanque, tanque2, lmcInterven, tanqueMedicao } }

};

const listardetalhe2 = async function ({ idLoja, idLmcCab }) {

    const lmcDet = await useDB({
        query: `select * from  Cd_Lmcdet where loja_fk=${idLoja} and lmccab_fk=${idLmcCab} order by bico_Fk asc`
    });

    return { code: 200, results: { lmcDet } }

};

const listarLMC = async function ({ idLoja, dataInicial, dataFinal, situacao }) {

    const lmcCab = await useDB({
        query: `select * from  Cd_Lmccab where loja_fk=${idLoja} and situacao='${situacao}'  and (cast(datamovimento_Lmccab as date) between '${dataInicial}' and '${dataFinal}') order by datamovimento_Lmccab asc`
    });

    /* String o = "";
       if (!sit.equals("0")) {
           o = " and vo.situacao='" + sit + "'";
       }
   
       lista = sessao.createQuery("select vo from  CdLmccab vo"
           + " where vo.cfLoja.idLoja=" + lojaLogada.getIdLoja() + ""
           + o
           + " and (cast(vo.datamovimentoLmccab as date) between '" + sd.format(datai) + "' and '" + sd.format(dataf) + "')"
           + " order by vo.datamovimentoLmccab asc").list(); */

    return { code: 200, results: { lmcCab } }

};

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM cd_lmccab WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_lmccab WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    return { code: 200, results: { comecandoCom, contendo } }

    //  public void processarFiltro() {

    /**
     * //string da consulta
            StringBuilder sb = new StringBuilder("SELECT vo FROM VdAbastecimentos vo");
     */

};

const pesquisarPorColuna = async function ({ colunaBusca, idLoja, textoBusca, dataMovimento }) {

    const lmcCab = await useDB({
        query: `SELECT * FROM Cd_Lmccab WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%' and loja_fk=${idLoja}   ORDER BY ${colunaBusca} ASC`
    });

    const lmcCab2 = await useDB({
        query: `SELECT * FROM Cd_Lmccab WHERE datamovimento_Lmccab='${dataMovimento}'  and loja_fk=${idLoja}   ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { lmcCab, lmcCab2 } }

};

const filtrarrd = async function ({ dataInicial, dataFinal, idLoja, colunaBusca }) {

    const lmcCab = await useDB({
        query: `SELECT * FROM Cd_Lmccab WHERE (datamovimento_Lmccab between '${dataInicial}' and '${dataFinal}') and loja_fk=${idLoja}   ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { lmcCab } }

};

const preencherListaBusca = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Lmccab where loja_fk=${idLoja}  order by datamovimento_Lmccab desc`
    });

    return { code: 200, results: { lista } }

};

const logo = async function ({ idLoja }) {

    const foto = await useDB({
        query: `select logo_loja from cf_loja where id_loja=${idLoja} `
    });

    return { code: 200, results: { foto } }

};

const pegartanque = async function ({ idLoja, idTanque }) {

    const tanque = await useDB({
        query: `select numero_tanque from cd_tanque  where loja_fk=${idLoja}  and id_tanque=${idTanque} `
    });

    return { code: 200, results: { tanque } }

};

const excluir = async function ({ idLmcCab, idLoja }) {

    const lmcSituacao = await useDB({
        query: `select * from Cd_Lmcsituacao WHERE lmccab_fk=${idLmcCab}  and loja_Fk=${idLoja}`
    });

    const tanqueMedicao = await useDB({
        query: `select * from Cd_Tanque_Medicao WHERE lmccab_Fk=${idLmcCab}  and loja_fk=${idLoja}`
    });

    const lmcDet = await useDB({
        query: `select * from Cd_lmcdet WHERE lmccab_Fk=${idLmcCab}  and loja_fk=${idLoja}`
    });

    const lmcEstoque = await useDB({
        query:`select * from Cd_lmcestoque WHERE lmccab_Fk=${idLmcCab}  and loja_fk=${idLoja}`
    });

    const lmcCab = await useDB({
        query:`select * from Cd_lmccab WHERE id_lmccab=${idLmcCab}  and loja_fk=${idLoja}`
    });


    return { code: 200, results: { lmcSituacao, tanqueMedicao, lmcDet, lmcEstoque, lmcCab } }

};

const pesquisarPorColunai = async function({ colunaBusca, textoBusca, idLoja }){ 

    const lmcInterven = await useDB({ 
    query: `select * from Cd_Lmc_Interven where upper(${colunaBusca}) like '%${textoBusca.toUpperCase()}%' and loja_Fk=${idLoja} order by ${colunaBusca} asc`
 }); 

 return { code: 200, results: { lmcInterven }}  
    
};

module.exports = {
    totalizarperdasesobras,
    intervencaobico,
    intervencaolacre,
    listardetalhe,
    listardetalhe2,
    listarLMC,
    processarFiltro,
    pesquisarPorColuna,
    filtrarrd,
    preencherListaBusca,
    logo,
    pegartanque,
    excluir,
    pesquisarPorColunai
}