const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const gerarm = async function ({ }) {

    const usuario = await useDB({
        query: "SELECT * FROM cd_usuario"
    });

    return { code: 200, results: { usuario } }

};

const pegarvendasprazo = async function ({ idLoja, dataInicial, dataFinal, idCupomCab, numSerie, dataMovimento }) {

    const cupomCab = await useDB({
        query: `SELECT id_cupomcab,  cast(totalitens_cupom as integer),trunc(totalbruto_cupom,2) as tb,trunc(totalliquido_cupom,2) as tl, ccf_cupom,cast(datahora_cupom as date), serieecf_cupom, coo_cupom,tipo,cab.usuarioaltera,tipopagto_fk, codigo_controle,trunc( desconto_cupomcab,2) as desc,placa,status_cupom,tipoequip,chave,protocolo FROM public.ecf_cupomcab as cab left join ecf_cupomcab_tipopagto as tp on (tp.cupomcab_fk=cab.id_cupomcab and tp.loja_fk=cab.loja_fk)  left join ecf_cupomcab_cliente as cc on (cc.cupomcab_fk=cab.id_cupomcab and cc.loja_fk=cab.loja_fk)  left join cd_cliente as cl on cc.cod_cliente=cl.id_cli  left join ecf_cupomcab_veiculo as v on (v.cupomcab_fk=cab.id_cupomcab and v.loja_fk=cab.loja_fk)  where cab.loja_fk=${idLoja}  and tipo ='P' and status_cupom in ('F','C','I','D')  and (datahora_cupom between '${dataInicial}'  and '${dataFinal}') and coo_cupom!=0   order by coo_cupom asc`
    });

    const cupomDetBico = await useDB({
        query: `SELECT sum(valorfinal_cupdetbic)  FROM public.ecf_cupomdet_bico  where loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab}`
    });

    const cupomDetProd = await useDB({
        query: `SELECT sum(valorfinal_cupitem)  FROM public.ecf_cupomdet_prod  where loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab} `
    });

    const cupomCab2 = await useDB({
        query: `SELECT  sum(totalliquido_cupom) as tt,sum(valorpago) as pp  FROM public.ecf_cupomcab as cab  inner join ecf_cupomcab_tipopagto as p on (p.cupomcab_fk=cab.id_cupomcab and p.loja_fk=cab.loja_fk)  where cab.loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab}  and troco=0 `
    });

    const reducaoCab = await useDB({
        query: `SELECT crz_docr02, cro_docr02 FROM public.ecf_reducaozcab_r02  where loja_fk=${idLoja}  and numserieecf_docr02='${numSerie}' and cast(datamovimento_docr02 as date)='${dataMovimento}'`
    });

    const classFiscalImpr = await useDB({
        query: `SELECT  nbm,seqitem,trunc(qtde_cupitem,3) as qtd,trunc(valorunit_cupitem,3) as vu, trunc(valororig_cupitem,3) as vo, unid_cupitem,seqitem as ab,seqitem as ad,codlinha, csticms_cupitem,trunc(valorfinal_cupitem,3) as vf,seqitem as ac,p.descricao_prod,(SELECT codcf  FROM public.lf_classfiscal_impressora  where  classfiscal_fk=tt.classfiscal_fk  and loja_fk=${idLoja} limit 1) as codcf,p.piscofins,descricao_classfic,icms_classfic,valordesconto_cupitem, cstpiscofins_cupitem,status_cupitem FROM public.ecf_cupomdet_prod as det inner join cd_produto as p on p.id_prod=det.produto_fk inner join cd_tributacaoicms as tt on tt.id=p.tributacaoicms_fk inner join lf_classfiscal as lf on lf.id=tt.classfiscal_fk where det.loja_fk=${idLoja} and cupomcab_fk=${idCupomCab}  and status_cupitem in ('F','O','C')  order by seqitem asc`
    });

    const classFiscalImpr2 = await useDB({
        query: `SELECT  nbm,seqitem,trunc(qtde_cupdetbic,3) as qtd,trunc(valorunit_cupdetbic,3) as vu, trunc( valororig_cupdetbic,3) as vo,  unid_cupdetbic,seqitem as ab,seqitem as ad,codlinha, csticms_cupdetbic,trunc( valorfinal_cupdetbic ,3) as vf, seqitem as ac,seqitem as descricao,(SELECT codcf   FROM public.lf_classfiscal_impressora   where  classfiscal_fk=tt.classfiscal_fk  and loja_fk=${idLoja} limit 1) as codcf,seqitem  as piscofins ,descricao_classfic,icms_classfic,valordesconto_cupdetbic,  cstpis_cupdetbic,status_cupdetbic FROM public.ecf_cupomdet_bico as det  inner join cd_bico as b on b.id_bico=det.bico_fk  inner join cd_tanque as t on t.id_tanque=b.tanque_fk  inner join cd_tipocombustivel as p on p.id_tipocombustivel=t.tipocombustivel_fk  inner join cd_tributacaoicms as tt on tt.id=p.tributacaoicms_fk  inner join lf_classfiscal as lf on lf.id=tt.classfiscal_fk  where det.loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab} and status_cupdetbic in ('F','O','C') and b.loja_fk=${idLoja} and t.loja_fk=${idLoja} order by seqitem asc`
    });


    return { code: 200, results: { cupomCab, cupomDetBico, cupomDetProd, cupomCab2, reducaoCab, classFiscalImpr, classFiscalImpr2 } }

};

const pegarvendasvista = async function ({ idLoja, dataInicial, dataFinal, idCupomCab, numSerie, dataMovimento }) {

    const cupomCab = await useDB({
        query: `SELECT id_cupomcab,  cast(totalitens_cupom as integer),trunc(totalbruto_cupom,2) as tb,trunc(totalliquido_cupom,2) as tl, ccf_cupom,cast(datahora_cupom as date), serieecf_cupom, coo_cupom,tipo,cab.usuarioaltera,tipopagto_fk, codigo_controle,trunc( desconto_cupomcab,2) as desc,placa,status_cupom,tipoequip,chave,protocolo FROM public.ecf_cupomcab as cab left join ecf_cupomcab_tipopagto as tp on (tp.cupomcab_fk=cab.id_cupomcab and tp.loja_fk=cab.loja_fk)  left join ecf_cupomcab_cliente as cc on (cc.cupomcab_fk=cab.id_cupomcab and cc.loja_fk=cab.loja_fk)  left join cd_cliente as cl on cc.cod_cliente=cl.id_cli  left join ecf_cupomcab_veiculo as v on (v.cupomcab_fk=cab.id_cupomcab and v.loja_fk=cab.loja_fk)  where cab.loja_fk=${idLoja}  and tipo ='V' and status_cupom in ('F','C','I','D')  and (datahora_cupom between '${dataInicial}'  and '${dataFinal}') and coo_cupom!=0   order by coo_cupom asc`
    });

    const cupomDetBico = await useDB({
        query: `SELECT sum(valorfinal_cupdetbic)  FROM public.ecf_cupomdet_bico  where loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab}`
    });

    const cupomDetProd = await useDB({
        query: `SELECT sum(valorfinal_cupitem)  FROM public.ecf_cupomdet_prod  where loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab} `
    });

    const cupomCab2 = await useDB({
        query: `SELECT  sum(totalliquido_cupom) as tt,sum(valorpago) as pp  FROM public.ecf_cupomcab as cab  inner join ecf_cupomcab_tipopagto as p on (p.cupomcab_fk=cab.id_cupomcab and p.loja_fk=cab.loja_fk)  where cab.loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab}  and troco=0 `
    });

    const reducaoCab = await useDB({
        query: `SELECT crz_docr02, cro_docr02 FROM public.ecf_reducaozcab_r02  where loja_fk=${idLoja}  and numserieecf_docr02='${numSerie}' and cast(datamovimento_docr02 as date)='${dataMovimento}'`
    });

    const classFiscalImpr = await useDB({
        query: `SELECT  nbm,seqitem,trunc(qtde_cupitem,3) as qtd,trunc(valorunit_cupitem,3) as vu, trunc(valororig_cupitem,3) as vo, unid_cupitem,seqitem as ab,seqitem as ad,codlinha, csticms_cupitem,trunc(valorfinal_cupitem,3) as vf,seqitem as ac,p.descricao_prod,(SELECT codcf  FROM public.lf_classfiscal_impressora  where  classfiscal_fk=tt.classfiscal_fk  and loja_fk=${idLoja} limit 1) as codcf,p.piscofins,descricao_classfic,icms_classfic,valordesconto_cupitem, cstpiscofins_cupitem,status_cupitem FROM public.ecf_cupomdet_prod as det inner join cd_produto as p on p.id_prod=det.produto_fk inner join cd_tributacaoicms as tt on tt.id=p.tributacaoicms_fk inner join lf_classfiscal as lf on lf.id=tt.classfiscal_fk where det.loja_fk=${idLoja} and cupomcab_fk=${idCupomCab}  and status_cupitem in ('F','O','C')  order by seqitem asc`
    });

    const classFiscalImpr2 = await useDB({
        query: `SELECT  nbm,seqitem,trunc(qtde_cupdetbic,3) as qtd,trunc(valorunit_cupdetbic,3) as vu, trunc( valororig_cupdetbic,3) as vo,  unid_cupdetbic,seqitem as ab,seqitem as ad,codlinha, csticms_cupdetbic,trunc( valorfinal_cupdetbic ,3) as vf, seqitem as ac,seqitem as descricao,(SELECT codcf   FROM public.lf_classfiscal_impressora   where  classfiscal_fk=tt.classfiscal_fk  and loja_fk=${idLoja} limit 1) as codcf,seqitem  as piscofins ,descricao_classfic,icms_classfic,valordesconto_cupdetbic,  cstpis_cupdetbic,status_cupdetbic FROM public.ecf_cupomdet_bico as det  inner join cd_bico as b on b.id_bico=det.bico_fk  inner join cd_tanque as t on t.id_tanque=b.tanque_fk  inner join cd_tipocombustivel as p on p.id_tipocombustivel=t.tipocombustivel_fk  inner join cd_tributacaoicms as tt on tt.id=p.tributacaoicms_fk  inner join lf_classfiscal as lf on lf.id=tt.classfiscal_fk  where det.loja_fk=${idLoja}  and cupomcab_fk=${idCupomCab} and status_cupdetbic in ('F','O','C') and b.loja_fk=${idLoja} and t.loja_fk=${idLoja} order by seqitem asc`
    });


    return { code: 200, results: { cupomCab, cupomDetBico, cupomDetProd, cupomCab2, reducaoCab, classFiscalImpr, classFiscalImpr2 } }

};

const pegarcompras = async function ({ idLoja, dataInicial, dataFinal, idCupomCab }) {

    const compraCab = await useDB({
        query: `SELECT id_compracab, cab.loja_fk,numerodocfiscal_compracab dataentradasaida_compracab, valortotal_produtos_compracab, valortotal_compracab,f.ie_forn,t.placaveiculo,cab.usuarioaltera,cab.chaveacesso_compracab  FROM public.fn_compra_cabecalho as cab  inner join cd_fornecedor as f on f.id_forn=cab.fornecedor_fk  inner join fn_compra_transp as t on (t.compracab_fk=cab.id_compracab and t.loja_fk=cab.loja_fk)  where cab.loja_fk=${idLoja} and  status_compracab='F'  and (cast( dataentradasaida_compracab as date) between '${dataInicial}'  and '${dataFinal}') order by dataentradasaida_compracab asc`
    });

    const compraDetProd = await useDB({
        query: `SELECT  nbm,sequencia ,trunc(quantidade,3) as qtd,trunc(valorunitario,3) as vu, trunc(valorunitario,3) as vo, sigla_unid ,sequencia  as ab,sequencia  as ad,codlinha, cst_csosn,trunc(valortotalitem ,3) as vf,sequencia as ac,p.descricao_prod,codcf,p.piscofins ,descricao_classfic,icms_classfic,icms_classfic as desc,piscst,sequencia as status FROM public.fn_compra_detalhe as det inner join cd_produto as p on p.id_prod=det.produto_fk inner join cd_tributacaoicms as tt on tt.id=p.tributacaoicms_fk inner join lf_classfiscal as lf on lf.id=tt.classfiscal_fk inner join cd_unidade as u on u.id_unid=p.unidade_fk inner join lf_classfiscal_impressora as l on (l.classfiscal_fk=lf.id and l.loja_fk=det.loja_fk) where det.loja_fk=${idLoja} and compracab_fk=${idCupomCab} order by sequencia asc`
    });

    const compraDetTipoComb = await useDB({
        query: `SELECT  nbm,sequencia,trunc(quantidade,3) as qtd,trunc(valorunitario,3) as vu, trunc(valorunitario,3) as vo,  sigla_unid ,sequencia as ab,sequencia as ad,codlinha, cst_csosn,trunc(valortotalitem,3) as vf, sequencia as ac,sequencia as descricao,(SELECT codcf   FROM public.lf_classfiscal_impressora   where  classfiscal_fk=tt.classfiscal_fk  and loja_fk=${idLoja} limit 1) as codcf,sequencia  as piscofins ,descricao_classfic,icms_classfic,icms_classfic as desc,piscst,sequencia as status FROM public.fn_compra_detalhe as det  inner join cd_tipocombustivel as p on p.id_tipocombustivel=det.tipocombustivel_fk  inner join cd_tributacaoicms as tt on tt.id=p.tributacaoicms_fk  inner join lf_classfiscal as lf on lf.id=tt.classfiscal_fk  inner join cd_unidade as u on u.id_unid=p.unidade_fk  where det.loja_fk=${idLoja}  and compracab_fk=${idCupomCab} order by sequencia asc`
    });

    return { code: 200, results: { compraCab, compraDetProd, compraDetTipoComb } }

};

const pegarnfe = async function ({ idLoja, dataInicial, dataFinal, idNfeCab }) {

    const nfeCab = await useDB({
        query: `SELECT id_nfe_cabecalho, loja_fk, cliente_fk, numerodocfiscal_nfecab,  dataemissao_nfecab, chaveacesso_nfecab,valortotal_produtos_nfecab,valortotal_nfecab,infcomplementares_nfecab, statusnota_nfecab,usuarioaltera,tipooperacao_nfecab FROM public.nfe_cabecalho where statusnota_nfecab  in ('5','6','7')and loja_fk=${idLoja} and (cast(dataemissao_nfecab as date) between '${dataInicial}'  and '${dataFinal}') order by dataemissao_nfecab asc `
    });

    const CodControle = await useDB({
        query: `SELECT codigo_controle FROM public.nfe_cabecalho as cab inner join cd_cliente as c on c.id_cli=cab.cliente_fk where id_nfe_cabecalho=${idNfeCab}  and loja_fk=${idLoja} `
    });

    const nfeDetProd = await useDB({
        query: `SELECT  nbm,sequencia ,trunc(quantidade,3) as qtd,trunc(valorunitario,3) as vu, trunc(valorunitario,3) as vo,  sigla_unid ,sequencia  as ab,sequencia  as ad,codlinha, cst_csosn,trunc(valortotalitem ,3) as vf, sequencia as ac,p.descricao_prod,(SELECT codcf   FROM public.lf_classfiscal_impressora   where  classfiscal_fk=tt.classfiscal_fk  and loja_fk=${idLoja} limit 1) as codcf,p.piscofins,descricao_classfic,icms_classfic,icms_classfic as desc,piscst,sequencia as status,cfop FROM public.nfe_detalhe as det  inner join cd_produto as p on p.id_prod=det.produto_fk  inner join cd_tributacaoicms as tt on tt.id=p.tributacaoicms_fk  inner join lf_classfiscal as lf on lf.id=tt.classfiscal_fk  inner join cd_unidade as u on u.id_unid=p.unidade_fk  where det.loja_fk=${idLoja}  and nfecab_fk =${idNfeCab} order by sequencia asc`
    });

    const nfeDetTipoComb = await useDB({
        query: `SELECT  nbm,sequencia,trunc(quantidade,3) as qtd,trunc(valorunitario,3) as vu, trunc(valorunitario,3) as vo,  sigla_unid ,sequencia as ab,sequencia as ad,codlinha, cst_csosn,trunc(valortotalitem,3) as vf, sequencia as ac,sequencia as descricao,(SELECT codcf   FROM public.lf_classfiscal_impressora   where  classfiscal_fk=tt.classfiscal_fk  and loja_fk=${idLoja} limit 1) as codcf,sequencia  as piscofins,descricao_classfic,icms_classfic,icms_classfic as desc,piscst ,sequencia as status,cfop FROM public.nfe_detalhe  as det  inner join cd_tipocombustivel as p on p.id_tipocombustivel=det.tipocombustivel_fk  inner join cd_tributacaoicms as tt on tt.id=p.tributacaoicms_fk  inner join lf_classfiscal as lf on lf.id=tt.classfiscal_fk  inner join cd_unidade as u on u.id_unid=p.unidade_fk  where det.loja_fk=${idLoja}  and nfecab_fk=${idNfeCab} order by sequencia asc`
    });

    const docReferenciado = await useDB({
        query: `SELECT fn_Compra_Cabecalho.modelo_Compracab, fn_Compra_Cabecalho.numerodocfiscal_Compracab, fn_Compra_Cabecalho.dataemissao_Compracab, fn_Compra_Cabecalho.serie_Compracab, cd_fornecedor.cpfcnpj_Forn, cd_fornecedor.uf_Forn, fn_Compra_Cabecalho.chaveacesso_Compracab FROM Nfe_Docreferenciado, fn_compra_cabecalho, cd_fornecedor WHERE nfe_docreferenciado.nfe_cabecalho_fk= ${idNfeCab} and fn_compra_cabecalho.loja_fk = ${idLoja} and nfe_docreferenciado.loja_fk=${idLoja} and compracab_fk is not null and nfe_docreferenciado.compracab_fk = fn_compra_cabecalho.id_compracab and fn_compra_cabecalho.fornecedor_fk = cd_fornecedor.id_forn`
    });

    const docReferenciado2 = await useDB({
        query: `SELECT ecf_Cupomcab.coo_Cupom, ecf_Cupomcab.serieecf_Cupom, ecf_cupomcab_fk FROM Nfe_Docreferenciado, ecf_cupomcab  WHERE nfe_cabecalho_fk= ${idNfeCab} and nfe_docreferenciado.loja_fk=${idLoja} and ecf_cupomcab_fk is not null and nfe_docreferenciado.ecf_cupomcab_fk = ecf_cupomcab.id_cupomcab`
    });

    return { code: 200, results: { nfeCab, CodControle, nfeDetProd, nfeDetTipoComb, docReferenciado, docReferenciado2 } }

};

const numeroserie = async function ({ serieImpr, idLoja }) {

    const impr = await useDB({
        query: `select numero_Ecf_Impr from Ecf_Impressora where numserie_Impr='${serieImpr}' and loja_Fk=${idLoja} `
    });

    return { code: 200, results: { impr } }

};

const pegarreducoes = async function ({ idLoja, dataInicial, dataFinal, idDoc02, serieEcf, dataHoraCupom }) {

    const reducaoCab = await useDB({
        query: `SELECT id_docr02,cooinicio_docr02,crz_docr02,  vendabruta_docr02, trunc(gdetotal_docr02,2) as gt, cast(datamovimento_docr02 as date) as dm, cast(dataemissao_docr02 as date) as de,trunc(gdetotal_docr02-vendabruta_docr02,2) as gta,cro_docr02,numserieecf_docr02,coofim_docr02  FROM public.ecf_reducaozcab_r02  where loja_fk=${idLoja}   and (cast(datamovimento_docr02 as date) between '${dataInicial}' and '${dataFinal}') order by datamovimento_docr02 asc`
    });

    const reducaoDetDesc = await useDB({
        query: `SELECT trunc(valoracumulado_docr03,2) as dd  FROM public.ecf_reducaozdet_r03  where loja_fk=${idLoja}  and docr02_fk=${idDoc02}  and totalizadorparcial_docr03='DESC' `
    });

    const reducaoDetAcre = await useDB({
        query:`SELECT trunc(valoracumulado_docr03,2) as dd  FROM public.ecf_reducaozdet_r03  where loja_fk=${idLoja}  and docr02_fk=${idDoc02}  and totalizadorparcial_docr03='ACRE' `
    });

    const reducaoDetCanc = await useDB({
        query:`SELECT trunc(valoracumulado_docr03,2) as dd  FROM public.ecf_reducaozdet_r03  where loja_fk=${idLoja}  and docr02_fk=${idDoc02}  and totalizadorparcial_docr03='CANC' `
    });

    const cupomCab = await useDB({
        query:`SELECT count(id_cupomcab)  FROM public.ecf_cupomcab where  serieecf_cupom='${serieEcf}'  and loja_fk=${idLoja} and status_cupom='C' and cast(datahora_cupom as date)='${dataHoraCupom}' `
    });

    return { code: 200, results: { reducaoCab, reducaoDetDesc, reducaoDetAcre, reducaoDetCanc, cupomCab } }

};

module.exports = {
    gerarm,
    pegarvendasprazo,
    pegarvendasvista,
    pegarcompras,
    pegarnfe,
    numeroserie,
    pegarreducoes
}