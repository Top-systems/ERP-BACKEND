const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

/**
 *  public void init() {
        status = "T";
        datainicial2 = Calendar.getInstance().getTime();
        datafinal2 = Calendar.getInstance().getTime();
        loja = (CfLoja) Util.pegarObjetoDaSessao("loja");
        this.permissao = Util.verificaPermissaoDaPagina("febrafar");
        // listar();
        transacaos = new ArrayList<>();
        if (transacaos.isEmpty()) {
            transacaos = new TransacaoRN().buscarHQL("select vo from CdRedeTransacao vo"
                    + " where vo.cfLoja.idLoja=" + loja.getIdLoja() + " "
                    + " order by cdRedeTransacaoPK.id desc");
        }
    }
 */
const listar = async function({ datainicial, datafinal, idLoja }){ 

    const lista = await useDB({ 
        query: `select * from Cd_Rede_Transacao where loja_fk=${idLoja} and (cast(datahora as date) between '${datainicial}' and '${datafinal}' ) order by datahora desc`
    }); 

    /**
     *  List<CdRedeTransacao> e = sessao.createQuery("select vo from CdRedeTransacao vo"
                    + " where vo.cfLoja=" + loja.getIdLoja() + ""
                    + " and (cast(vo.datahora as date) between "
                    + " '" + sd.format(datainicial2) + "' and "
                    + " '" + sd.format(datafinal2) + "' )"
                    + st
                    + " order by vo.datahora desc").list();
     */

 return { code: 200, results: { lista }}  

//  public void listar() {
};

const setar = async function({ idLoja, idTransacao }){ 

    const setar = await useDB({ 
        query: `select Cd_Rede_Transacao_Produto.* from Cd_Rede_Transacao_Produto, cd_rede_transacao where cd_rede_transacao_produto.loja_fk=${idLoja} and cd_rede_transacao.id=${idTransacao} and cd_rede_transacao.id = transacao_fk order by id desc`
    }); 

    /**
     * itens = new TransacaoProdutoRN().listarRedeHQL("select vo from CdRedeTransacaoProduto vo"
                + " where vo.cfLoja.idLoja=" + loja.getIdLoja() + ""
                + " and vo.cdRedeTransacao.cdRedeTransacaoPK.id=" + transacao.getCdRedeTransacaoPK().getId() + " "
                + " order by cdRedeTransacaoProdutoPK.id desc");
     */

 return { code: 200, results: { setar }}  

//  public void setar() {
 
};

module.exports = {
    listar,
    setar
}