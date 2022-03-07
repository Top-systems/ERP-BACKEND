const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const iniciaInventario = async function({ idLoja}){ 

    const inventarioCab = await useDB({ 
        query: `SELECT * FROM Lf_Inventario_Cab WHERE loja_fk=${idLoja} ORDER BY id DESC `
    }); 

 return { code: 200, results: { inventarioCab }}  
    
};

const entrada = async function ({ idLoja, idProd, quantidade, dataBase, dataBusca }) {

    const compraDet1 = await useDB({
        query: `SELECT Fn_Compra_Detalhe.* FROM Fn_Compra_Detalhe, fn_compra_cabecalho WHERE Fn_Compra_Detalhe.loja_fk=${idLoja} AND Fn_Compra_Detalhe.produto_Fk=${idProd} AND Fn_Compra_Detalhe.quantidade=${quantidade} AND fn_Compra_Cabecalho.dataentradasaida_Compracab between '${dataBusca}' and '${dataBase}'`
    });

    const compraDet2 = await useDB({
        query: `SELECT Fn_Compra_Detalhe.* FROM Fn_Compra_Detalhe, fn_compra_cabecalho WHERE Fn_Compra_Detalhe.loja_fk=${idLoja} AND Fn_Compra_Detalhe.produto_Fk=${idProd} AND Fn_Compra_Detalhe.quantidade=${quantidade} AND fn_Compra_Cabecalho.dataentradasaida_Compracab between '${dataBase}' and '${dataBusca}'`
    });

    const compraDet3 = await useDB({
        query: `SELECT Fn_Compra_Detalhe.* FROM Fn_Compra_Detalhe, fn_compra_cabecalho WHERE Fn_Compra_Detalhe.loja_fk=${idLoja} AND Fn_Compra_Detalhe.produto_Fk=${idProd} AND Fn_Compra_Detalhe.quantidade=${quantidade} AND fn_Compra_Cabecalho.dataentradasaida_Compracab between '${dataBase}'`
    });

    /* if (dataBase.compareTo(dataBusca) > 0) {
        hql = "SELECT vo FROM FnCompraDetalhe vo "
                + " WHERE vo.cfLoja = " + this.lojaLogada.getIdLoja() + ""
                + " AND vo.produtoFk = " + this.fnCompDet.getProdutoFk().getIdProd() + ""
                + " AND vo.quantidade = " + this.fnCompDet.getQuantidade() + ""
                + " AND vo.fnCompraCabecalho.dataentradasaidaCompracab between " + "'" + dataBusca + "' and '" + dataBase + "'";

    } else if (dataBase.compareTo(dataBusca) < 0) {
        hql = "SELECT vo FROM FnCompraDetalhe vo "
                + " WHERE vo.cfLoja = " + this.lojaLogada.getIdLoja() + ""
                + " AND vo.produtoFk = " + this.fnCompDet.getProdutoFk().getIdProd() + ""
                + " AND vo.quantidade = " + this.fnCompDet.getQuantidade() + ""
                + " AND vo.fnCompraCabecalho.dataentradasaidaCompracab between " + "'" + dataBase + "' and '" + dataBusca + "'";

    } else if (dataBase.compareTo(dataBusca) == 0) {
        hql = "SELECT vo FROM FnCompraDetalhe vo "
                + " WHERE vo.cfLoja = " + this.lojaLogada.getIdLoja() + ""
                + " AND vo.produtoFk = " + this.fnCompDet.getProdutoFk().getIdProd() + ""
                + " AND vo.quantidade = " + this.fnCompDet.getQuantidade() + ""
                + " AND vo.fnCompraCabecalho.dataentradasaidaCompracab between " + "'" + dataBusca + "'";

    } */


    return { code: 200, results: { compraDet1, compraDet2, compraDet3 } }

};

/* public void saidaEcfCupomDetProd(String dataBase, String dataBusca) {
    String hql = "";
    ArrayList listSaida = new ArrayList();

    if (dataBase.compareTo(dataBusca) > 0)//dataBase é maior que dataBusca
    {
        hql = "SELECT vo FROM EcfCupomdetProd vo "
                + " WHERE vo.cfLoja = " + this.lojaLogada.getIdLoja() + ""
                + " AND vo.produtoFk = " + this.ecfCupomDetProd.getProdutoFk().getIdProd() + ""
                + " AND vo.statusCupitem = " + this.ecfCupomDetProd.getStatusCupitem() + ""
                + " AND vo.qtdeCupitem = " + this.ecfCupomDetProd.getQtdeCupitem() + ""
                + " AND FALTA A DATA O CAMPO NAO TEM between" + "'" + dataBusca + "' and '" + dataBase + "'";
    } else if ((dataBase.compareTo(dataBusca) < 0) || (dataBase.compareTo(dataBusca) == 0))//dataBase é menor que dataBusca
    {
        hql = "SELECT vo FROM EcfCupomdetProd vo "
                + " WHERE vo.cfLoja = " + this.lojaLogada.getIdLoja() + ""
                + " AND vo.produtoFk = " + this.ecfCupomDetProd.getProdutoFk().getIdProd() + ""
                + " AND vo.statusCupitem = " + this.ecfCupomDetProd.getStatusCupitem() + ""
                + " AND vo.qtdeCupitem = " + this.ecfCupomDetProd.getQtdeCupitem() + ""
                + " AND FALTA A DATA O CAMPO NAO TEM between " + "'" + dataBase + "' and '" + dataBusca + "'";
    }

} */

module.exports = {
    iniciaInventario, 
    entrada
}