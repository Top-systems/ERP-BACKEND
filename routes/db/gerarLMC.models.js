const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const vermedicoes = async function ({ idLoja, idLmcCab, idTipoComb }) {

    const tanqueMedicao = await useDB({
        query: `select * from Cd_Tanque_Medicao where loja_fk=${idLoja} and lmccab_Fk=${idLmcCab} and tipocombustivel_Fk=${idTipoComb}  order by dataaltera asc   `
    });

    return { code: 200, results: { tanqueMedicao } }

};

const verab = async function ({ idLoja, dataHora, idTipoComb }) {

    const abastecimento = await useDB({
        query: `select Vd_Abastecimentos.* from Vd_Abastecimentos, cd_tanque where Vd_Abastecimentos.loja_fk=${idLoja} and cast(datahora as date)='${dataHora}' and cd_tanque.tipocombustivel_Fk=${idTipoComb}  order by bico_Fk, datahora asc   `
    });

    return { code: 200, results: { abastecimento } }

};
/* 
public void init() {
    vpg = BigDecimal.ZERO;
    tipop = "P";
    avisos = "";
    vendo = false;
    this.permissao = Util.verificaPermissaoDaPagina("gerar lmc");
    loja = (CfLoja) Util.pegarObjetoDaSessao("loja");

    Calendar primeiroDia = Calendar.getInstance();
    primeiroDia.set(Calendar.DAY_OF_MONTH, 1);

    Calendar ultimoDia = Calendar.getInstance();
    ultimoDia.add(Calendar.MONTH, 1);
    ultimoDia.set(Calendar.DAY_OF_MONTH, 1);
    ultimoDia.add(Calendar.DAY_OF_MONTH, -1);

    datai = primeiroDia.getTime();
    dataf = ultimoDia.getTime();

    List < Object[] > tt = new CargoRN().pegarListaObjeto2sql(""
        + " SELECT tipocombustivel_fk,sum( capacidade_tanque)\n"
        + "  FROM public.cd_tanque\n"
        + "  where loja_fk=" + loja.getIdLoja() + "\n"
        + "  group by tipocombustivel_fk");
    for (Object[] o : tt) {
        caps.put(Integer.valueOf(o[0].toString()), new BigDecimal(o[1].toString()));
    }

    lista = new LmcSituacaoRN().listarCargoHQL("select vo from CdLmcsituacao vo"
        + " where (vo.cdLmccab.datamovimentoLmccab between "
        + " '" + sd.format(datai) + "' and  '" + sd.format(dataf) + "')"
        + " and vo.cdLmccab.CdLmccabPK.lojaFk=" + loja.getIdLoja() + " "
        // + " and vo.tipocombustivelFk=" + tipocombustivel.getIdTipocombustivel() + " "
        + " order by vo.cdLmccab.datamovimentoLmccab,vo.tipocombustivelFk asc");
    for (CdLmcsituacao c : lista) {
        c.setCapacidade(caps.get(c.getTipocombustivelFk().getIdTipocombustivel()));
    }

    String lmci = "SELECT datamovimento_lmccab,numero_bic\n"
        + "FROM public.cd_lmcdet as s\n"
        + "inner join cd_lmccab as cab on s.lmccab_fk=cab.id_lmccab\n"
        + "inner join cd_bico as b on s.bico_fk=b.id_bico\n"
        + "where s.loja_fk=" + loja.getIdLoja() + "\n"
        + "and  s.encerranteinicial>s.encerrantefinal\n"
        + "order by datamovimento_lmccab asc";
    List < Object[] > coui = new CargoRN().pegarListaObjeto2sql(lmci);
    SimpleDateFormat sdv = new SimpleDateFormat("dd/MM/yyyy");
    for (Object[] o : coui) {
        if (o[0] != null && o[1] != null) {
            String h = sdv.format((Date) o[0]);
            avisos += "encerrante invalido do bico " + o[1] + " na data " + h + "!<br/> ";
        }
    }

} */

const salvarg = async function ({ idTanque, idLoja, dataMovimento, idLmcCab, idTipoComb }) {

    const tanque = await useDB({
        query: `select  * from Cd_Tanque where id_Tanque=${idTanque} and loja_Fk=${idLoja} `
    });

    const lmcCab = await useDB({
        query: `select  id_lmccab from cd_lmccab where loja_fk=${idLoja}  and datamovimento_lmccab='${dataMovimento}'`
    });

    const lmcEstoque = await useDB({
        query: `select * from Cd_Lmcestoque where loja_Fk=${idLoja} and lmccab_fk=${idLmcCab} and tipocombustivel_Fk=${idTipoComb}  order by tanque asc   `
    });

    const lmcDet = await useDB({
        query: `select Cd_Lmcdet.* from Cd_Lmcdet, cd_tanque where Cd_Lmcdet.loja_Fk=${idLoja} and lmccab_fk=${idLmcCab} and cd_tanque.tipocombustivel_Fk=${idTipoComb}  order by bico_Fk asc   `
    });

    return { code: 200, results: { tanque, lmcCab, lmcEstoque, lmcDet } }

};

const atualizatanque = async function ({ idLoja, dataMovimento, idTanque, dataHora, dataEntradaSaida, estoqueTanque, estoqueFinal, idLmcCab }) {

    const lmcCab = await useDB({
        query: `SELECT id_lmccab  FROM public.cd_lmccab  where loja_fk=${idLoja}   and datamovimento_lmccab='${dataMovimento}'`
    });

    const abastecimento = await useDB({
        query: `SELECT sum(qtd) as qtd  FROM public.vd_abastecimentos as ab  inner join cd_bico as b on b.id_bico=ab.bico_fk  where tanque_fk=${idTanque}   and b.loja_fk=${idLoja}  and ab.loja_fk=${idLoja}  and cast(datahora as date)='${dataHora}'`
    });

    const compraCombDet = await useDB({
        query: `SELECT sum( det.quantidade) as qtd   FROM public.fn_compra_combustiveldet as det   inner join fn_compra_detalhe as d on d.id_compradet=det.compradet_fk inner join fn_compra_cabecalho as cab on cab.id_compracab=d.compracab_fk where d.loja_fk=${idLoja} and det.loja_fk=${idLoja} and cab.loja_fk=${idLoja} and cast(dataentradasaida_compracab as date)='${dataEntradaSaida}' and tanque=${idTanque}`
    });

    const updateTanque = await useDB({
        query: `UPDATE public.cd_tanque   SET  estoque_tanque=${estoqueTanque} WHERE id_tanque=${idTanque}  and loja_fk=${idLoja}`
    });

    const updateLmcEstoque = await useDB({
        query: `UPDATE public.cd_lmcestoque   SET  estoquefinal=${estoqueFinal} WHERE loja_fk=${idLoja}  AND lmccab_fk=${idLmcCab} and  tanque=${idTanque} `
    });

    return { code: 200, results: { lmcCab, abastecimento, compraCombDet, updateTanque, updateLmcEstoque } }

};

const verificargerar = async function ({ idLoja, idTipoComb, dataMovimento }) {

    const lmcSituacaoData = await useDB({
        query: `SELECT id_lmcsituacao  FROM public.cd_lmcsituacao  as s  inner join cd_lmccab as cab on cab.id_lmccab = s.lmccab_fk  where s.loja_fk=${idLoja}    and cab.loja_fk=${idLoja}   and tipocombustivel_fk=${idTipoComb}  and s.situacao='F'  and cab.situacao='F'  and cab.datamovimento_lmccab='${dataMovimento}'`
    });

    const lmcSituacaoDataMenor = await useDB({
        query: `SELECT id_lmcsituacao  FROM public.cd_lmcsituacao  as s  inner join cd_lmccab as cab on cab.id_lmccab = s.lmccab_fk  where s.loja_fk=${idLoja}    and cab.loja_fk=${idLoja}   and tipocombustivel_fk=${idTipoComb}  and s.situacao='F'  and cab.situacao='F'  and cab.datamovimento_lmccab<'${dataMovimento}'`
    });

    const lmcSituacao = await useDB({
        query: `select Cd_Lmcsituacao.* from  Cd_Lmcsituacao, cd_Lmccab where cd_Lmccab.datamovimento_Lmccab<'${dataMovimento}'  and cd_lmcsituacao.loja_Fk=${idLoja}  and Cd_Lmcsituacao.situacao='P' and tipocombustivel_Fk=${idTipoComb} and cd_lmcsituacao.lmccab_fk = cd_lmccab.id_lmccab  order by cd_Lmccab.datamovimento_Lmccab desc `
    });

    return { code: 200, results: { lmcSituacaoData, lmcSituacaoDataMenor, lmcSituacao } }

};

const pegarsituacao = async function ({ dataEntradaSaida, idLoja, numTanque, idLmcCab, idTipoComb, idCompraCab, dataMovimento, liv }) {

    const fatura = await useDB({
        query: `select Nfe_Fatura.* from Nfe_Fatura, nfe_Cabecalho where nfe_Cabecalho.tipooperacao_Nfecab='3' and nfe_Cabecalho.statusnota_Nfecab='5' and tipo='tanque' and nfe_Fatura.loja_Fk=${idLoja}  and cast(nfe_Cabecalho.dataentradasaida_Nfecab as date)='${dataEntradaSaida}' and nfe_fatura.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    const tanque = await useDB({
        query: `select * from Cd_Tanque where numero_Tanque=${numTanque} and loja_Fk=${idLoja} `
    });

    const lmcEstoque = await useDB({
        query: `select * from Cd_Lmcestoque where loja_Fk=${idLoja} and lmccab_fk=${idLmcCab} and tipocombustivel_Fk=${idTipoComb}  order by tanque asc   `
    });

    const lmcDet = await useDB({
        query: `select Cd_Lmcdet.* from Cd_Lmcdet, cd_tanque where Cd_Lmcdet.loja_Fk=${idLoja} and lmccab_fk=${idLmcCab} and cd_tanque.tipocombustivel_Fk=${idTipoComb}  order by bico_Fk asc   `
    });

    const compraCompDet = await useDB({
        query: `selectFn_Compra_Combustiveldet. * from  Fn_Compra_Combustiveldet, fn_compra_cabecalho, fn_compra_detalhe where Fn_Compra_Combustiveldet.loja_Fk=${idLoja} and cast(fn_Compra_Cabecalho.dataentradasaida_Compracab as date) ='${dataEntradaSaida}' and fn_Compra_Cabecalho.status_Compracab='F' and fn_compra_detalhe.tipocombustivel_Fk=${idTipoComb}  and fn_Compra_Cabecalho.modelo_Compracab='55' and Fn_Compra_Combustiveldet.compradet_fk = fn_compra_detalhe.id_compradet and fn_compra_detalhe.compracab_fk = fn_compra_cabecalho.id_compracab order by tanque asc `
    });

    const docReferenciado = await useDB({
        query: `SELECT  numerodocfiscal_nfecab,chaveacesso_nfecab  FROM public.nfe_docreferenciado as d  inner join nfe_cabecalho as cab on d.nfe_cabecalho_fk=cab.id_nfe_cabecalho   where compracab_fk=${idCompraCab} and d.loja_fk=${idLoja} and cab.loja_fk=${idLoja}  and statusnota_nfecab='5' and  tipooperacao_nfecab='5'`
    });

    const livro = await useDB({
        query: `SELECT max(livro) as livro  FROM public.cd_lmcsituacao as d  inner join cd_lmccab as cab on cab.id_lmccab=d.lmccab_fk  where cab.loja_fk=${idLoja} and d.loja_fk=${idLoja}      and tipocombustivel_fk=${idTipoComb} `
    });

    const lmcSituacao = await useDB({
        query: `SELECT max(pagina)+1 as p FROM public.cd_lmcsituacao as d inner join cd_lmccab as cab on cab.id_lmccab=d.lmccab_fk where cab.loja_fk=${idLoja} and d.loja_fk=${idLoja}    and tipocombustivel_fk=${idTipoComb} and livro = ${liv}  and datamovimento_lmccab='${dataMovimento}' `
    });

    return { code: 200, results: { fatura, tanque, lmcEstoque, lmcDet, compraCompDet, docReferenciado, livro, lmcSituacao } }

};

const atualizatotais = async function ({ idLoja, idTipoComb, dataInicial, dataFinal }) {

    const vendas = await useDB({
        query: `SELECT sum(valor_diario) as  vendas  FROM public.cd_lmcsituacao as d  inner join cd_lmccab as cab on d.lmccab_fk=cab.id_lmccab  where d.loja_fk=${idLoja} and cab.loja_fk=${idLoja} and tipocombustivel_fk=${idTipoComb} and (datamovimento_lmccab between '${dataInicial}'  and '${dataFinal}')`
    });

    return { code: 200, results: { vendas } }

};

const pegartanque = async function ({ idLoja, idTanque }) {

    const tanque = await useDB({
        query: `select numero_tanque from cd_tanque  where loja_fk=${idLoja}  and id_tanque=${idTanque} `
    });

    return { code: 200, results: { tanque } }

};

const pegarc = async function ({ idLoja, idTanque }) {

    const tanque = await useDB({
        query: `select capacidade_tanque from cd_tanque  where loja_fk=${idLoja}  and id_tanque=${idTanque} `
    });

    return { code: 200, results: { tanque } }

};

const pegarcatual = async function ({ idLoja, idTanque }) {

    const tanque = await useDB({
        query: `select estoque_tanque from cd_tanque  where loja_fk=${idLoja}  and id_tanque=${idTanque} `
    });

    return { code: 200, results: { tanque } }

};

const listar = async function ({ idLoja, dataInicial, dataFinal, idTipoComb }) {

    const lmcSItuacao = await useDB({
        query: `select Cd_Lmcsituacao.* from Cd_Lmcsituacao, cd_Lmccab where (cd_Lmccab.datamovimento_Lmccab between  '${dataInicial}' and  '${dataFinal}') and cd_lmcsituacao.loja_Fk=${idLoja}  and tipocombustivel_Fk=${idTipoComb} and cd_lmcsituacao.lmccab_fk = id_lmccab  order by cd_Lmccab.datamovimento_Lmccab,tipocombustivel_Fk asc`
    });

    const lmcSItuacao2 = await useDB({
        query: `select Cd_Lmcsituacao.* from Cd_Lmcsituacao, cd_Lmccab where (cd_Lmccab.datamovimento_Lmccab between  '${dataInicial}' and  '${dataFinal}') and cd_lmcsituacao.loja_Fk=${idLoja}  and cd_lmcsituacao.lmccab_fk = id_lmccab  order by cd_Lmccab.datamovimento_Lmccab,tipocombustivel_Fk asc`
    });

    return { code: 200, results: { lmcSItuacao, lmcSItuacao2 } }

};

const cancelarl = async function ({ idTipoComb, idLmcCab, idLoja }) {

    const lmcDet = await useDB({
        query: `select * from Cd_Lmcdet where tipocombustivel_Fk=${idTipoComb} and lmccab_fk=${idLmcCab}  and loja_Fk=${idLoja} `
    });

    return { code: 200, results: { lmcDet } }

};

const cancelarltodos = async function ({ idTipoComb, idLmcCab, idLoja }) {

    const lmcDet = await useDB({
        query: `select * from Cd_Lmcdet where tipocombustivel_Fk=${idTipoComb} and lmccab_fk=${idLmcCab}  and loja_Fk=${idLoja} `
    });

    return { code: 200, results: { lmcDet } }

};

const excluir = async function ({ idLmcCab, idLoja }) {

    const lmcSituacao = await useDB({
        query: `select * from Cd_Lmcsituacao  WHERE lmccab_fk=${idLmcCab}  and loja_Fk=${idLoja}`
    });

    const tanqueMedicao = await useDB({
        query: `select * from Cd_Tanque_Medicao WHERE lmccab_Fk=${idLmcCab}  and loja_fk=${idLoja}`
    });

    const lmcDet = await useDB({
        query: `select * from Cd_Lmcdet  WHERE lmccab_fk=${idLmcCab}  and loja_Fk=${idLoja}`
    });

    const lmcEstoque = await useDB({
        query: `select * from Cd_Lmcestoque WHERE lmccab_fk=${idLmcCab} and loja_Fk=${idLoja}`
    });

    const lmcCab = await useDB({
        query: `select * from Cd_Lmccab WHERE id_lmccab=${idLmcCab}  and loja_Fk=${idLoja}`
    });

    return { code: 200, results: { lmcSituacao, tanqueMedicao, lmcDet, lmcEstoque, lmcCab } }

};

const inserircab = async function ({ idLoja, insertLmcCabData, insertLmcCabData2, insertLmcSituacaoData, insertLmcDetData, insertLmcEstoqueData }) {

    let statusInsert, statusInsert2, statusInsert3, statusInsert4, statusInsert5;

    const idLmcCab = await useDB({
        query: `SELECT max(id_lmccab)+1 as idc FROM public.cd_lmccab  where loja_fk=${idLoja} `
    });

    const insertLmcCab = await useDB({
        query: `INSERT INTO public.cd_lmccab( 
            id_lmccab, 
            loja_fk, 
            datamovimento_lmccab, 
            datainicio_lmccab,  
            usuarioaltera, 
            dataaltera, 
            situacao, 
            vendasdodia)VALUES (
                ${idLmcCab[0].idc}, 
                ${insertLmcCabData.loja_fk}, 
                '${insertLmcCabData.datamovimento_lmccab}', 
                '${insertLmcCabData.datainicio_lmccab}',
                ${insertLmcCabData.usuarioaltera},  
                '${insertLmcCabData.dataaltera}',  
                'P', 
                ${insertLmcCabData.vendasdodia});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const insertLmcCab2 = await useDB({
        query: `INSERT INTO public.cd_lmccab( 
            id_lmccab, 
            loja_fk, 
            datamovimento_lmccab, 
            datainicio_lmccab,  
            datafechamento_lmccab,
            usuarioaltera, 
            dataaltera, 
            situacao, 
            vendasdodia)VALUES (
                ${idLmcCab[0].idc}, 
                ${insertLmcCabData2.loja_fk}, 
                '${insertLmcCabData2.datamovimento_lmccab}', 
                '${insertLmcCabData2.datainicio_lmccab}',
                '${insertLmcCabData2.datafechamento_lmccab}',
                ${insertLmcCabData2.usuarioaltera},  
                '${insertLmcCabData2.dataaltera}',  
                'F', 
                ${insertLmcCabData2.vendasdodia});`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const idLmcSituacao = await useDB({
        query: `SELECT max(id_lmcsituacao)+1 as idc  FROM public.cd_lmcsituacao  where loja_fk=${idLoja} `
    });

    const insertLmcSituacao = await useDB({
        query: `INSERT INTO public.cd_lmcsituacao(  
            id_lmcsituacao, 
            loja_fk, 
            tipocombustivel_fk, 
            lmccab_fk, 
            situacao,   
            pagina,  
            valor_unitario) VALUES (
                ${idLmcSituacao[0].idc}, 
                ${insertLmcSituacaoData.loja_fk}, 
                ${insertLmcSituacaoData.tipocombustivel_fk}, 
                ${insertLmcSituacaoData.lmccab_fk}, 
                'P',    
                0, 
                ${insertLmcSituacaoData.valor_unitario} );`
    }).then(() => {
        statusInsert3 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    const idLmcDet = await useDB({
        query: `SELECT max(id_lmcdet)+1 as idc FROM public.cd_lmcdet  where loja_fk=${idLoja} `
    });

    const insertLmcDet = await useDB({
        query: `INSERT INTO public.cd_lmcdet( 
            id_lmcdet, 
            loja_fk, 
            tipocombustivel_fk,
            bico_fk, 
            lmccab_fk, 
            encerranteinicial,   
            encerrantefinal, 
            afericao, 
            tanque, 
            usuarioaltera, 
            dataaltera,   
            bomba, 
            valorproduto, 
            qtdabertura, 
            qtdfechamento, 
            situacao, 
            valor_unitario)    VALUES (
                ${idLmcDet[0].idc}, 
                ${insertLmcDetData.loja_fk},
                ${insertLmcDetData.tipocombustivel_fk},  
                ${insertLmcDetData.bico_fk}, 
                ${insertLmcDetData.lmccab_fk},
                ${insertLmcDetData.encerranteinicial}, 
                ${insertLmcDetData.encerrantefinal},   
                ${insertLmcDetData.afericao}, 
                ${insertLmcDetData.tanque}, 
                ${insertLmcDetData.usuarioaltera}, 
                '${insertLmcDetData.dataaltera}', 
                ${insertLmcDetData.bomba},  
                ${insertLmcDetData.valorproduto}, 
                ${insertLmcDetData.qtdabertura}, 
                ${insertLmcDetData.qtdfechamento}, 
                'P', 
                ${insertLmcDetData.valor_unitario});`

    }).then(() => {
        statusInsert4 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert4 = err.message;
    });

    const idLmcEstoque = await useDB({
        query: `SELECT max(id_lmcestoque)+1 as idc FROM public.cd_lmcestoque  where loja_fk=${idLoja} `
    });

    const insertLmcEstoque = await useDB({
        query: `INSERT INTO public.cd_lmcestoque( 
            id_lmcestoque, 
            loja_fk, 
            tipocombustivel_fk, 
            lmccab_fk, 
            estoqueinicial,  
            estoquefinal, 
            tanque, 
            usuarioaltera, 
            dataaltera) VALUES (
                ${idLmcEstoque[0].idc}, 
                ${insertLmcEstoqueData.loja_fk}, 
                ${insertLmcEstoqueData.tipocombustivel_fk}, 
                ${insertLmcEstoqueData.lmccab_fk}, 
                ${insertLmcEstoqueData.estoqueinicial},  
                ${insertLmcEstoqueData.estoquefinal}, 
                ${insertLmcEstoqueData.tanque}, 
                ${insertLmcEstoqueData.usuarioaltera}, 
                '${insertLmcEstoqueData.dataaltera}');`
    }).then(() => {
        statusInsert5 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert5 = err.message;
    });

    return { code: 200, results: { idLmcCab, statusInsert, statusInsert2, idLmcSituacao, statusInsert3, idLmcDet, statusInsert4, idLmcEstoque, statusInsert5 } }

};

const verificar = async function ({ idLoja, dataMovimento, datahora, idBico, idTanque }) {

    const lmcCab = await useDB({
        query: `select * from Cd_Lmccab where loja_fk=${idLoja} and datamovimento_Lmccab='${dataMovimento}' `
    });

    const bico = await useDB({
        query:` select * from Cd_Bico where loja_Fk=${idLoja} and ativo_Bic='S' order by numero_Bic asc`
    });

    const abastecimento = await useDB({
        query:`SELECT  loja_fk, bico_fk, cast(datahora as date),   MIN(encerrantedepois) as ei,  SUM(qtd) as volume, MAX(encerrantedepois) as ef,  max(valorunit)  FROM public.vd_abastecimentos   where loja_fk=${idLoja} AND status_abastecimento!='R'  and cast(datahora as date)='${datahora}'  and bico_fk=${idBico}   group by  loja_fk, bico_fk, cast(datahora as date)  order by cast(datahora as date)`
    });

    const abastecimento2 = await useDB({
        query:`SELECT  MAX(encerrantedepois) as ef  FROM public.vd_abastecimentos   where loja_fk=${idLoja}  AND status_abastecimento!='R'  and cast(datahora as date)='${datahora}'  and bico_fk=${idBico}` 
    });

    const abastecimento3 = await useDB({
        query:`SELECT  SUM(qtd) as volume  FROM public.vd_abastecimentos   where loja_fk=${idLoja}   AND status_abastecimento='A'  and bico_fk=${idBico}  and cast(datahora as date)='${datahora}'`
    });

    const tanque = await useDB({
        query:` select * from Cd_Tanque where loja_Fk=${idLoja} order by numero_Tanque asc`
    });

    const abastecimento4 = await useDB({
        query:`SELECT  SUM(qtd) as volume  FROM public.vd_abastecimentos as vd  inner join cd_bico as b on (b.id_bico=vd.bico_fk and b.loja_fk=vd.loja_fk)  where vd.loja_fk=${idLoja}  and status_abastecimento!='R'  and status_abastecimento!='A' and tanque_fk=${idTanque}  and cast(datahora as date)='${datahora}'`
    });

    return { code: 200, results: { lmcCab, bico, abastecimento, abastecimento2, abastecimento3, tanque, abastecimento4 } }

};

const termo = async function({ idTipoComb, idLoja }){ 

    const tanque = await useDB({ 
    query: `SELECT sum(capacidade_tanque) FROM public.cd_tanque where tipocombustivel_fk=${idTipoComb} and loja_fk=${idLoja} `
 }); 

 return { code: 200, results: { tanque }}  
    
};


module.exports = {
    vermedicoes,
    verab,
    salvarg,
    atualizatanque,
    verificargerar,
    pegarsituacao,
    atualizatotais,
    pegartanque,
    pegarc,
    pegarcatual,
    listar,
    cancelarl,
    cancelarltodos,
    excluir,
    inserircab,
    verificar,
    termo
}