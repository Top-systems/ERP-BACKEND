const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM cd_cst WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "")}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM cd_cst WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "")}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdCst vo");
 */

};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Cstpiscofins  WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const pesquisarPorColunaAguaLuz = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Cstpiscofins  WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' AND cod_Cstpiscofins > 49`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const preencherListaBuscaAguaLuz = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Cstpiscofins WHERE cod_Cstpiscofins > 49"
    }); 

 return { code: 200, results: { lista }}  
    
};

const pesquisarPorColunaTelecomunicacao = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Cstpiscofins  WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' AND cod_Cstpiscofins > 49`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const preencherListaBuscaTelecomunicacao = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Cstpiscofins WHERE cod_Cstpiscofins > 49"
    }); 

 return { code: 200, results: { lista }}  
    
};

const pesquisarPorColunaMaior49 = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Cstpiscofins  WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' AND cod_Cstpiscofins > 49`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const preencherListaBuscaMaior49 = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Cstpiscofins WHERE cod_Cstpiscofins > 49"
    }); 

 return { code: 200, results: { lista }}  
    
};

const pesquisarPorColunaMenor49 = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Cd_Cstpiscofins  WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' AND cod_Cstpiscofins <= 49`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const preencherListaBuscaMenor49 = async function({  }){ 

    const lista = await useDB({ 
        query: "SELECT * FROM Cd_Cstpiscofins WHERE cod_Cstpiscofins <= 49"
    }); 

 return { code: 200, results: { lista }}  
    
};



module.exports = {
    processarFiltro,
    pesquisarPorColuna,
    pesquisarPorColunaAguaLuz,
    preencherListaBuscaAguaLuz,
    pesquisarPorColunaTelecomunicacao,
    preencherListaBuscaTelecomunicacao,
    pesquisarPorColunaMaior49,
    preencherListaBuscaMaior49,
    pesquisarPorColunaMenor49,
    preencherListaBuscaMenor49
}