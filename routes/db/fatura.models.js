const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const cancelar = async function ({ idFatura, idLoja, fatura, idContasReceber, idReceberRec }) {

    let statusDelete, statusDelete2;

    const faturaRec = await useDB({
        query: ` select * from Fn_Fatura_Rec where status='Q' and fatura_fk=${idFatura} and loja_fk=${idLoja} `
    });

    const contasReceber = await useDB({
        query: `select * from  Fn_Contasreceber where fatura ='${fatura}' and loja_fk=${idLoja} order by id_Contasreceber desc  `
    });

    const contasReceberRec = await useDB({
        query: ` select * from  Fn_Contasreceber_Rec where fatura ='${fatura}'  and status='Q' and contasreceber_Fk=${idContasReceber}  and loja_fk=${idLoja}  order by id_Contasreceber_Rec desc `
    });

    const deleteCartaomov = await useDB({
        query: `delete from ecf_cartaomov  where loja_fk=${idLoja} and receber_rec_fk=${idReceberRec} `
    }).then(() => {
        statusDelete = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete = err.message;
    });

    const deleteCheque = await useDB({
        query: `delete from ecf_cartaomov  where loja_fk=${idLoja} and receber_rec_fk=${idReceberRec} `
    }).then(() => {
        statusDelete2 = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete2 = err.message;
    });

    return { code: 200, results: { faturaRec, contasReceber, contasReceberRec, statusDelete, statusDelete2 } }

};

const excluirs = async function ({ fatura, idLoja, idContasReceber, idReceberRec, idFatura }) {

    let statusDelete, statusDelete2

    const contasReceber = await useDB({
        query: `select * from  Fn_Contasreceber where fatura ='${fatura}' and loja_fk=${idLoja} order by id_Contasreceber desc  `
    });

    const contasReceberRec = await useDB({
        query: ` select * from  Fn_Contasreceber_Rec where fatura ='${fatura}'  and status='Q' and contasreceber_Fk=${idContasReceber}  and loja_fk=${idLoja}  order by id_Contasreceber_Rec desc `
    });

    const deleteCartaomov = await useDB({
        query: `delete from ecf_cartaomov  where loja_fk=${idLoja} and receber_rec_fk=${idReceberRec} `
    }).then(() => {
        statusDelete = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete = err.message;
    });

    const deleteCheque = await useDB({
        query: `delete from ecf_cartaomov  where loja_fk=${idLoja} and receber_rec_fk=${idReceberRec} `
    }).then(() => {
        statusDelete2 = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete2 = err.message;
    });

    const faturaRec = await useDB({
        query: ` select * from Fn_Fatura_Rec where fatura_fk=${idFatura} and loja_fk=${idLoja} `
    });

    return { code: 200, results: { contasReceber, contasReceberRec, statusDelete, statusDelete2, faturaRec } }

};

const editarFaturas = async function ({ idLoja, insertFaturaRecData, idFatura, fatura, insertContasReceberRecData, insertCartaoMovData, insertChequeData }) {

    let statusInsert, statusInsert2, statusInsert3, statusInsert4;

    const idContasReceberRec = await useDB({
        query: `SELECT max(id_contasreceber_rec)+1 as idc FROM public.fn_contasreceber_rec where loja_fk=${idLoja} `
    });

    const idFaturaRec = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.fn_fatura_rec where loja_fk=${idLoja} `
    });

    const insertFaturaRec = await useDB({
        query: `INSERT INTO public.fn_fatura_rec(
            id, 
            loja_fk, 
            datapagamento, 
            usuarioaltera, 
            dataaltera, 
            valorpago, 
            status, 
            fatura_fk, 
            tipopagto, 
            conta_caixa, 
            obs,
            acrescimo,
            desconto)VALUES (
                ${idFaturaRec[0].idc}, 
                ${insertFaturaRecData.loja_fk},  
                '${insertFaturaRecData.datapagamento}', 
                ${insertFaturaRecData.usuarioaltera},  
                '${insertFaturaRecData.dataaltera}',  
                ${insertFaturaRecData.valorpago}, 
                'Q', 
                ${insertFaturaRecData.fatura_fk}, 
                '${insertFaturaRecData.tipopagto}',  
                '${insertFaturaRecData.conta_caixa}', 
                '${insertFaturaRecData.obs}', 
                ${insertFaturaRecData.acrescimo}, 
                ${insertFaturaRecData.desconto});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const sumValorPago = await useDB({
        query: `select sum(valorpago) from fn_fatura_rec where fatura_fk=${idFatura} and loja_fk=${idLoja}   and status='Q'`
    });

    const contasReceber = await useDB({
        query: `select * from Fn_Contasreceber where fatura ='${fatura}' and loja_fk=${idLoja}  order by id_Contasreceber desc `
    });

    const insertContasReceberRec = await useDB({
        query: `insert into fn_contasreceber_rec  (
            id_contasreceber_rec,
            loja_fk,
            contasreceber_fk,
            numparcela,
            valorpago,
            datapagto,
            usuarioaltera,
            dataaltera,
            status,
            fatura,
            conta_caixa,
            obs,
            faturarec,
            acrescimo,
            desconto)values(
                ${idContasReceberRec[0].idc},
                ${insertContasReceberRecData.loja_fk},
                ${insertContasReceberRecData.contasreceber_fk}, 
                ${insertContasReceberRecData.numparcela},
                ${insertContasReceberRecData.valorpago},
                '${insertContasReceberRecData.datapagto}',
                ${insertContasReceberRecData.usuarioaltera}, 
                '${insertContasReceberRecData.dataaltera}', 
                'Q',
                '${insertContasReceberRecData.fatura}', 
                '${insertContasReceberRecData.conta_caixa}', 
                '${insertContasReceberRecData.obs}' ,
                ${insertContasReceberRecData.faturarec}, 
                ${insertContasReceberRecData.acrescimo}, 
                ${insertContasReceberRecData.desconto} )`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });


    const cartaoMov = await useDB({
        query: `select * from Ecf_Cartaomov where loja_fk=${idLoja} order by id_Cartaomov desc`
    });

    const insertCartaoMov = await useDB({
        query: `INSERT INTO public.ecf_cartaomov(
            id_cartaomov, 
            loja_fk, 
            receber_rec_fk , 
            cartao_fk, 
            tipocartao_cartmov, 
            valorbruto_cartmov, 
            desconto_cartmov, 
            valorliquido_cartmov, 
            dataemissao_cartmov,  
            datavencto_cartmov, 
            usuarioaltera, 
            dataaltera,   
            status_cartmov, 
            numdoctrans_cartmov, 
            taxa_adm) VALUES (
                ${insertCartaoMovData.id_cartaomov}, 
                ${insertCartaoMovData.loja_fk}, 
                ${insertCartaoMovData.receber_rec_fk}, 
                ${insertCartaoMovData.cartao_fk}, 
                '${insertCartaoMovData.tipocartao_cartmov}',  
                ${insertCartaoMovData.valorbruto_cartmov}, 
                ${insertCartaoMovData.desconto_cart}, 
                ${insertCartaoMovData.valorliquido_cartmov}, 
                '${insertCartaoMovData.dataemissao_cartmov}',  
                '${insertCartaoMovData.datavencto_cartmov}', 
                ${insertCartaoMovData.usuarioaltera},  
                '${insertCartaoMovData.dataaltera}', 
                '${insertCartaoMovData.status_cartmov}', 
                '${insertCartaoMovData.numdoctrans_cartmov}',  
                ${insertCartaoMovData.taxa_adm} );`
    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    const cheque = await useDB({
        query: `select * from Cd_Cheque where loja_fk=${idLoja} order by id_Cheque desc`
    });

    const insertCheque = await useDB({
        query: `INSERT INTO public.cd_cheque( 
            id_cheque, 
            loja_fk, 
            tipopagto_fk, 
            banco_fk, 
            tipocheque_chq, 
            agencia_chq,  
            cc_chq, 
            valor_chq, 
            dataemissao_chq,  
            datavencimento_chq, 
            statuscheque_chq,   
            numcheque_chq, 
            cpfcnpj_cli, 
            usuarioaltera,  
            dataaltera,
            nome_cliente, 
            receber_rec_fk) VALUES (
                ${insertChequeData.id_cheque}, 
                ${insertChequeData.loja_fk}, 
                2, 
                ${insertChequeData.banco_fk}, 
                'V', 
                ${insertChequeData.agencia_chq},  
                ${insertChequeData.cc_chq}, 
                ${insertChequeData.valor_chq},  
                '${insertChequeData.dataemissao_chq}', 
                '${insertChequeData.datavencimento_chq}', 
                '1',  
                ${insertChequeData.numcheque_chq},  
                '${insertChequeData.cpfcnpj_cli}',
                ${insertChequeData.usuarioaltera}, 
                '${insertChequeData.dataaltera}', 
                '${insertChequeData.nome_cliente}',
                ${insertChequeData.receber_rec_fk});`
    }).then(() => {
        statusInsert4 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert4 = err.message;
    });


    return { code: 200, results: { idContasReceberRec, idFaturaRec, statusInsert, sumValorPago, contasReceber, statusInsert2, cartaoMov, statusInsert3, cheque, statusInsert4 } }

};

const vercr = async function ({ fatura, idLoja, idContasReceber }) {

    const contasReceber = await useDB({
        query: ` select * from  Fn_Contasreceber where fatura ='${fatura}' and loja_fk=${idLoja} order by id_Contasreceber desc `
    });

    const contasReceberRec = await useDB({
        query: ` select * from  Fn_Contasreceber_Rec where  contasreceber_Fk=${idContasReceber}  and loja_fk=${idLoja}  order by id_Contasreceber_Rec desc `
    });

    return { code: 200, results: { contasReceber, contasReceberRec } }

};

const gerarxmlpdf = async function ({ idLoja, idNfeCab, xmlRetornoNovo }) {

    let statusUpdate;

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const xmlRetorno = await useDB({
        query: `select xml_retorno from nfe_cabecalho  where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja} `
    });

    const updateXmlRetorno = await useDB({
        query: `update nfe_cabecalho set xml_retorno='${xmlRetornoNovo}' where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja}`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { configNfe, xmlRetorno, statusUpdate } }

};

const consultar = async function ({ tipoData, dataInicial, dataFinal, situacao, idEmpresa, idCliente, idLoja, idFatura, chave }) {

    const fatura = await useDB({
        query: `SELECT Fn_Fatura.* FROM Fn_Fatura, cd_cliente WHERE ${tipoData} BETWEEN '${dataInicial}' AND '${dataFinal}' AND status='${situacao}' AND cd_cliente.empresa_fk =${idEmpresa} AND cliente_fk=${idCliente} and fn_fatura.loja_fk=${idLoja}  and (chavenfe is null or chavenfe='' ) and fn_fatura.cliente_fk = cd_cliente.id_cli ORDER BY ${tipoData} asc ,fatura ASC`
    });

    /* String tipo1 = "";

    if (!this.situacao.equals("T")) {
        tipo1 = " AND vo.status='" + this.situacao + "'";
    }
            
            String empresa1 = "";
    if (this.empresa.getIdEmpconv() != null) {
        empresa1 = " AND vo.clienteFk.empresaFk=" + this.empresa.getIdEmpconv() + "";
    }
            
            String cliente1 = "";
    if (this.cliente.getIdCli() != null) {
        empresa1 = " AND vo.clienteFk=" + this.cliente.getIdCli() + "";
    }
            
            String loja1 = "";
    if (!this.todaslojas) {
        loja1 = " AND vo.fnFaturaPK.lojaFk=" + loja.getIdLoja() + "";
    }
            
            String snf = " ";
    if (semnfe) {
        snf = " and (chavenfe is null or chavenfe='' ) ";
    }
            
            String hql = "SELECT vo FROM FnFatura vo"
        + " WHERE vo." + this.tipoData + ""
        + " BETWEEN '" + formatdataHQL.format(this.datainicial) + "'"
        + " AND '" + formatdataHQL.format(this.datafinal) + "'"
        + tipo1
        + empresa1
        + cliente1
        + loja1
        + snf
        + " ORDER BY vo." + this.tipoData + " asc ,fatura ASC"; */


    const faturaRec = await useDB({
        query: `select * from Fn_Fatura_Rec where fatura_fk=${idFatura} and loja_Fk=${idLoja}  order by dataaltera desc`
    });

    const nfeCab = await useDB({
        query: `select * from Nfe_Cabecalho where chaveacesso_Nfecab='NFe${chave}' and statusnota_Nfecab='5' and loja_fk =${idLoja} `
    });

    return { code: 200, results: { fatura, faturaRec, nfeCab } }

};

const emitirnfe = async function ({ idLoja, numDocfiscal, serie, fatura, idContasReceber, idCupomcab }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const nfeSeqdoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='55'`
    });

    const nfeCab = await useDB({
        query: `select * from Nfe_Cabecalho where loja_fk=${idLoja} and numerodocfiscal_Nfecab='${numDocfiscal}' and serie_Nfecab='${serie}' and (statusnota_Nfecab='4' or statusnota_Nfecab='5' or statusnota_Nfecab='6'  or statusnota_Nfecab='7'  or statusnota_Nfecab='9' )`
    });

    const nfeSeqdoc2 = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} ORDER BY id DESC`
    });

    const contasReceber = await useDB({
        query: `select * from Fn_Contasreceber where fatura ='${fatura}' and loja_fk=${idLoja} order by id_Contasreceber desc  `
    });

    const cupomCab = await useDB({
        query: `select cupomcab_fk from Fn_Contasreceber, ecf_cupomcab where id_Contasreceber=${idContasReceber}  and ecf_cupomcab.loja_Fk=${idLoja} and ecf_Cupomcab.status_Cupom ='F' and ecf_Cupomcab.loja_fk=${idLoja} AND fn_contasreceber.cupomcab_fk= ecf_cupomcab.id_cupomcab`
    });

    const ecfCupomDetProd = await useDB({
        query: `select Ecf_Cupomdet_Prod.* from Ecf_Cupomdet_Prod, ecf_Cupomcab where cupomcab_fk=${idCupomcab} and ecf_cupomdet_prod.loja_Fk=${idLoja} and status_Cupitem='F' and ecf_Cupomcab.status_Cupom in ('F') AND ecf_cupomdet_prod.cupomcab_fk = ecf_cupomcab.id_cupomcab`
    });

    const ecfCupomDetBico = await useDB({
        query: `select Ecf_Cupomdet_Bico.* from Ecf_Cupomdet_Bico, ecf_cupomcab where cupomcab_fk=${idCupomcab} and Ecf_Cupomdet_Bico.loja_Fk=${idLoja}  and status_Cupdetbic='F' and ecf_Cupomcab.status_Cupom in ('F')  `
    });

    return { code: 200, results: { configNfe, nfeSeqdoc, nfeCab, nfeSeqdoc2, contasReceber, cupomCab, ecfCupomDetProd, ecfCupomDetBico } }

};

const enviarnfe = async function ({ xmlRetorno, idNfeCab, idLoja }) {

    let statusUpdate;

    const updateNfeCab = await useDB({
        query: `update nfe_cabecalho set xml_retorno='${xmlRetorno}' where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja}`
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { statusUpdate } }

};

const atualizaSequenciador = async function ({ idLoja }) {

    const nfeSeqdoc = await useDB({
        query: `SELECT * FROM Nfe_Seqdoc WHERE loja_Fk=${idLoja} AND padrao=true AND modelo='55'`
    });

    return { code: 200, results: { nfeSeqdoc } }

};

const inserir = async function ({ idTribNatureza }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where id='${idTribNatureza}' order by id asc`
    });

    return { code: 200, results: { tribNatureza } }

};

const numeroserie = async function ({ numserieImpr, idLoja }) {

    const ecfImpressora = await useDB({
        query: `select * from Ecf_Impressora where numserie_Impr='${numserieImpr}' and loja_Fk=${idLoja} `
    });

    return { code: 200, results: { ecfImpressora } }

};

const salvarcuponsnfe7 = async function ({ idLoja, insertDocReferenciadoData }) {

    let statusInsert;

    const idDocReferenciado = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.nfe_docreferenciado where loja_fk=${idLoja} `
    });

    const insertDocReferenciado = await useDB({
        query: `insert into nfe_docreferenciado (
            id,
            loja_fk,
            nfe_cabecalho_fk,
            cod_modelo,
            num_doc,
            usuarioaltera,
            dataaltera,
            dataemissao_doc,
            ecf_cupomcab_fk)values(
                ${idDocReferenciado[0].idc},
                ${insertDocReferenciadoData.loja_fk},
                ${insertDocReferenciadoData.nfe_cabecalho_fk},
                '${insertDocReferenciadoData.cod_modelo}',
                ${insertDocReferenciadoData.num_doc},
                ${insertDocReferenciadoData.usuarioaltera},
                '${insertDocReferenciadoData.dataaltera}',
                '${insertDocReferenciadoData.dataemissao_doc}',
                ${insertDocReferenciadoData.ecf_cupomcab_fk})`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idDocReferenciado, statusInsert } }

};

const salvaritensnfe7 = async function ({ idLoja, insertNfeDetData }) {

    let statusInsert;

    const idNfeDetalhe = await useDB({
        query: `SELECT max(id_nfedetalhe)+1 as idc FROM public.nfe_detalhe where loja_fk=${idLoja} `
    });

    const insertNfeDet = await useDB({
        query: `insert into nfe_detalhe (
            id_nfedetalhe,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera)values(
                ${idNfeDetalhe[0].idc},
                ${insertNfeDetData.loja_fk},
                ${insertNfeDetData.nfecab_fk},
                ${insertNfeDetData.usuarioaltera},
                '${insertNfeDetData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idNfeDetalhe, statusInsert } }

};

const salvarEmitente = async function ({ idLoja, insertNfeEmitenteData }) {

    let statusInsert;

    const nfeEmitente = await useDB({
        query: `select * from Nfe_Emitente where loja_Fk=${idLoja} order by id_Nfeemitente desc `
    });

    const insertNfeEmitente = await useDB({
        query: `insert into nfe_emitente(
            id_nfeemitente,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera)values(
                ${nfeEmitente[0].id_nfeemitente + 1},
                ${insertNfeEmitenteData.loja_fk},
                ${insertNfeEmitenteData.nfecab_fk},
                ${insertNfeEmitenteData.usuarioaltera},
                '${insertNfeEmitenteData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { nfeEmitente, statusInsert } }

};

const salvarnaturezainfo = async function ({ idTribNatureza }) {

    const tribNatureza = await useDB({
        query: `select * from Cd_Trib_Naturezaoper where id='${idTribNatureza}'  order by id asc`
    });

    return { code: 200, results: { tribNatureza } }

};

const salvarDestinatario = async function ({ idLoja, insertNfeDestinatarioData }) {

    let statusInsert

    const idNfeDestinatario = await useDB({
        query: `SELECT max(id_nfedestinatario)+1 as idc FROM public.nfe_destinatario where loja_fk=${idLoja} `
    });

    const insertNfeDestinatario = await useDB({
        query: `insert into nfe_destinatario (
            id_nfedestinatario,
            loja_fk,
            nfecab_fk,
            cpfcnpj_nfedest,
            usuarioaltera,
            dataaltera) values(
                ${idNfeDestinatario[0].idc},
                ${insertNfeDestinatarioData.loja_fk},
                ${insertNfeDestinatarioData.nfecab_fk},
               '${insertNfeDestinatarioData.cpfcnpj_nfedest}',
                ${insertNfeDestinatarioData.usuarioaltera},
                '${insertNfeDestinatarioData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idNfeDestinatario, statusInsert } }

};

const salvarfaturapagamento = async function ({ idLoja, insertNfeFaturaData }) {

    let statusInsert;

    const idNfefatura = await useDB({
        query: `SELECT max(id_nfefatura)+1 as idc FROM public.nfe_fatura where loja_fk=${idLoja} `
    });

    const insertNfeFatura = await useDB({
        query: `insert into nfe_fatura(
            id_nfefatura,
            loja_fk,
            nfecab_fk,
            usuarioaltera,
            dataaltera)values(
                ${idNfefatura[0].idc},
                ${insertNfeFaturaData.loja_fk},
                ${insertNfeFaturaData.nfecab_fk},
                ${insertNfeFaturaData.usuarioaltera},
                '${insertNfeFaturaData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idNfefatura, statusInsert } }

};

const salvarnfecab3 = async function ({ idLoja }) {

    const idNfeCab = await useDB({
        query: `SELECT max(id_nfe_cabecalho)+1 as idc FROM public.nfe_cabecalho where loja_fk=${idLoja} `
    });

    return { code: 200, results: { idNfeCab } }

};

const veritens = async function ({ idContasReceber, idLoja, idCupomcab }) {

    const cupomCab = await useDB({
        query: `SELECT cupomcab_fk FROM public.fn_contasreceber where id_contasreceber=${idContasReceber}  and loja_fk=${idLoja} `
    });

    const cupomDetProd = await useDB({
        query: `SELECT produto_fk,descricao_prod,qtde_cupitem, valorunit_cupitem, ((valorfinal_cupitem-descontoglobal_cupitem)+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupitem ELSE 0 END)) as vf, descontoglobal_cupitem,valoracrescimo_cupitem  FROM public.ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on cab.id_cupomcab=cupomcab_fk inner join cd_produto as p on p.id_prod=det.produto_fk  where det.loja_fk=${idLoja} and cab.loja_fk=${idLoja} and cupomcab_fk=${idCupomcab} and status_cupitem='F';`
    });

    const cupomDetBico = await useDB({
        query: `SELECT numero_bic,descricao_tipcomb,qtde_cupdetbic, valorunit_cupdetbic,((valorfinal_cupdetbic-descontoglobal_cupitem)+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupdetbic ELSE 0 END)) as vf, descontoglobal_cupitem,valoracrescimo_cupdetbic  FROM public.ecf_cupomdet_bico as det inner join ecf_cupomcab as cab on cab.id_cupomcab=cupomcab_fk inner join cd_bico as b on b.id_bico=det.bico_fk inner join cd_tanque as t on t.id_tanque=b.tanque_fk inner join cd_tipocombustivel as tp on tp.id_tipocombustivel=t.tipocombustivel_fk  where  det.loja_fk=${idLoja}  and t.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and b.loja_fk=${idLoja} and cupomcab_fk=${idCupomcab} and status_cupdetbic='F'`
    });

    return { code: 200, results: { cupomCab, cupomDetProd, cupomDetBico } }

};

const criarfatura = async function ({ descricaoFaixavenc, idFaixavencimentocab }) {

    const empresaConveniada = await useDB({
        query: `select * from Cd_Empresaconveniada where gerafatura='S' order by id_Empconv asc`
    });

    const faixaVencimentocab = await useDB({
        query: `select * from Cd_Faixavencimentocab where descricao_Faixavenccab='${descricaoFaixavenc}' `
    });

    const faixaVencimentodet = await useDB({
        query: `select * from Cd_Faixavencimentodet where  faixavencimentocab_Fk=${idFaixavencimentocab} `
    });

    return { code: 200, results: { empresaConveniada, faixaVencimentocab, faixaVencimentodet } }

};

const processarfatura = async function ({ idLoja, idEmpresa, codCliente }) {

    const contasReceber = await useDB({
        query: `select Fn_Contasreceber.* from Fn_Contasreceber, cd_cliente, ecf_Cupomcab where Fn_Contasreceber.loja_fk=${idLoja} and cd_cliente.empresa_Fk=${idEmpresa} and statusreceb_Contasreceber='P' and valorrestante_Contasreceber=valortotal_Contasreceber  and ecf_Cupomcab.loja_fk=${idLoja}  and ecf_Cupomcab.id_Cupomcab!=null and ecf_Cupomcab.status_Cupom in ('F') and ecf_Cupomcab.id_cupomcab = fn_contasreceber.cupomcab_fk and fn_contasreceber.cliente_fk = cd_cliente.id_cli order by cd_cliente.nome_Cli asc`
    });

    /* String dt = "";
                CdEmpresaconveniada emp = empresasx.stream().filter(v -> v.getIdEmpconv().intValue() == i).findAny().orElse(null);
                String mesano = sdm.format(dataemissaox);
    if (datavencimentox == null) {
        if (incluiranteriores) {
            dt = " and (vo.datavencContasreceber <= '" + mesano + "-" + emp.getDiavencimento() + "') ";
        } else {
            dt = " and (vo.datavencContasreceber between '" + mesano + "-01'  and '" + mesano + "-" + emp.getDiavencimento() + "') ";
        }
    } else {
        if (incluiranteriores) {
            dt = " and (vo.datavencContasreceber <= '" + sdd.format(datavencimentox) + "') ";
        } else {
            dt = " and (vo.datavencContasreceber between '" + mesano + "-01'  and '" + sdd.format(datavencimentox) + "') ";
        }

    }
                //  System.out.println(dt);
                String sqlrr = "select vo from FnContasreceber vo"
        + " where  vo.cfLoja.idLoja=" + loja.getIdLoja() + ""
        + " and vo.clienteFk.empresaFk.idEmpconv=" + i + ""
        + " and vo.statusrecebContasreceber='P'"
        + " and vo.valorrestanteContasreceber=vo.valortotalContasreceber"
        + "  and vo.ecfCupomcab.cfLoja.idLoja=" + loja.getIdLoja() + " "
        + " and vo.ecfCupomcab.ecfCupomcabPK.idCupomcab!=null"
        + " and vo.ecfCupomcab.statusCupom in ('F') "
        + " " + dt + " "
        + " order by vo.clienteFk.nomeCli asc"; */

    const cupomCabCliente = await useDB({
        query: `SELECT coo_cupom,serieecf_cupom FROM ecf_cupomcab_cliente AS cli INNER JOIN ecf_cupomcab AS cab ON cab.id_cupomcab=cli.cupomcab_fk LEFT JOIN fn_contasreceber AS rec ON rec.cupomcab_fk=cab.id_cupomcab AND rec.loja_fk=cab.loja_fk WHERE cli. loja_fk=${idLoja} AND cab.loja_fk=${idLoja} AND cab.tipo='P'  AND rec.statusreceb_contasreceber='P' AND cab.status_cupom in ('F') AND rec.cupomcab_fk IS null AND cod_cliente=${codCliente}`
    });

    return { code: 200, results: { contasReceber, cupomCabCliente } }

};

const salvarfaturas = async function ({ idLoja, idUsuario, idContasReceber }) {

    let statusUpdate

    const idFatura = await useDB({
        query: `select max(id)+1 as idc from fn_fatura where loja_fk=${idLoja}   `
    });

    const fatura = await useDB({
        query: `select max(cast(fatura as integer))+1 as idc from fn_fatura where loja_fk=${idLoja}`
    });

    const updateContasReceber = await useDB({
        query: `update fn_contasreceber set fatura='${fatura[0].idc.toString()}',statusreceb_contasreceber='F', dataaltera=now(), usuarioaltera=${idUsuario}  where loja_fk=${idLoja}  and id_contasreceber=${idContasReceber} `
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    return { code: 200, results: { idFatura, fatura, statusUpdate } }

};

const baixarparcial = async function ({ idLoja, fatura, insertFaturaRecData, idFatura, insertContasReceberRecData, insertCartaoMovData, insertChequeData }) {

    let statusInsert, statusInsert2, statusInsert3, statusInsert4;

    const idContasReceberRec = await useDB({
        query: `SELECT max(id_contasreceber_rec)+1 as idc FROM public.fn_contasreceber_rec where loja_fk=${idLoja} `
    });

    const contasReceber = await useDB({
        query: ` select * from  Fn_Contasreceber where fatura ='${fatura}' and loja_fk=${idLoja} order by id_Contasreceber desc  `
    });

    const idFaturaRec = await useDB({
        query: `SELECT max(id)+1 as idc FROM public.fn_fatura_rec where loja_fk=${idLoja} `
    });

    const insertFaturaRec = await useDB({
        query: `INSERT INTO public.fn_fatura_rec( 
            id, 
            loja_fk, 
            datapagamento, 
            usuarioaltera, 
            dataaltera, 
            valorpago, 
            status, 
            fatura_fk, 
            tipopagto, 
            conta_caixa, 
            obs,
            desconto,
            acrescimo) VALUES (
                ${idFaturaRec[0].idc}, 
                ${insertFaturaRecData.loja_fk},  
                '${insertFaturaRecData.datapagamento}', 
                ${insertFaturaRecData.usuarioaltera},  
                now(),  
                ${insertFaturaRecData.valorpago}, 
                'Q', 
                ${insertFaturaRecData.fatura_fk}, 
                '${insertFaturaRecData.tipopagto}',  
                '${insertFaturaRecData.conta_caixa}', 
                '${insertFaturaRecData.obs}', 
                ${insertFaturaRecData.desconto}, 
                ${insertFaturaRecData.acrescimo} );`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const valorpago = await useDB({
        query: `select sum(valorpago) from fn_fatura_rec where fatura_fk=${idFatura} and loja_fk=${idLoja}   and status='Q'`
    });

    const insertContasReceberRec = await useDB({
        query: `insert into fn_contasreceber_rec  (
            id_contasreceber_rec,
            loja_fk,
            contasreceber_fk,
            numparcela,
            valorpago,
            datapagto,
            usuarioaltera,
            dataaltera,
            status,
            fatura,
            conta_caixa,
            obs,
            faturarec,
            desconto,
            acrescimo)  values(
                ${idContasReceberRec[0].idc},
                ${insertContasReceberRecData.loja_fk},
                ${insertContasReceberRecData.contasreceber_fk}, 
                ${insertContasReceberRecData.numparcela},
                ${insertContasReceberRecData.valorpago},
                '${insertContasReceberRecData.datapagto}',
                ${insertContasReceberRecData.usuarioaltera}, 
                now(), 
                'Q',
                '${insertContasReceberRecData.fatura}', 
                '${insertContasReceberRecData.conta_caixa}', 
                '${insertContasReceberRecData.obs}',
                ${insertContasReceberRecData.faturarec}, 
                ${insertContasReceberRecData.desconto}, 
                ${insertContasReceberRecData.acrescimo})`
    }).then(() => {
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const cartaoMov = await useDB({
        query: `select * from Ecf_Cartaomov where loja_fk=${idLoja} order by id_Cartaomov desc`
    });

    const insertCartaoMov = await useDB({
        query: `INSERT INTO public.ecf_cartaomov(
            id_cartaomov, 
            loja_fk, 
            receber_rec_fk, 
            cartao_fk, 
            tipocartao_cartmov,  
            valorbruto_cartmov, 
            desconto_cartmov, 
            valorliquido_cartmov, 
            dataemissao_cartmov, 
            datavencto_cartmov, 
            usuarioaltera, 
            dataaltera,   
            status_cartmov, 
            numdoctrans_cartmov, 
            taxa_adm) VALUES (
                ${cartaoMov[0].id_cartaomov + 1}, 
                ${insertCartaoMovData.loja_fk}, 
                ${insertCartaoMovData.receber_rec_fk}, 
                ${insertCartaoMovData.cartao_fk}, 
                '${insertCartaoMovData.tipocartao_cartmov}',  
                ${insertCartaoMovData.valorbruto_cartmov}, 
                ${insertCartaoMovData.desconto_cartmov}, 
                ${insertCartaoMovData.valorliquido_cartmov}, 
                '${insertCartaoMovData.dataemissao_cartmov}', 
                '${insertCartaoMovData.datavencto_cartmov}', 
                ${insertCartaoMovData.usuarioaltera},  
                now(),  
                '${insertCartaoMovData.status_cartmov}', 
                '${insertCartaoMovData.numdoctrans_cartmov}',  
                ${insertCartaoMovData.taxa_adm} );`
    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    const cheque = await useDB({
        query: `select * from Cd_Cheque where loja_fk=${idLoja} order by id_Cheque desc`
    });

    const insertCheque = await useDB({
        query: `INSERT INTO public.cd_cheque( 
            id_cheque, 
            loja_fk, 
            tipopagto_fk,  
            banco_fk, 
            tipocheque_chq, 
            agencia_chq,  
            cc_chq, 
            valor_chq, 
            dataemissao_chq,  
            datavencimento_chq, 
            statuscheque_chq,   
            numcheque_chq, 
            cpfcnpj_cli, 
            usuarioaltera, 
            dataaltera,
            nome_cliente, 
            receber_rec_fk) VALUES (
                ${cheque[0].id_cheque + 1}, 
                ${insertChequeData.loja_fk}, 
                2, 
                ${insertChequeData.banco_fk}, 
                'V', 
                ${insertChequeData.agencia_chq},  
                ${insertChequeData.cc_chq}, 
                ${insertChequeData.valor_chq},  
                '${insertChequeData.dataemissao_chq}', 
                '${insertChequeData.datavencimento_chq}', 
                '1',  
                ${insertChequeData.numcheque_chq},  
                '${insertChequeData.cpfcnpj_cli}',
                ${insertChequeData.usuarioaltera}, 
                now(), 
                '${insertChequeData.nome_cliente}',
                ${insertChequeData.receber_rec_fk});`
    }).then(() => {
        statusInsert4 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert4 = err.message;
    });

    return { code: 200, results: { idContasReceberRec, contasReceber, idFaturaRec, statusInsert, valorpago, statusInsert2, cartaoMov, statusInsert3, cheque, statusInsert4 } }

};

const xmlpdf = async function ({ idNfeCab, idLoja }) {

    const xmlRetorno = await useDB({
        query: `select xml_retorno from nfe_cabecalho  where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja} `
    });

    const logo = await useDB({
        query: `select logo_loja from cf_loja where id_loja=${idLoja} `
    });

    return { code: 200, results: { xmlRetorno, logo } }

};

const setamail = async function ({ idNfeCab, idLoja }) {

    const email = await useDB({
        query: `select email_nfedest from nfe_destinatario  where nfecab_fk=${idNfeCab} and loja_fk=${idLoja} limit 1 `
    });

    m/* ailt = (String) new CargoRN().porSql2semcache("select email_nfedest "
        + " from nfe_destinatario "
        + " where nfecab_fk=" + nfe.getNfeCabecalhoPK().getIdNfeCabecalho() + ""
        + " and loja_fk=" + lojaLogada.getIdLoja() + " ");
} else {
    if (con == null) {
    con = Util.pegarConexaodi(conexao, ipbanco, portab);

}
                Statement st = con.createStatement();
                ResultSet rs = st.executeQuery("select email_nfedest "
    + " from nfe_destinatario "
    + " where nfecab_fk=" + nfe.getNfeCabecalhoPK().getIdNfeCabecalho() + ""
    + " and loja_fk=" + lojaLogada.getIdLoja() + " limit 1 ");
 */
    return { code: 200, results: { email } }

};

const mailnfe = async function ({ idNfeCab, idLoja, insertEmailData }) {

    let statusInsert;

    const xmlRetorno = await useDB({
        query: `select xml_retorno from nfe_cabecalho  where id_nfe_cabecalho=${idNfeCab} and loja_fk=${idLoja} `
    });

    const logo = await useDB({
        query: `select logo_loja from cf_loja where id_loja=${idLoja} `
    });

    const insertEmail = await useDB({
        query: `INSERT INTO public.emails(
             remetente, 
             destinatario, 
             assunto, 
             mensagem, 
             usuarioenvio,   
             loja, 
             dataenvio, 
             situacao) VALUES (
                 '${insertEmailData.remetente}', 
                 '${insertEmailData.destinatario}', 
                 '${insertEmailData.assunto}', 
                 '${insertEmailData.mensagem}', 
                 ${insertEmailData.usuarioenvio},  
                 ${insertEmailData.loja}, 
                 '${insertEmailData.dataenvio}',
                '${insertEmailData.situacao}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });


    return { code: 200, results: { xmlRetorno, logo, statusInsert } }

};

const cancelarfaturas = async function ({ idLoja, idFatura, fatura, idContasReceber, idReceberRec }) {

    let statusUpdate, statusDelete, statusDelete2, statusUpdate2;

    const faturaRec = await useDB({
        query: `update fn_fatura_rec set status='C'  where loja_fk=${idLoja}   and fatura_fk=${idFatura} `
    }).then(() => {
        statusUpdate = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate = err.message;
    });

    const contasReceber = await useDB({
        query:` select * from  Fn_Contasreceber where fatura='${fatura}' and loja_fk=${idLoja} and statusreceb_Contasreceber in ('F','Q') and valorpago_Contasreceber>0 order by id_Contasreceber desc `
    });

    const contasReceberRec = await useDB({
        query:`select * from Fn_Contasreceber_Rec where contasreceber_fk=${idContasReceber}  and loja_Fk=${idLoja}  and status='Q' and fatura='${fatura}'   order by id_Contasreceber_Rec desc`
    });

    const deleteCartaomov = await useDB({
        query:`delete from ecf_cartaomov  where loja_fk=${idLoja} and receber_rec_fk=${idReceberRec} `
    }).then(() => {
        statusDelete = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete = err.message;
    });

    const deleteCheque = await useDB({
        query:`delete from cd_cheque  where loja_fk=${idLoja} and receber_rec_fk=${idReceberRec} `
    }).then(() => {
        statusDelete2 = 'Registro apagado com sucesso';
    }).catch((err) => {
        statusDelete2 = err.message;
    });

    const updateContasReceberRec = await useDB({
        query: `update fn_contasreceber_rec set status='C'  where loja_fk=${idLoja}   and contasreceber_fk=${idContasReceber} AND fatura='${fatura}'`
    }).then(() => {
        statusUpdate2 = 'Registro atualizado com sucesso';
    }).catch((err) => {
        statusUpdate2 = err.message;
    });

    return { code: 200, results: { statusUpdate, contasReceber, contasReceberRec, statusDelete, statusDelete2, statusUpdate2 } }

};


module.exports = {
    cancelar,
    excluirs,
    editarFaturas,
    vercr,
    gerarxmlpdf,
    consultar,
    emitirnfe,
    enviarnfe,
    atualizaSequenciador,
    inserir,
    numeroserie,
    salvarcuponsnfe7,
    salvaritensnfe7,
    salvarEmitente,
    salvarnaturezainfo,
    salvarDestinatario,
    salvarfaturapagamento,
    salvarnfecab3,
    veritens,
    criarfatura,
    processarfatura,
    salvarfaturas,
    baixarparcial,
    xmlpdf,
    setamail,
    mailnfe,
    cancelarfaturas
}