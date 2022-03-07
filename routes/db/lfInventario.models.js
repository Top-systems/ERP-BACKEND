const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const iniciaInventario = async function ({ idLoja }) {

    const inventarioCab = await useDB({
        query: `SELECT * FROM Lf_Inventario_Cab WHERE loja_fk=${idLoja} ORDER BY id DESC `
    });

    return { code: 200, results: { inventarioCab } }

};

const listaEntrada = async function ({ idLoja, dataInicio, dataFim }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE loja_fk=${idLoja} `
    });


    const compraDet = await useDB({
        query: `SELECT Fn_Compra_Detalhe.* FROM Fn_Compra_Detalhe, fn_compra_cabecalho WHERE Fn_Compra_Detalhe.loja_Fk = ${idLoja} AND atualizaestoque = 'S' AND fn_Compra_Cabecalho.dataentradasaida_Compracab BETWEEN '${dataInicio}' AND '${dataFim}'`
    });

    const nfeDet = await useDB({
        query: `SELECT nfe_detalhe.* FROM Nfe_Detalhe, nfe_cabecalho WHERE nfe_detalhe.loja_fk=${idLoja}  AND nfe_Cabecalho.tipooperacao_Nfecab='0' AND atualizaestoque='S' AND nfe_Cabecalho.dataentradasaida_Nfecab BETWEEN '${dataInicio}' AND '${dataFim}'`
    });

    const vdm1Det = await useDB({
        query: `SELECT vd_m1_detalhe.* FROM Vd_M1_Detalhe, vd_m1 WHERE vd_m1_detalhe.loja_fk=${idLoja} AND vd_M1.tipooperacao='0' AND atualizaestoque='S' AND vd_M1.datadoc BETWEEN '${dataInicio}' AND '${dataFim}'`
    });

    return { code: 200, results: { nfeDet, vdm1Det, estoqueGeral, compraDet } }

};

const listaSaida = async function ({ idLoja, dataInicio, dataFim }) {

    const estoqueGeral = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE loja_fk=${idLoja} `
    });

    const nfeDet = await useDB({
        query: `SELECT nfe_detalhe.* FROM Nfe_Detalhe, nfe_cabecalho WHERE nfe_detalhe.loja_fk=${idLoja}  AND nfe_Cabecalho.tipooperacao_Nfecab='1' AND atualizaestoque='S' AND nfe_Cabecalho.dataentradasaida_Nfecab BETWEEN '${dataInicio}' AND '${dataFim}'`
    });

    const vdm1Det = await useDB({
        query: `SELECT vd_m1_detalhe.* FROM Vd_M1_Detalhe, vd_m1 WHERE vd_m1_detalhe.loja_fk=${idLoja} AND vd_M1.tipooperacao='1' AND atualizaestoque='S' AND vd_M1.datadoc BETWEEN '${dataInicio}' AND '${dataFim}'`
    });

    const vdSerieD = await useDB({
        query: `SELECT Vd_Seried_Detalhe.* FROM Vd_Seried_Detalhe, vd_seried WHERE Vd_Seried_Detalhe.loja_fk=${idLoja} AND vd_Seried.datadoc BETWEEN '${dataInicio}' AND '${dataFim}'`
    });

    const cupomDetProd = await useDB({
        query: `SELECT Ecf_Cupomdet_Prod.* FROM Ecf_Cupomdet_Prod, ecf_Cupomcab WHERE Ecf_Cupomdet_Prod.loja_fk=${idLoja} AND status_Cupitem='F' and status_Cupitem='F' AND ecf_Cupomcab.datahora_Cupom BETWEEN '${dataInicio}' AND '${dataFim}'`
    });

    return { code: 200, results: { nfeDet, vdm1Det, vdSerieD, cupomDetProd } }

};

const processarFiltro = async function ({ valor, filtro, dataInicio, dataFim }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM lf_inventario_cab WHERE loja_fk=${idLoja} and ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM lf_inventario_cab WHERE loja_fk=${idLoja} and ${filtro} LIKE '%${valor.toUpperCase()}%'`
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    return { code: 200, results: { comecandoCom, contendo } }

    //  public void processarFiltro() {

    /**
     * //string da consulta
            StringBuilder sb = new StringBuilder("SELECT vo FROM VdAbastecimentos vo");
     */

    //String de comparação contendo o BETWEEN
    /* if (filtro.getComparacao().equals("Periodo")) {

        if (this.dataInicio.before(this.dataFim)) {

            comparacaoLike = " BETWEEN '" + format.format(filtro.getDataInicio()) + "' AND '" + format.format(filtro.getDataFim()) + "'";
        } else {
            Util.criarMensagemWarning("Verificar as Datas selecionadas!");
            break;
        }
    }
 */
};

const excluirFiltro = async function({ idLoja }){ 

    const inventarioCab = await useDB({ 
        query: `SELECT * FROM Lf_Inventario_Cab WHERE loja_fk=${idLoja} `
    }); 

 return { code: 200, results: { inventarioCab }}  
    
};

const pegarDetalhes = async function({ idLoja, idInventarioCab }){ 

    const inventarioDet = await useDB({ 
        query: ` SELECT * FROM Lf_Inventario_Det WHERE loja_fk= ${idLoja} AND inventario_cab_fk =${idInventarioCab} ORDER BY id ASC `
    }); 

 return { code: 200, results: { inventarioDet }}  
    
};

module.exports = {
    iniciaInventario,
    listaEntrada,
    listaSaida,
    processarFiltro,
    excluirFiltro,
    pegarDetalhes
}