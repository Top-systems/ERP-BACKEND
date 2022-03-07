const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

/* public void init() {
    cst = "t";
    csosn = "t";
    cf = "t";
    cfopent = "t";
    cfopsai = "t";
    incluir1300 = true;
    incluiritemnfce = false;
    incluire110 = false;
    incluire5929 = false;
    ignorarmodelo01 = false;
    inventario = "0";
    g = new GeraSpedFiscal();
    versoes = new ArrayList<>();
    this.loja = (CfLoja) Util.pegarObjetoDaSessao("loja");
    listarVersoes();
    String hql = "SELECT vo FROM CfConfigSped vo"
            + " WHERE vo.cfLoja.idLoja=" + this.loja.getIdLoja() + "";
    CfConfigSped sped2 = new ConfigSpedRN().pegarConfigSped(hql);
    if (sped2 != null) {
        perfil = sped2.getPerfilConfigsped();
    }

    this.finalidade = "0";

    Calendar primeiroDia = Calendar.getInstance();
    primeiroDia.add(Calendar.MONTH, -1);
    primeiroDia.set(Calendar.DAY_OF_MONTH, 1);

    Calendar ultimoDia = Calendar.getInstance();
    ultimoDia.add(Calendar.MONTH, -1);
    int ultimoDiaMes = ultimoDia.getActualMaximum(Calendar.DAY_OF_MONTH);
    ultimoDia.set(Calendar.DAY_OF_MONTH, ultimoDiaMes);

    this.dataInicio = primeiroDia.getTime();
    this.dataFim = ultimoDia.getTime();

    SimpleDateFormat diano = new SimpleDateFormat("yyyy-MM-dd");
    SimpleDateFormat sdano = new SimpleDateFormat("yyyy");
    SimpleDateFormat sdmes = new SimpleDateFormat("MM");
    String ano = sdano.format(dataInicio);
    String mes = sdmes.format(dataInicio);

    String o = "SELECT id_spedperiodo\n"
            + "  FROM public.sped_periodo\n"
            + "  where mesapuracao='" + Integer.valueOf(mes) + "'"
            + " and anoapuracao='" + ano + "' "
            + " and loja_fk=" + loja.getIdLoja() + " ";
    Object io = new CargoRN().porSql2semcache(o);
    if (io == null) {

        Object id = new CargoRN().porSql2semcache("SELECT max(id_spedperiodo)+1 as idc\n"
                + "  FROM public.sped_periodo\n"
                + "  where loja_fk=" + loja.getIdLoja() + " ");
        if (id == null) {
            id = 1;
        }

        new CargoRN().executarconsultacomit("INSERT INTO public.sped_periodo(id_spedperiodo, loja_fk, "
                + " datainicial, datafinal, mesapuracao,anoapuracao)\n"
                + "    VALUES (" + id + ", " + loja.getIdLoja() + ","
                + "  '" + diano.format(dataInicio) + "', '" + diano.format(dataFim) + "',"
                + "  '" + Integer.valueOf(mes) + "', '" + ano + "');");
    }

    atualizarVersao();

    this.txt = "";

    File xp = new File(Util.pastapadrao((String) Util.pegarObjetoDaSessao("conexao"))
            + File.separator + loja.getCnpjLoja() + File.separator + "txt-sped");
    if (!xp.exists()) {
        xp.setWritable(true);
        xp.mkdirs();
    }
    File parentDir = xp.getParentFile();
    if (parentDir.isDirectory() && parentDir.list().length > 0) {
        File pp = getLatestFilefromDir(xp.getAbsolutePath());
        if (pp != null) {
            this.caminhoArquivo = pp.getAbsolutePath();
            nomearquivo = pp.getName();
        }
    }

    cancelarcuponsemaberto();
} */

const cancelarcuponsemaberto = async function ({ idLoja, dataHoraCupom }) {

    const updateCupomDetProd = await useDB({
        query: `update public.ecf_cupomdet_prod set valorfinal_cupitem=round(valorfinal_cupitem,2) where cast(SUBSTR(cast(valorfinal_cupitem as text), LENGTH(cast(valorfinal_cupitem  as text)), 1) as integer)>0;`
    });

    const updateCupomDetBico = await useDB({
        query: `update public.ecf_cupomdet_bico set valorfinal_cupdetbic=round(valorfinal_cupdetbic,2) where cast(SUBSTR(cast(valorfinal_cupdetbic as text), LENGTH(cast(valorfinal_cupdetbic  as text)), 1) as integer)>0; `
    });

    const updateCupomCab = await useDB({
        query: `UPDATE public.ecf_cupomcab  SET  status_cupom='C'  WHERE status_cupom='A' and loja_fk=${idLoja}  and cast(datahora_cupom as date)<'${dataHoraCupom}';`
    });

    const updateCupomDetProd2 = await useDB({
        query: ` UPDATE public.ecf_cupomdet_prod SET valoracrescimo_cupitem=0,percentlacrescimo_cupitem=0 WHERE loja_fk=${idLoja}  and cupomcab_fk in (select id_cupomcab from ecf_cupomcab  where loja_fk=${idLoja}  and acrescimo_cupomcab=0 and id_cupomcab=cupomcab_fk) and valoracrescimo_cupitem>0;`
    });

    const updateCupomDetProd3 = await useDB({
        query: `update ecf_cupomdet_prod set descontoglobal_cupitem=0 where loja_fk=${idLoja}  and id_cupomdet_prod in (SELECT id_cupomdet_prod   FROM public.ecf_cupomdet_prod AS d   inner join ecf_cupomcab as cab on cab.id_cupomcab=d.cupomcab_fk   where descontoglobal_cupitem=valordesconto_cupitem   and valordesconto_cupitem=desconto_cupomcab   and d.loja_fk=${idLoja}  and totalitens_cupom=1 and cab.loja_fk=${idLoja}  and status_cupom in ('F','O','D') and descontoglobal_cupitem>0 and valordesconto_cupitem>0);`
    });

    const updateCupomDetProd4 = await useDB({
        query: `  UPDATE public.ecf_cupomdet_prod   SET valorfinal_cupitem=(qtde_cupitem*valorunit_cupitem) WHERE id_cupomdet_prod in (  SELECT id_cupomdet_prod  FROM public.ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk  where valordesconto_cupitem>0  and desconto_cupomcab=0  AND status_cupitem='F'  and status_cupom in ('F','O')  AND totalliquido_cupom!=totalbruto_cupom  and det.loja_fk${idLoja}   and cab.loja_fk=${idLoja}   and totalitens_cupom=1  and  valorfinal_cupitem>(qtde_cupitem*valorunit_cupitem))  and loja_fk=${idLoja}; `
    });

    const updateCupomDetBico2 = await useDB({
        query: `update public.ecf_cupomdet_bico  set status_cupdetbic='C',abastecimento_fk=null where cupomcab_fk in (SELECT cupomcab_fk   FROM public.ecf_cupomdet_bico as det   inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk   where det.loja_fk=${idLoja} and cab.loja_fk=${idLoja}  and status_cupom='C' and status_cupdetbic!='C' and datahora_cupom='${dataHoraCupom}')  `
    });

    const updateCupomDetProd5 = await useDB({
        query: `update public.ecf_cupomdet_prod set status_cupitem='C' where cupomcab_fk in (SELECT cupomcab_fk   FROM public.ecf_cupomdet_prod  as det   inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk   where det.loja_fk=${idLoja} and cab.loja_fk=${idLoja}  and status_cupom='C' and status_cupitem!='C' and datahora_cupom='${dataHoraCupom}}') `
    });

    const updateCupomCab2 = await useDB({
        query: ` update ecf_cupomcab set status_cupom='C'  where status_cupom in ('F') AND (protocolo IS  NULL OR protocolo ='')  AND tipoequip IN ('NFCE','SAT')  and loja_fk=${idLoja} ;`
    });

    return { code: 200, results: { updateCupomDetProd, updateCupomDetProd2, updateCupomDetProd3, updateCupomDetProd4, updateCupomDetProd5, updateCupomDetBico, updateCupomDetBico2, updateCupomCab, updateCupomCab2 } }

};

const gerarsped = async function ({ idLoja, insertNfeFaturaData, dataMovimento }) {

    let statusInsert

    const updateCupomDetProd1 = await useDB({
        query: `update ecf_cupomdet_prod set valorfinal_cupitem=0 where valorfinal_cupitem is null and loja_fk=${idLoja}`
    });

    const updateCupomDetProd2 = await useDB({
        query: `update ecf_cupomdet_prod set valorfinal_cupitem=0 where valoracrescimo_cupitem is null and loja_fk=${idLoja}`
    });

    const updateCupomDetProd3 = await useDB({
        query: `update ecf_cupomdet_prod set valorfinal_cupitem=0 where descontoglobal_cupitem is null and loja_fk=${idLoja}`
    });

    const lmcCab = await useDB({
        query: ` SELECT id_lmccab  FROM public.cd_lmccab  where datamovimento_lmccab='${dataMovimento}'  and situacao='F'  and loja_fk=${idLoja} `
    });

    const loja = await useDB({
        query: `SELECT * FROM Cf_Loja WHERE id_Loja=${idLoja} AND id_Loja!=9999 `
    });

    const idNfeFatura = await useDB({
        query: `select max(id_nfefatura)+1 as idc from nfe_fatura where loja_fk=${idLoja} `
    });

    const insertNfeFatura = await useDB({
        query: `INSERT INTO public.nfe_fatura(	
            id_nfefatura, 
            loja_fk ,
            usuarioaltera, 
            dataaltera,  
            tipo,
            descricao,
            cnpj)	VALUES (
                ${idNfeFatura[0].idc},
                ${insertNfeFaturaData.loja_fk}, 
                ${insertNfeFaturaData.usuarioaltera}, 
                now(),
                'sped pis/cofins',
                'periodo ${insertNfeFaturaData.dataInicio} - ${insertNfeFaturaData.dataFim}', 
                '${insertNfeFaturaData.cnpj}');`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { updateCupomDetProd1, updateCupomDetProd2, updateCupomDetProd3, lmcCab, loja, idNfeFatura, statusInsert } }

};

const lojas = async function ({ }) {

    const lista = await useDB({
        query: `SELECT * FROM Cf_Loja WHERE id_Loja!=9999  ORDER BY id_Loja ASC`
    });

    return { code: 200, results: { lista } }

};

const trocainventario = async function ({ idLoja }) {

    const inventarioCab = await useDB({
        query: `select * from Lf_Inventario_Cab where loja_fk=${idLoja} order by  data_Inventario desc `
    });

    return { code: 200, results: { inventarioCab } }

};

const listarcfop = async function({  }){ 

    const cfop = await useDB({ 
    query: `select * from Cd_Cfop where cast(codigo_Cfop as text) like '5%' or cast(codigo_Cfop as text) like '6%' or cast(codigo_Cfop as text) like '7%'  order by codigo_Cfop asc `
 }); 

 return { code: 200, results: { cfop }}  
    
};

const listarcfope = async function({  }){ 

    const cfop = await useDB({ 
    query: `select * from Cd_Cfop where cast(codigo_Cfop as text) like '1%' or cast(codigo_Cfop as text) like '2%' or cast(codigo_Cfop as text) like '3%'  order by codigo_Cfop asc `
 }); 

 return { code: 200, results: { cfop }}  
    
};

const listarcst = async function({  }){ 

    const cst = await useDB({ 
    query: `select * from Cd_Cst where descricao_Cst!='' order by cod_Cst asc `
 }); 

 return { code: 200, results: { cst }}  
    
};

const listarlf = async function({  }){ 

    const lfClass = await useDB({ 
    query: `select * from Lf_Classfiscal order by icms_classfic asc `
 }); 

 return { code: 200, results: { lfClass }}  
    
};



module.exports = {
    cancelarcuponsemaberto,
    gerarsped,
    lojas,
    trocainventario,
    listarcfop,
    listarcfope,
    listarcst,
    listarlf
}