const { preencherListaBusca } = require('./produtos.model.js');
const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_Grupo_Permissao WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_Grupo_Permissao WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

 return { code: 200, results: { comecandoCom, contendo }}  

 //  public void processarFiltro() {

/**
 * //string da consulta
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdGrupoPermissao vo");
 */

};

const preencherListadePaginas = async function({  }){ 

    const lista = await useDB({ 
        query: "select * from Cd_Menu order by tipo_Menu,nome_Menu asc"
    }); 

    // String hql = "select vo from CdMenu vo order by vo.tipoMenu,nomeMenu asc";


 return { code: 200, results: { lista }}  

//  public void preeencherListadePaginas() {

    
};

const listarPermissoesDoGrupo = async function({ idGrupoPermissao }){ 

    const lista = await useDB({ 
        query: `SELECT * FROM Cd_Permissao WHERE grupopermissao_Fk=${idGrupoPermissao}`
    }); 

    /**
     * String hql = "SELECT p FROM CdPermissao p"
                + " WHERE p.cdPermissaoPK.grupopermissaoFk=" + this.grupo.getIdGrppermissao() + "";
     */


 return { code: 200, results: { lista }}  

//  private void listarPermissoesDoGrupo() {

    
};

const salvar = async function({ nomeGrupoPermissao, idGrupoPermissao, idPermissao, menu_fk, grupopermissao_fk, permissao, usuarioaltera, dataaltera }){ 

    let statusInsert = "";

    const salvar1 = await useDB({ 
        query: `SELECT * FROM Cd_Grupo_Permissao WHERE nome_Grppermissao='${nomeGrupoPermissao}'`
    }); 

    /**
     *  String hql = "SELECT gp FROM CdGrupoPermissao gp"
                    + " WHERE gp.nomeGrppermissao='" + grupo.getNomeGrppermissao() + "'"
                    + " ";
     */
    
    const salvar2 = await useDB({ 
        query: `SELECT * FROM Cd_Grupo_Permissao WHERE nome_Grppermissao='${nomeGrupoPermissao}' AND id_Grppermissao!=${idGrupoPermissao}`
    });

    /**
     *  String hql = "SELECT gp FROM CdGrupoPermissao gp"
                    + " WHERE gp.nomeGrppermissao='" + grupo.getNomeGrppermissao() + "'"
                    + " AND gp.idGrppermissao!=" + grupo.getIdGrppermissao() + "";
     */

    const inserir = await useDB({ 
        query: `INSERT INTO cd_permissao(
            id, 
            menu_fk, 
            grupopermissao_fk, 
            permissao, 
            usuarioaltera, 
            dataaltera)VALUES 
            (${idPermissao}, 
             ${menu_fk}, 
             ${grupopermissao_fk}, 
             '${permissao}',
             ${usuarioaltera},
             '${dataaltera}')`
    }).then(() => {
        statusInsert = "Registro inserido com sucesso";
    }).catch((err) => {
        statusInsert = err.message
    })

    /**
     *  String sql2 = "INSERT INTO cd_permissao(\n"
                                + "            id, menu_fk, grupopermissao_fk, permissao, "
                                + "usuarioaltera, dataaltera)\n"
                                + "    VALUES (?, ?, ?, ?, ?, ?);";
     */

 return { code: 200, results: { salvar1, salvar2, statusInsert }}  

 //public void salvar
    
};

const pesquisarPorTexto = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Grupo_Permissao WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${Utils.removeAspa(textoBusca.toUpperCase())}%' ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const pesquisarPorInteiro = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Grupo_Permissao WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${Utils.removeAspa(textoBusca.toUpperCase())}%' ORDER BY ${colunaBusca} ASC`
    }); 


 return { code: 200, results: { pesquisa }}  
    
};

module.exports = {
    processarFiltro,
    preencherListadePaginas,
    listarPermissoesDoGrupo,
    salvar,
    pesquisarPorTexto,
    pesquisarPorTexto,
    pesquisarPorInteiro
}