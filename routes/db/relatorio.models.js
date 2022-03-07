const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const iniciar = async function({ idLoja }){ 

    const rede = await useDB({ 
    query: `select * from Cd_Rede where loja_fk=${idLoja} and programa='vendedor' order by nome asc `
 }); 

 return { code: 200, results: { rede }}  
    
};

const listarGrupos = async function({  }){ 

    const cupomDetProd = await useDB({ 
    query: `select * from Ecf_Cupomdet_Prod WHERE status_Cupitem='F'`
 }); 

 return { code: 200, results: { cupomDetProd }}  
    
};

const logo = async function({ idLoja }){ 

    const foto = await useDB({ 
    query: `select logo_loja from cf_loja where id_loja=${idLoja} `
 }); 

 return { code: 200, results: { foto }}  
    
};

module.exports = {
    iniciar,
    listarGrupos,
    logo
}