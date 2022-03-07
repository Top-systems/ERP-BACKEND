const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const pegaNomeFuncionario = async function({ id }){ 

    const nome = await useDB({ 
        query: `SELECT * FROM Cd_Cliente WHERE funcionario_Fk=${id}AND funcionario_Fk IS NOT NULL`
    }); 

    // String hql = "SELECT vo FROM CdCliente vo"
    //         + " WHERE vo.funcionarioFk.idFuncionario=" + id + ""
    //         + " AND vo.funcionarioFk.idFuncionario IS NOT NULL";

 return { code: 200, results: { nome }}  
    
};

const pegarNiveisUsuario = async function({ idUsuario }){ 

    const nivel = await useDB({ 
        query: `SELECT * FROM Cd_Nivelacesso WHERE usuario_Fk = ${idUsuario} order by id_Nivelacesso desc`
    }); 

    // String hql = "SELECT n FROM CdNivelacesso n"
    //         + " WHERE n.usuarioFk.idUsuario='" + this.usuario.getIdUsuario() + "'"
    //         + " order by n.cdNivelacessoPK.idNivelacesso desc";

 return { code: 200, results: { nivel }}  
    
};

const salvarNivelAcesso = async function({ idUsuario,  idLoja}){ 

    const NivelACesso1 = await useDB({ 
        query: `SELECT * FROM Cd_Nivelacesso  WHERE usuario_fk = ${idUsuario} AND loja_Fk=${idLoja}`
    });     

    // String hql = "SELECT n FROM CdNivelacesso n"
    //         + " WHERE n.usuarioFk.nomeUsu='" + this.usuario.getNomeUsu() + "'"
    //         + " AND n.lojaFk.idLoja=" + this.nivelAcesso.getLojaFk().getIdLoja() + "";

    const NivelACesso2 = await useDB({ 
        query:  `SELECT * FROM Cd_Nivelacesso WHERE loja_Fk=${idLoja}ORDER BY id_Nivelacesso DESC`
    });

    // String hqlb = "SELECT vo FROM CdNivelacesso vo"
    //         + " WHERE vo.lojaFk=" + this.nivelAcesso.getLojaFk().getIdLoja() + ""
    //         + " ORDER BY vo.cdNivelacessoPK.idNivelacesso DESC";

 return { code: 200, results: { NivelACesso1, NivelACesso2 }}  
    
};

const alterarSenha = async function({ idUsuario, senhaUsuario, novaSenha }){ 

    const senha = await useDB({ 
        query: `select * from Cd_Usuario where senha_Usu=md5('${novaSenha}')`
    }); 

    // hql = "select vo from CdUsuario vo"
    //     + " where vo.senhaUsu='" + Util.converterStringEmMD5(novaSenha) + "'";

    const senha2 = await useDB({ 
        query: `select * from Cd_Usuario where senha_Usu=md5('${senhaUsuario}') and id_Usuario!=${idUsuario}` 
    });

    // hql = "select vo from CdUsuario vo"
    //     + " where vo.senhaUsu='" + Util.converterStringEmMD5(usuario.getSenhaUsu()) + "'"
    //     + " and vo.idUsuario!=" + usuario.getIdUsuario() + "";

 return { code: 200, results: { senha, senha2 }}  
    
};

const alterarSenha2 = async function({ senhaUsuario, idUsuario }){ 

    const senha = await useDB({ 
        query:  `select * from Cd_Usuario where senha_Usu=md5('${senhaUsuario}') and id_Usuario!= ${idUsuario}`
    }); 

    // hql = "select vo from CdUsuario vo"
    //      + " where vo.senhaUsu='" + Util.converterStringEmMD5(u.getSenhaUsu()) + "'"
    //      + " and vo.idUsuario!=" + u.getIdUsuario() + "";

 return { code: 200, results: { senha }}  
    
};

const listaAlvo = async function({  }){ 

    const lista = await useDB({ 
        query: "select * from Cd_Usuario where nome_Usu!='inforerp' order by id_Usuario desc"
    }); 

    // String hql = "select vo from CdUsuario vo where vo.nomeUsu!='inforerp'  order by vo.idUsuario desc";

 return { code: 200, results: { lista }}  
    
};

const salvar = async function({ idUsuario, senhaUsuario, idFuncionario }){ 

    const salvar1 = await useDB({ 
        query: `SELECT * FROM Cd_Cliente WHERE funcionario_Fk=${idFuncionario}AND funcionario_Fk IS NOT NULL`
    }); 

    // String hqlf = "SELECT vo FROM CdCliente vo"
    //         + " WHERE vo.funcionarioFk.idFuncionario=" + this.usuario.getFuncionarioFk().getIdFuncionario() + ""
    //         + " AND vo.funcionarioFk.idFuncionario IS NOT NULL";

    const salvar2 = await useDB({ 
        query: `select * from Cd_Usuario where senha_Usu='${senhaUsuario}' `
    })

    // hql = "select vo from CdUsuario vo"
    //     + " where vo.senhaUsu='" + Util.converterStringEmMD5(usuario.getSenhaUsu()) + "'";

    const salvar3 = await useDB({ 
        query: `select * from Cd_Usuario where senha_Usu='${senhaUsuario} 'and id_Usuario!=${idUsuario}`
    })

    // hql = "select vo from CdUsuario vo"
    //     + " where vo.senhaUsu='" + Util.converterStringEmMD5(usuario.getSenhaUsu()) + "'"
    //     + " and vo.idUsuario!=" + usuario.getIdUsuario() + "";



 return { code: 200, results: { salvar1, salvar2, salvar3 }}  
    
};

const pesquisarPorTexto = async function({ colunaBusca, textoBusca }){ 

    const texto = await useDB({ 
        query: `SELECT * FROM Cd_Usuario  WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%'  and  nome_Usu!='inforerp'  ORDER BY ${colunaBusca} ASC`
    }); 

    // String hql = "SELECT vo FROM CdUsuario vo"
    //         + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
    //         + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
    //         + " and  vo.nomeUsu!='inforerp'  ORDER BY vo." + this.colunaBusca + " ASC";

 return { code: 200, results: { texto }}  
    
};

const pesquisarPorInteiro = async function({ colunaBusca, textoBusca }){ 

    const texto = await useDB({ 
        query: `SELECT * FROM Cd_Usuario WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' and nome_Usu!='inforerp'  ORDER BY ${colunaBusca} ASC`
    }); 

    // String hql = "SELECT vo FROM CdUsuario vo"
    //         + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
    //         + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' and  vo.nomeUsu!='inforerp'  ORDER BY vo." + this.colunaBusca + " ASC";

 return { code: 200, results: { texto }}  
    
};

const preencherListaBusca = async function({  }){ 

    const lista = await useDB({ 
        query: "select * from Cd_Usuario where nome_Usu!='inforerp' order by id_Usuario desc"
    }); 
    // String hql = "select vo from CdUsuario vo where vo.nomeUsu!='inforerp'  order by vo.idUsuario desc";

 return { code: 200, results: { lista }}  
    
};

module.exports = {
    pegaNomeFuncionario,
    pegarNiveisUsuario,
    salvarNivelAcesso,
    alterarSenha,
    alterarSenha2,
    listaAlvo,
    salvar,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    preencherListaBusca
}