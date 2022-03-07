const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const consultar = async function ({ idLoja, dataInicial, dataFinal }) {

    const movimento = await useDB({
        query: `select * from Ecf_Movimento where loja_fk=${idLoja} and (cast(datahoraabertura_Mov as date) between '${dataInicial}' and '${dataFinal}') and status_Mov!='A' order by datahoraabertura_Mov asc`
    });

    return { code: 200, results: { movimento } }

};

const listartipos = async function ({ idLoja, idMovimento, dataMov }) {

    const movimentoTipopag = await useDB({
        query: `select * from Ecf_Movimento_Tipopag, cd_tipopagto  where loja_fk=${idLoja} and movimento_fk=${idMovimento} and ecf_movimento_tipopag.tipopagto_fk = cd_tipopagto.id_tipopagto order by cd_tipopagto.descricao_Tipopag asc`
    });

    const cargaSangria = await useDB({
        query:`select * from Ecf_Cargasangria where loja_fk=${idLoja} and movimento_fk=${idMovimento} and cast(datamov_Carsan as date)='${dataMov}' and (tipo_Carsan='S' or tipo_Carsan='E') `
    });

    const cargaSangria2 = await useDB({
        query:`select * from Ecf_Cargasangria where loja_fk=${idLoja} and movimento_fk=${idMovimento} and cast(datamov_Carsan as date)='${dataMov}' and tipo_carsan='C' `
    });

    const cargaSangria3 = await useDB({
        query:`select * from Ecf_Cargasangria where loja_fk=${idLoja} and movimento_fk=${idMovimento} and cast(datamov_Carsan as date)='${dataMov}' and tipo_carsan='C' `
    });


    return { code: 200, results: { movimentoTipopag, cargaSangria, cargaSangria2, cargaSangria3 } }

};

const salvar = async function({ idLoja, idMovimento }){ 

    const movimentoTipoPag = await useDB({ 
    query: `select * from Ecf_Movimento_Tipopag where loja_fk=${idLoja} and id_Movimento_Tipopag=${idMovimento}`
 }); 

 return { code: 200, results: { movimentoTipoPag }}  
    
};

const listarvendas = async function({ idLoja, idMovimento }){ 

    const cupomCab = await useDB({ 
    query: `select * from Ecf_Cupomcab where loja_fk=${idLoja} and status_Cupom in ('F','O','D')  and movimento_fk=${idMovimento}`
 }); 

 return { code: 200, results: { cupomCab }}  
    
};

module.exports = {
    consultar,
    listartipos,
    salvar,
    listarvendas
}