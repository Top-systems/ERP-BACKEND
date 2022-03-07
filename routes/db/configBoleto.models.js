const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const contas = async function ({ idLoja }) {

    const configBoleto = await useDB({
        query: `SELECT * FROM Config_Boleto WHERE loja_Fk=${idLoja}  ORDER BY id ASC`
    });

    return { code: 200, results: { configBoleto } }

};

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM config_boleto WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM config_boleto WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
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

const salvar = async function ({ idLoja, insertConfigBoletoData }) {

    let statusInsert;

    const maxIdConfigBoleto = await useDB({
        query: `select max(id)+1 as idc from config_boleto where loja_fk=${idLoja} `
    });

    const insertConfigBoleto = await useDB({
        query:`INSERT INTO public.config_boleto(	
            id, 
            loja_fk, 
            descricao)	VALUES (
                ${maxIdConfigBoleto[0].idc}, 
                ${insertConfigBoletoData.loja_fk}, 
                '${insertConfigBoletoData.descricao}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { maxIdConfigBoleto, statusInsert } }

};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca, idLoja }){ 

    const pesquisa = await useDB({ 
    query: `SELECT * FROM Config_Boleto WHERE UPPER(CAST(${colunaBusca} as text))  LIKE '${textoBusca.toUpperCase()}%' and loja_Fk=${idLoja} ORDER BY ${colunaBusca} ASC`
 }); 

 return { code: 200, results: { pesquisa }}  
    
};

const logo = async function({ idLoja }){ 

    const logoLoja = await useDB({ 
    query: `select logo_Loja from Cf_Loja where id_Loja=${idLoja}`
 }); 

 return { code: 200, results: { logoLoja }}  
    
};

module.exports = {
    contas,
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    logo
}