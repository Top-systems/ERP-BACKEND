const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

/* public void init() {
    sd = new SimpleDateFormat("dd/MM/yyyy");
    sd2 = new SimpleDateFormat("yyyy");
    sd3 = new SimpleDateFormat("MM");
    sd5 = new SimpleDateFormat("MM/yyyy");
    sd4 = new SimpleDateFormat("yyyy-MM-dd");
    Date hoje = Calendar.getInstance().getTime();
    ano = sd2.format(hoje);

    a = "01";
    b = "12";

    filtrar();

    try (StatelessSession s = Util.pegaSessaoAtual2()) {
        Transaction tx = s.beginTransaction();
        CfLoja lojaLogada = (CfLoja) Util.pegarObjetoDaSessao("loja");

        String cp = "SELECT sum(valor_contaspagar)\n"
                + "  FROM public.fn_contaspagar \n"
                + "  where loja_fk=" + lojaLogada.getIdLoja() + " \n"
                + "  and status_contaspagar='P' \n"
                + "  and datavencimento_contaspagar<'" + sd4.format(hoje) + "'";
        totalpagaremberto = (BigDecimal) s.createSQLQuery(cp).setMaxResults(1).uniqueResult();
        if (totalpagaremberto == null) {
            totalpagaremberto = BigDecimal.ZERO;
        }

        String cr = "SELECT sum(valortotal_contasreceber)\n"
                + "  FROM public.fn_contasreceber \n"
                + "  where loja_fk=" + lojaLogada.getIdLoja() + " \n"
                + "  and statusreceb_contasreceber in ('P','F') \n"
                + "  and datavenc_contasreceber<'" + sd4.format(hoje) + "'";
        totalreceberemaberto = (BigDecimal) s.createSQLQuery(cr).setMaxResults(1).uniqueResult();
        if (totalreceberemaberto == null) {
            totalreceberemaberto = BigDecimal.ZERO;
        }

        String cp2 = "SELECT sum(valor_contaspagar)\n"
                + "  FROM public.fn_contaspagar \n"
                + "  where loja_fk=" + lojaLogada.getIdLoja() + " \n"
                + "  and status_contaspagar='P' \n"
                + " ";
        totalpagaremberto2 = (BigDecimal) s.createSQLQuery(cp2).setMaxResults(1).uniqueResult();
        if (totalpagaremberto2 == null) {
            totalpagaremberto2 = BigDecimal.ZERO;
        }

        String cr2 = "SELECT sum(valortotal_contasreceber)\n"
                + "  FROM public.fn_contasreceber \n"
                + "  where loja_fk=" + lojaLogada.getIdLoja() + " \n"
                + "  and statusreceb_contasreceber in ('P','F') \n"
                + "  ";
        totalreceberemaberto2 = (BigDecimal) s.createSQLQuery(cr2).setMaxResults(1).uniqueResult();
        if (totalreceberemaberto2 == null) {
            totalreceberemaberto2 = BigDecimal.ZERO;
        }

        Date dd = (Date) new CargoRN().porSql2semcache("SELECT datahora_cupom\n"
                + "  FROM public.ecf_cupomcab\n"
                + "  where loja_fk=" + lojaLogada.getIdLoja() + " "
                + " order by datahora_cupom desc");
        if (dd != null) {
            datavenda = dd;
        }

        dd = (Date) new CargoRN().porSql2semcache("SELECT dataentradasaida_nfecab\n"
                + " FROM nfe_cabecalho\n"
                + "WHERE loja_fk=" + lojaLogada.getIdLoja() + ""
                + " AND statusnota_nfecab IN ('5','6','7','9')\n"
                + "ORDER BY dataentradasaida_nfecab desc");
        if (dd != null) {
            datanfe = dd;
        }

        dd = (Date) new CargoRN().porSql2semcache("SELECT dataentradasaida_compracab\n"
                + " FROM fn_compra_cabecalho\n"
                + "WHERE loja_fk=" + lojaLogada.getIdLoja() + "\n"
                + "ORDER BY dataentradasaida_compracab desc");
        if (dd != null) {
            datacompra = dd;
        }

    }

} */

const graficoss = async function ({ idLoja, dataInicial, dataFinal, dataEntradaSaida, dataHora }) {

    const compraCab = await useDB({
        query: ` select  to_char(dataentradasaida_compracab,'MM') as mes, sum(quantidade) as total  from fn_compra_cabecalho as cab inner join fn_compra_detalhe as det on det.compracab_fk=cab.id_compracab   where  id_compracab is not null and cab.loja_fk=${idLoja} and det.loja_fk=${idLoja} and status_compracab='F' and (to_char(dataentradasaida_compracab,'MM') between '${dataInicial}' and '${dataFinal}')  and to_char(dataentradasaida_compracab,'YYYY') ='${dataEntradaSaida}'  group by  to_char(dataentradasaida_compracab,'MM') ORDER BY sum(quantidade) desc`
    });

    const cumpomCab = await useDB({
        query: ` select  to_char(datahora_cupom,'MM') as mes, sum(qtde_cupitem) as total  from ecf_cupomcab as cab inner join ecf_cupomdet_prod as det on det.cupomcab_fk=cab.id_cupomcab  where  id_cupomcab is not null and cab.loja_fk=${idLoja} and status_cupom in ('F','O') and  status_cupitem ='F' and (to_char(datahora_cupom,'MM') between '${dataInicial}' and '${dataFinal}')  and to_char(datahora_cupom,'YYYY') ='${dataHora}'  group by  to_char(datahora_cupom,'MM')  ORDER BY sum(totalliquido_cupom) desc`
    });

    const compraCab2 = await useDB({
        query: ` select  to_char(dataentradasaida_compracab,'MM') as mes, extract(year from dataentradasaida_compracab) as ano, sum(valortotal_compracab) as total from fn_compra_cabecalho  where  id_compracab is not null and loja_fk=${idLoja} and status_compracab='F' and (to_char(dataentradasaida_compracab,'MM') between '${dataInicial}' and '${dataFinal}') and to_char(dataentradasaida_compracab,'YYYY') ='${dataEntradaSaida}' group by  to_char(dataentradasaida_compracab,'MM'),1,2ORDER BY sum(valortotal_compracab) desc`
    });

    const cupomCab2 = await useDB({
        query: ` select  to_char(datahora_cupom,'MM') as mes, extract(year from datahora_cupom) as ano, sum(totalliquido_cupom) as total from ecf_cupomcab  where  id_cupomcab is not null and loja_fk=${idLoja} and status_cupom in ('F','O') and (to_char(datahora_cupom,'MM') between '${dataInicial}' and '${dataFinal}')  and to_char(datahora_cupom,'YYYY') ='${dataHora}'   group by  to_char(datahora_cupom,'MM'),1,2 ORDER BY sum(totalliquido_cupom) desc`
    });

    return { code: 200, results: { compraCab, cumpomCab, compraCab2, cupomCab2 } }

};

const createP1 = async function ({ idLoja, dataInicial, dataFinal, dataHora, dataEntradaSaida, dataAut }) {

    const cupomDetProd = await useDB({
        query: `select sum(det.qtde_cupitem) ,det.produto_fk,p.descricao_prod from ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on det.cupomcab_fk=cab.id_cupomcab inner join cd_produto as p on det.produto_fk=p.id_prod where cab.loja_fk=${idLoja}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and status_cupitem='F'  and (to_char(datahora_cupom,'MM') between '${dataInicial}' and '${dataFinal}')  and to_char(datahora_cupom,'YYYY') ='${dataHora}'  group by 2,3 order by 1 desc `
    });

    const compraDet = await useDB({
        query: `select  sum(det.quantidade) , det.produto_fk, p.descricao_prod from fn_compra_detalhe as det inner join fn_compra_cabecalho as cab on det.compracab_fk=cab.id_compracab inner join cd_produto as p on det.produto_fk=p.id_prod where cab.loja_fk=${idLoja} and det.loja_fk=${idLoja} and cab.status_compracab='F' and (to_char(dataentradasaida_compracab,'MM') between '${dataInicial}' and '${dataFinal}')  and to_char(dataentradasaida_compracab,'YYYY') ='${dataEntradaSaida}'  group by 2,3 order by 1 desc `
    });

    const pmcCab = await useDB({
        query: `SELECT  nome_pbm, sum(valortotal_pbmdet) FROM public.ecf_pbmcab as cab inner join ecf_pbmdet as det on det.pbmcab_fk=cab.id_pbmcab inner join cd_pbm as p on pbm_fk=id_pbm where cab.loja_fk=${idLoja}  and status_cupom_pbm='F' and valortotal_pbmdet>0 and (to_char(dataaut_pbmcab,'MM') between '${dataInicial}' and '${dataFinal}') and to_char(dataaut_pbmcab,'YYYY') ='${dataAut}'  group by nome_pbm,to_char(dataaut_pbmcab,'YYYY') order by to_char(dataaut_pbmcab,'YYYY') asc`
    });

    return { code: 200, results: { cupomDetProd, compraDet, pmcCab } }

};

const initBarModel2 = async function ({ anoCupom, mesCupom, idLoja, anoCompra, mesCompra }) {

    const cupomCab = await useDB({
        query: `select  to_char(datahora_cupom,'MM') as mes,  sum(qtde_cupitem) as total  from ecf_cupomcab as cab inner join ecf_cupomdet_prod as det on det.cupomcab_fk=cab.id_cupomcab  where extract(year from datahora_cupom)='${anoCupom}'   and extract(month from datahora_cupom)='${mesCupom}' and id_cupomcab is not null and cab.loja_fk=${idLoja} and status_cupom in ('F','O') and  status_cupitem='F' group by  to_char(datahora_cupom,'MM') ORDER BY  to_char(datahora_cupom,'MM') asc`
    });

    const compraCab = await useDB({
        query: ` select  to_char(dataentradasaida_compracab,'MM') as mes, sum(quantidade) as total  from fn_compra_cabecalho as cab inner join fn_compra_detalhe as det on det.compracab_fk=cab.id_compracab  where extract(year from dataentradasaida_compracab)='${anoCompra}'   and extract(month from dataentradasaida_compracab)='${mesCompra}' and id_compracab is not null and cab.loja_fk=${idLoja} and det.loja_fk=${idLoja} and status_compracab='F' group by  to_char(dataentradasaida_compracab,'MM')  ORDER BY to_char(dataentradasaida_compracab,'MM') asc`
    });

    return { code: 200, results: { cupomCab, compraCab } }

};

const initBarModel = async function ({ anoCupom, mesCupom, idLoja, anoCompra, mesCompra }) {

    const cupomCab = await useDB({
        query: `select  to_char(datahora_cupom,'MM') as mes, extract(year from datahora_cupom) as ano, sum(totalliquido_cupom) as total from ecf_cupomcab  where extract(year from datahora_cupom)='${anoCupom}'   and extract(month from datahora_cupom)='${mesCupom}' and id_cupomcab is not null and loja_fk=${idLoja} and status_cupom in ('F','O')group by  to_char(datahora_cupom,'MM'),1,2ORDER BY 1`
    });

    const compraCab = await useDB({
        query: ` select  to_char(dataentradasaida_compracab,'MM') as mes, extract(year from dataentradasaida_compracab) as ano, sum(valortotal_compracab) as total from fn_compra_cabecalho  where extract(year from dataentradasaida_compracab)='${anoCompra}'   and extract(month from dataentradasaida_compracab)='${mesCompra}' and id_compracab is not null and loja_fk=${idLoja} and status_compracab='F'group by  to_char(dataentradasaida_compracab,'MM'),1,2ORDER BY 1`
    });

    return { code: 200, results: { cupomCab, compraCab } }

};

const filtrar = async function ({ idLoja, mesInicial, mesFinal, ano }) {

    const produto = await useDB({
        query: "select count(*) from Cd_Produto"
    });

    const cliente = await useDB({
        query: "select count(*) from Cd_Cliente"
    });

    const forn = await useDB({
        query: "select count(*) from Cd_Fornecedor"
    });

    const arquivoAnvisa = await useDB({
        query:`select datainicial,datafinal,situacao from Cd_Arquivosanvisa where situacao!='R' and loja_fk=${idLoja} order by dataaltera desc`
    });

    const cupomCab = await useDB({
        query:`SELECT  sum(totalliquido_cupom),count(totalliquido_cupom)  FROM public.ecf_cupomcab   where loja_fk=${idLoja} and status_cupom in ('F','O')  and (to_char(datahora_cupom,'MM') between '${mesInicial}' and '${mesFinal}')  and to_char(datahora_cupom,'YYYY') ='${anoCupom}'`
    });

    const compraCab = await useDB({
        query:`SELECT  sum(valortotal_compracab),count(valortotal_compracab)  FROM public.fn_compra_cabecalho   where loja_fk=${idLoja} and status_compracab='F'  and (to_char(dataentradasaida_compracab,'MM') between '${mesInicial}' and '${mesFinal}')  and to_char(dataentradasaida_compracab,'YYYY') ='${ano}'`
    });

    return { code: 200, results: { produto, cliente, forn, arquivoAnvisa, cupomCab, compraCab} }

};


module.exports = {
    graficoss,
    createP1,
    initBarModel2,
    initBarModel,
    filtrar
}