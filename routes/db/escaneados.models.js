const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

/**
 * public void init() {
        Util.atualizasequencia("id", "vd_img_receitas", "vd_img_receitas_id_seq");

        this.disabled = true;
        this.ultimo = true;
        this.posicao = 0;
        this.insercao = false;
        this.escaneado = new VdImgReceitas();
        this.escaneadob = new VdImgReceitas();
        this.escaneados = new VdImgReceitas();
        //coluna inicial de pesquisa

        //verifica a permisso do usuario nessa pagina
        this.permissao = Util.verificaPermissaoDaPagina("escaneados");

        if (Util.pegarURI().equals("/ERP/restrito/farmacia/escaneados.ip")) {
            lista = new EscaneadoRN().buscarHQL("select vo from VdImgReceitas vo order by id desc");
        }
        baixaranexos();
    }
 */

const atualiza = async function({  }){ 

    const imgReceita = await useDB({ 
        query: "select * from Vd_Img_Receitas order by id desc" 
    }); 

 return { code: 200, results: { imgReceita }}  
    
};

const run = async function({ id }){ 

    let statusUpdate = "";

    const atualiza = await useDB({ 
        query: `UPDATE public.vd_img_receitas SET salvows=1 WHERE id=${id}`
    }).then(()=>{
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err)=>{
        statusUpdate = err.message
    })

 return { code: 200, results: { statusUpdate } }  
    
};

module.exports = {
    atualiza,
    run
}