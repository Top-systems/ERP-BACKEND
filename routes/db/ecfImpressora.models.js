const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const salvarc = async function ({ idLoja }) {

    const classFiscalImpressora = await useDB({
        query: `SELECT * FROM Lf_Classfiscal_Impressora WHERE loja_Fk=${idLoja} ORDER BY id_Cfimpressora DESC`
    });

    return { code: 200, results: { classFiscalImpressora } }

};

const pegarClassFiscalImpressora = async function ({ idImpr, idLoja }) {

    const classFiscalImpressora = await useDB({
        query: `SELECT * FROM Lf_Classfiscal_Impressora WHERE ecf_Impressora_Fk=${idImpr} and loja_Fk=${idLoja}  order by codcf asc`
    });

    return { code: 200, results: { classFiscalImpressora } }

};

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM ecf_impressora WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM ecf_impressora WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
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

const listaAlvo = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM Ecf_Impressora WHERE loja_Fk=${idLoja}`
    });

    return { code: 200, results: { lista } }

};

const salvar = async function ({ idLoja }) {

    const impressora = await useDB({
        query: `SELECT * FROM Ecf_Impressora WHERE loja_Fk=${idLoja} ORDER BY id_Impr DESC`
    });

    const classFiscalImpr = await useDB({
        query: `SELECT * FROM Lf_Classfiscal_Impressora WHERE loja_Fk=${idLoja} ORDER BY id_Cfimpressora DESC`
    });

    return { code: 200, results: { impressora, classFiscalImpr } }

};

const primeiro = async function ({ idLoja }) {

    const impressora = await useDB({
        query: `SELECT * FROM Ecf_Impressora WHERE loja_Fk=${idLoja}`
    });

    return { code: 200, results: { impressora } }

};

const ultimo = async function ({ idLoja }) {

    const impressora = await useDB({
        query: `SELECT * FROM Ecf_Impressora WHERE loja_Fk=${idLoja}`
    });

    return { code: 200, results: { impressora } }

};

const anterior = async function ({ idLoja }) {

    const impressora = await useDB({
        query: `SELECT * FROM Ecf_Impressora WHERE loja_Fk=${idLoja}`
    });

    return { code: 200, results: { impressora } }

};

const proximo = async function ({ idLoja }) {

    const impressora = await useDB({
        query: `SELECT * FROM Ecf_Impressora WHERE loja_Fk=${idLoja}`
    });

    return { code: 200, results: { impressora } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca, idLoja }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Ecf_Impressora WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase()}%' AND loja_Fk=${idLoja}  ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListaBusca = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM Ecf_Impressora WHERE loja_Fk=${idLoja} `
    });

    return { code: 200, results: { lista } }

};

const listaa = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM Ecf_Impressora WHERE loja_Fk=${idLoja} `
    });

    return { code: 200, results: { lista } }

};

const listaanfce = async function ({ idLoja }) {

    const estacao = await useDB({
        query: `SELECT Cf_Estacao.* FROM Cf_Estacao, ecf_impressora WHERE Cf_Estacao.loja_fk=${idLoja} and ecf_impressora.marcaecf_Impr='NFCE' and Cf_Estacao.ecf_id_impressora_fk = ecf_impressora.id_impr order by num_Estacao asc `
    });

    return { code: 200, results: { estacao } }

};

const listasat = async function({ idLoja }){ 

    const lista = await useDB({ 
    query: `SELECT Cf_Estacao.* FROM Cf_Estacao, ecf_impressora WHERE Cf_Estacao.loja_fk=${idLoja} and ecf_impressora.marcaecf_Impr='SAT' and Cf_Estacao.ecf_id_impressora_fk = ecf_impressora.id_impr order by num_Estacao asc `
 }); 

 return { code: 200, results: { lista }}  
    
};


module.exports = {
    salvarc,
    pegarClassFiscalImpressora,
    processarFiltro,
    listaAlvo,
    salvar,
    primeiro,
    ultimo,
    anterior,
    proximo,
    pesquisarPorColuna,
    preencherListaBusca,
    listaa,
    listaanfce,
    listasat
}