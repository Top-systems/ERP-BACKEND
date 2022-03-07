const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const listarcupons = async function ({ idLoja, dataInicial, dataFinal }) {

    const cupomCab = await useDB({
        query: `SELECT id_cupomcab, loja_fk,  totalitens_cupom, totalbruto_cupom, totalliquido_cupom, datahora_cupom, serieecf_cupom, coo_cupom, tipo  FROM public.ecf_cupomcab where loja_fk=${idLoja} and status_cupom in ('F','O')  and (cast(datahora_cupom as date) between '${dataInicial}' and '${dataFinal}') order by datahora_cupom asc`
    });

    return { code: 200, results: { cupomCab } }

};

const listaritens = async function ({ idLoja, idCupomCab }) {

    const cupomDetProd = await useDB({
        query: `select Ecf_Cupomdet_Prod.* from Ecf_Cupomdet_Prod, ecf_cupomcab where ecf_Cupomcab.loja_Fk=${idLoja} and  ecf_Cupomcab.id_Cupomcab=${idCupomCab} and Ecf_Cupomdet_Prod.cupomcab_fk=${idCupomCab} and status_Cupitem='F'  order by seqitem asc`
    });

    return { code: 200, results: { cupomDetProd } }

};

const confirmalotes = async function ({ idLoja, insertCupomDetLoteMedData }) {

    let statusInsert;

    const cupomLoteMed = await useDB({
        query: `select id_Cupomdet_Lotemed from Ecf_Cupomdet_Lotemed where loja_fk=${idLoja} order by id_Cupomdet_Lotemed desc`
    });

    const insertCupomDetLoteMed = await useDB({
        query: `INSERT INTO public.ecf_cupomdet_lotemed(
            id_cupomdet_lotemed, 
            loja_fk, 
            cupomdet_fk, 
            lote_fk, 
            produto_fk, 
            qtdevendida_lotemed, 
            statusvenda, 
            usuarioaltera, 
            dataaltera, 
            enviado_anvisa, 
            data_anvisa)VALUES (
                ${insertCupomDetLoteMedData.id_cupomdet_lotemed}, 
                ${insertCupomDetLoteMedData.loja_fk}, 
                ${insertCupomDetLoteMedData.cupomdet_fk}, 
                ${insertCupomDetLoteMedData.lote_fk}, 
                ${insertCupomDetLoteMedData.produto_fk}, 
                ${insertCupomDetLoteMedData.qtdevendida_lotemed},
                'F', 
                ${insertCupomDetLoteMedData.usuarioaltera}, 
                '${insertCupomDetLoteMedData.dataaltera}',
                'N', 
                '${insertCupomDetLoteMedData.data_anvisa}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { cupomLoteMed, statusInsert } }

};

const listarLotes = async function ({ idReceita, idLoja }) {

    const cupomDetProd = await useDB({
        query: `SELECT  datahora_cupom FROM public.ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where  receita_fk =${idReceita}  and det.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}   and status_cupom in ('F','O') and   status_cupitem='F'`
    });

    const cupomDetLoteMed = await useDB({
        query: `select * from Ecf_Cupomdet_Lotemed, ecf_cupomdet_prod where ecf_cupomdet_lotemed.loja_fk=${idLoja} and ecf_Cupomdet_Prod.receita_fk=${idReceita} and cupomdet_fk is not null and ecf_Cupomdet_Prod.receita_fk is not null `
    });

    const cupomDetProd2 = await useDB({
        query: `select * from Ecf_Cupomdet_Prod where receita_fk=${idReceita} and loja_Fk=${idLoja} and status_Cupitem='F' `
    });


    return { code: 200, results: { cupomDetProd, cupomDetLoteMed, cupomDetProd2 } }

};

const listarimg = async function ({ idReceita, obs, idLoja }) {

    const imgReceitas = await useDB({
        query: `select * from Vd_Img_Receitas where receita_Fk=${idReceita} and obs='${obs}' and loja_Fk=${idLoja}`
    });

    return { code: 200, results: { imgReceitas } }

};

const cupom = async function ({ idLoja, idReceita }) {

    const cupomDetProd = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom, ecf_Cupomcab.serieecf_Cupom from Ecf_Cupomdet_Prod, ecf_cupomcab where Ecf_Cupomdet_Prod.loja_fk=${idLoja} and Ecf_Cupomdet_Prod.receita_fk=${idReceita} and receita_fk is not null and status_Cupitem='F' and ecf_Cupomcab.coo_Cupom!=0 `
    });

    return { code: 200, results: { cupomDetProd } }

};

const pegarCodBarras = async function ({ idProd }) {

    const codBarra = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE produto_Fk=${idProd} and ativo_Codbar='S' ORDER BY id_Codigobarras DESC`
    });

    return { code: 200, results: { codBarra } }

};

const processarFiltro = async function ({ valor, filtro, idLoja, dataHoraCupom, dataInicial, dataFinal }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM Vd_Receita WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM Vd_Receita WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const cupomDetProd = await useDB({
        query: `select receita_fk from Ecf_Cupomdet_Prod, ecf_cupomcab where Ecf_Cupomdet_Prod.loja_fk=${idLoja}  and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and status_Cupitem='F' and ecf_Cupomcab.status_Cupom in ('F','O','D')  and receita_fk is not null and ecf_cupomdet_prod.cupomcab_fk = ecf_cupomcab.id_Cupomcab order by ecf_Cupomcab.datahora_Cupom asc  `
    });

    const cupomDetProd2 = await useDB({
        query: `select receita_fk from Ecf_Cupomdet_Prod, ecf_cupomcab where Ecf_Cupomdet_Prod.loja_fk=${idLoja}  and (cast(ecf_Cupomcab.datahora_Cupom as date) between '${dataInicial}' and '${dataFinal}') and status_Cupitem='F' and ecf_Cupomcab.status_Cupom in ('F','O','D')  and receita_fk is not null and ecf_cupomdet_prod.cupomcab_fk = ecf_cupomcab.id_Cupomcab order by ecf_Cupomcab.datahora_Cupom asc  `
    });

    return { code: 200, results: { comecandoCom, contendo, cupomDetProd, cupomDetProd2 } }

    //  public void processarFiltro() {

    /**
     * //string da consulta
            StringBuilder sb = new StringBuilder("SELECT vo FROM VdAbastecimentos vo");
     */

};

const salvar = async function ({ idLoja, idReceita, idCupomDetProd }) {

    const receita = await useDB({
        query: `SELECT * FROM Vd_Receita WHERE loja_fk=${idLoja} and statusvenda_Rec='F'  ORDER BY id_Receita DESC`
    });

    const updateCupomDetProd = await useDB({
        query: `UPDATE public.ecf_cupomdet_prod SET receita_fk=${idReceita} WHERE id_cupomdet_prod=${idCupomDetProd}  and loja_fk=${idLoja}`
    });
    return { code: 200, results: { receita, updateCupomDetProd } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca, idLoja }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Vd_Receita WHERE UPPER(CAST(${colunaBusca} as text))  LIKE '%${textoBusca.toUpperCase()}%' AND loja_Fk=${idLoja} and statusvenda_Rec='F'  ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListaBusca = async function({ idLoja }){ 

    const lista = await useDB({ 
    query: `SELECT * FROM Vd_Receita WHERE loja_Fk=${idLoja} and statusvenda_Rec='F'  order by id_Receita desc `
 }); 

 return { code: 200, results: { lista }}  
    
};

const run = async function({ idImgReceita }){ 

    const updateImgReceitas = await useDB({ 
    query: `UPDATE public.vd_img_receitas  SET salvows=1 WHERE id=${idImgReceita}`
 }); 

 return { code: 200, results: { updateImgReceitas }}  
    
};

const setarnul = async function({ idCupomDetProd, idLoja }){ 

    const updateCupomDetProd = await useDB({ 
    query: `UPDATE public.ecf_cupomdet_prod   SET  receita_fk=null WHERE id_cupomdet_prod=${idCupomDetProd} and loja_fk=${idLoja} `
 }); 

 return { code: 200, results: { updateCupomDetProd }}  
    
};

module.exports = {
    listarcupons,
    listaritens,
    confirmalotes,
    listarLotes,
    listarimg,
    cupom,
    pegarCodBarras,
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    preencherListaBusca,
    run,
    setarnul
}