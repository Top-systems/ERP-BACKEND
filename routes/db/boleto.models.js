const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const logar = async function({ idUsu, senhaUsu }){ 

    const id = await useDB({ 
        query: `SELECT u.id_usuario FROM cd_usuario AS u INNER JOIN cd_nivelacesso AS n ON n.usuario_fk=u.id_usuario INNER JOIN cd_grupo_permissao AS g ON g.id_grppermissao=n.grupopermissao_fk WHERE u.status_usu='A' AND g.nome_grppermissao='SUPERVISOR' AND g.supervisor_grppermissao=true AND u.id_usuario=${idUsu}  AND u.senha_usu=md5('${senhaUsu}') LIMIT 1 ` 
    }); 

    const cnpj = await useDB({ 
        query: "SELECT cnpj_loja FROM cf_loja ORDER BY id_loja asc " 
    })

 return { code: 200, results: { id, cnpj }}  
    
};

module.exports ={
    logar
}