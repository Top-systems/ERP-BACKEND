const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const onCellEditms = async function ({ registroOms, idProd, updateRegistroOms }) {

    const produto = await useDB({
        query: `SELECT id_prod FROM public.cd_produto  where registroms_prod='${registroOms}'  and id_prod!=${idProd} `
    });

    const updateProduto = await useDB({
        query: `UPDATE public.cd_produto SET  registroms_prod='${updateRegistroOms}' WHERE id_prod=${idProd} `
    });

    return { code: 200, results: { produto, updateProduto } }

};

const fabricante = async function ({ idProd }) {

    const fab = await useDB({
        query: ` select nome_fab from cd_produto as p  inner join cd_fabricante as fab on fab.id_fab=p.fabricante_fk  where id_prod=${idProd} `
    });

    return { code: 200, results: { fab } }

};

const init = async function ({ idLoja }) {

    const farmaceutico = await useDB({
        query: `select * from Cf_Farmaceutico where loja_fk=${idLoja} and padrao_Farmaceutico='S'`
    });

    return { code: 200, results: { farmaceutico } }

};

const ultimoinventario = async function ({ idLoja }) {

    const arquivoAnvisa = await useDB({
        query: `select * from Cd_Arquivosanvisa where loja_fk=${idLoja} and situacao='N' and tipo='2' `
    });

    return { code: 200, results: { arquivoAnvisa } }

};

const confirmaalteracaodataprescricao = async function ({ dataPrescricao, idReceita, idLoja }) {

    const updateReceita = await useDB({
        query: `UPDATE public.vd_receita SET  dataprescricao_rec='${dataPrescricao}' WHERE id_receita=${idReceita} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { updateReceita } }

};

const confirmaalteracaodataanvisa = async function ({ dataAnvisa, dataAltera, usuarioAltera, idLoteMed, idLoja }) {

    const updateCupomDetLoteMed = await useDB({
        query: `update ecf_cupomdet_lotemed  set data_anvisa='${dataAnvisa}' ,dataaltera='${dataAltera}', usuarioaltera=${usuarioAltera} where id_cupomdet_lotemed=${idLoteMed} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { updateCupomDetLoteMed } }

};

const confirmaalteracaodataanvisa2 = async function ({ dataAnvisa, dataAltera, usuarioAltera, idCompraMed, idLoja }) {

    const updateCompraMedicamentoDet = await useDB({
        query: `update fn_compra_medicamentodet set data_anvisa='${dataAnvisa}' ,dataaltera='${dataAltera}', usuarioaltera=${usuarioAltera} where id_compra_medicamentodet=${idCompraMed} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { updateCompraMedicamentoDet } }

};

const confirmaalteracaodataanvisa2m1 = async function ({ dataAnvisa, dataAltera, usuarioAltera, idM1Med, idLoja, idNfeMed }) {

    const updateM1MedicamentoDet = await useDB({
        query: `update vd_m1_medicamentodet set data_anvisa='${dataAnvisa}' ,dataaltera='${dataAltera}', usuarioaltera=${usuarioAltera} where id_m1_medicamentodet=${idM1Med} and loja_fk=${idLoja}`
    });

    const updateNfeMedicamentoDet = await useDB({
        query: `update nfe_medicamentodet set data_anvisa='${dataAnvisa}' ,dataaltera='${dataAltera}', usuarioaltera=${usuarioAltera} where id_nfe_medicamentodet=${idNfeMed} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { updateM1MedicamentoDet, updateNfeMedicamentoDet } }

};

const confirmaalteracaodataanvisa2m1d = async function ({ dataAnvisa, dataAltera, usuarioAltera, idM1Med, idLoja, idNfeMed }) {

    const updateM1MedicamentoDet = await useDB({
        query: `update vd_m1_medicamentodet set data_anvisa='${dataAnvisa}' ,dataaltera='${dataAltera}', usuarioaltera=${usuarioAltera} where id_m1_medicamentodet=${idM1Med} and loja_fk=${idLoja}`
    });

    const updateNfeMedicamentoDet = await useDB({
        query: `update nfe_medicamentodet set data_anvisa='${dataAnvisa}' ,dataaltera='${dataAltera}', usuarioaltera=${usuarioAltera} where id_nfe_medicamentodet=${idNfeMed} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { updateM1MedicamentoDet, updateNfeMedicamentoDet } }

};

const abrirlotes = async function ({ idProd, idLoja }) {

    const lote = await useDB({
        query: `select Cd_Lote.* from Cd_Lote, cd_produto where produto_Fk=${idProd} and loja_fk=${idLoja} and cast(qtde_Lote as double precision)>0.00 and cd_produto.classeterapeutica_Prod!='0'`
    })

    return { code: 200, results: { lote } }

};

const atualizarLote = async function ({ dataAnvisa, dataAltera, usuarioAltera, idLoteMed, idLoja }) {

    const updateCupomDetLoteMed = await useDB({
        query: `update ecf_cupomdet_lotemed  set data_anvisa='${dataAnvisa}' ,dataaltera='${dataAltera}', usuarioaltera=${usuarioAltera} where id_cupomdet_lotemed=${idLoteMed} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { updateCupomDetLoteMed } }

};

const pegarUltimaDataAceita = async function ({ idLoja }) {

    const arquivosAnvisa = await useDB({
        query: `select * from Cd_Arquivosanvisa where loja_Fk=${idLoja} and situacao='A' order by id desc`
    });

    return { code: 200, results: { arquivosAnvisa } }

};

const listarArquivos = async function ({ idLoja, dataInicial, dataFinal }) {

    const arquivosAnvisa = await useDB({
        query: `select * from Cd_Arquivosanvisa where loja_Fk=${idLoja} and (cast(datainicial as date) between '${dataInicial}'  and '${dataFinal}' ) order by id desc`
    });

    const arquivoAnvisa2 = await useDB({
        query: `select * from Cd_Arquivosanvisa where loja_Fk=${idLoja} order by id desc`
    });

    return { code: 200, results: { arquivosAnvisa, arquivoAnvisa2 } }

};

const atualizarArquivos = async function ({ idLoja }) {

    const arquivosAnvisa = await useDB({
        query: `select * from Cd_Arquivosanvisa * where loja_Fk=${idLoja} and situacao='T'`
    });

    return { code: 200, results: { arquivosAnvisa } }

};

const retornoAtualizarlistalotemed = async function ({ idLoja, idCompraMed, enviadoAnvisa, dataAltera, usuarioaltera, idCupomLote, idNfeMed, idM1Medicamento }) {

    const compraMedicamentoDet = await useDB({
        query: `select * from Fn_Compra_Medicamentodet where id_Compra_Medicamentodet=${idCompraMed}  and loja_Fk=${idLoja}`
    });

    const updateCupomDetLoteMed = await useDB({
        query: `update ecf_cupomdet_lotemed  set enviado_anvisa='${enviadoAnvisa}', dataaltera='${dataAltera}', usuarioaltera=${usuarioaltera} where id_cupomdet_lotemed=${idCupomLote} and loja_fk=${idLoja}`
    });

    const medicamentoDet = await useDB({
        query: `select * from Nfe_Medicamentodet where id_Nfe_Medicamentodet=${idNfeMed}  and loja_Fk=${idLoja}`
    });

    const m1Medicamento = await useDB({
        query: `select * from Vd_M1_Medicamentodet where id_M1_Medicamentodet=${idM1Medicamento}  and loja_Fk=${idLoja}`
    });

    return { code: 200, results: { compraMedicamentoDet, updateCupomDetLoteMed, medicamentoDet, m1Medicamento } }

};

const enviarArquivo = async function ({ idLoja, base64byte, xml, idArquivoAnvisa }) {

    const arquivoAnvisa = await useDB({
        query: `select * from Cd_Arquivosanvisa where loja_Fk=${idLoja} order by id desc`
    });

    const updateArquivoAnvisa = await useDB({
        query: `update cd_arquivosanvisa set  base64byte='${base64byte}',xml='${xml}' where loja_fk=${idLoja} and id=${idArquivoAnvisa}`
    });

    return { code: 200, results: { arquivoAnvisa, updateArquivoAnvisa } }

};

const atualizarlistalotemed = async function ({ idCompraMed, idLoja, idM1Med, idNfeMed, enviadoAnvisa, dataAltera, usuarioaltera, idCupomLote }) {

    const compraMedicamentoDet = await useDB({
        query: `select * from Fn_Compra_Medicamentodet where id_Compra_Medicamentodet=${idCompraMed}  and loja_Fk=${idLoja}`
    });

    const m1MedicamentoDet = await useDB({
        query: `select * from Vd_M1_Medicamentodet where id_M1_Medicamentodet=${idM1Med}  and loja_Fk=${idLoja}`
    });

    const nfeMedicamentoDet = await useDB({
        query: `select * from Nfe_Medicamentodet where id_Nfe_Medicamentodet=${idNfeMed}  and loja_Fk=${idLoja}`
    });

    const updateCupomDetLoteMed = await useDB({
        query: `update ecf_cupomdet_lotemed  set enviado_anvisa='${enviadoAnvisa}', dataaltera='${dataAltera}', usuarioaltera=${usuarioaltera} where id_cupomdet_lotemed=${idCupomLote} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { compraMedicamentoDet, m1MedicamentoDet, nfeMedicamentoDet, updateCupomDetLoteMed } }

};

const criarArquivoInventario = async function ({ idProd }) {

    const codBar = await useDB({
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd} `
    });

    return { code: 200, results: { codBar } }

};

const veRetorno = async function ({ idArquivoAnvisa, idLoja }) {

    const xmlArquivoAnvisa = await useDB({
        query: `select xml from cd_arquivosanvisa where id=${idArquivoAnvisa} and loja_fk=${idLoja} `
    });

    return { code: 200, results: { xmlArquivoAnvisa } }

};

const gerarMovimento = async function ({ idLoja, dataInicial, dataFinal, idProd }) {

    const cupomDetLoteMed = await useDB({
        query: `SELECT datahora_cupom,coo_cupom,serieecf_cupom, l.produto_fk,descricao_prod, sum(qtdevendida_lotemed) as qtlote,qtde_cupitem as qtdet,id_cupomdet_prod  FROM public.ecf_cupomdet_lotemed as l  inner join ecf_cupomdet_prod as det on det.id_cupomdet_prod=l.cupomdet_fk  inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk  inner join cd_produto as p on p.id_prod=l.produto_fk where l.loja_fk=${idLoja} and  det.loja_fk=${idLoja} and  cab.loja_fk=${idLoja} and  status_cupitem='F' and status_cupom in ('F','O')  and (cast(datahora_cupom as date) between ' ${dataInicial}' and ' ${dataFinal}') group by   datahora_cupom,coo_cupom,serieecf_cupom, l.produto_fk,descricao_prod,qtde_cupitem,id_cupomdet_prod`
    });

    const tribNaturezaOper = await useDB({
        query: `SELECT   dataentradasaida_compracab,numerodocfiscal_compracab,fornecedor_fk, det.produto_fk,descricao_prod, sum(qtdelote) as qtlote,quantidade as qtdet  ,id_compradet FROM public.fn_compra_medicamentodet as l  inner join fn_compra_detalhe as det on det.id_compradet=l.compradet_fk  inner join fn_compra_cabecalho as cab on cab.id_compracab =det.compracab_fk  inner join cd_produto as p on p.id_prod=det.produto_fk where l.loja_fk=${idLoja}  and  det.loja_fk=${idLoja}  and  cab.loja_fk=${idLoja} and  status_compracab='1' and  naturezaoperacao_fk in (SELECT id  FROM public.cd_trib_naturezaoper  where tipooperacao='1')  and (cast(dataentradasaida_compracab as date) between ' ${dataInicial}' and ' ${dataFinal}') group by   dataentradasaida_compracab,numerodocfiscal_compracab,fornecedor_fk, det.produto_fk,descricao_prod,quantidade,id_compradet`
    });

    const medicamentoDet = await useDB({
        query: `SELECT   dataentradasaida_nfecab,numerodocfiscal_nfecab ,numerodocfiscal_nfecab as nn, det.produto_fk,descricao_prod, sum(qtdelote ) as qtlote,quantidade as qtdet  ,id_nfedetalhe FROM public.nfe_medicamentodet as l  inner join nfe_detalhe as det on det.id_nfedetalhe=l.nfedet_fk  inner join nfe_cabecalho as cab on cab.id_nfe_cabecalho =det.nfecab_fk   inner join cd_produto as p on p.id_prod=det.produto_fk where l.loja_fk=${idLoja} and  det.loja_fk=${idLoja} and  cab.loja_fk=${idLoja} and   statusnota_nfecab ='5' and (cast(dataentradasaida_nfecab as date) between ' ${dataInicial}' and ' ${dataFinal}') group by  dataentradasaida_nfecab,numerodocfiscal_nfecab ,numerodocfiscal_nfecab, det.produto_fk,descricao_prod,quantidade,id_nfedetalhe`
    });

    const m1MedicamentoDet = await useDB({
        query: `SELECT   datalanc,numdoc ,numdoc as nn, det.produto_fk,descricao_prod, sum(qtdelote ) as qtlote,qtde_m1 as qtdet  ,id_m1_detalhe FROM public.vd_m1_medicamentodet as l  inner join vd_m1_detalhe as det on det.id_m1_detalhe=l.m1det_fk   inner join vd_m1 as cab on cab.id_m1 =det.m1_fk   inner join cd_produto as p on p.id_prod=det.produto_fk where l.loja_fk=${idLoja} and  det.loja_fk=${idLoja} and  cab.loja_fk=${idLoja} and   situacao=1 and (cast(datalanc as date) between ' ${dataInicial}' and ' ${dataFinal}') group by  datalanc,numdoc,numdoc ,det.produto_fk,descricao_prod,qtde_m1,id_m1_detalhe`
    });

    const lote = await useDB({
        query: `select qtde_Lote, cd_produto.registroms_Prod, cd_unidade.sigla_Unid,cd_produto.id_Prod,cd_produto.descricao_Prod,cd_produto.classeterapeutica_Prod,numero_Lote from Cd_Lote, cd_produto, cd_unidade where cd_lote.loja_fk=${idLoja}  and qtde_Lote > 0 and cd_produto.classeterapeutica_Prod!='0' and cd_lote.produto_fk = cd_produto.id_prod and cd_produto.unidade_fk = cd_unidade.id_unid`
    });

    const estoqueGeral = await useDB({
        query: `select * from Es_Estoquegeral where loja_fk=${idLoja}  and produto_Fk=${idProd}`
    });

    return { code: 200, results: { cupomDetLoteMed, tribNaturezaOper, medicamentoDet, m1MedicamentoDet, lote, estoqueGeral } }

};

const consultarCompras2 = async function ({ idLoja, dataInicial, dataFinal }) {

    const compraMediDet = await useDB({
        query: `select 
                qtdelote,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cd_fornecedor.id_Forn,
                cd_fornecedor.nome_Forn,
                fn_Compra_Cabecalho.dataentradasaida_Compracab,
                fn_Compra_Cabecalho.numerodocfiscal_Compracab,
                cd_fornecedor.cpfcnpj_Forn,
                cd_produto.classeterapeutica_Prod,
                fn_compra_detalhe.id_Compradet,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                fn_Compra_Cabecalho.dataentradasaida_Compracab,
                fn_Compra_Cabecalho.id_Compracab,
                fn_Compra_Medicamentodet.id_Compra_Medicamentodet,
                data_anvisa 
            from 
                Fn_Compra_Medicamentodet,
                fn_compra_detalhe,
                cd_produto,
                cd_fornecedor,
                fn_compra_cabecalho,
                cd_unidade,
                cd_Lote
            where 
                Fn_Compra_Medicamentodet.loja_Fk=${idLoja}
            and
                fn_compra_detalhe.loja_Fk=${idLoja}
            
            and
                fn_compra_cabecalho.loja_Fk=${idLoja}
           
            and 
                cast(data_anvisa as date) BETWEEN '${dataInicial}'  and '${dataFinal}' 
            and 
                fn_Compra_Cabecalho.fornecedor_Fk is not null 
            and 
                cd_Lote is not null 
            and
                fn_compra_medicamentodet.compradet_fk = fn_compra_detalhe.id_compradet
            and
                fn_compra_medicamentodet.lote_fk = cd_lote.id_lote
            and
                fn_compra_detalhe.produto_fk = cd_produto.id_prod
            and
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                fn_compra_detalhe.compracab_fk = fn_compra_cabecalho.id_compracab
            and
                fn_compra_cabecalho.fornecedor_fk = cd_fornecedor.id_forn
            order by 
                data_anvisa desc`

    });

    return { code: 200, results: { compraMediDet } }

};

const consultarCompras = async function ({ idLoja, dataInicial, dataFinal, dataEntradaSaidaInical, dataEntradaSaidaFinal }) {

    const compraMediDet = await useDB({
        query: `select 
                qtdelote,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cd_fornecedor.id_Forn,
                cd_fornecedor.nome_Forn,
                fn_Compra_Cabecalho.dataentradasaida_Compracab,
                fn_Compra_Cabecalho.numerodocfiscal_Compracab,
                cd_fornecedor.cpfcnpj_Forn,
                cd_produto.classeterapeutica_Prod,
                fn_compra_detalhe.id_Compradet,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                fn_Compra_Cabecalho.dataentradasaida_Compracab,
                fn_Compra_Cabecalho.id_Compracab,
                fn_Compra_Medicamentodet.id_Compra_Medicamentodet,
                data_anvisa 
            from 
                Fn_Compra_Medicamentodet,
                fn_compra_detalhe,
                cd_produto,
                cd_fornecedor,
                fn_compra_cabecalho,
                cd_unidade,
                cd_Lote
            where 
                Fn_Compra_Medicamentodet.loja_Fk=${idLoja}
            and
                fn_compra_detalhe.loja_Fk=${idLoja}
            
            and
                fn_compra_cabecalho.loja_Fk=${idLoja}
            and
                ((CAST(fn_compra_cabecalho.dataentradasaida_compracab as date) BETWEEN '${dataEntradaSaidaInical}' and '${dataEntradaSaidaFinal}')
           
            and 
                cast(data_anvisa as date) BETWEEN '${dataInicial}'  and '${dataFinal}' 
            and 
                fn_Compra_Cabecalho.fornecedor_Fk is not null 
            and 
                cd_Lote is not null 
            and
                fn_compra_medicamentodet.compradet_fk = fn_compra_detalhe.id_compradet
            and
                fn_compra_medicamentodet.lote_fk = cd_lote.id_lote
            and
                fn_compra_detalhe.produto_fk = cd_produto.id_prod
            and
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                fn_compra_detalhe.compracab_fk = fn_compra_cabecalho.id_compracab
            and
                fn_compra_cabecalho.fornecedor_fk = cd_fornecedor.id_forn
            order by 
                data_anvisa desc`

    });

    return { code: 200, results: { compraMediDet } }

};

const consultarCupons = async function ({ idLoja, dataInicial, dataFinal }) {

    const cupomLoteMed = await useDB({
        query: `select 
                vd_Receita.tipo_Rec,
                vd_Receita.numnotifica_Rec,
                vd_Receita.dataprescricao_Rec,
                vd_Receita.usomedicamento_Rec,
                vd_Receita.nomepaciente_Rec,
                vd_Receita.idadepaciente_Rec,
                vd_Receita.sexopaciente_Rec,
                vd_Receita.numdoc_Rec,
                ecf_Cupomdet_Prod.id_Cupomdet_Prod,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.usucontinuo_Prod,
                cd_produto.descricao_Prod,
                qtdevendida_Lotemed,
                cd_Lote.numero_Lote,
                cd_profsaude.nome_Prof,
                cd_profsaude.registro_Prof,
                cd_profsaude.conselho_Prof,
                cd_profsaude.ufregistro_Prof,
                vd_Receita.tipodoc_Rec,
                vd_Receita.orgaoexp_Rec,
                vd_Receita.ufexp_Rec,
                vd_Receita.unidadeidade_Rec, 
                ecf_Cupomcab.datahora_Cupom,
                cd_produto.classeterapeutica_Prod, 
                ecf_Cupomdet_Lotemed.id_Cupomdet_Lotemed,
                cd_produto.id_Prod,
                cd_Lote.id_Lote,
                data_anvisa,
                vd_Receita.id_Receita 
            from 
                Ecf_Cupomdet_Lotemed,
                vd_receita,
                ecf_cupomdet_prod,
                cd_produto,
                cd_unidade,
                cd_profsaude,
                ecf_cupomcab,
                cd_lote
            where 
                ecf_Cupomdet_Prod.loja_fk=${idLoja}  
            and 
                cast(data_anvisa as date) BETWEEN '${dataInicial}'  and '${dataFinal}' 
            and 
                vd_Receita.statusvenda_Rec='F'  
            and 
                ecf_Cupomdet_Prod.receita_fk is not null 
            and 
                cd_produto.classeterapeutica_Prod!='0'  
            and 
                data_anvisa is not null 
            and
                ecf_cupomdet_lotemed.produto_fk = cd_produto.id_prod
            and
                ecf_cupomdet_lotemed.cupomdet_fk = ecf_cupomdet_prod.id_cupomdet_prod
            and
                ecf_cupomdet_prod.receita_fk = vd_receita.id_receita
            and
                vd_receita.profsaude_fk = cd_profsaude.id_profsaude
            and
                ecf_cupomdet_prod.cupomcab_fk = ecf_cupomcab.id_cupomcab
            and 
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                ecf_cupomdet_lotemed.lote_fk = cd_lote.id_lote 
            order by 
                data_anvisa  desc`
    });

    return { code: 200, results: { cupomLoteMed } }

};

const consultarM1 = async function ({ idLoja, dataAnvisaInicial, dataAnvisaFinal, dataFinal, dataInicial }) {

    const m1MedicamentoDet = await useDB({
        query: `select 
                vd_M1_Detalhe.qtde_M1,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cd_cliente.id_Cli,
                cd_cliente.nome_Cli,
                vd_m1.datalanc,
                vd_m1.numdoc,
                cd_cliente.cpfcnpj_Cli,
                cd_Produto.classeterapeutica_Prod,
                vd_M1_Detalhe.id_M1_Detalhe,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                vd_M1.datalanc,
                vd_M1.id_M1,
                id_M1_Medicamentodet,
                data_anvisa 
            from 
                Vd_M1_Medicamentodet ,
                vd_m1_detalhe,
                cd_produto,
                cd_unidade,
                vd_m1,
                cd_cliente,
                cd_lote
            where 
                vd_M1_Detalhe.loja_fk=${idLoja}  
            and 
                ((cast(vd_M1.datalanc as date) BETWEEN '${dataInicial}'  and '${dataFinal}')  
            or 
                (cast(data_anvisa as date) BETWEEN '${dataAnvisaInicial}'  and '${dataAnvisaFinal}')) 
            and 
                vd_M1.cliente_Fk is not null 
            and 
                vd_M1.tipooperacao='4' 
            and 
                vd_M1.situacao=1  
            and
                vd_M1_medicamentodet.m1det_fk = vd_m1_detalhe.id_m1_detalhe
            and
                vd_m1_detalhe.produto_fk = cd_produto.id_prod
            and
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                vd_m1_detalhe.m1_fk = vd_m1.id_m1
            and
                vd_m1.cliente_fk = cd_cliente.id_cli
            and
                vd_m1_medicamentodet.lote_fk = cd_lote.id_lote
            order by 
                vd_M1.datalanc desc`
    });

    return { code: 200, results: { m1MedicamentoDet } }

};


const consultarM1Perda = async function ({ idLoja, dataAnvisaInicial, dataAnvisaFinal, dataFinal, dataInicial }) {

    const m1MedicamentoDet = await useDB({
        query: `select 
                qtdelote,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cf_loja.id_loja,
                cf_loja.nome_loja,
                vd_m1.datalanc,
                vd_m1.numdoc,
                cd_Produto.classeterapeutica_Prod,
                vd_M1_Detalhe.id_M1_Detalhe,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                vd_M1.datalanc,
                vd_M1.id_M1,
                id_M1_Medicamentodet,
                vd_m1.motivo,
                data_anvisa 
            from 
                Vd_M1_Medicamentodet ,
                vd_m1_detalhe,
                cd_produto,
                cd_unidade,
                vd_m1,
                cf_loja,
                cd_lote
            where 
                vd_M1_Detalhe.loja_fk=${idLoja}  
            and 
                ((cast(vd_M1.datalanc as date) BETWEEN '${dataInicial}'  and '${dataFinal}')  
            or 
                (cast(data_anvisa as date) BETWEEN '${dataAnvisaInicial}'  and '${dataAnvisaFinal}')) 
            
            and 
                vd_M1.tipooperacao='8' 
            and 
                vd_M1.situacao=1  
            and
                vd_M1_medicamentodet.m1det_fk = vd_m1_detalhe.id_m1_detalhe
            and
                vd_m1_detalhe.produto_fk = cd_produto.id_prod
            and
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                vd_m1_detalhe.m1_fk = vd_m1.id_m1
            and
                vd_m1.loja_fk = cf_loja.id_loja
            and
                vd_m1_medicamentodet.lote_fk = cd_lote.id_lote
            order by 
                vd_M1.datalanc desc`
    });

    return { code: 200, results: { m1MedicamentoDet } }

};

const consultarM1Loja = async function ({ idLoja, dataAnvisaInicial, dataAnvisaFinal, dataFinal, dataInicial }) {

    const m1MedicamentoDet = await useDB({
        query: `select 
                vd_M1_Detalhe.qtde_M1,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cf_loja.id_loja,
                cf_loja.nome_loja,
                vd_m1.datalanc,
                vd_m1.numdoc,
                cf_loja.cnpj_loja,
                cd_Produto.classeterapeutica_Prod,
                vd_M1_Detalhe.id_M1_Detalhe,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                vd_M1.datalanc,
                vd_M1.id_M1,
                id_M1_Medicamentodet,
                data_anvisa 
            from 
                Vd_M1_Medicamentodet ,
                vd_m1_detalhe,
                cd_produto,
                cd_unidade,
                vd_m1,
                cf_loja,
                cd_lote
            where 
                vd_M1_Detalhe.loja_fk=${idLoja}  
            and 
                ((cast(vd_M1.datalanc as date) BETWEEN '${dataInicial}'  and '${dataFinal}')  
            or 
                (cast(data_anvisa as date) BETWEEN '${dataAnvisaInicial}'  and '${dataAnvisaFinal}')) 
            and 
                vd_M1.cliente_Fk is not null 
            and 
                vd_M1.tipooperacao='4' 
            and 
                vd_M1.situacao=1  
            and
                vd_M1_medicamentodet.m1det_fk = vd_m1_detalhe.id_m1_detalhe
            and
                vd_m1_detalhe.produto_fk = cd_produto.id_prod
            and
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                vd_m1_detalhe.m1_fk = vd_m1.id_m1
            and
                vd_m1.loja_fk = cf_loja.id_loja
            and
                vd_m1_medicamentodet.lote_fk = cd_lote.id_lote
            order by 
                vd_M1.datalanc desc`
    });

    return { code: 200, results: { m1MedicamentoDet } }

};

const consultarM1Devolucao = async function ({ idLoja, dataAnvisaInicial, dataAnvisaFinal, dataFinal, dataInicial }) {

    const m1MedicamentoDet = await useDB({
        query: `select 
                vd_M1_Detalhe.qtde_M1,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cd_fornecedor.id_forn,
                cd_fornecedor.nome_forn,
                vd_m1.datalanc,
                vd_m1.numdoc,
                cd_fornecedor.cpfcnpj_forn,
                cd_Produto.classeterapeutica_Prod,
                vd_M1_Detalhe.id_M1_Detalhe,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                vd_M1.datalanc,
                vd_M1.id_M1,
                id_M1_Medicamentodet,
                data_anvisa 
            from 
                Vd_M1_Medicamentodet ,
                vd_m1_detalhe,
                cd_produto,
                cd_unidade,
                vd_m1,
                cd_fornecedor,
                cd_lote
            where 
                vd_M1_Detalhe.loja_fk=${idLoja}  
            and 
                ((cast(vd_M1.datalanc as date) BETWEEN '${dataInicial}'  and '${dataFinal}')  
            or 
                (cast(data_anvisa as date) BETWEEN '${dataAnvisaInicial}'  and '${dataAnvisaFinal}')) 
            and 
                vd_M1.cliente_Fk is not null 
            and 
                vd_M1.tipooperacao='4' 
            and 
                vd_M1.situacao=1  
            and
                vd_M1_medicamentodet.m1det_fk = vd_m1_detalhe.id_m1_detalhe
            and
                vd_m1_detalhe.produto_fk = cd_produto.id_prod
            and
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                vd_m1_detalhe.m1_fk = vd_m1.id_m1
            and
                vd_m1.fornecedor_fk = cd_fornecedor.id_forn
            and
                vd_m1_medicamentodet.lote_fk = cd_lote.id_lote
            order by 
                vd_M1.datalanc desc`
    });

    return { code: 200, results: { m1MedicamentoDet } }

};

const consultarNFE = async function ({ idLoja, dataInicial, dataFinal }) {

    const medicamentoDet = await useDB({
        query: `select 
                qtdelote,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cd_cliente.id_Cli,
                cd_cliente.nome_Cli,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.numerodocfiscal_Nfecab,
                cd_cliente.cpfcnpj_Cli,
                cd_produto.classeterapeutica_Prod,
                nfe_Detalhe.id_Nfedetalhe,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.id_Nfe_Cabecalho,
                id_Nfe_Medicamentodet 
            from 
                Nfe_Medicamentodet,
                cd_produto,
                cd_cliente,
                nfe_cabecalho,
                cd_lote,
                nfe_detalhe ,
                cd_unidade
            where 
                nfe_Detalhe.loja_fk=${idLoja}  
            and 
                cast(nfe_Cabecalho.dataentradasaida_Nfecab as date) BETWEEN '${dataInicial}'  and '${dataFinal}' 
            and 
                nfe_Cabecalho.cliente_Fk is not null 
            and 
                LENGTH(cd_cliente.cpfcnpj_Cli)='14' 
            and 
                nfe_Cabecalho.tipooperacao_Nfecab='4' 
            and 
                nfe_Cabecalho.statusnota_Nfecab='5' 
            and
                nfe_medicamentodet.nfedet_fk = nfe_detalhe.id_nfedetalhe
            and
                nfe_detalhe.produto_fk = cd_produto.id_prod
            and 
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                nfe_detalhe.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho
            and
                nfe_cabecalho.cliente_fk = cd_cliente.id_cli
            and
                nfe_medicamentodet.lote_fk = cd_lote.id_lote
            order by 
                nfe_Cabecalho.dataentradasaida_Nfecab desc`
    });

    return { code: 200, results: { medicamentoDet } }

};

const consultarNFELoja = async function ({ idLoja, dataInicial, dataFinal }) {

    const medicamentoDet = await useDB({
        query: `select 
                qtdelote,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cf_loja.id_loja,
                cf_loja.nome_loja,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.numerodocfiscal_Nfecab,
                cf_loja.cnpj_loja,
                cd_produto.classeterapeutica_Prod,
                nfe_Detalhe.id_Nfedetalhe,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.id_Nfe_Cabecalho,
                id_Nfe_Medicamentodet 
            from 
                Nfe_Medicamentodet,
                cd_produto,
                cf_loja,
                nfe_cabecalho,
                cd_lote,
                nfe_detalhe ,
                cd_unidade
            where 
                nfe_Detalhe.loja_fk=${idLoja}  
            and 
                cast(nfe_Cabecalho.dataentradasaida_Nfecab as date) BETWEEN '${dataInicial}'  and '${dataFinal}' 
            and 
                nfe_cabecalho.lojatransferencia_fk is not null
            and 
                nfe_Cabecalho.tipooperacao_Nfecab='4' 
            and 
                nfe_Cabecalho.statusnota_Nfecab='5' 
            and
                nfe_medicamentodet.nfedet_fk = nfe_detalhe.id_nfedetalhe
            and
                nfe_detalhe.produto_fk = cd_produto.id_prod
            and 
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                nfe_detalhe.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho
            and
                nfe_cabecalho.lojatransferencia_fk = cf_loja.id_loja
            and
                nfe_medicamentodet.lote_fk = cd_lote.id_lote
            order by 
                nfe_Cabecalho.dataentradasaida_Nfecab desc`
    });

    return { code: 200, results: { medicamentoDet } }

};

const consultarNFEDevolucao = async function ({ idLoja, dataInicial, dataFinal }) {

    const medicamentoDet = await useDB({
        query: `select 
                qtdelote,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cd_fornecedor.id_forn,
                cd_fornecedor.nome_forn,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.numerodocfiscal_Nfecab,
                cd_fornecedor.cpfcnpj_forn,
                cd_produto.classeterapeutica_Prod,
                nfe_Detalhe.id_Nfedetalhe,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.id_Nfe_Cabecalho,
                id_Nfe_Medicamentodet 
            from 
                Nfe_Medicamentodet,
                cd_produto,
                cd_fornecedor,
                nfe_cabecalho,
                cd_lote,
                nfe_detalhe ,
                cd_unidade
            where 
                nfe_Detalhe.loja_fk=${idLoja}  
            and 
                cast(nfe_Cabecalho.dataentradasaida_Nfecab as date) BETWEEN '${dataInicial}'  and '${dataFinal}' 
            and 
                nfe_cabecalho.fornecedor_fk is not null
            and 
                nfe_Cabecalho.tipooperacao_Nfecab='4' 
            and 
                nfe_Cabecalho.statusnota_Nfecab='5' 
            and
                nfe_medicamentodet.nfedet_fk = nfe_detalhe.id_nfedetalhe
            and
                nfe_detalhe.produto_fk = cd_produto.id_prod
            and 
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                nfe_detalhe.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho
            and
                nfe_cabecalho.fornecedor_fk = cd_fornecedor.id_forn
            and
                nfe_medicamentodet.lote_fk = cd_lote.id_lote
            order by 
                nfe_Cabecalho.dataentradasaida_Nfecab desc`
    });

    return { code: 200, results: { medicamentoDet } }

};

const consultarNFEDevolucaocli = async function ({ idLoja, dataInicial, dataFinal, dataAnvisaInicial, dataAnvisaFinal }) {

    const medicamentoDet = await useDB({
        query: `select 
                qtdelote,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cd_cliente.id_Cli,
                cd_cliente.nome_Cli,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.numerodocfiscal_Nfecab,
                cd_cliente.cpfcnpj_Cli,
                cd_produto.classeterapeutica_Prod,
                nfe_Detalhe.id_Nfedetalhe,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.id_Nfe_Cabecalho,
                id_Nfe_Medicamentodet 
            from 
                Nfe_Medicamentodet,
                cd_produto,
                cd_cliente,
                nfe_cabecalho,
                cd_lote,
                nfe_detalhe ,
                cd_unidade
            where 
                nfe_Detalhe.loja_fk=${idLoja}  
            and 
                ((cast(nfe_Cabecalho.dataentradasaida_Nfecab as date) BETWEEN '${dataInicial}'  and '${dataFinal}')
            or
                (cast(data_anvisa as date) BETWEEN  '${dataAnvisaInicial}' and '${dataAnvisaFinal}'))
            and 
                nfe_Cabecalho.cliente_Fk is not null 
            and 
                LENGTH(cd_cliente.cpfcnpj_Cli)='14' 
            and 
                nfe_Cabecalho.tipooperacao_Nfecab='4' 
            and 
                nfe_Cabecalho.statusnota_Nfecab='5' 
            and
                nfe_medicamentodet.nfedet_fk = nfe_detalhe.id_nfedetalhe
            and
                nfe_detalhe.produto_fk = cd_produto.id_prod
            and 
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                nfe_detalhe.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho
            and
                nfe_cabecalho.cliente_fk = cd_cliente.id_cli
            and
                nfe_medicamentodet.lote_fk = cd_lote.id_lote
            order by 
                nfe_Cabecalho.dataentradasaida_Nfecab desc`
    });

    return { code: 200, results: { medicamentoDet } }

};

const consultarNFETransferencia = async function ({ idLoja, dataInicial, dataFinal }) {

    const medicamentoDet = await useDB({
        query: `select 
                qtdelote,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cf_loja.id_loja,
                cf_loja.nome_loja,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.numerodocfiscal_Nfecab,
                cf_loja.cnpj_loja,
                cd_produto.classeterapeutica_Prod,
                nfe_Detalhe.id_Nfedetalhe,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.id_Nfe_Cabecalho,
                id_Nfe_Medicamentodet 
            from 
                Nfe_Medicamentodet,
                cd_produto,
                cf_loja,
                nfe_cabecalho,
                cd_lote,
                nfe_detalhe ,
                cd_unidade
            where 
                nfe_Detalhe.loja_fk=${idLoja}  
             and 
                (cast(nfe_Cabecalho.dataentradasaida_Nfecab as date) BETWEEN '${dataInicial}'  and '${dataFinal}')
            and
                nfe_cabecalho.lojatransferencia_fk is not null
            and 
                nfe_Cabecalho.tipooperacao_Nfecab='3' 
            and 
                nfe_Cabecalho.statusnota_Nfecab='5' 
            and
                nfe_medicamentodet.nfedet_fk = nfe_detalhe.id_nfedetalhe
            and
                nfe_detalhe.produto_fk = cd_produto.id_prod
            and 
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                nfe_detalhe.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho
            and
                nfe_cabecalho.lojatransferencia_fk = cf_loja.id_loja
            and
                nfe_medicamentodet.lote_fk = cd_lote.id_lote
            order by 
                nfe_Cabecalho.dataentradasaida_Nfecab desc`
    });

    return { code: 200, results: { medicamentoDet } }

};

const consultarNFEPerda = async function ({ idLoja, dataInicial, dataFinal, dataAnvisaInicial, dataAnvisaFinal }) {

    const medicamentoDet = await useDB({
        query: `select 
                qtdelote,
                cd_produto.registroms_Prod,
                cd_unidade.sigla_Unid,
                cd_produto.id_Prod,
                cd_produto.descricao_Prod,
                cf_loja.id_loja,
                cf_loja.nome_loja,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.numerodocfiscal_Nfecab,
                cf_loja.cnpj_loja,
                cd_produto.classeterapeutica_Prod,
                nfe_Detalhe.id_Nfedetalhe,
                cd_Lote.numero_Lote,
                cd_produto.classeterapeutica_Prod,
                nfe_Cabecalho.dataentradasaida_Nfecab,
                nfe_Cabecalho.id_Nfe_Cabecalho,
                id_Nfe_Medicamentodet 
            from 
                Nfe_Medicamentodet,
                cd_produto,
                cf_loja,
                nfe_cabecalho,
                cd_lote,
                nfe_detalhe ,
                cd_unidade
            where 
                nfe_Detalhe.loja_fk=${idLoja}  
                and 
                ((cast(nfe_Cabecalho.dataentradasaida_Nfecab as date) BETWEEN '${dataInicial}'  and '${dataFinal}')
            or
                (cast(data_anvisa as date) BETWEEN  '${dataAnvisaInicial}' and '${dataAnvisaFinal}'))
            and 
                nfe_cabecalho.lojatransferencia_fk is not null
            and 
                nfe_Cabecalho.tipooperacao_Nfecab='8' 
            and 
                nfe_Cabecalho.statusnota_Nfecab='5' 
            and
                nfe_medicamentodet.nfedet_fk = nfe_detalhe.id_nfedetalhe
            and
                nfe_detalhe.produto_fk = cd_produto.id_prod
            and 
                cd_produto.unidade_fk = cd_unidade.id_unid
            and
                nfe_detalhe.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho
            and
                nfe_cabecalho.lojatransferencia_fk = cf_loja.id_loja
            and
                nfe_medicamentodet.lote_fk = cd_lote.id_lote
            order by 
                nfe_Cabecalho.dataentradasaida_Nfecab desc`
    });

    return { code: 200, results: { medicamentoDet } }

};




module.exports = {
    onCellEditms,
    fabricante,
    init,
    ultimoinventario,
    confirmaalteracaodataprescricao,
    confirmaalteracaodataanvisa,
    confirmaalteracaodataanvisa2,
    confirmaalteracaodataanvisa2m1,
    confirmaalteracaodataanvisa2m1d,
    abrirlotes,
    atualizarLote,
    pegarUltimaDataAceita,
    listarArquivos,
    atualizarArquivos,
    retornoAtualizarlistalotemed,
    enviarArquivo,
    atualizarlistalotemed,
    criarArquivoInventario,
    veRetorno,
    gerarMovimento,
    consultarCompras2,
    consultarCompras,
    consultarCupons,
    consultarM1,
    consultarM1Perda,
    consultarM1Loja,
    consultarM1Devolucao,
    consultarNFE,
    consultarNFELoja,
    consultarNFEDevolucao,
    consultarNFEDevolucaocli,
    consultarNFETransferencia,
    consultarNFEPerda
}