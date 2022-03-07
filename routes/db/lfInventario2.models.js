const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

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

const saida = async function ({ idLoja, idProd, quantidade, dataBase, dataBusca }) {

    const compraDet1 = await useDB({
        query: `SELECT Fn_Compra_Detalhe.* FROM Fn_Compra_Detalhe, fn_compra_cabecalho WHERE Fn_Compra_Detalhe.loja_fk=${idLoja} AND Fn_Compra_Detalhe.produto_Fk=${idProd} AND Fn_Compra_Detalhe.quantidade=${quantidade} AND fn_Compra_Cabecalho.dataentradasaida_Compracab between '${dataBusca}' and '${dataBase}'`
    });

    const compraDet2 = await useDB({
        query: `SELECT Fn_Compra_Detalhe.* FROM Fn_Compra_Detalhe, fn_compra_cabecalho WHERE Fn_Compra_Detalhe.loja_fk=${idLoja} AND Fn_Compra_Detalhe.produto_Fk=${idProd} AND Fn_Compra_Detalhe.quantidade=${quantidade} AND fn_Compra_Cabecalho.dataentradasaida_Compracab between '${dataBase}' and '${dataBusca}'`
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

    } */

    return { code: 200, results: { compraDet1, compraDet2 } }

};

const carrega = async function ({ idLoja, dataBusca }) {

    const compraCab = await useDB({
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE loja_fk=${idLoja} AND dataentradasaida_compracab='${dataBusca}'`
    });

    //nao funciona
    /* const compraCabMax = await useDB({ 
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE loja_fk=${idLoja} AND max(dataentradasaida_compracab)='${dataBusca}'`
    }); 

    const compraCabMin = await useDB({ 
        query: `SELECT * FROM Fn_Compra_Cabecalho WHERE loja_fk=${idLoja} AND min(dataentradasaida_compracab)='${dataBusca}'`
    });  */


    /*  else {//SE O INVENTARIO DO DIA SELECIONADO NÃO EXISTIR
        hql = "SELECT vo FROM FnCompraCabecalho vo "
                + " WHERE vo.cfLoja = " + this.lojaLogada.getIdLoja() + ""
                + " AND max(vo.dataentradasaida_compracab) = '" + dataBusca + "";
        listDataNExiste = (ArrayList) rn.buscarHQL(hql);
    
        if (listDataNExiste.get(0) == null) {//verifica se há algum inventário...
            hql = "SELECT vo FROM FnCompraCabecalho vo "
                    + " WHERE vo.cfLoja = " + this.lojaLogada.getIdLoja() + ""
                    + " AND min(vo.dataentradasaida_compracab) = '" + dataBusca + "";
            listDataNExiste = (ArrayList) rn.buscarHQL(hql); */

    const inventarioDet = await useDB({
        query:`SELECT * FROM Lf_Inventario_Det WHERE loja_fk=${idLoja} ORDER BY produto_fk ASC`
    });


    return { code: 200, results: { compraCab,inventarioDet } }

};

module.exports = {
    entrada,
    saida,
    carrega
}