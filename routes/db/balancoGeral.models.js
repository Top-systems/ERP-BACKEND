const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const iniciar = async function ({ }) {

    const listaPsico = await useDB({
        query: "select * from Cd_Listapsico order by lista_Psico asc"
    });

    return { code: 200, results: { listaPsico } }

};

const consultar = async function ({ idPsico, idProd, idLoja }) {

    /* String cl = "";
    switch (classe) {
        case "0":
            cl = " and vo.produtoFk.classeterapeuticaProd!='0'";
            break;
        case "1":
            cl = " and vo.produtoFk.classeterapeuticaProd='1'";
            break;
        case "2":
            cl = " and vo.produtoFk.classeterapeuticaProd='2'";
            break;
    }

    switch (tipo) {

        case "geral": {

                        StringBuilder li = new StringBuilder();
                        int pos = 0;
            for (Integer ic : listac) {
                pos++;
                if (pos == listac.size()) {
                    li.append(" " + ic + " ");
                } else {
                    li.append(" " + ic + ", ");
                }
            }
            System.out.println(li.toString());
                        String lt = "";
            if (li.toString().length() > 0) {
                lt = " and vo.listapsicoFk.idPsico in(" + li.toString() + ") ";
            }

                        String per = "";
                        String per2 = "";
                        String per3 = "";
                        String per4 = "";
                        String per5 = "";
                        String per6 = "";
            per = periodocontrolado(per, "vo.fnCompraCabecalho.dataentradasaidaCompracab");
            per2 = periodocontrolado(per2, "vo.nfeCabecalho.dataentradasaidaNfecab");
            per3 = periodocontrolado(per3, "vo.ecfCupomcab.datahoraCupom");
            per4 = periodocontrolado(per4, "vo.vdM1.datadoc");
            per5 = periodocontrolado(per5, "vo.vdSeried.datadoc");
            per6 = periodocontrolado(per6, "vo.nfeCabecalho.dataentradasaidaNfecab"); */

    const produto = await useDB({
        query: `select  descricao_Prod, id_Prod,  cd_principioativo.codigo_dcb, cd_principioativo.descricao_Princat from  Cd_Produto, cd_principioativo where classeterapeutica_Prod!='0' and listapsico_Fk in(${idPsico}) and cd_produto.principioativo_fk = cd_principioativo.id_princat order by descricao_Prod asc `
    });

    const compraDet = await useDB({
        query: `select sum(quantidade) from Fn_Compra_Detalhe, fn_compra_cabecalho, cd_trib_naturezaoper where produto_Fk=${idProd} and produto_Fk is not null  and Fn_Compra_Detalhe.loja_Fk=${idLoja} and fn_Compra_Cabecalho.status_Compracab='F' and cd_trib_naturezaoper.tipooperacao='1' and fn_compra_detalhe.compracab_fk = fn_compra_cabecalho.id_compracab and fn_compra_cabecalho.naturezaoperacao_fk = cd_trib_naturezaoper.id`
    });

    /* String hqlcompra = "select sum(vo.quantidade) from FnCompraDetalhe vo"
    + " where vo.produtoFk=" + codigo + ""
    + " and vo.produtoFk.idProd is not null "
    + " " + per
    + " and vo.lojaFk=" + loja.getIdLoja() + ""
    + " and vo.fnCompraCabecalho.statusCompracab='F'"
    + " and vo.fnCompraCabecalho.naturezaoperacaoFk.tipooperacao='1' "; */

    const estoqueGeral = await useDB({
        query: `select estoque from Es_Estoquegeral where produto_Fk=${idProd} and produto_Fk is not null  and loja_fk=${idLoja}`
    });

    const nfeDet = await useDB({
        query: `select sum(quantidade) from Nfe_Detalhe, nfe_cabecalho where produto_Fk=${idProd} and produto_Fk is not null and nfe_detalhe.loja_fk=${idLoja} and nfe_Cabecalho.tipooperacao_Nfecab='8' and nfe_Cabecalho.statusnota_Nfecab in ('5') and nfe_detalhe.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    /* String hqlperda = "select sum(vo.quantidade) from NfeDetalhe vo"
        + " where vo.produtoFk=" + codigo + ""
        + " and vo.produtoFk.idProd is not null "
        + " " + per2
        + " and vo.cfLoja=" + loja.getIdLoja() + ""
        + " and vo.nfeCabecalho.tipooperacaoNfecab='8'"
        + " and vo.nfeCabecalho.statusnotaNfecab in ('5')"; */

    const cupomDetProd = await useDB({
        query: `select sum(qtde_Cupitem) from Ecf_Cupomdet_Prod, ecf_Cupomcab  where produto_Fk=${idProd} and produto_Fk is not null  and ecf_cupomdet_prod.loja_fk=${idLoja} and ecf_Cupomcab.status_Cupom in('F','O','D') and status_Cupitem='F' and ecf_cupomdet_prod.cupomcab_fk = ecf_cupomcab.id_cupomcab`
    });

    /* String hqlcupons = "select sum(vo.qtdeCupitem) from EcfCupomdetProd vo"
        + " where vo.produtoFk=" + codigo + ""
        + " and vo.produtoFk.idProd is not null "
        + " " + per3
        + " and vo.cfLoja=" + loja.getIdLoja() + ""
        + " and vo.ecfCupomcab.statusCupom in('F','O','D') and vo.statusCupitem='F' "; */

    const m1Det = await useDB({
        query: `select sum(qtde_M1)  from Vd_M1_Detalhe, vd_m1  where produto_Fk=${idProd} and produto_Fk is not null  and vd_m1_detalhe.loja_fk=${idLoja}  and vd_M1.tipooperacao='2' and vd_m1_detalhe.m1_fk = vd_m1.id_m1`
    });

    /* String hqlm1 = "select sum(vo.qtdeM1) "
    + " from VdM1Detalhe vo "
    + " where vo.produtoFk=" + codigo + ""
    + " and vo.produtoFk.idProd is not null "
    + " and vo.cfLoja=" + loja.getIdLoja() + " "
    + " " + per4
    + " and vo.vdM1.tipooperacao='2' ";
 */
    const seriedDet = await useDB({
        query: `select sum(qtde_Serieddet)  from Vd_Seried_Detalhe  where produto_Fk=${idProd} and produto_Fk is not null  and loja_fk=${idLoja}  `
    });

    /* String hqlseried = "select sum(vo.qtdeSerieddet) "
        + " from VdSeriedDetalhe vo "
        + " where vo.produtoFk=" + codigo + ""
        + " and vo.produtoFk.idProd is not null "
        + " and vo.cfLoja=" + loja.getIdLoja() + " "
        + " " + per5; */

    const nfeDet2 = await useDB({
        query: `select sum(quantidade) from Nfe_Detalhe, nfe_cabecalho where produto_Fk=${idProd} and produto_Fk is not null and nfe_detalhe.loja_fk=${idLoja} and nfe_Cabecalho.tipooperacao_Nfecab='2' and nfe_Cabecalho.statusnota_Nfecab in ('5') and nfe_detalhe.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    const cupomDet = await useDB({
        query: `select det.estoqueantprod_cupitem,cab.datahora_cupom  from ecf_cupomdet_prod  as det inner join ecf_cupomcab as cab on  cab.id_cupomcab=det.cupomcab_fk where det.produto_fk=${idProd} and det.loja_fk=${idLoja} and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and status_cupitem='F' order by  det.id_cupomdet_prod asc limit 1;`
    });

    /* String per1 = periodocontrolado(perx, "cab.datahora_cupom");
    String vendas = "select det.estoqueantprod_cupitem,cab.datahora_cupom  from ecf_cupomdet_prod  as det\n"
        + " inner join ecf_cupomcab as cab on  cab.id_cupomcab=det.cupomcab_fk\n"
        + " where det.produto_fk=" + codigo + " and det.loja_fk=" + loja.getIdLoja() + "\n"
        + " and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and status_cupitem='F' " + per1 + " order by  det.id_cupomdet_prod asc limit 1;"; */

    const compraDet2 = await useDB({
        query: `select det.estoque,cab.dataentradasaida_compracab from fn_compra_detalhe as det  inner join fn_compra_cabecalho as cab on  cab.id_compracab =det.compracab_fk where det.produto_fk=${idProd}  and det.loja_fk=${idLoja}  and cab.loja_fk=${idLoja} and cab.naturezaoperacao_fk in (SELECT id  FROM public.cd_trib_naturezaoper  where tipooperacao='1') and cab.status_compracab='F'  order by   det.id_compradet asc limit 1;`
    });

    /* String per22 = periodocontrolado(perx, "cab.dataentradasaida_compracab");
                            String vendascomp = "select det.estoque,cab.dataentradasaida_compracab from fn_compra_detalhe as det \n"
        + " inner join fn_compra_cabecalho as cab on  cab.id_compracab =det.compracab_fk\n"
        + " where det.produto_fk=" + codigo + " "
        + " and det.loja_fk=" + loja.getIdLoja() + " "
        + " and cab.loja_fk=" + loja.getIdLoja() + "\n"
        + " and cab.naturezaoperacao_fk in (SELECT id\n"
        + "  FROM public.cd_trib_naturezaoper\n"
        + "  where tipooperacao='1') and cab.status_compracab='F'\n"
        + " " + per22 + " order by   det.id_compradet asc limit 1;";
 */
    const nfeDet3 = await useDB({
        query: `select det.estoque,cab.dataentradasaida_nfecab from nfe_detalhe as det  inner join nfe_cabecalho as cab on  cab.id_nfe_cabecalho =det.nfecab_fk where det.produto_fk=${idProd} and det.loja_fk=${idLoja}  and cab.statusnota_nfecab='5' order by   det.id_nfedetalhe asc limit 1;`
    });

    /* String per33 = periodocontrolado(perx, "cab.dataentradasaida_nfecab");
                            String vendasnfe = "select det.estoque,cab.dataentradasaida_nfecab from nfe_detalhe as det \n"
        + " inner join nfe_cabecalho as cab on  cab.id_nfe_cabecalho =det.nfecab_fk\n"
        + " where det.produto_fk=" + codigo + " and det.loja_fk=" + loja.getIdLoja() + " \n"
        + " and cab.statusnota_nfecab='5'\n"
        + " " + per33 + " order by   det.id_nfedetalhe asc limit 1;"; */

    const vdM1Det = await useDB({
        query:`select det.estoque_m1,cab.datadoc from vd_m1_detalhe as det  inner join vd_m1 as cab on  cab.id_m1 =det.m1_fk where det.produto_fk=${idProd} and det.loja_fk=${idLoja}  and cab.situacao='1' order by   det.id_m1_detalhe asc limit 1;`
    });

    const serieDDetalhe = await useDB({
        query:`select det.estoque_serieddet,cab.datadoc from vd_seried_detalhe as det  inner join vd_seried as cab on  cab.id =det.seried_fk where det.produto_fk=${idProd} and det.loja_fk=${idLoja}  and cab.situacao='1'  order by   det.id_seried_detalhe asc limit 1;`
    });

    return { code: 200, results: { produto, compraDet, estoqueGeral, nfeDet, cupomDetProd, m1Det, seriedDet, nfeDet2, cupomDet, compraDet2, nfeDet3, vdM1Det, serieDDetalhe } }

};

const pegarCodigoDeBarras = async function({ idProd }){ 

    const numCodBar = await useDB({ 
    query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd} `
 }); 

 return { code: 200, results: { numCodBar }}  
    
};

module.exports = {
    iniciar,
    consultar,
    pegarCodigoDeBarras
}