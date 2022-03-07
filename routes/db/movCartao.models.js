const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const baixar = async function ({ idLoja, insertMovContaHistData, saldoAtual, saldoAnterior, idConta }) {

    let statusInsert;

    const idMovContaHist = await useDB({
        query: `select max(id_movcontahist)+1 as idc from fn_movcontahist where loja_fk=${idLoja} `
    });

    const insertMovContaHist = await useDB({
        query: `INSERT INTO public.fn_movcontahist( 
            id_movcontahist, 
            loja_fk, 
            conta_fk, 
            tipomov_mvcont, 
            descrmov_mvcont,  
            numdoc_mvcont, 
            datamov_mvcont, 
            valormov_mvcont, 
            valordinheiro,  
            valorcheque, 
            valorcartao_mvcont, 
            codcontadestino_mvcont, 
            baixado_mvcont,  
            usuarioaltera,
            dataaltera,
            saldo)   VALUES (
                ${idMovContaHist[0].idc},  
                ${insertMovContaHistData.loja_fk}, 
                ${insertMovContaHistData.conta_fk},  
                'D', 
                'BAIXA CONTAS PAGAR',  
                ${insertMovContaHistData.numdoc_mvcont}, 
                '${insertMovContaHistData.datamov_mvcont}',    
                ${insertMovContaHistData.valormov_mvcont}, 
                0,   
                0, 
                0, 
                ${insertMovContaHistData.codcontadestino_mvcont}, 
                'N',  
                ${insertMovContaHistData.usuarioaltera},
                '${insertMovContaHistData.dataaltera}' ,
                ${insertMovContaHistData.saldo})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = {
            erro: err.message,
            detalhe: err.detail
        }
    });

    const conta = await useDB({
        query: `UPDATE public.fn_conta SET saldoatual_conta=${saldoAtual}, saldoanterior_conta=${saldoAnterior} WHERE id_conta=${idConta}  and loja_fk=${idLoja} `
    });

    return { code: 200, results: { idMovContaHist, statusInsert, conta } }

};

const processar = async function ({ idLoja, tipoData, dataInicial, dataFinal, datavencto_cartmov, idCartMov }) {

    let statusUpdate;


    /* if (adm != null) {

        ad = "  and vo.cartaoFk.admcartaoFk.idAdmcartao=" + adm + " ";

    }

    switch (tipo) {
        case "A":
            tc = "  ";
            break;
        case "C":
            tc = " and (vo.tipocartaoCartmov='C') ";
            break;
        case "D":
            tc = " and (vo.tipocartaoCartmov='D') ";
            break;
        default:
            break;
    }

    switch (status) {
        case "A":
            tc2 = " and vo.statusCartmov='A' ";
            break;
        case "F":
            tc2 = " and vo.statusCartmov='F'  ";
            break;
        default:
            tc2 = "   ";
            break;
    } */

    const ecfCartaoMov = await useDB({
        query: `select Ecf_Cartaomov.* from Ecf_Cartaomov, ecf_cupomcab where Ecf_Cartaomov.loja_fk=${idLoja} and (Ecf_Cartaomov.${tipoData} between '${dataInicial}' and '${dataFinal}')  and ecf_Cupomcab.status_Cupom in ('F','O','D') and ecf_Cupomcab.coo_Cupom!=0 AND ecf_cartaomov.cupomcab_fk = ecf_cupomcab.id_cupomcab order by Ecf_Cartaomov.${tipoData} asc`
    });

    /*  String hql = "select vo from EcfCartaomov vo"
     + " where vo.cfLoja=" + loja.getIdLoja() + ""
     + " and (vo." + tipoData + " between '" + sd.format(datainicial) + "'"
     + " and '" + sd.format(datafinal) + "')"
     + "  " + tc + ""
     + tc2
     + tc3
     + ad
     + " and vo.ecfCupomcab.statusCupom in ('F','O','D')"
     + " and vo.ecfCupomcab.cooCupom!=0 "
     + " order by vo." + tipoData + " asc"; */


    const ecfcartaoMov2 = await useDB({
        query: `select * from Ecf_Cartaomov where loja_fk=${idLoja} and (dataemissao_Cartmov between '${dataInicial}' and '${dataFinal}')  and receber_Rec_Fk is not null order by dataemissao_Cartmov asc`
    });

    /* String hqlr = "select vo from EcfCartaomov vo"
                    + " where vo.cfLoja=" + loja.getIdLoja() + ""
                    + " and (vo. dataemissaoCartmov between '" + sd.format(datainicial) + "'"
                    + " and '" + sd.format(datafinal) + "')"
                    + "  " + tc + ""
                    + tc2
                    + tc3
                    + ad
                    + " "
                    + " and receberRecFk is not null"
                    + " order by vo.dataemissaoCartmov asc"; */

    const cartaoMov = await useDB({
        query: `select ecf_cartaomov.id_Cartaomov,  ecf_cartaomov.loja_Fk, ecf_cartaomov.datavencto_Cartmov, ecf_cartaomov.tipocartao_Cartmov, cd_admcartao.diascobrancadebito, 
        cast(ecf_cartaomov.dataemissao_Cartmov as date)  from Ecf_Cartaomov, cd_admcartao, ecf_cupomcab where ecf_cartaomov.loja_fk=${idLoja} and (ecf_cartaomov.${tipoData} between '${dataInicial}' and '${dataFinal}') and ecf_Cupomcab.status_Cupom  in ('F','O','D') and ecf_Cupomcab.coo_Cupom!=0  and ecf_cartaomov.cupomcab_fk = ecf_cupomcab.id_cupomcab`
    });

    const updateCartaoMov = await useDB({
        query: ` UPDATE public.ecf_cartaomov SET  datavencto_cartmov='${datavencto_cartmov}' WHERE id_cartaomov=${idCartMov} and loja_fk=${idLoja}  and datavencto_cartmov is null`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { ecfCartaoMov, ecfcartaoMov2, cartaoMov } }

};

const listarCartoes = async function ({ tipoCartao }) {

    const todosCartao = await useDB({
        query: "SELECT * FROM Cd_Cartao order by tipo_Cartao asc "
    });

    const cartao = await useDB({
        query: `SELECT * FROM Cd_Cartao where tipo_Cartao='${tipoCartao}'order by tipo_Cartao asc `
    });

    return { code: 200, results: { todosCartao, cartao } }

};

const logo = async function ({ idLoja }) {

    const foto = await useDB({
        query: `select logo_loja from cf_loja where id_loja=${idLoja} `
    });

    return { code: 200, results: { foto } }

};

const editarcartao = async function ({ idCupomCab, idLoja, idTipopagto }) {

    const cupomCabTipoPagto = await useDB({
        query: `select * from Ecf_Cupomcab_Tipopagto where cupomcab_fk=${idCupomCab} and loja_Fk=${idLoja} `
    });

    const tipoPagto = await useDB({
        query: `select * from Cd_Tipopagto where id_Tipopagto=${idTipopagto} `
    });

    return { code: 200, results: { cupomCabTipoPagto, tipoPagto } }

};

const salvari = async function ({ idCupomCab, idCartaoMov, idLoja, insertCartaoMovData }) {

    let statusUpdate, statusInsert;

    const updateCartaoMov = await useDB({
        query: `UPDATE public.ecf_cartaomov SET cupomcab_fk=${idCupomCab} WHERE id_cartaomov=${idCartaoMov} and loja_fk=${idLoja};`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    const cartaoMov = await useDB({
        query: `select * from Ecf_Cartaomov where loja_fk=${idLoja} order by id_Cartaomov desc`
    });

    const insertCartaoMov = await useDB({
        query: `INSERT INTO public.ecf_cartaomov(
            id_cartaomov, 
            loja_fk, 
            cupomcab_fk, 
            cartao_fk, 
            tipocartao_cartmov, 
            valorbruto_cartmov, 
            desconto_cartmov, 
            valorliquido_cartmov, 
            dataemissao_cartmov,  
            datavencto_cartmov, 
            databaixa_cartmov,
            usuarioaltera, 
            dataaltera,   
            status_cartmov, 
            numdoctrans_cartmov, 
            contabaixada_fk,
            taxa_adm) VALUES (
                ${insertCartaoMovData.id_cartaomov}, 
                ${insertCartaoMovData.loja_fk}, 
                ${insertCartaoMovData.cupomcab_fk}, 
                ${insertCartaoMovData.cartao_fk}, 
                '${insertCartaoMovData.tipocartao_cartmov}',  
                ${insertCartaoMovData.valorbruto_cartmov}, 
                ${insertCartaoMovData.desconto_cart}, 
                ${insertCartaoMovData.valorliquido_cartmov}, 
                '${insertCartaoMovData.dataemissao_cartmov}',  
                '${insertCartaoMovData.datavencto_cartmov}', 
                '${insertCartaoMovData.databaixa_cartmov}',
                ${insertCartaoMovData.usuarioaltera},  
                '${insertCartaoMovData.dataaltera}', 
                '${insertCartaoMovData.status_cartmov}', 
                '${insertCartaoMovData.numdoctrans_cartmov}',  
                ${insertCartaoMovData.contabaixada_fk},
                ${insertCartaoMovData.taxa_adm} );`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { statusUpdate, cartaoMov, statusInsert } }

};

const atualizatp = async function ({ idLoja, idMovimento, idTipopagto, valorMov }) {

    let statusUpdate;

    const tipoPagto = await useDB({
        query: `SELECT  tipopagto_fk,sum(valorpago-troco) as tt FROM public.ecf_cupomcab_tipopagto where loja_fk=${idLoja}  and cupomcab_fk in (select id_cupomcab from ecf_cupomcab  where loja_fk=${idLoja} and status_cupom in ('F','O','D') and movimento_fk=${idMovimento} ) group by tipopagto_fk`
    });

    const updateMovTipoPag = await useDB({
        query: `UPDATE public.ecf_movimento_tipopag SET  vlmov=${valorMov} WHERE loja_fk=${idLoja}  and tipopagto_fk=${idTipopagto}  and movimento_fk=${idMovimento} `
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { tipoPagto, statusUpdate } }

};

const trocatipotp = async function ({ idLoja, idCupomCab, idTipoPagto, insertCupomCabTipoPagtoData }) {

    let statusInsert;

    const idCupomCabTipoPagto = await useDB({
        query: `SELECT max(id_cupomcab_tipopagto)+1 as idc FROM public.ecf_cupomcab_tipopagto where loja_fk=${idLoja} `
    });

    const cupomCabTipoPagto = await useDB({
        query: `SELECT id_cupomcab_tipopagto FROM public.ecf_cupomcab_tipopagto where loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab}  and tipopagto_fk=${idTipoPagto} `
    });

    const insertCupomCabTipoPagto = await useDB({
        query: `INSERT INTO public.ecf_cupomcab_tipopagto(  
            id_cupomcab_tipopagto, 
            loja_fk, 
            cupomcab_fk, 
            tipopagto_fk, 
            valorpago,   
            hash_cupomcabtipopagto, 
            usuarioaltera, 
            dataaltera, 
            troco)  VALUES (
                ${idCupomCabTipoPagto[0].idc}, 
                ${insertCupomCabTipoPagtoData.loja_fk}, 
                ${insertCupomCabTipoPagtoData.cupomcab_fk}, 
                ${insertCupomCabTipoPagtoData.tipopagto_fk},   
                ${insertCupomCabTipoPagtoData.valorpago},
                '',  
                ${insertCupomCabTipoPagtoData.usuarioaltera},
                '${insertCupomCabTipoPagtoData.dataaltera}', 
                ${insertCupomCabTipoPagtoData.troco});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idCupomCabTipoPagto, cupomCabTipoPagto, statusInsert } }

};

const atualizataxas = async function ({ valorLiquido, taxaAdm, idCartMov, idLoja }) {

    let statusUpdate;

    const updateCartaoMov = await useDB({
        query: `UPDATE public.ecf_cartaomov SET valorliquido_cartmov=${valorLiquido}, taxa_adm=${taxaAdm} WHERE id_cartaomov=${idCartMov} and loja_fk=${idLoja}`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { statusUpdate } }

};

const atualizataxasd = async function ({ dataVencto, idCartMov, idLoja }) {

    let statusUpdate;

    const updateCartaoMov = await useDB({
        query: `UPDATE public.ecf_cartaomov SET datavencto_cartmov='${dataVencto}' WHERE id_cartaomov=${idCartMov} and loja_fk=${idLoja}`
    }).then(() => {
        statusUpdate = 'Registro atulizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { statusUpdate } }

};

const setarcupom = async function ({ idCupomCab, idLoja, idTipoPagto }) {

    const cupom = await useDB({
        query: `select * from Ecf_Cupomcab_Tipopagto where cupomcab_fk=${idCupomCab} and loja_Fk=${idLoja} `
    });

    const tipoPagto = await useDB({
        query: `select * from Cd_Tipopagto where id_Tipopagto=${idTipoPagto} `
    });

    return { code: 200, results: { cupom, tipoPagto } }

};

const pesquisarPorColunav = async function ({ colunaBuscacu, textoBuscacu, idLoja, dataInicial, dataFinal }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab WHERE (UPPER(CAST(${colunaBuscacu} as text)) LIKE '%${textoBuscacu.toUpperCase()}%')  and loja_fk=${idLoja} and status_Cupom in ('F','O','D') and tipo='V'  and (cast(datahora_Cupom as date) between '${dataInicial}'  and '${dataFinal}') and coo_Cupom!=0 ORDER BY datahora_Cupom desc`
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListaBuscav = async function ({ colunaBuscacu, textoBuscacu, idLoja, dataInicial, dataFinal }) {

    const lista = await useDB({
        query: `SELECT * FROM Ecf_Cupomcab WHERE (UPPER(CAST(${colunaBuscacu} as text)) LIKE '%${textoBuscacu.toUpperCase()}%')  and loja_fk=${idLoja} and status_Cupom in ('F','O','D') and tipo='V'  and (cast(datahora_Cupom as date) between '${dataInicial}'  and '${dataFinal}') and coo_Cupom!=0 ORDER BY datahora_Cupom desc`
    });

    return { code: 200, results: { lista } }

};

const excluir = async function ({ idCupomCab, idLoja }) {

    const cupomCabTipoPagto = await useDB({
        query: `select * from Ecf_Cupomcab_Tipopagto where cupomcab_fk=${idCupomCab} and loja_Fk=${idLoja} `
    });

    return { code: 200, results: { cupomCabTipoPagto } }

};

module.exports = {
    baixar,
    processar,
    listarCartoes,
    logo,
    editarcartao,
    salvari,
    atualizatp,
    trocatipotp,
    atualizataxas,
    atualizataxasd,
    setarcupom,
    pesquisarPorColunav,
    preencherListaBuscav,
    excluir
}