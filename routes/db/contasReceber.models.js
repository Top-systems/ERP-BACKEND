const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const recalcularp = async function ({ idLoja, idContasReceber }) {

    const contasReceber = await useDB({
        query: `select * from Fn_Contasreceber where loja_fk=${idLoja} and id_Contasreceber=${idContasReceber}`
    });

    return { code: 200, results: { contasReceber } }

};

const recalcular = async function ({ idLoja, idContasReceber, idCupom }) {

    const contasReceber = await useDB({
        query: `SELECT valorrestante_contasreceber ,totalliquido_cupom ,cupomcab_fk,numdoc_contasreceber,coo_cupom FROM public.fn_contasreceber as r inner join ecf_cupomcab as c on c.id_cupomcab=r.cupomcab_fk where c.loja_fk=${idLoja}  and r.loja_fk=${idLoja}  and r. id_contasreceber=${idContasReceber} and statusreceb_contasreceber in ('P','F')  and status_cupom in ('F','O') `
    });

    const cupomDetProd = await useDB({
        query: `SELECT  d.produto_fk, descricao_prod, qtde_cupitem, valorunit_cupitem,precovenda_prod,(valorfinal_cupitem-descontoglobal_cupitem+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupitem ELSE 0 END)) as tt,descontoglobal_cupitem,valoracrescimo_cupitem  FROM public.ecf_cupomdet_prod as d inner join ecf_cupomcab as cab on cab.id_cupomcab=d.cupomcab_fk  inner join cd_produto as p on p.id_prod=d.produto_fk  inner join es_estoquegeral as e on e.produto_fk=p.id_prod  where d.loja_fk=${idLoja}   and e.loja_fk=${idLoja}   and cab.loja_fk=${idLoja}   and cupomcab_fk=${idCupom} and status_cupitem='F'`
    });

    const cupomDetBico = await useDB({
        query: `SELECT  numero_bic, descricao_tipcomb, qtde_cupdetbic, valorunit_cupdetbic,precovar_bic,(valorfinal_cupdetbic-descontoglobal_cupitem+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupdetbic ELSE 0 END)) as tt,descontoglobal_cupitem,valoracrescimo_cupdetbic  FROM public.ecf_cupomdet_bico as d inner join ecf_cupomcab as cab on cab.id_cupomcab=d.cupomcab_fk  inner join cd_bico as p on p.id_bico=d.bico_fk  inner join cd_tanque as t on t.id_tanque=p.tanque_fk  inner join cd_tipocombustivel as e on e.id_tipocombustivel =t.tipocombustivel_fk  where d.loja_fk=${idLoja}   and t.loja_fk=${idLoja}   and cab.loja_fk=${idLoja}   and p.loja_fk=${idLoja}   and cupomcab_fk=${idCupom} and status_cupdetbic='F'`
    });

    const contasReceber2 = await useDB({
        query: `select * from Fn_Contasreceber where loja_fk=${idLoja} and id_Contasreceber=${idContasReceber}`
    });

    return { code: 200, results: { contasReceber, cupomDetProd, cupomDetBico, contasReceber2 } }

};

const excluirlancamento = async function ({ idLoja, idContasReceber }) {

    const contasReceber = await useDB({
        query: `select * from Fn_Contasreceber where loja_fk=${idLoja} and id_Contasreceber=${idContasReceber}`
    });

    return { code: 200, results: { contasReceber } }

};

const salvarcontasreceber = async function ({ idLoja, insertContaReceberData }) {

    let statusInsert;

    const idContasReceber = await useDB({
        query: `SELECT max(id_contasreceber)+1 as idc FROM public.fn_contasreceber where loja_fk=${idLoja} `
    });

    const insertContaReceber = await useDB({
        query: `INSERT INTO fn_contasreceber(            
            id_contasreceber,
            loja_fk,            
            cliente_fk,             
            numdoc_contasreceber,             
            numparcela_contasreceber,             
            totalparcelas_contasreceber,             
            datalanc_contasreceber,             
            datavenc_contasreceber,             
            valorparcela_contasreceber,            
            valortotal_contasreceber,             
            statusreceb_contasreceber,              
            usuarioaltera,             
            dataaltera,
            valorrestante_contasreceber,
            obs_contasreceber)    VALUES (
                ${idContasReceber[0].idc},
                ${insertContaReceberData.loja_fk},
                ${insertContaReceberData.cliente_fk},
                ${insertContaReceberData.numdoc_contasreceber},
                ${insertContaReceberData.numparcela_contasreceber},
                ${insertContaReceberData.totalparcelas_contasreceber},
                '${insertContaReceberData.datalanc_contasreceber}',
                '${insertContaReceberData.datavenc_contasreceber}',
                ${insertContaReceberData.valorparcela_contasreceber},
                ${insertContaReceberData.valortotal_contasreceber},
                'P',
                ${insertContaReceberData.usuarioaltera},
                '${insertContaReceberData.dataaltera}',
                ${insertContaReceberData.valorrestante_contasreceber},
                '${insertContaReceberData.obs_contasreceber}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { idContasReceber, statusInsert } }

};

const baixar = async function ({ idLoja, idContasReceber, insertContasReceberRecData, insertCartaoMovData, insertChequeData }) {

    let statusInsert, statusInsert2, statusInsert3

    const contasReceber = await useDB({
        query: `SELECT * FROM Fn_Contasreceber where loja_Fk=${idLoja} and id_Contasreceber=${idContasReceber}`
    });

    const idContasReceberRec = await useDB({
        query: `SELECT max(id_contasreceber_rec)+1 as idc FROM public.fn_contasreceber_rec where loja_fk=${idLoja} `
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
            obs)values(
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
                '${insertContasReceberRecData.obs}' )`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
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
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
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
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    return { code: 200, results: { contasReceber, idContasReceberRec, statusInsert, cartaoMov, statusInsert2, cheque, statusInsert3 } }

};

const baixarparcial = async function ({ idLoja, idContasReceber, insertContasReceberRecData, insertCartaoMovData, insertChequeData }) {

    let statusInsert, statusInsert2, statusInsert3

    const contasReceber = await useDB({
        query: `SELECT * FROM Fn_Contasreceber where loja_Fk=${idLoja} and id_Contasreceber=${idContasReceber}`
    });

    const idContasReceberRec = await useDB({
        query: `SELECT max(id_contasreceber_rec)+1 as idc FROM public.fn_contasreceber_rec where loja_fk=${idLoja} `
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
            obs)values(
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
                '${insertContasReceberRecData.obs}' )`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const sumValorPago = await useDB({
        query: `SELECT sum(valorpago) as tt  FROM public.fn_contasreceber_rec  where loja_fk=${idLoja}  and contasreceber_fk=${idContasReceber} and status='Q'`
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
        statusInsert2 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
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
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    return { code: 200, results: { contasReceber, idContasReceberRec, statusInsert, sumValorPago, cartaoMov, statusInsert2, cheque, statusInsert3 } }


};

const cancelar = async function ({ idLoja, idContasReceber, idContasReceberRec, insertContasReceberRecData }) {

    let statusInsert;

    const contasReceber = await useDB({
        query: `SELECT * FROM Fn_Contasreceber where loja_Fk=${idLoja} and id_Contasreceber=${idContasReceber}`
    });

    const contasReceberRec1 = await useDB({
        query: `SELECT * FROM Fn_Contasreceber_Rec WHERE loja_Fk=${idLoja} and contasreceber_fk=${idContasReceber} and status='Q'`
    });

    const deleteCartaoMov = await useDB({
        query: `delete from ecf_cartaomov  where loja_fk=${idLoja} and receber_rec_fk=${idContasReceberRec} `
    });

    const deleteCheque = await useDB({
        query: `delete from cd_cheque  where loja_fk=${idLoja} and receber_rec_fk=${idContasReceberRec} `
    });

    const contasReceberRec = await useDB({
        query: `SELECT max(id_contasreceber_rec)+1 as idc FROM public.fn_contasreceber_rec where loja_fk=${idLoja} `
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
            obs)values(
                ${contasReceberRec[0].idc},
                ${insertContasReceberRecData.loja_fk},
                ${insertContasReceberRecData.contasreceber_fk}, 
                ${insertContasReceberRecData.numparcela},
                ${insertContasReceberRecData.valorpago},
                '${insertContasReceberRecData.datapagto}',
                ${insertContasReceberRecData.usuarioaltera}, 
                '${insertContasReceberRecData.dataaltera}', 
                'Q',
                '${insertContasReceberRecData.obs}' )`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const updateContasReceberRec = await useDB({
        query: `UPDATE public.fn_contasreceber_rec set status='C'  where loja_fk=${idLoja}  and contasreceber_fk=${idContasReceber} and status='Q'`
    });

    return { code: 200, results: { contasReceber, contasReceberRec1, deleteCartaoMov, deleteCheque, contasReceberRec, statusInsert, updateContasReceberRec } }

};

const consultar = async function ({ tipoData, dataInicial, dataFinal, idLoja, idCupomCab, idContasReceber, idReceberRec }) {

    const contasReceber = await useDB({
        query: `SELECT  
        id_Contasreceber, 
        Fn_Contasreceber.loja_Fk, 
        statusreceb_Contasreceber, 
        numdoc_Contasreceber, 
        numparcela_Contasreceber, 
        valortotal_Contasreceber, 
        totalparcelas_Contasreceber, 
        datalanc_Contasreceber, 
        datavenc_Contasreceber, 
        datapagto_Contasreceber, 
        valorparcela_Contasreceber, 
        valordesconto_Contasreceber, 
        valormulta_Contasreceber, 
        valorjuros_Contasreceber, 
        valorpago_Contasreceber, 
        valoradicional_Contasreceber, 
        valorrestante_Contasreceber, 
        lojabaixa_Contasreceber, 
        ecf_Cupomcab.id_Cupomcab, 
        vd_Seried.id, 
        nfe_Cabecalho.id_Nfe_Cabecalho, 
        cd_cliente.nome_Cli, 
        cd_empresaconveniada.razaosocial_Empconv,
        usuariobaixa,
        usuariodescontobaixa,
        usuariocancelamento,
        formapagto_Contasreceber ,
        obs_Contasreceber,
        ecf_recebimento,
        data_juros,
        cd_empresaconveniada.id_empconv,
        cd_cliente.id_Cli,
        conta_caixa,
        fatura  
            FROM 
                Fn_Contasreceber,
                ecf_cupomcab,
                vd_seried,
                nfe_cabecalho,
                cd_cliente,
                cd_empresaconveniada
                WHERE (Fn_Contasreceber.${tipoData} BETWEEN '${dataInicial}'  AND '${dataFinal}')   
                    and Fn_Contasreceber.tipo is null 
                    and fn_contasreceber.cupomcab_fk = ecf_cupomcab.id_cupomcab
                    and fn_contasreceber.seried_fk = vd_seried.id
                    and fn_contasreceber.cliente_fk = cd_cliente.id_cli
                    and cd_cliente.empresa_fk = cd_empresaconveniada.id_empconv
                    and fn_contasreceber.nfecab_fk = nfe_cabecalho.id_nfe_cabecalho
                        ORDER BY Fn_Contasreceber.${tipoData} ASC`
    });

    /* if (ok) {
   
       CfLoja loja = (CfLoja) Util.pegarObjetoDaSessao("loja");
   
       String tipo1 = "";
   
       if (!this.situacao.equals("AB")) {
           tipo1 = " AND vo.statusrecebContasreceber='" + this.situacao + "' ";
       }
       if (this.situacao.equals("Q")) {
           tipo1 = " AND (vo.statusrecebContasreceber='" + this.situacao + "' "
                   + " OR (vo.statusrecebContasreceber in ('P','F') AND vo.valorpagoContasreceber>0)) ";
       }
   
       String empresa1 = "";
       if (this.empresa == null) {
           this.empresa = new CdEmpresaconveniada();
       }
       if (this.empresa.getIdEmpconv() != null) {
           empresa1 = " AND vo.clienteFk.empresaFk=" + this.empresa.getIdEmpconv() + "";
       }
   
       String cliente1 = "";
       if (this.cliente.getIdCli() != null) {
           empresa1 = " AND vo.clienteFk=" + this.cliente.getIdCli() + "";
   
       }
   
       String loja1 = "";
       if (!this.todaslojas) {
           loja1 = " AND vo.fnContasreceberPK.lojaFk=" + loja.getIdLoja() + "";
       }
   
       String hql = "SELECT " + " vo.fnContasreceberPK.idContasreceber,"
               + " vo.fnContasreceberPK.lojaFk,"
               + " vo.statusrecebContasreceber,"
               + " vo.numdocContasreceber,"
               + " vo.numparcelaContasreceber,"
               + " vo.valortotalContasreceber,"
               + " vo.totalparcelasContasreceber,"
               + "" + " vo.datalancContasreceber,"
               + " vo.datavencContasreceber,"
               + "" + " vo.datapagtoContasreceber,"
               + " vo.valorparcelaContasreceber,"
               + "" + " vo.valordescontoContasreceber,"
               + " vo.valormultaContasreceber,"
               + "" + " vo.valorjurosContasreceber,"
               + " vo.valorpagoContasreceber,"
               + "" + " vo.valoradicionalContasreceber,"
               + " vo.valorrestanteContasreceber,"
               + "" + " vo.lojabaixaContasreceber,"
               + " vo.ecfCupomcab.ecfCupomcabPK.idCupomcab,"
               + "" + " vo.vdSeried.vdSeriedPK.id,"
               + " vo.nfeCabecalho.nfeCabecalhoPK.idNfeCabecalho,"
               + "" + " vo.clienteFk.nomeCli,"
               + " vo.clienteFk.empresaFk.razaosocialEmpconv,"
               + "" + "vo.usuariobaixa,"
               + "vo.usuariodescontobaixa,"
               + "" + "vo.usuariocancelamento"
               + ",vo.formapagtoContasreceber"
               + "" + " ,vo.obsContasreceber"
               + ",vo.ecfrecebimento,"
               + "vo.datajuros,"
               + "vo.clienteFk.empresaFk,"
               + "vo.clienteFk.idCli,"
               + "vo.clienteFk.empresaFk.idEmpconv,"
               + "vo.contacaixa,"
               + "vo.fatura "
               + " FROM FnContasreceber vo"
               + " WHERE (vo." + this.tipoData + "" + " BETWEEN '" + formatdataHQL.format(this.datainicial)
               + "'" + " "
               + " AND '" + formatdataHQL.format(this.datafinal) + "')"
               + "  "
               + tipo1
               + empresa1
               + cliente1
               + loja1 + " "
               + "  "
               + " and vo.tipo is null ORDER BY vo." + this.tipoData + " ASC"; */

    const cupomCab = await useDB({
        query: `select status_cupom from ecf_cupomcab  where loja_fk=${idLoja}  and id_cupomcab=${idCupomCab} `
    });

    const contasReceber2 = await useDB({
        query: `SELECT  numerodocfiscal_nfecab,t.descricao FROM public.fn_contasreceber as  r inner join ecf_cupomcab as cab on cab.id_cupomcab=r.cupomcab_fk inner join nfe_docreferenciado as doc on r.cupomcab_fk=doc.ecf_cupomcab_fk inner join nfe_cabecalho as nfe on nfe.id_nfe_cabecalho=doc.nfe_cabecalho_fk inner join cd_trib_naturezaoper as t on nfe.naturezaoperacao_fk=t.id where r.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and doc.loja_fk=${idLoja}  and nfe.loja_fk=${idLoja} and statusnota_nfecab ='5' and id_contasreceber=${idContasReceber} `
    });

    const contasReceberRec = await useDB({
        query: `select * from Fn_Contasreceber_Rec where contasreceber_fk=${idContasReceber}  and loja_Fk=${idLoja}  order by dataaltera desc`
    });

    const receberRecFkCartaoMov = await useDB({
        query: `select receber_rec_fk from ecf_cartaomov  where loja_fk=${idLoja}  and receber_rec_fk=${idReceberRec} `
    });

    const receberRecFkCheque = await useDB({
        query: `select receber_rec_fk from cd_cheque  where loja_fk=${idLoja}  and receber_rec_fk=${idReceberRec} `
    });


    return { code: 200, results: { contasReceber, cupomCab, contasReceber2, contasReceber2, contasReceberRec, receberRecFkCartaoMov, receberRecFkCheque } }

};

const opcoesclie = async function ({ idLoja, dataInicial, dataFinal, codEmp, codCliente, idCliente }) {

    const cupomCli = await useDB({
        query: `select cli.id_cli,cli.nome_cli,cp.datahora_cupom,det.codbarra_cupitem, pr.descricao_prod, det.valororig_cupitem,det.qtde_cupitem,det.valordesconto_cupitem, det.valorfinal_cupitem,e.id_empconv,e.razaosocial_empconv from ecf_cupomcab_cliente as c inner join cd_cliente as cli on c.cod_cliente=cli.id_cli inner join ecf_cupomcab as cp  on cp.id_cupomcab=c.cupomcab_fk inner join ecf_cupomdet_prod as det  on cp.id_cupomcab=det.cupomcab_fk inner join cd_produto as pr  on pr.id_prod=det.produto_fk inner join cd_empresaconveniada as e  on e.id_empconv=cli.empresa_fk where c.loja_fk=${idLoja} and cp.status_cupom in ('F','O') and status_cupitem='F'  and (cast(cp.datahora_cupom as date)  between '${dataInicial}'  and '${dataFinal}') and cp.tipo='P' and c.cod_empresa=${codEmp}and c.cod_cliente=${codCliente} order by cp.datahora_cupom asc`
    });

    /* String e = "";
    String cl = "";

    if (cliente3.getIdCli() != null) {
        cl = " and c.cod_cliente=" + cliente3.getIdCli();

    }
    //if (listCliSelecionado.isEmpty()) {
    e = " and c.cod_empresa=" + empresa.getIdEmpconv() + " ";
    if (todasempresas) {
        e = " ";
    }
 */

    const contasReceber = await useDB({
        query: `SELECT id_contasreceber, numdoc_contasreceber,  datalanc_contasreceber ,valorrestante_contasreceber,obs_contasreceber FROM public.fn_contasreceber where loja_fk=${idLoja} and  cliente_fk=${idCliente} and cupomcab_fk is null and (datalanc_contasreceber  between '${dataFinal}'  and '${dataInicial}') and statusreceb_contasreceber!='E' `
    });

    return { code: 200, results: { cupomCli, contasReceber } }

};

const atualizarecf = async function ({ idRecebimento, idContasReceber, idLoja }) {

    const updateContasReceber = await useDB({
        query: ` UPDATE public.fn_contasreceber SET  ecf_recebimento='${idRecebimento}' WHERE id_contasreceber=${idContasReceber}  and loja_fk=${idLoja} `
    });

    return { code: 200, results: { updateContasReceber } }

};

const veritens = async function ({ idContasReceber, idLoja, idCupomCab }) {

    const cupomCab = await useDB({
        query: `SELECT cupomcab_fk FROM public.fn_contasreceber where id_contasreceber=${idContasReceber} and loja_fk=${idLoja}`
    });

    const cupomdetProd = await useDB({
        query: `SELECT produto_fk,descricao_prod,qtde_cupitem, valorunit_cupitem,   ((valorfinal_cupitem-descontoglobal_cupitem)+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupitem ELSE 0 END)) as vf,descontoglobal_cupitem,valoracrescimo_cupitem  FROM public.ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on cab.id_cupomcab=cupomcab_fk  inner join cd_produto as p on p.id_prod=det.produto_fk  where det.loja_fk=${idLoja} and cab.loja_fk=${idLoja} and cupomcab_fk=${idCupomCab} and status_cupitem='F';`
    });

    const cupomdetBico = await useDB({
        query: `SELECT numero_bic,descricao_tipcomb,qtde_cupdetbic,        valorunit_cupdetbic,      ((valorfinal_cupdetbic-descontoglobal_cupitem)+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupdetbic ELSE 0 END)) as vf,       descontoglobal_cupitem,valoracrescimo_cupdetbic  FROM public.ecf_cupomdet_bico as det inner join ecf_cupomcab as cab on cab.id_cupomcab=cupomcab_fk inner join cd_bico as b on b.id_bico=det.bico_fk inner join cd_tanque as t on t.id_tanque=b.tanque_fk inner join cd_tipocombustivel as tp on tp.id_tipocombustivel=t.tipocombustivel_fk  where  det.loja_fk=${idLoja} and t.loja_fk=${idLoja}  and b.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab} and status_cupdetbic='F'`
    });

    return { code: 200, results: { cupomCab, cupomdetProd, cupomdetBico } }

};

const onCellEdit = async function ({ idContasReceber, idLoja, obs }) {

    const updateContasReceber = await useDB({
        query: ` UPDATE public.fn_contasreceber SET  obs_contasreceber='${obs}' WHERE id_contasreceber=${idContasReceber}  and loja_fk=${idLoja} `
    });

    return { code: 200, results: { updateContasReceber } }

};

const iniciarFatura = async function ({ idLoja }) {

    const fatura = await useDB({
        query: `select max(cast(fatura as integer))+1 as idc from fn_fatura where loja_fk=${idLoja} `
    });

    return { code: 200, results: { fatura } }

};

const pegarfaixa = async function ({ descFaixa, idFaixaVencimento }) {

    const faixaVencimentoCab = await useDB({
        query: `select * from Cd_Faixavencimentocab where descricao_Faixavenccab='${descFaixa}' `
    });

    const faixaVencimentoDet = await useDB({
        query: `select * from Cd_Faixavencimentodet where faixavencimentocab_fk=${idFaixaVencimento} `
    });

    return { code: 200, results: { faixaVencimentoCab, faixaVencimentoDet } }

};

const criarfatura = async function ({ idLoja, fatura, idContasReceber }) {

    const idFat = await useDB({
        query: `select id from fn_fatura where loja_fk=${idLoja}  and fatura='${fatura}'  `
    });

    const idFatura = await useDB({
        query: `select max(id)+1 as idc from fn_fatura where loja_fk=${idLoja}`
    });

    const updateFatura = await useDB({
        query: `update fn_contasreceber set fatura='${fatura}',statusreceb_contasreceber='F'  where loja_fk=${idLoja}  and id_contasreceber=${idContasReceber} `
    });

    return { code: 200, results: { idFat, idFatura, updateFatura } }

};

const desfazerexclusao = async function ({ idLoja, idContasReceber }) {

    const contasReceber = await useDB({
        query: `select * from Fn_Contasreceber where loja_fk=${idLoja} and id_Contasreceber=${idContasReceber}`
    });

    return { code: 200, results: { contasReceber } }

};



module.exports = {
    recalcularp,
    recalcular,
    excluirlancamento,
    salvarcontasreceber,
    baixar,
    baixarparcial,
    cancelar,
    consultar,
    opcoesclie,
    atualizarecf,
    veritens,
    onCellEdit,
    iniciarFatura,
    pegarfaixa,
    criarfatura,
    desfazerexclusao
}