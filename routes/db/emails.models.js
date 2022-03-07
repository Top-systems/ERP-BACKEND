const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

/**
 * public void init() {
        loja = (CfLoja) Util.pegarObjetoDaSessao("loja");
        campo = "dataenvio";
        valor = "";

        Calendar primeiroDia = Calendar.getInstance();
        primeiroDia.set(Calendar.DAY_OF_MONTH, 1);

        Calendar ultimoDia = Calendar.getInstance();
        ultimoDia.add(Calendar.MONTH, 1);
        ultimoDia.set(Calendar.DAY_OF_MONTH, 1);
        ultimoDia.add(Calendar.DAY_OF_MONTH, -1);
        this.datai = primeiroDia.getTime();
        // ultima data do mes atual
        this.dataf = ultimoDia.getTime();

        emails = new EmailRN().buscarHQL("select vo from Emails vo"
                + " where loja=" + loja.getIdLoja() + " "
                + " order by id desc");
        this.permissao = Util.verificaPermissaoDaPagina("emails");

    }
 */

const pesquisar = async function({ dataInicial, dataFinal, idLoja, campo, valor}){ 

    const porData = await useDB({ 
        query: `select * from Emails where (cast(dataenvio as date) between '${dataInicial}' and '${dataFinal}')  and loja=${idLoja} order by id desc`
    }); 

    const porCampo = await useDB({ 
        query: `select * from Emails where upper(cast(${campo} as text)) like '%${valor.toUpperCase()}%' and loja=${idLoja} order by ${campo} desc` 
    })

 return { code: 200, results: { porData, porCampo } };  
    
};

module.exports ={
    pesquisar
}