const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const listaritens = async function ({ ccfCupom, cooCupom, idLoja, tipo, totalLiquido, idCupomCab, idDav, cooSint, serieEcf, dataEmissao, coo, serie, dataHora, idDepCli, idNfeCab, cooCupomPbm, dataautPbm, numserie, idPbmCab }) {

    const cupomCab = await useDB({
        query: `SELECT chave FROM ecf_cupomcab WHERE status_cupom in ('F','O') AND tipoequip='NFCE' AND protocolo IS NOT NULL AND protocolo!='' AND ccf_cupom=${ccfCupom} AND coo_cupom=${cooCupom} AND loja_fk=${idLoja}  and tipo='${tipo}' and tpemiss='9' AND totalliquido_cupom=${totalLiquido} `
    });

    const cupomDetProd = await useDB({
        query: `select * from Ecf_Cupomdet_Prod where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab}  order by seqitem asc`
    });

    const dav = await useDB({
        query: `select * from Vd_Dav where loja_Fk=${idLoja} and id_Dav=${idDav} `
    });

    const cupomDetBico = await useDB({
        query: `select * from Ecf_Cupomdet_Bico where loja_Fk=${idLoja} and cupomcab_fk=${idCupomCab}   order by seqitem asc`
    });

    const formula = await useDB({
        query: `select Ecf_Formula.* from Ecf_Formula, ecf_cupomdet_prod where Ecf_Formula.loja_Fk=${idLoja} and ecf_Cupomdet_Prod.cupomcab_fk=${idCupomCab} and ecf_formula.cupomdet_fk = ecf_cupomdet_prod.id_cupomdet_prod  order by ecf_Cupomdet_Prod.seqitem asc`
    });

    const sintegra = await useDB({
        query: `select * from Ecf_Sintegra60i where loja_Fk=${idLoja} and coo_Sint60i='${cooSint}'  and serieecf_Sint60i='${serieEcf}'  and dataemissao_Sint60i='${dataEmissao}' order by seqitem_Sint60i asc`
    });

    const evento = await useDB({
        query: `select * from Nfe_Evento where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab}   order by dataaltera  asc`
    });

    const redeTransacao = await useDB({
        query: `select * from Cd_Rede_Transacao where loja_fk=${idLoja} and coo=${coo}  and serie='${serie}' and cast(datahora as date)='${dataHora}' `
    });

    const cupomCabVeiculo = await useDB({
        query: `select * from Ecf_Cupomcab_Veiculo where loja_Fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const cupomDetLoteMed = await useDB({
        query: `select Ecf_Cupomdet_Lotemed.* from Ecf_Cupomdet_Lotemed, ecf_cupomdet_prod where Ecf_Cupomdet_Lotemed.loja_fk=${idLoja} and ecf_Cupomdet_Prod.cupomcab_fk=${idCupomCab} and ecf_cupomdet_lotemed.cupomdet_fk = ecf_cupomdet_prod.id_cupomdet_prod  order by ecf_Cupomdet_Prod.seqitem asc`
    });

    const cupomCabCliente = await useDB({
        query: `select * from Ecf_Cupomcab_Cliente where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const dependeCliente = await useDB({
        query: `select * from  Cd_Dependentecliente where id_Depcli=${idDepCli}`
    });

    const cupomCabEntrega = await useDB({
        query: `select * from Ecf_Cupomcab_Entrega where loja_Fk=${idLoja} and cupomcab_Fk=${idCupomCab} `
    });

    const cupomCabTipoPagto = await useDB({
        query: `select * from Ecf_Cupomcab_Tipopagto where loja_Fk=${idLoja} and cupomcab_fk=${idCupomCab}  and (valorpago>0 or troco>0)`
    });

    const contasReceber = await useDB({
        query: `select * from Fn_Contasreceber where loja_Fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const cartaoMov = await useDB({
        query: `select * from Ecf_Cartaomov where loja_Fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const cheque = await useDB({
        query: `select * from Cd_Cheque where loja_Fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const docReferenciado = await useDB({
        query: `select Nfe_Docreferenciado.* from Nfe_Docreferenciado, nfe_cabecalho where Nfe_Docreferenciado.loja_Fk=${idLoja} and ecf_cupomcab_fk=${idCupomCab}  and nfe_Cabecalho.statusnota_Nfecab='5' and nfe_docreferenciado.nfe_cabecalho_fk = nfe_cabecalho.id_nfe_cabecalho`
    });

    const destinatario = await useDB({
        query: `select * from Nfe_Destinatario where nfecab_fk=${idNfeCab}   and loja_Fk=${idLoja} `
    });

    const pbmCab = await useDB({
        query: `select * from Ecf_Pbmcab where loja_fk=${idLoja} and coocupom_Pbm=${cooCupomPbm} and dataaut_Pbmcab='${dataautPbm}' and numserie='${numserie}' `
    });

    const pbmDet = await useDB({
        query: `SELECT sum(valortotal_pbmdet) as t, sum(valorministeriosaude_pbmdet) as m, sum(valorpaciente_pbmdet) as p FROM public.ecf_pbmdet where loja_fk=${idLoja}  and  pbmcab_fk=${idPbmCab}`
    });

    const cupomCab2 = await useDB({
        query:`select * from Ecf_Cupomcab where status_Cupom in ('I','C') and tipoequip='NFCE' and protocolo is not null and protocolo!=''  and coo_Cupom=${cooCupom} and serieecf_Cupom='${serieEcf}'  and loja_fk=${idLoja} `
    });

    const cupomCab3 = await useDB({
        query:`select * from Ecf_Cupomcab where status_Cupom in ('F') and tipoequip='NFCE' and protocolo is not null and protocolo!=''  and coo_Cupom=${cooCupom} and serieecf_Cupom='${serieEcf}' and tpemiss='9' and loja_fk=${idLoja} `
    });


    return { code: 200, results: { cupomCab, cupomDetProd, dav, cupomDetBico, formula, sintegra, evento, redeTransacao, cupomCabVeiculo, cupomDetLoteMed, cupomCabCliente, dependeCliente, cupomCabEntrega, cupomCabTipoPagto, contasReceber, cartaoMov, cheque, docReferenciado, destinatario, pbmCab, pbmDet, cupomCab2, cupomCab3 } }


};

const consultar = async function ({ idLoja, idCupomCab }) {

    const updateCupomCab = await useDB({
        query: ` update ecf_cupomcab set status_cupom='C' where status_cupom in ('F') AND (protocolo IS  NULL OR protocolo ='')  AND tipoequip IN ('NFCE','SAT')  and loja_fk=${idLoja}`
    });

    /* String hql = "";
    String c = "";
    String d = "";
    String tp = "";
    String st = "";
    String ttp = "";
    String im = "";

    if (!tipotp.equals("0") && !tipotp.equals("S")) {
        ttp = " and vo.tipopagtoFk.idTipopagto =" + tipotp + " ";
    }
    if (tipotp.equals("S")) {
        ttp = " and tp is null ";
    }
    if (!impressora.equals("todos")) {
        im = " and vo.serieecfCupom ='" + impressora + "' ";
    }

    if (!tipovenda.equals("todos")) {
        tp = " and vo.tipo ='" + tipovenda + "' ";
    }

    if (!situacao.equals("todos")) {
        st = " and vo.statusCupom='" + situacao + "' ";
    }
    if (situacao.equals("C2")) {
        st = " and vo.statusCupom='C' "
                + " and protocolo!='' "
                + " and protocolo is not null "
                + " and datahora_autorizacao is not null ";
    }

    if (situacao.equals("OF")) {
        st = " and vo.statusCupom='F' "
                + " and protocolo!='' "
                + " and protocolo is not null "
                + " and datahora_autorizacao is not null"
                + " and tpemiss='9' ";
    }

    boolean temturno = false;
    String turnox = "";
    if (turno != null) {
        if (turno.getEcfMovimentoPK().getIdMovimento() != null) {
            temturno = true;
            if (tipotp.equals("S") || tipotp.equals("0")) {
                turnox = " and vo.ecfMovimento.ecfMovimentoPK.idMovimento=" + turno.getEcfMovimentoPK().getIdMovimento() + " ";
            } else {
                turnox = " and vo.ecfCupomcab.ecfMovimento.ecfMovimentoPK.idMovimento=" + turno.getEcfMovimentoPK().getIdMovimento() + " ";
            }
        }
    }

    if (coo.length() > 0 && tipo.equals("coo")) {
        c = " and vo.cooCupom=" + coo + " ";
        d = "";
        im = "";
        ttp = "";
    } else if (coo.length() > 0 && tipo.equals("prevenda")) {
        c = " and vo.vdPrevenda.codprevenda=" + coo + " ";
        d = "";
        im = "";
        ttp = "";
    } else {
        c = "";
        if (temturno == false) {
            d = " and (vo.datahoraCupom between '" + sd.format(datainicial) + "'"
                    + " and '" + sd.format(datafinal) + "') ";
        }
    } */

    const cupomCab = await useDB({
        query: `select * from Ecf_Cupomcab where loja_fk=${idLoja} and coo_Cupom!=0  and status_Cupom!='A' and serieecf_Cupom!='' order by datahora_Cupom desc `
    });
    /* 
        if (tipotp.equals("0")) {
            System.out.println("aki1");
            hql = "select vo from EcfCupomcab vo"
                    + " where vo.cfLoja=" + loja.getIdLoja() + " and vo.cooCupom!=0 "
                    + "" + d + c + im + tp + st + turnox
                    + "  and vo.statusCupom!='A'"
                    + " and vo.serieecfCupom!='' order by vo.datahoraCupom desc ";
            System.out.println(hql);
            vendas = sessao.createQuery(hql).list(); */
    /* } else if (tipotp.equals("S")) {
        System.out.println("aki2");
        hql = "select vo from EcfCupomcab vo"
                + " left join EcfCupomcabTipopagto tp "
                + " where vo.cfLoja=" + loja.getIdLoja() + " and vo.cooCupom!=0 "
                + "" + d + c + im + tp + st + turnox
                + "  and vo.statusCupom!='A'"
                + " and vo.serieecfCupom!='' order by vo.datahoraCupom   desc ";
        System.out.println(hql);
        vendas = sessao.createQuery(hql).list(); */
    /*  } else {
         if (temturno == false) {
             d = " and (vo.ecfCupomcab.datahoraCupom between '" + sd.format(datainicial) + "'"
                     + " and '" + sd.format(datafinal) + "') ";
         }
         c = "";
 
         if (!impressora.equals("todos")) {
             im = " and vo.ecfCupomcab.serieecfCupom ='" + impressora + "' ";
         }
 
         if (!tipovenda.equals("todos")) {
             tp = " and vo.ecfCupomcab.tipo ='" + tipovenda + "' ";
         }
 
         if (!situacao.equals("todos")) {
             st = " and vo.ecfCupomcab.statusCupom='" + situacao + "' ";
         } */

    const cupomTipoPagto = await useDB({
        query: `select cupomcab_fk from Ecf_Cupomcab_Tipopagto, ecf_cupomcab where Ecf_Cupomcab_Tipopagto.loja_fk=${idLoja}  and ecf_cupomcab.loja_Fk=${idLoja}  and ecf_Cupomcab.coo_Cupom!=0  and ecf_Cupomcab.status_Cupom!='A' and ecf_Cupomcab.serieecf_Cupom!='' and Ecf_Cupomcab_Tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc `
    });

    /* hql = "select vo.ecfCupomcab from EcfCupomcabTipopagto vo"
        + " where vo.ecfCupomcab.cfLoja=" + loja.getIdLoja() + " "
        + " and vo.lojaFk=" + loja.getIdLoja() + " "
        + " and vo.ecfCupomcab.cooCupom!=0 "
        + "" + d + c + im + tp + st + turnox
        + "  and vo.ecfCupomcab.statusCupom!='A'"
        + " and vo.ecfCupomcab.serieecfCupom!=''"
        + "  " + ttp
        + " order by vo.ecfCupomcab.datahoraCupom  desc "; */

    const cupomDetProd = await useDB({
        query: `SELECT sum(valorfinal_cupitem) as vt   FROM public.ecf_cupomdet_prod  where loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab}  and status_cupitem='C'`
    });

    const cupomDetBico = await useDB({
        query: `SELECT sum(valorfinal_cupdetbic) as vt FROM public.ecf_cupomdet_bico  where loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab} and status_cupdetbic='C'`
    });


    return { code: 200, results: { updateCupomCab, cupomCab, cupomTipoPagto, cupomDetProd, cupomDetBico } }

};

const processarXML = async function ({ idLoja, coo, ccfCupom, numEstacao, dataAbertura, insertCupomCabData, chave, idCupomCab, insertCupomCabData2, insertEventoData, cnpjAdmCartao, descricaoCartao, insertCupomCabTipoPagtoData, insertCartaoMovData, cnpjCli, insertCupomCabClienteData, insertContasReceberData, idProd, insertCupomDetProdData, numeroBico, insertCupomDetBicoData }) {

    let statusInsert, statusInsert2, statusInsert3, statusInsert4, statusInsert5, statusInsert6, statusInsert7, statusInsert8, statusInsert9;

    const cupomCab = await useDB({
        query: `select id_cupomcab from ecf_cupomcab where loja_fk=${idLoja}  and coo_cupom='${coo}'  and ccf_cupom='${ccfCupom}' and status_cupom in ('I') and protocolo is not null and protocolo!='' `
    });

    const idEcfCupomCab = await useDB({
        query: `SELECT max(id_cupomcab) as idc FROM public.ecf_cupomcab where loja_fk=${idLoja}`
    });

    const movimento = await useDB({
        query: `select Ecf_Movimento.* from Ecf_Movimento, cf_Estacao where Ecf_Movimento.loja_fk=${idLoja}  and cf_Estacao.num_Estacao=${numEstacao}  and datahoraabertura_Mov<='${dataAbertura}' and ecf_movimento.estacao_fk = cf_estacao.id_estacao order by datahoraabertura_Mov desc `
    });

    const movimento2 = await useDB({
        query: `select Ecf_Movimento.* from Ecf_Movimento, cf_Estacao where Ecf_Movimento.loja_fk=${idLoja}  and cf_Estacao.num_Estacao=${numEstacao}  and ecf_movimento.estacao_fk = cf_estacao.id_estacao order by datahoraabertura_Mov desc `
    });

    const movimento3 = await useDB({
        query: `select * from Ecf_Movimento  where loja_fk=${idLoja} order by datahoraabertura_Mov desc `
    });

    const insertCupomCab = await useDB({
        query: `INSERT INTO public.ecf_cupomcab(
            id_cupomcab, 
            loja_fk, 
            movimento_fk, 
            totalitens_cupom, 
            totalbruto_cupom, 
            totalliquido_cupom, 
            ccf_cupom, 
            datahora_cupom, 
            serieecf_cupom, 
            status_cupom, 
            coo_cupom, 
            desconto_cupomcab, 
            acrescimo_cupomcab, 
            comissao_cupomcab, 
            usuario_cupom, 
            hash_cupom, 
            usuarioaltera, 
            dataaltera, 
            tipo,  
            vtrib, 
            frete, 
            pis, 
            cofins, 
            bcicms, 
            icms, 
            bcst, 
            st, 
            modelo, 
            tpimp, 
            tpamb, 
            tpemiss, 
            finalidade, 
            indfinal, 
            indpress, 
            chave, 
            natureza,  
            qrcode, 
            protocolo, 
            tipoequip, 
            cdv, 
            datahora_autorizacao)    VALUES (
                ${insertCupomCabData.id_cupomcab},
                ${insertCupomCabData.loja_fk},
                ${insertCupomCabData.movimento_fk},
                0,
                0,
                0,
                ${insertCupomCabData.ccf_cupom},
                '${insertCupomCabData.datahora_cupom}',
                '${insertCupomCabData.serieecf_cupom}',
                'I',
                ${insertCupomCabData.coo_cupom},
                0,
                0,
                0,
                0,
                '',
                0,
                '${insertCupomCabData.dataaltera}',
                'V',
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                '65',
                '1',
                '${insertCupomCabData.tpamb}',
                '1',
                '1',
                '1',
                '1',
                '',
                '',
                '',
                '${insertCupomCabData.protocolo}',
                'NFCE',
                '',
                '${insertCupomCabData.datahora_autorizacao}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const cupomCab2 = await useDB({
        query: `select id_cupomcab,ccf_cupom,chave,datahora_cupom from ecf_cupomcab where loja_fk=${idLoja}  and chave='NFe${chave}' and status_cupom in ('F','I','D','O') and protocolo is not null and protocolo!='' and status_cupom!='C' `
    });

    const updateCupomCab = await useDB({
        query: `update ecf_cupomcab set status_cupom='C' where loja_fk=${idLoja} and id_cupomcab=${idCupomCab} `
    });

    const updateCupomDetProd = await useDB({
        query: `update ecf_cupomdet_prod set status_cupitem='C' where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const updateCupomDetBico = await useDB({
        query: `update ecf_cupomdet_bico set status_cupdetbic='C',abastecimento_fk=null where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const updateCheque = await useDB({
        query: `update cd_cheque set statuscheque_chq='C' where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const updateContasReceber = await useDB({
        query: `update fn_contasreceber set statusreceb_contasreceber='C' where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const idCupomCab3 = await useDB({
        query: `SELECT max(id_cupomcab)+1 as idc FROM public.ecf_cupomcab where loja_fk=${idLoja}`
    });

    const insertCupomCab2 = await useDB({
        query: `INSERT INTO public.ecf_cupomcab( 
            id_cupomcab, 
            loja_fk, 
            movimento_fk, 
            totalitens_cupom,  
            totalbruto_cupom, 
            totalliquido_cupom, 
            ccf_cupom, 
            datahora_cupom, 
            serieecf_cupom, 
            status_cupom, 
            coo_cupom, 
            desconto_cupomcab, 
            acrescimo_cupomcab,  
            comissao_cupomcab, 
            usuario_cupom, 
            hash_cupom, 
            usuarioaltera,  
            dataaltera, 
            tipo,  
            vtrib, 
            frete, 
            pis, 
            cofins,  
            bcicms, 
            icms, 
            bcst, 
            st, 
            modelo, 
            tpimp, 
            tpamb, 
            tpemiss, 
            finalidade,  
            indfinal, 
            indpress, 
            chave, 
            natureza,  
            qrcode, 
            protocolo,  
            tipoequip, 
            cdv, 
            datahora_autorizacao) VALUES (
                ${idCupomCab3[0].idc},
                ${insertCupomCabData2.loja_fk},
                ${insertCupomCabData2.movimento_fk},
                ${insertCupomCabData2.totalitens_cupom},
                ${insertCupomCabData2.totalbruto_cupom},
                ${insertCupomCabData2.totalliquido_cupom},
                ${insertCupomCabData2.ccf_cupom},
                '${insertCupomCabData2.datahora_cupom}',
                '${insertCupomCabData2.serieecf_cupom}',
                '${insertCupomCabData2.status_cupom}',
                ${insertCupomCabData2.coo_cupom},
                ${insertCupomCabData2.desconto_cupomcab},
                ${insertCupomCabData2.acrescimo_cupomcab},
                ${insertCupomCabData2.comissao_cupomcab},
                ${insertCupomCabData2.usuario_cupom},
                '${insertCupomCabData2.hash_cupom}',
                ${insertCupomCabData2.usuarioaltera},
                '${insertCupomCabData2.dataaltera}',
                '${insertCupomCabData2.tipo}',
                ${insertCupomCabData2.vtrip},
                ${insertCupomCabData2.frete},
                ${insertCupomCabData2.pis},
                ${insertCupomCabData2.cofins},
                ${insertCupomCabData2.bcicms},
                ${insertCupomCabData2.icms},
                ${insertCupomCabData2.bcst},
                ${insertCupomCabData2.st},
                '${insertCupomCabData2.modelo}',
                '${insertCupomCabData2.tpimp}',
                '${insertCupomCabData2.tpamb}',
                '${insertCupomCabData2.tpemiss}',
                '${insertCupomCabData2.finalidade}',
                '${insertCupomCabData2.indfinal}',
                '${insertCupomCabData2.indpress}',
                '${insertCupomCabData2.chave}',
                '${insertCupomCabData2.natureza}',
                '${insertCupomCabData2.qrcode}',
                '${insertCupomCabData2.protocolo}',
                '${insertCupomCabData2.tipoequip}',
                '${insertCupomCabData2.cdv}',
                '${insertCupomCabData2.datahora_autorizacao}');`
    }).then(() => {
        statusInsert2 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const idNfeEvento = await useDB({
        query: `select max(id)+1 as idc from nfe_evento  where loja_fk=${idLoja}  `
    });

    const insertEvento = await useDB({
        query: ` INSERT INTO public.nfe_evento(  
            id, 
            loja_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno,  
            tipo, 
            usuarioaltera, 
            dataaltera, 
            cupomcab_fk) VALUES (
                ${idNfeEvento[0].idc}, 
                ${insertEventoData.loja_fk}, 
                '${insertEventoData.protocolo}',  
                '${insertEventoData.motivo_evento}', 
                'Evento registrado e vinculado a NF-e',  
                'cancelamento', 
                0, 
                '${insertEventoData.dataaltera}', 
                ${insertEventoData.cupomcab_fk});`
    }).then(() => {
        statusInsert3 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert3 = err.message;
    });

    const cupomCab4 = await useDB({
        query: `select id_cupomcab from ecf_cupomcab where loja_fk=${idLoja}  and chave='${chave}' and status_cupom in ('F','I','D','C') and protocolo is not null and protocolo!='' `
    });

    const cartao = await useDB({
        query: `select * from Cd_Cartao, cd_admcartao where cd_admcartao.cnpj_Admcartao='${cnpjAdmCartao}}' and UPPER(descricao_Cartao) like '%${descricaoCartao}%' and cd_cartao.admcartao_fk = cd_admcartao.id_admcartao `
    });

    const idCupomCabTipoPagto = await useDB({
        query: `SELECT max(id_cupomcab_tipopagto) as idc FROM public.ecf_cupomcab_tipopagto  where loja_fk=${idLoja}`
    });

    const insertCupomCabTipoPagto = await useDB({
        query: `INSERT INTO public.ecf_cupomcab_tipopagto( 
            id_cupomcab_tipopagto, 
            loja_fk, 
            cupomcab_fk, 
            tipopagto_fk, 
            valorpago,    
            hash_cupomcabtipopagto, 
            usuarioaltera, 
            dataaltera, 
            troco) VALUES (
                ${idCupomCabTipoPagto[0].idc},
                ${insertCupomCabTipoPagtoData.loja_fk},
                ${insertCupomCabTipoPagtoData.cupomcab_fk},
                ${insertCupomCabTipoPagtoData.tipopagto_fk}, 
                ${insertCupomCabTipoPagtoData.valorpago},  
                '', 
                0, 
                '${insertCupomCabTipoPagtoData.dataaltera}',
                ${insertCupomCabTipoPagtoData.troco} );`
    }).then(() => {
        statusInsert4 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert4 = err.message;
    });

    const idCartaoMov = await useDB({
        query: `SELECT max(id_cartaomov) as idc  FROM public.ecf_cartaomov  where loja_fk=${idLoja}`
    });

    const insertCartaoMov = await useDB({
        query: `INSERT INTO public.ecf_cartaomov(	
            id_cartaomov, 
            loja_fk, 
            cupomcab_fk, 
            cartao_fk, 
            tipocartao_cartmov, 
            valorbruto_cartmov,  
            valorliquido_cartmov, 
            dataemissao_cartmov, 
            datavencto_cartmov, 
            usuarioaltera, 
            dataaltera, 
            status_cartmov, 
            numdoctrans_cartmov) VALUES (
                ${idCartaoMov[0].idc}, 
                ${insertCartaoMovData.loja_fk}, 
                ${insertCartaoMovData.cupomcab_fk}, 
                ${insertCartaoMovData.cartao_fk},
                '${insertCartaoMovData.tipocartao_cartmov}', 
                ${insertCartaoMovData.valorbruto_cartmov},  
                ${insertCartaoMovData.valorliquido_cartmov},
                '${insertCartaoMovData.dataemissao_cartmov}', 
                '${insertCartaoMovData.datavencto_cartmov}', 
                ${insertCartaoMovData.usuarioaltera}, 
                '${insertCartaoMovData.dataaltera}',
                '${insertCartaoMovData.status_cartmov}',
                '${insertCartaoMovData.numdoctrans_cartmov}')`
    }).then(() => {
        statusInsert5 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert5 = err.message;
    });

    const idCupomCabCliente = await useDB({
        query: ` SELECT max(id_cupomcab_cliente)+1 as idc  FROM public.ecf_cupomcab_cliente  where loja_fk=${idLoja}`
    });

    const cliente = await useDB({
        query: `select * from Cd_Cliente where cpfcnpj_Cli='${cnpjCli}'`
    });

    const insertCupomCabCliente = await useDB({
        query: `INSERT INTO public.ecf_cupomcab_cliente( 
            id_cupomcab_cliente, 
            loja_fk, 
            cupomcab_fk, 
            nome, 
            cpfcnpj, 
            endereco,  
            numeroend, 
            bairro, 
            cep, 
            cidade, 
            uf, 
            telefone, 
            usuarioaltera, 
            dataaltera, 
            ie,
            indiedest,
            email, 
            complemento, 
            codibge,
            cod_cliente,
            cod_empresa)VALUES (
                ${idCupomCabCliente[0].idc}, 
                ${insertCupomCabClienteData.loja_fk},
                ${insertCupomCabClienteData.cupomcab_fk},
                '${insertCupomCabClienteData.nome}', 
                '${insertCupomCabClienteData.cpfcnpj}', 
                '${insertCupomCabClienteData.endereco}', 
                '${insertCupomCabClienteData.numeroend}', 
                '${insertCupomCabClienteData.bairro}', 
                '${insertCupomCabClienteData.cep}', 
                '${insertCupomCabClienteData.cidade}', 
                '${insertCupomCabClienteData.uf}', 
                '${insertCupomCabClienteData.telefone}', 
                0, 
                '${insertCupomCabClienteData.dataaltera}', 
                '${insertCupomCabClienteData.ie}',  
                '${insertCupomCabClienteData.indiedest}', 
                '${insertCupomCabClienteData.email}', 
                '${insertCupomCabClienteData.complemento}',
                '${insertCupomCabClienteData.codibge}', 
                ${insertCupomCabClienteData.cod_cliente},
                ${insertCupomCabClienteData.cod_empresa});`
    }).then(() => {
        statusInsert6 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert6 = err.message;
    });

    const idContasReceber = await useDB({
        query: `SELECT max(id_contasreceber) as idc  FROM public.fn_contasreceber  where loja_fk=${idLoja}`
    });

    const insertContasReceber = await useDB({
        query: `INSERT INTO public.fn_contasreceber(  
            id_contasreceber, 
            loja_fk, 
            cupomcab_fk,  
            cliente_fk, 
            numdoc_contasreceber, 
            numparcela_contasreceber, 
            totalparcelas_contasreceber,   
            datalanc_contasreceber, 
            datavenc_contasreceber,   
            valorparcela_contasreceber, 
            valordesconto_contasreceber, 
            valormulta_contasreceber,   
            valorjuros_contasreceber, 
            valorpago_contasreceber, 
            valoradicional_contasreceber,   
            valorrestante_contasreceber, 
            valortotal_contasreceber,   
            statusreceb_contasreceber,
            usuarioaltera,   
            dataaltera,   
            formapagto_contasreceber)  VALUES (
                ${idContasReceber[0].idc},
                ${insertContasReceberData.loja_fk},
                ${insertContasReceberData.cupomcab_fk}, 
                ${insertContasReceberData.cliente_fk},
                ${insertContasReceberData.numdoc_contasreceber},
                1,
                1 , 
                '${insertContasReceberData.datalanc_contasreceber}',
                '${insertContasReceberData.datavenc_contasreceber}', 
                ${insertContasReceberData.valorparcela_contasreceber},
                0,
                0,
                0,
                0,
                0, 
                ${insertContasReceberData.valorrestante_contasreceber}, 
                ${insertContasReceberData.valortotal_contasreceber} ,
                'P',
                0, 
                '${insertContasReceberData.dataaltera}',
                'D');`
    }).then(() => {
        statusInsert7 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert7 = err.message;
    });

    const idCupomDetProd = await useDB({
        query: ` SELECT max(id_cupomdet_prod) as idc  FROM public.ecf_cupomdet_prod where loja_fk=${idLoja}`
    });

    const idCupomDetBico = await useDB({
        query: ` SELECT max(id_cupomdet_bico) as idc  FROM public.ecf_cupomdet_bico  where loja_fk=${l.getIdLoja()}`
    });

    const produto = await useDB({
        query: `select * from Cd_Produto where id_Prod=${idProd} `
    });

    const numeroCodBar = await useDB({
        query: `SELECT  numero_codbar FROM public.cd_codigobarras where produto_fk=${idProd} and ativo_codbar='S'`
    });

    const insertCupomDetProd = await useDB({
        query: `INSERT INTO public.ecf_cupomdet_prod(  
            id_cupomdet_prod, 
            loja_fk,  
            produto_fk, 
            cupomcab_fk,  
            seqitem, 
            qtde_cupitem, 
            valorunit_cupitem, 
            valororig_cupitem,  
            valorfinal_cupitem, 
            promo_cupitem, 
            percentldesconto_cupitem,  
            valordesconto_cupitem, 
            cfop_cupitem, 
            csticms_cupitem, 
            cstpiscofins_cupitem,  
            natreceita_cupitem, 
            valoricms_cupitem, 
            comissao_cupitem, 
            valorcomissao_cupitem,  
            percentlacrescimo_cupitem, 
            valoracrescimo_cupitem, 
            codclassfiscal_cupitem,  
            unid_cupitem, 
            ncm_cupitem, 
            serie_cupitem, 
            classeterapeutica_cupitem,   
            codbarra_cupitem, 
            status_cupitem,  
            hash_cupitem, 
            usuarioaltera, 
            dataaltera, 
            estoqueantprod_cupitem,  
            registromsprod_cupitem,  
            descontoglobal_cupitem,  
            modbc, 
            modst, 
            orig, 
            cest, 
            redicms, 
            bcicms, 
            aliqicms, 
            mva, 
            redst,  
            bcst, 
            aliqst, 
            st, 
            frete, 
            vtrib, 
            bcpis, 
            aliqpis, 
            pis, 
            bccofins,  
            aliqcofins, 
            cofins, 
            acrescimoglobal)    VALUES (
                ${idCupomDetProd[0].idc}, 
                ${insertCupomDetProdData.loja_fk}, 
                ${insertCupomDetProdData.produto_fk}, 
                ${insertCupomDetProdData.cupomcab_fk},    
                ${insertCupomDetProdData.seqitem}, 
                ${insertCupomDetProdData.qtde_cupitem}, 
                ${insertCupomDetProdData.valorunit_cupitem},
                ${insertCupomDetProdData.valororig_cupitem},  
                ${insertCupomDetProdData.valorfinal_cupitem}, 
                0,
                0,  
                0, 
                ${insertCupomDetProdData.cfop_cupitem}, 
                ${insertCupomDetProdData.csticms_cupitem}, 
                ${insertCupomDetProdData.cstpiscofins_cupitem},   
                ${insertCupomDetProdData.natreceita_cupitem}, 
                ${insertCupomDetProdData.valoricms_cupitem},
                0, 
                0,   
                0, 
                ${insertCupomDetProdData.valoracrescimo_cupitem},
                '${insertCupomDetProdData.codclassfiscal_cupitem}',   
                '${insertCupomDetProdData.unid_cupitem}', 
                '${insertCupomDetProdData.ncm_cupitem}', 
                '', 
                '${insertCupomDetProdData.classeterapeutica_cupitem}',   
                '${insertCupomDetProdData, codbarra_cupitem}', 
                'F',   
                '', 
                0, 
                '${insertCupomDetProdData.dataaltera}', 
                0,   
                '${insertCupomDetProdData.registromsprod_cupitem}', 
                ${insertCupomDetProdData.descontoglobal_cupitem},   
                '04', 
                '04', 
                '0',
                '${insertCupomDetProdData.cest}', 
                0, 
                ${insertCupomDetProdData.bcicms},
                ${insertCupomDetProdData.aliqicms},
                0, 
                0,     
                0, 
                0, 
                0, 
                0, 
                0, 
                ${insertCupomDetProdData.bcpis},
                ${insertCupomDetProdData.aliqpis}, 
                ${insertCupomDetProdData.pis},
                ${insertCupomDetProdData.bccofins},   
                ${insertCupomDetProdData.aliqcofins}, 
                ${insertCupomDetProdData.cofins}, 
                0);`

    }).then(() => {
        statusInsert8 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert8 = err.message;
    });

    const bico = await useDB({
        query: `select * from Cd_Bico where numero_Bic=${numeroBico} and loja_Fk=${idLoja} `
    });

    const insertCupomDetBico = await useDB({
        query: `INSERT INTO public.ecf_cupomdet_bico(            
            id_cupomdet_bico, 
            loja_fk, 
            bico_fk, 
            cupomcab_fk, 
            seqitem, 
            qtde_cupdetbic,             
            valorunit_cupdetbic, 
            valororig_cupdetbic, 
            valorfinal_cupdetbic,             
            promo_cupdetbic, 
            percentldesconto_cupdetbic, 
            valordesconto_cupdetbic,             
            cfop_cupdetbic,
            csticms_cupdetbic, 
            cstpis_cupdetbic, 
            cstcofins_cupdetbic,             
            natreceita_cupdetbic, 
            valoricms_cupdetbic, 
            comissao_cupdetbic,             
            valorcomissao_cupdetbic, 
            percentlacrescimo_cupdetbic, 
            valoracrescimo_cupdetbic,             
            codclassfiscal, 
            unid_cupdetbic, 
            ncm_cupdetbic, 
            serie_cupdetbic,             
            status_cupdetbic, 
            hash_cupdetbic,             
            usuarioaltera, 
            dataaltera, 
            encerrante, 
            estoqueantbico_cupitem,             
            descontoglobal_cupitem, 
            modbc, 
            modst, 
            orig, 
            cest, 
            redicms, 
            bcicms,             
            aliqicms, 
            mva, 
            redst, 
            bcst, 
            aliqst, 
            st, 
            frete, 
            vtrib, 
            bcpis,             
            aliqpis, 
            pis, 
            bccofins, 
            aliqcofins, 
            cofins, 
            acrescimoglobal)    VALUES (
                ${idCupomDetBico[0].idc}, 
                ${insertCupomDetBicoData.loja_fk},  
                ${insertCupomDetBicoData.bico_fk},  
                ${insertCupomDetBicoData.cupomcab_fk}, 
                ${insertCupomDetBicoData.seqitem},  
                ${insertCupomDetBicoData.qtde_cupdetbic},             
                ${insertCupomDetBicoData.valorunit_cupdetbic}, 
                ${insertCupomDetBicoData.valororig_cupdetbic}, 
                ${insertCupomDetBicoData.valorfinal_cupdetbic},             
                0, 
                0, 
                0,              
                ${insertCupomDetBicoData.cfop_cupdetbic},  
                ${insertCupomDetBicoData.csticms_cupdetbic},  
                ${insertCupomDetBicoData.cstpis_cupdetbic},   
                ${insertCupomDetBicoData.cstcofins_cupdetbic},            
                ${insertCupomDetBicoData.natreceita_cupdetbic}, 
                ${insertCupomDetBicoData.valoricms_cupdetbic}, 
                0,             
                0, 
                0,
                ${insertCupomDetBicoData.valoracrescimo_cupdetbic},             
                '${insertCupomDetBicoData.codclassfiscal}',
                '${insertCupomDetBicoData.unid_cupdetbic}',
                '${insertCupomDetBicoData.ncm_cupdetbic}', 
                '',             
                'F', 
                '',             
                0, 
                '${insertCupomDetBicoData.dataaltera}', 
                0, 
                0,             
                ${insertCupomDetBicoData.descontoglobal_cupitem},
                '04', 
                '04', 
                '0', 
                '${insertCupomDetBicoData.cest}', 
                0,
                ${insertCupomDetBicoData.bcicms},             
                ${insertCupomDetBicoData.aliqicms},
                0,
                0, 
                0, 
                0, 
                0, 
                0, 
                0, 
                ${insertCupomDetBicoData.bcpis},             
                ${insertCupomDetBicoData.aliqpis}, 
                ${insertCupomDetBicoData.pis},
                ${insertCupomDetBicoData.bccofins},
                ${insertCupomDetBicoData.aliqcofins},
                ${insertCupomDetBicoData.cofins}, 
                0);`

    }).then(() => {
        statusInsert9 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert9 = err.message;
    });

    return { code: 200, results: { cupomCab, idEcfCupomCab, movimento, movimento2, movimento3, statusInsert, cupomCab2, updateCupomCab, updateCupomDetProd, updateCupomDetBico, updateCheque, updateContasReceber, idCupomCab3, statusInsert2, idNfeEvento, statusInsert3, cupomCab4, cartao, idCupomCabTipoPagto, statusInsert4, idCartaoMov, statusInsert5, idCupomCabCliente, cliente, statusInsert6, idContasReceber, statusInsert7, idCupomDetProd, idCupomDetBico, produto, numeroCodBar, bico, statusInsert8, statusInsert9 } }

};

const processarXMLsat = async function ({ idLoja, chave, idCupomCab, numSerieImpr, cooCupom, ccfCupom, numEstacao, dataAbertura, insertCupomCabData, insertCupomCabData2, insertCupomCabTipoPagtoData, insertCartaoMovData, cnpjCli, insertCupomCabClienteData, insertContasReceberData, idProd, insertCupomDetProdData, numeroBico, insertCupomDetBicoData }) {

    let statusInsert, statusInsert2, statusInsert4, statusInsert5, statusInsert6, statusInsert7, statusInsert8, statusInsert9;

    const cupomCab = await useDB({
        query: `select id_cupomcab from ecf_cupomcab where loja_fk=${idLoja}  and chave='${chave}' and status_cupom in ('F','I','D') and protocolo is not null and protocolo!='' and status_cupom!='C' `
    });

    const updateCupomCab = await useDB({
        query: `update ecf_cupomcab set status_cupom='C' where loja_fk=${idLoja} and id_cupomcab=${idCupomCab} `
    });

    const updateCupomDetProd = await useDB({
        query: `update ecf_cupomdet_prod set status_cupitem='C' where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const updateCupomDetBico = await useDB({
        query: `update ecf_cupomdet_bico set status_cupdetbic='C',abastecimento_fk=null where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const estacao = await useDB({
        query: `select Cf_Estacao.* from Cf_Estacao, ecf_impressora where Cf_Estacao.loja_fk=${idLoja} and ecf_Impressora.numserie_Impr='${numSerieImpr}' and Cf_Estacao.ecf_id_impressora_fk =  ecf_impressora.id_impr`
    });

    const cupomCab2 = await useDB({
        query: `select id_cupomcab from ecf_cupomcab where loja_fk=${idLoja}  and coo_cupom='${cooCupom}'  and ccf_cupom='${ccfCupom}'  and status_cupom in ('I') and protocolo is not null and protocolo!='' `
    });

    const idCupomCabIdc = await useDB({
        query: `SELECT max(id_cupomcab)+1 as idc  FROM public.ecf_cupomcab  where loja_fk=${idLoja}`
    });

    const movimento = await useDB({
        query: `select Ecf_Movimento.* from Ecf_Movimento, cf_Estacao where Ecf_Movimento.loja_fk=${idLoja}  and cf_Estacao.num_Estacao=${numEstacao}  and datahoraabertura_Mov<='${dataAbertura}' and ecf_movimento.estacao_fk = cf_estacao.id_estacao order by datahoraabertura_Mov desc `
    });

    const movimento2 = await useDB({
        query: `select Ecf_Movimento.* from Ecf_Movimento, cf_Estacao where Ecf_Movimento.loja_fk=${idLoja}  and cf_Estacao.num_Estacao=${numEstacao}  and ecf_movimento.estacao_fk = cf_estacao.id_estacao order by datahoraabertura_Mov desc `
    });

    const movimento3 = await useDB({
        query: `select * from Ecf_Movimento  where loja_fk=${idLoja} order by datahoraabertura_Mov desc `
    });

    const insertCupomCab = await useDB({
        query: `INSERT INTO public.ecf_cupomcab(
            id_cupomcab, 
            loja_fk, 
            movimento_fk, 
            totalitens_cupom, 
            totalbruto_cupom, 
            totalliquido_cupom, 
            ccf_cupom, 
            datahora_cupom, 
            serieecf_cupom, 
            status_cupom, 
            coo_cupom, 
            desconto_cupomcab, 
            acrescimo_cupomcab, 
            comissao_cupomcab, 
            usuario_cupom, 
            hash_cupom, 
            usuarioaltera, 
            dataaltera, 
            tipo,  
            vtrib, 
            frete, 
            pis, 
            cofins, 
            bcicms, 
            icms, 
            bcst, 
            st, 
            modelo, 
            tpimp, 
            tpamb, 
            tpemiss, 
            finalidade, 
            indfinal, 
            indpress, 
            chave, 
            natureza,  
            qrcode, 
            protocolo, 
            tipoequip, 
            cdv, 
            datahora_autorizacao)    VALUES (
                ${idCupomCabIdc[0].idc},
                ${insertCupomCabData.loja_fk},
                ${insertCupomCabData.movimento_fk},
                0,
                0,
                0,
                ${insertCupomCabData.ccf_cupom},
                '${insertCupomCabData.datahora_cupom}',
                '${insertCupomCabData.serieecf_cupom}',
                'C',
                ${insertCupomCabData.coo_cupom},
                0,
                0,
                0,
                0,
                '',
                0,
                '${insertCupomCabData.dataaltera}',
                'V',
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                '59',
                '1',
                '${insertCupomCabData.tpamb}',
                '1',
                '1',
                '1',
                '1',
                '${insertCupomCabData.chave}',
                'EVENTO DE CANCELAMENTO SAT',
                '${insertCupomCabData.qrcode}',
                '${insertCupomCabData.protocolo}',
                'SAT',
                '',
                '${insertCupomCabData.datahora_autorizacao}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const cupomCab3 = await useDB({
        query: `select id_cupomcab from ecf_cupomcab where loja_fk=${idLoja}  and chave='${chave}' and status_cupom in ('F','I','D','C') and protocolo is not null and protocolo!='' `
    });

    const insertCupomCab2 = await useDB({
        query: `INSERT INTO public.ecf_cupomcab( 
            id_cupomcab, 
            loja_fk, 
            movimento_fk, 
            totalitens_cupom,  
            totalbruto_cupom, 
            totalliquido_cupom, 
            ccf_cupom, 
            datahora_cupom, 
            serieecf_cupom, 
            status_cupom, 
            coo_cupom, 
            desconto_cupomcab, 
            acrescimo_cupomcab,  
            comissao_cupomcab, 
            usuario_cupom, 
            hash_cupom, 
            usuarioaltera,  
            dataaltera, 
            tipo,  
            vtrib, 
            frete, 
            pis, 
            cofins,  
            bcicms, 
            icms, 
            bcst, 
            st, 
            modelo, 
            tpimp, 
            tpamb, 
            tpemiss, 
            finalidade,  
            indfinal, 
            indpress, 
            chave, 
            natureza,  
            qrcode, 
            protocolo,  
            tipoequip, 
            cdv, 
            datahora_autorizacao) VALUES (
                ${idCupomCabIdc[0].idc},
                ${insertCupomCabData2.loja_fk},
                ${insertCupomCabData2.movimento_fk},
                ${insertCupomCabData2.totalitens_cupom},
                ${insertCupomCabData2.totalbruto_cupom},
                ${insertCupomCabData2.totalliquido_cupom},
                ${insertCupomCabData2.ccf_cupom},
                '${insertCupomCabData2.datahora_cupom}',
                '${insertCupomCabData2.serieecf_cupom}',
                '${insertCupomCabData2.status_cupom}',
                ${insertCupomCabData2.coo_cupom},
                ${insertCupomCabData2.desconto_cupomcab},
                ${insertCupomCabData2.acrescimo_cupomcab},
                ${insertCupomCabData2.comissao_cupomcab},
                ${insertCupomCabData2.usuario_cupom},
                '${insertCupomCabData2.hash_cupom}',
                ${insertCupomCabData2.usuarioaltera},
                '${insertCupomCabData2.dataaltera}',
                '${insertCupomCabData2.tipo}',
                ${insertCupomCabData2.vtrip},
                ${insertCupomCabData2.frete},
                ${insertCupomCabData2.pis},
                ${insertCupomCabData2.cofins},
                ${insertCupomCabData2.bcicms},
                ${insertCupomCabData2.icms},
                ${insertCupomCabData2.bcst},
                ${insertCupomCabData2.st},
                '${insertCupomCabData2.modelo}',
                '${insertCupomCabData2.tpimp}',
                '${insertCupomCabData2.tpamb}',
                '${insertCupomCabData2.tpemiss}',
                '${insertCupomCabData2.finalidade}',
                '${insertCupomCabData2.indfinal}',
                '${insertCupomCabData2.indpress}',
                '${insertCupomCabData2.chave}',
                '${insertCupomCabData2.natureza}',
                '${insertCupomCabData2.qrcode}',
                '${insertCupomCabData2.protocolo}',
                '${insertCupomCabData2.tipoequip}',
                '${insertCupomCabData2.cdv}',
                '${insertCupomCabData2.datahora_autorizacao}');`
    }).then(() => {
        statusInsert2 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert2 = err.message;
    });

    const idCupomCabTipoPagto = await useDB({
        query: `SELECT max(id_cupomcab_tipopagto) as idc FROM public.ecf_cupomcab_tipopagto  where loja_fk=${idLoja}`
    });

    const insertCupomCabTipoPagto = await useDB({
        query: `INSERT INTO public.ecf_cupomcab_tipopagto( 
            id_cupomcab_tipopagto, 
            loja_fk, 
            cupomcab_fk, 
            tipopagto_fk, 
            valorpago,    
            hash_cupomcabtipopagto, 
            usuarioaltera, 
            dataaltera, 
            troco) VALUES (
                ${idCupomCabTipoPagto[0].idc},
                ${insertCupomCabTipoPagtoData.loja_fk},
                ${insertCupomCabTipoPagtoData.cupomcab_fk},
                ${insertCupomCabTipoPagtoData.tipopagto_fk}, 
                ${insertCupomCabTipoPagtoData.valorpago},  
                '', 
                0, 
                '${insertCupomCabTipoPagtoData.dataaltera}',
                ${insertCupomCabTipoPagtoData.troco} );`
    }).then(() => {
        statusInsert4 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert4 = err.message;
    });

    const idCartaoMov = await useDB({
        query: `SELECT max(id_cartaomov) as idc  FROM public.ecf_cartaomov  where loja_fk=${idLoja}`
    });

    const insertCartaoMov = await useDB({
        query: `INSERT INTO public.ecf_cartaomov(	
            id_cartaomov, 
            loja_fk, 
            cupomcab_fk, 
            cartao_fk, 
            tipocartao_cartmov, 
            valorbruto_cartmov,  
            valorliquido_cartmov, 
            dataemissao_cartmov, 
            datavencto_cartmov, 
            usuarioaltera, 
            dataaltera, 
            status_cartmov, 
            numdoctrans_cartmov) VALUES (
                ${idCartaoMov[0].idc}, 
                ${insertCartaoMovData.loja_fk}, 
                ${insertCartaoMovData.cupomcab_fk}, 
                ${insertCartaoMovData.cartao_fk},
                '${insertCartaoMovData.tipocartao_cartmov}', 
                ${insertCartaoMovData.valorbruto_cartmov},  
                ${insertCartaoMovData.valorliquido_cartmov},
                '${insertCartaoMovData.dataemissao_cartmov}', 
                '${insertCartaoMovData.datavencto_cartmov}', 
                ${insertCartaoMovData.usuarioaltera}, 
                '${insertCartaoMovData.dataaltera}',
                '${insertCartaoMovData.status_cartmov}',
                '${insertCartaoMovData.numdoctrans_cartmov}')`
    }).then(() => {
        statusInsert5 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert5 = err.message;
    });

    const idCupomCabCliente = await useDB({
        query: ` SELECT max(id_cupomcab_cliente)+1 as idc  FROM public.ecf_cupomcab_cliente  where loja_fk=${idLoja}`
    });

    const cliente = await useDB({
        query: `select * from Cd_Cliente where cpfcnpj_Cli='${cnpjCli}'`
    });

    const insertCupomCabCliente = await useDB({
        query: `INSERT INTO public.ecf_cupomcab_cliente( 
            id_cupomcab_cliente, 
            loja_fk, 
            cupomcab_fk, 
            nome, 
            cpfcnpj, 
            endereco,  
            numeroend, 
            bairro, 
            cep, 
            cidade, 
            uf, 
            telefone, 
            usuarioaltera, 
            dataaltera, 
            ie,
            indiedest,
            email, 
            complemento, 
            codibge,
            cod_cliente,
            cod_empresa)VALUES (
                ${idCupomCabCliente[0].idc}, 
                ${insertCupomCabClienteData.loja_fk},
                ${insertCupomCabClienteData.cupomcab_fk},
                '${insertCupomCabClienteData.nome}', 
                '${insertCupomCabClienteData.cpfcnpj}', 
                '${insertCupomCabClienteData.endereco}', 
                '${insertCupomCabClienteData.numeroend}', 
                '${insertCupomCabClienteData.bairro}', 
                '${insertCupomCabClienteData.cep}', 
                '${insertCupomCabClienteData.cidade}', 
                '${insertCupomCabClienteData.uf}', 
                '${insertCupomCabClienteData.telefone}', 
                0, 
                '${insertCupomCabClienteData.dataaltera}', 
                '${insertCupomCabClienteData.ie}',  
                '${insertCupomCabClienteData.indiedest}', 
                '${insertCupomCabClienteData.email}', 
                '${insertCupomCabClienteData.complemento}',
                '${insertCupomCabClienteData.codibge}', 
                ${insertCupomCabClienteData.cod_cliente},
                ${insertCupomCabClienteData.cod_empresa});`
    }).then(() => {
        statusInsert6 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert6 = err.message;
    });

    const idContasReceber = await useDB({
        query: `SELECT max(id_contasreceber) as idc  FROM public.fn_contasreceber  where loja_fk=${idLoja}`
    });

    const insertContasReceber = await useDB({
        query: `INSERT INTO public.fn_contasreceber(  
            id_contasreceber, 
            loja_fk, 
            cupomcab_fk,  
            cliente_fk, 
            numdoc_contasreceber, 
            numparcela_contasreceber, 
            totalparcelas_contasreceber,   
            datalanc_contasreceber, 
            datavenc_contasreceber,   
            valorparcela_contasreceber, 
            valordesconto_contasreceber, 
            valormulta_contasreceber,   
            valorjuros_contasreceber, 
            valorpago_contasreceber, 
            valoradicional_contasreceber,   
            valorrestante_contasreceber, 
            valortotal_contasreceber,   
            statusreceb_contasreceber,
            usuarioaltera,   
            dataaltera,   
            formapagto_contasreceber)  VALUES (
                ${idContasReceber[0].idc},
                ${insertContasReceberData.loja_fk},
                ${insertContasReceberData.cupomcab_fk}, 
                ${insertContasReceberData.cliente_fk},
                ${insertContasReceberData.numdoc_contasreceber},
                1,
                1 , 
                '${insertContasReceberData.datalanc_contasreceber}',
                '${insertContasReceberData.datavenc_contasreceber}', 
                ${insertContasReceberData.valorparcela_contasreceber},
                0,
                0,
                0,
                0,
                0, 
                ${insertContasReceberData.valorrestante_contasreceber}, 
                ${insertContasReceberData.valortotal_contasreceber} ,
                'P',
                0, 
                '${insertContasReceberData.dataaltera}',
                'D');`
    }).then(() => {
        statusInsert7 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert7 = err.message;
    });

    const idCupomDetProd = await useDB({
        query: ` SELECT max(id_cupomdet_prod) as idc  FROM public.ecf_cupomdet_prod where loja_fk=${idLoja}`
    });

    const idCupomDetBico = await useDB({
        query: ` SELECT max(id_cupomdet_bico) as idc  FROM public.ecf_cupomdet_bico  where loja_fk=${l.getIdLoja()}`
    });

    const produto = await useDB({
        query: `select * from Cd_Produto where id_Prod=${idProd} `
    });

    const numeroCodBar = await useDB({
        query: `SELECT  numero_codbar FROM public.cd_codigobarras where produto_fk=${idProd} and ativo_codbar='S'`
    });

    const insertCupomDetProd = await useDB({
        query: `INSERT INTO public.ecf_cupomdet_prod(  
            id_cupomdet_prod, 
            loja_fk,  
            produto_fk, 
            cupomcab_fk,  
            seqitem, 
            qtde_cupitem, 
            valorunit_cupitem, 
            valororig_cupitem,  
            valorfinal_cupitem, 
            promo_cupitem, 
            percentldesconto_cupitem,  
            valordesconto_cupitem, 
            cfop_cupitem, 
            csticms_cupitem, 
            cstpiscofins_cupitem,  
            natreceita_cupitem, 
            valoricms_cupitem, 
            comissao_cupitem, 
            valorcomissao_cupitem,  
            percentlacrescimo_cupitem, 
            valoracrescimo_cupitem, 
            codclassfiscal_cupitem,  
            unid_cupitem, 
            ncm_cupitem, 
            serie_cupitem, 
            classeterapeutica_cupitem,   
            codbarra_cupitem, 
            status_cupitem,  
            hash_cupitem, 
            usuarioaltera, 
            dataaltera, 
            estoqueantprod_cupitem,  
            registromsprod_cupitem,  
            descontoglobal_cupitem,  
            modbc, 
            modst, 
            orig, 
            cest, 
            redicms, 
            bcicms, 
            aliqicms, 
            mva, 
            redst,  
            bcst, 
            aliqst, 
            st, 
            frete, 
            vtrib, 
            bcpis, 
            aliqpis, 
            pis, 
            bccofins,  
            aliqcofins, 
            cofins, 
            acrescimoglobal)    VALUES (
                ${idCupomDetProd[0].idc}, 
                ${insertCupomDetProdData.loja_fk}, 
                ${insertCupomDetProdData.produto_fk}, 
                ${insertCupomDetProdData.cupomcab_fk},    
                ${insertCupomDetProdData.seqitem}, 
                ${insertCupomDetProdData.qtde_cupitem}, 
                ${insertCupomDetProdData.valorunit_cupitem},
                ${insertCupomDetProdData.valororig_cupitem},  
                ${insertCupomDetProdData.valorfinal_cupitem}, 
                0,
                0,  
                0, 
                ${insertCupomDetProdData.cfop_cupitem}, 
                ${insertCupomDetProdData.csticms_cupitem}, 
                ${insertCupomDetProdData.cstpiscofins_cupitem},   
                ${insertCupomDetProdData.natreceita_cupitem}, 
                ${insertCupomDetProdData.valoricms_cupitem},
                0, 
                0,   
                0, 
                ${insertCupomDetProdData.valoracrescimo_cupitem},
                '${insertCupomDetProdData.codclassfiscal_cupitem}',   
                '${insertCupomDetProdData.unid_cupitem}', 
                '${insertCupomDetProdData.ncm_cupitem}', 
                '', 
                '${insertCupomDetProdData.classeterapeutica_cupitem}',   
                '${insertCupomDetProdData, codbarra_cupitem}', 
                'F',   
                '', 
                0, 
                '${insertCupomDetProdData.dataaltera}', 
                0,   
                '${insertCupomDetProdData.registromsprod_cupitem}', 
                ${insertCupomDetProdData.descontoglobal_cupitem},   
                '04', 
                '04', 
                '0',
                '${insertCupomDetProdData.cest}', 
                0, 
                ${insertCupomDetProdData.bcicms},
                ${insertCupomDetProdData.aliqicms},
                0, 
                0,     
                0, 
                0, 
                0, 
                0, 
                0, 
                ${insertCupomDetProdData.bcpis},
                ${insertCupomDetProdData.aliqpis}, 
                ${insertCupomDetProdData.pis},
                ${insertCupomDetProdData.bccofins},   
                ${insertCupomDetProdData.aliqcofins}, 
                ${insertCupomDetProdData.cofins}, 
                0);`

    }).then(() => {
        statusInsert8 = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert8 = err.message;
    });

    const bico = await useDB({
        query: `select * from Cd_Bico where numero_Bic=${numeroBico} and loja_Fk=${idLoja} `
    });

    const insertCupomDetBico = await useDB({
        query: `INSERT INTO public.ecf_cupomdet_bico(            
            id_cupomdet_bico, 
            loja_fk, 
            bico_fk, 
            cupomcab_fk, 
            seqitem, 
            qtde_cupdetbic,             
            valorunit_cupdetbic, 
            valororig_cupdetbic, 
            valorfinal_cupdetbic,             
            promo_cupdetbic, 
            percentldesconto_cupdetbic, 
            valordesconto_cupdetbic,             
            cfop_cupdetbic,
            csticms_cupdetbic, 
            cstpis_cupdetbic, 
            cstcofins_cupdetbic,             
            natreceita_cupdetbic, 
            valoricms_cupdetbic, 
            comissao_cupdetbic,             
            valorcomissao_cupdetbic, 
            percentlacrescimo_cupdetbic, 
            valoracrescimo_cupdetbic,             
            codclassfiscal, 
            unid_cupdetbic, 
            ncm_cupdetbic, 
            serie_cupdetbic,             
            status_cupdetbic, 
            hash_cupdetbic,             
            usuarioaltera, 
            dataaltera, 
            encerrante, 
            estoqueantbico_cupitem,             
            descontoglobal_cupitem, 
            modbc, 
            modst, 
            orig, 
            cest, 
            redicms, 
            bcicms,             
            aliqicms, 
            mva, 
            redst, 
            bcst, 
            aliqst, 
            st, 
            frete, 
            vtrib, 
            bcpis,             
            aliqpis, 
            pis, 
            bccofins, 
            aliqcofins, 
            cofins, 
            acrescimoglobal)    VALUES (
                ${idCupomDetBico[0].idc}, 
                ${insertCupomDetBicoData.loja_fk},  
                ${insertCupomDetBicoData.bico_fk},  
                ${insertCupomDetBicoData.cupomcab_fk}, 
                ${insertCupomDetBicoData.seqitem},  
                ${insertCupomDetBicoData.qtde_cupdetbic},             
                ${insertCupomDetBicoData.valorunit_cupdetbic}, 
                ${insertCupomDetBicoData.valororig_cupdetbic}, 
                ${insertCupomDetBicoData.valorfinal_cupdetbic},             
                0, 
                0, 
                0,              
                ${insertCupomDetBicoData.cfop_cupdetbic},  
                ${insertCupomDetBicoData.csticms_cupdetbic},  
                ${insertCupomDetBicoData.cstpis_cupdetbic},   
                ${insertCupomDetBicoData.cstcofins_cupdetbic},            
                ${insertCupomDetBicoData.natreceita_cupdetbic}, 
                ${insertCupomDetBicoData.valoricms_cupdetbic}, 
                0,             
                0, 
                0,
                ${insertCupomDetBicoData.valoracrescimo_cupdetbic},             
                '${insertCupomDetBicoData.codclassfiscal}',
                '${insertCupomDetBicoData.unid_cupdetbic}',
                '${insertCupomDetBicoData.ncm_cupdetbic}', 
                '',             
                'F', 
                '',             
                0, 
                '${insertCupomDetBicoData.dataaltera}', 
                0, 
                0,             
                ${insertCupomDetBicoData.descontoglobal_cupitem},
                '04', 
                '04', 
                '0', 
                '${insertCupomDetBicoData.cest}', 
                0,
                ${insertCupomDetBicoData.bcicms},             
                ${insertCupomDetBicoData.aliqicms},
                0,
                0, 
                0, 
                0, 
                0, 
                0, 
                0, 
                ${insertCupomDetBicoData.bcpis},             
                ${insertCupomDetBicoData.aliqpis}, 
                ${insertCupomDetBicoData.pis},
                ${insertCupomDetBicoData.bccofins},
                ${insertCupomDetBicoData.aliqcofins},
                ${insertCupomDetBicoData.cofins}, 
                0);`

    }).then(() => {
        statusInsert9 = 'Registro  com sucesso';
    }).catch((err) => {
        statusInsert9 = err.message;
    });


    return { code: 200, results: { cupomCab, updateCupomCab, updateCupomDetProd, updateCupomDetBico, estacao, cupomCab2, idCupomCabIdc, movimento, movimento2, movimento3, statusInsert, cupomCab3, statusInsert2, idCupomCabTipoPagto, statusInsert4, idCartaoMov, statusInsert5, idCupomCabCliente, cliente, statusInsert6, idContasReceber, statusInsert7, idCupomDetProd, idCupomDetBico, produto, numeroCodBar, bico, statusInsert8, statusInsert9 } }

};

const consultarxmls = async function ({ statusCupom, numEstacao, idLoja, dataInicial, dataFinal }) {

    const cupomCab = await useDB({
        query: ` select chave,coo_Cupom,status_Cupom,protocolo,ccf_Cupom ,datahora_Cupom from Ecf_Cupomcab, cf_estacao where tipoequip='NFCE' and status_Cupom in ('${statusCupom}') and protocolo!='' and protocolo is not null and cf_Estacao.num_Estacao=${numEstacao} and  ecf_Cupomcab.loja_Fk=${idLoja} and (cast(datahora_Cupom as date) between '${dataInicial}'  and '${dataFinal}') order by datahora_Cupom asc,coo_Cupom asc `
    });

    return { code: 200, results: { cupomCab } }

};


const gerarxml = async function ({ idLoja, idCupomCab }) {

    const cupomCab = await useDB({
        query: ` select chave,coo_Cupom,status_Cupom  from Ecf_Cupomcab where tipoequip='NFCE' and status_Cupom='O'  and  loja_Fk=${idLoja} and  id_Cupomcab=${idCupomCab}`
    });

    return { code: 200, results: { cupomCab } }

};

const montacupom = async function ({ chave, idLoja, idCupomCab, idDepCli, idUsuario }) {

    const cupomCab = await useDB({
        query: `select * from Ecf_Cupomcab where chave='${chave}'  and loja_fk=${idLoja} and status_Cupom  in ('F','O') `
    });

    const cupomDetProd = await useDB({
        query: `select * from Ecf_Cupomdet_Prod where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab}  order by seqitem asc`
    });

    const cupomDetBico = await useDB({
        query: `select * from Ecf_Cupomdet_Bico where loja_Fk=${idLoja} and cupomcab_fk=${idCupomCab}   order by seqitem asc`
    });

    const cupomCabVeiculo = await useDB({
        query: `select * from Ecf_Cupomcab_Veiculo where loja_Fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const cupomCabCliente = await useDB({
        query: `select * from Ecf_Cupomcab_Cliente where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const dependenteCliente = await useDB({
        query: `select * from  Cd_Dependentecliente where id_Depcli=${idDepCli}`
    });

    const cupomCabTipoPag = await useDB({
        query: `select * from Ecf_Cupomcab_Tipopagto where loja_Fk=${idLoja} and cupomcab_fk=${idCupomCab}  and (valorpago>0 or troco>0)`
    });

    const cartaoMov = await useDB({
        query: `select * from Ecf_Cartaomov where loja_Fk=${idLoja} and cupomcab_fk=${idCupomCab} `
    });

    const usuario = await useDB({
        query: `select * from Cd_Usuario where id_Usuario=${idUsuario} `
    });

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { cupomCab, cupomDetProd, cupomDetBico, cupomCabVeiculo, cupomCabCliente, dependenteCliente, cupomCabTipoPag, cartaoMov, usuario, configNfe } }

};

const consultarxmlsSAT = async function ({ statusCupom, numEstacao, idLoja, dataInicial, dataFinal }) {

    const cupomCab = await useDB({
        query: ` select chave,coo_Cupom,status_Cupom  from Ecf_Cupomcab, cf_estacao where tipoequip='SAT' and status_Cupom in ('${statusCupom}') and protocolo!='' and protocolo is not null and cf_Estacao.num_Estacao=${numEstacao} and  ecf_Cupomcab.loja_Fk=${idLoja} and (cast(datahora_Cupom as date) between '${dataInicial}}'  and '${dataFinal}') order by datahora_Cupom asc,coo_Cupom asc `
    });

    return { code: 200, results: { cupomCab } }

};

const itensnfe = async function ({ idLoja, idCupomDet, idProd }) {

    const cupomDetLoteMed = await useDB({
        query: `SELECT numero_lote,  datafrabricacao_lote,  validade_lote ,  qtdevendida_lotemed, registroms_prod  FROM public.ecf_cupomdet_lotemed as m  inner join cd_lote as l on l.id_lote=m.lote_fk  inner join cd_produto as p on l.produto_fk=p.id_prod  where m.loja_fk=${idLoja}  and cupomdet_fk=${idCupomDet} and l.loja_fk=${idLoja} `
    });

    const anpComb = await useDB({
        query: `  SELECT  codigo_anpcomb, descricao_anpcomb  FROM public.cd_anpcombustivel as a  inner join cd_produto as p on p.anpcombustivel_fk =a.id_anpcombustivel  where p.id_prod=${idProd} `
    });

    return { code: 200, results: { cupomDetLoteMed, anpComb } }

};

const cancelarnfce = async function ({ idLoja, idCupomCab, protocolo, insertNfeEventoData }) {

    let statusInsert;

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const idNfeEvento = await useDB({
        query: `select id from nfe_evento  where cupomcab_fk=${idCupomCab}  and loja_fk=${idLoja} and protocolo='${protocolo}' `
    });

    const idMaxNfeEvento = await useDB({
        query: `select max(id)+1 as idc from nfe_evento  where loja_fk=${idLoja}`
    });

    const idNfeEventoCancel = await useDB({
        query: `select id from nfe_evento  where loja_fk=${idLoja}  and protocolo='${protocolo}' and tipo='cancelamento'  and cupomcab_fk=${idCupomCab}   `
    });

    const insertNfeEvento = await useDB({
        query: ` INSERT INTO public.nfe_evento(  
            id, 
            loja_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno,  
            tipo, 
            usuarioaltera, 
            dataaltera, 
            cupomcab_fk)VALUES (
                ${idMaxNfeEvento[0].idc}, 
                ${insertNfeEventoData.loja_fk}, 
                '${insertNfeEventoData.protocolo}',  
                'veja o motivo no site da nfce', 
                'Evento registrado e vinculado a NF-e',  
                'cancelamento', 
                0, 
                '${insertNfeEventoData.dataaltera}', 
                ${insertNfeEventoData.cupomcab_fk});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const deleteNfeEvento = await useDB({
        query: `DELETE from nfe_evento  WHERE loja_fk=${idLoja}   and cupomcab_fk=${idCupomCab}  AND tipo='cancelamento'  AND protocolo!='${protocolo}'`
    });

    const evento = await useDB({
        query: `select * from Nfe_Evento where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab}   order by dataaltera  asc`
    });

    return { code: 200, results: { configNfe, idNfeEvento, idMaxNfeEvento, idNfeEventoCancel, statusInsert, deleteNfeEvento, evento } }

};

const situacaonfe = async function ({ idLoja, idCupomCab, protocolo, insertNfeEventoData }) {

    let statusInsert;

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    const idNfeEvento = await useDB({
        query: `select id from nfe_evento  where cupomcab_fk=${idCupomCab}  and loja_fk=${idLoja} and protocolo='${protocolo}' `
    });

    const idMaxNfeEvento = await useDB({
        query: `select max(id)+1 as idc from nfe_evento  where loja_fk=${idLoja}`
    });

    const idNfeEventoCancel = await useDB({
        query: `select id from nfe_evento  where loja_fk=${idLoja}  and protocolo='${protocolo}' and tipo='cancelamento'  and cupomcab_fk=${idCupomCab}   `
    });

    const insertNfeEvento = await useDB({
        query: ` INSERT INTO public.nfe_evento(  
            id, 
            loja_fk, 
            protocolo, 
            motivo_evento, 
            motivo_retorno,  
            tipo, 
            usuarioaltera, 
            dataaltera, 
            cupomcab_fk)VALUES (
                ${idMaxNfeEvento[0].idc}, 
                ${insertNfeEventoData.loja_fk}, 
                '${insertNfeEventoData.protocolo}',  
                'veja o motivo no site da nfce', 
                'Evento registrado e vinculado a NF-e',  
                'cancelamento', 
                0, 
                '${insertNfeEventoData.dataaltera}', 
                ${insertNfeEventoData.cupomcab_fk});`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    const deleteNfeEvento = await useDB({
        query: `DELETE from nfe_evento  WHERE loja_fk=${idLoja}   and cupomcab_fk=${idCupomCab}  AND tipo='cancelamento'  AND protocolo!='${protocolo}'`
    });

    const evento = await useDB({
        query: `select * from Nfe_Evento where loja_fk=${idLoja} and cupomcab_fk=${idCupomCab}   order by dataaltera  asc`
    });

    return { code: 200, results: { configNfe, idNfeEvento, idMaxNfeEvento, idNfeEventoCancel, statusInsert, deleteNfeEvento, evento } }

};

const geraxmlcancelado = async function ({ idLoja, chave }) {

    const cupomCab = await useDB({
        query: `SELECT n.protocolo as p2,motivo_evento,n.dataaltera,chave,cab.protocolo as p1 FROM nfe_evento AS n INNER JOIN ecf_cupomcab AS cab ON cab.id_cupomcab=n.cupomcab_fk WHERE n.loja_fk=${idLoja} AND cab.loja_fk=${idLoja} AND n.tipo='cancelamento' AND status_cupom='C' AND cab.protocolo IS NOT NULL AND n.protocolo IS NOt NULL AND chave='${chave}'`
    });

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { cupomCab, configNfe } }

};

const geraxmlinutilizado = async function ({ idLoja, dataHora, cooCupom, ccfCupom }) {

    const cupomCab = await useDB({
        query: `SELECT protocolo,coo_cupom,ccf_cupom,datahora_cupom  from ecf_cupomcab AS cab WHERE  cab.loja_fk=${idLoja} AND status_cupom='I' AND cab.protocolo IS NOT NULL and cast(cab.datahora_cupom as date)='${dataHora}'  AND coo_cupom=${cooCupom}  and ccf_cupom=${ccfCupom} `
    });

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { cupomCab, configNfe } }

};

module.exports = {
    listaritens,
    consultar,
    processarXML,
    processarXMLsat,
    consultarxmls,
    gerarxml,
    montacupom,
    consultarxmlsSAT,
    itensnfe,
    cancelarnfce,
    situacaonfe,
    geraxmlcancelado,
    geraxmlinutilizado
}