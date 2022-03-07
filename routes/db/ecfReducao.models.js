const Utils = require('./use.js');
const { useDB, useQuery } = Utils;


/* public void init() {
    this.permissao = Util.verificaPermissaoDaPagina("ecf reducao'");
    if (!permissao.equals("L")) {
        new CargoRN().executarconsultacomit("UPDATE public.ecf_reducaozdet_r03\n"
            + "   SET  totalizadorparcial_docr03='0700'\n"
            + " WHERE totalizadorparcial_docr03='T0700';\n"
            + "\n"
            + "UPDATE public.ecf_reducaozdet_r03\n"
            + "   SET  totalizadorparcial_docr03='1200'\n"
            + " WHERE totalizadorparcial_docr03='T1200';\n"
            + "\n"
            + "UPDATE public.ecf_reducaozdet_r03\n"
            + "   SET  totalizadorparcial_docr03='1800'\n"
            + " WHERE totalizadorparcial_docr03='T1800';\n"
            + "\n"
            + "UPDATE public.ecf_reducaozdet_r03\n"
            + "   SET  totalizadorparcial_docr03='2500'\n"
            + " WHERE totalizadorparcial_docr03='T2500';"
            + ""
            + "UPDATE public.ecf_reducaozdet_r03\n"
            + "   SET  totalizadorparcial_docr03='3000'\n"
            + " WHERE totalizadorparcial_docr03='T3000';"
            + ""
            + "UPDATE public.ecf_reducaozdet_r03\n"
            + "   SET  totalizadorparcial_docr03='0840'\n"
            + " WHERE totalizadorparcial_docr03='T0840';");
    }
    totais = new HashMap <> ();
    this.fonte = new ArrayList <> (
        Arrays.asList("Serie ECF", "Data", "COO Inicio", "COO Fim", "CRZ", "CRO", "Venda Bruta", "Grande Total")
    );
    this.alvo = new ArrayList <> ();
    //preenche os campos do filtro com campos da tabela
    this.campos = new HashMap <> ();
    this.campos.put(this.fonte.get(0), "numserieecfDocr02");
    this.campos.put(this.fonte.get(1), "datamovimentoDocr02");
    this.campos.put(this.fonte.get(2), "cooinicioDocr02");
    this.campos.put(this.fonte.get(3), "coofimDocr02");
    this.campos.put(this.fonte.get(4), "crzDocr02");
    this.campos.put(this.fonte.get(5), "croDocr02");
    this.campos.put(this.fonte.get(6), "vendabrutaDocr02");
    this.campos.put(this.fonte.get(7), "gdetotalDocr02");
    //inserir a lista de colunas(fonte) e a lista de colunas selecionadas(alvo)
    this.colunas = new DualListModel <> (this.fonte, this.alvo);
    this.filtrosAdicionados = new ArrayList <> ();
    this.listaImpressora = new ArrayList <> ();
    this.listaAliquota = new ArrayList <> ();
    this.vendaBruta = new BigDecimal(0.0);
    Date atual = new Date();
    this.data = atual;
    this.list = new ArrayList <> ();
    this.tot = "CANC";
    listarImpressora();

    Calendar primeiroDia = Calendar.getInstance();
    primeiroDia.set(Calendar.DAY_OF_MONTH, 1);

    Calendar ultimoDia = Calendar.getInstance();
    ultimoDia.add(Calendar.MONTH, 1);
    ultimoDia.set(Calendar.DAY_OF_MONTH, 1);
    ultimoDia.add(Calendar.DAY_OF_MONTH, -1);

    CfLoja loja = (CfLoja) Util.pegarObjetoDaSessao("loja");
    SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");

    String h = "SELECT vo FROM EcfReducaozcabR02 vo WHERE vo.cfLoja = " + loja.getIdLoja() + ""
        + " and (vo.datamovimentoDocr02 between '" + f.format(primeiroDia.getTime()) + "'"
        + " and  '" + f.format(ultimoDia.getTime()) + "')"
        + " order by vo.datamovimentoDocr02 asc ";
    EcfReducao02RN rn = new EcfReducao02RN();
    this.lista = rn.listarEcfHQL(h);
    if (lista != null) {
        if (!lista.isEmpty()) {
            this.ecfCabSelecionado = lista.get(0);
            listaDetalheECF();
        }

        totaiscodcf(loja);
    }

    impressoras = new ArrayList <> ();
    String imp = "SELECT distinct( numserieecf_docr02)\n"
        + "  FROM public.ecf_reducaozcab_r02 where loja_fk=" + loja.getIdLoja() + " "
        + " and numserieecf_docr02 is not null\n"
        + "  and numserieecf_docr02<>'';";
    List < Object > o = new CargoRN().listarobj(imp);
    for (Object ob : o) {
        impressoras.add(ob.toString());
    }

    Calendar primeiroDiax = Calendar.getInstance();
    primeiroDiax.add(Calendar.MONTH, -1);
    primeiroDiax.set(Calendar.DAY_OF_MONTH, 1);

    Calendar ultimoDiax = Calendar.getInstance();
    ultimoDiax.add(Calendar.MONTH, -1);
    int ultimoDiaMes = ultimoDiax.getActualMaximum(Calendar.DAY_OF_MONTH);
    ultimoDiax.set(Calendar.DAY_OF_MONTH, ultimoDiaMes);

    datainicial = primeiroDiax.getTime();

    datafinal = ultimoDiax.getTime();

} */

const totaiscodcf = async function ({ idLoja, idDocr02 }) {

    const reducaoR03 = await useDB({
        query: `SELECT * FROM Ecf_Reducaozdet_R03 WHERE loja_fk= ${idLoja}  AND docr02_fk=${idDocr02}`
    });

    return { code: 200, results: { reducaoR03 } }

};

const excluirFiltro = async function ({ idLoja }) {

    const ecfReducacao = await useDB({
        query: `SELECT * FROM Ecf_Reducaozcab_R02 WHERE loja_fk=${idLoja} `
    });

    return { code: 200, results: { ecfReducacao } }

};

const processarFiltro = async function ({ valor, filtro, dataInicio, dataFinal, filtroData }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM ecf_reducaozcab_r02 WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM ecf_reducaozcab_r02 WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
    })

    const periodo = await useDB({
        query: `SELECT * FROM ecf_reducaozcab_r02 WHERE ${filtroData} BETWEEN '${dataInicio}' and '${dataFinal}'`
    });

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    return { code: 200, results: { comecandoCom, contendo, periodo } }

    //  public void processarFiltro() {

    /**
     * //string da consulta
            StringBuilder sb = new StringBuilder("SELECT vo FROM VdAbastecimentos vo");
     */

};

const listaDetalheECF = async function ({ idLoja, idDocr02 }) {

    const ecfReducao = await useDB({
        query: `SELECT * FROM Ecf_Reducaozdet_R03 WHERE loja_fk= ${idLoja}  AND docr02_fk= ${idDocr02}`
    });

    return { code: 200, results: { ecfReducao } }

};

const salvar = async function ({ idLoja, idImpr, insertReducaoDetData }) {

    let statusInsert;

    const reducaoCab = await useDB({
        query: `SELECT * FROM Ecf_Reducaozcab_R02 WHERE loja_fk=${idLoja}  ORDER BY id_Docr02 DESC`
    });

    const impressora = await useDB({
        query:`SELECT * FROM Ecf_Impressora WHERE loja_Fk=${idLoja}  and id_Impr=${idImpr}`
    });

    const idReducaoCab02 = await useDB({
        query:`SELECT max(id_docr02)+1 as idc FROM public.ecf_reducaozcab_r02 where loja_fk=${idLoja} `
    });

    const reducaoDetr03 = await useDB({
        query:`SELECT * FROM Ecf_Reducaozdet_R03 WHERE loja_fk=${idLoja}  ORDER BY id_Reducaozdet_R03 DESC`
    });

    const insertReducaoDet = await useDB({
        query: `INSERT INTO ecf_reducaozdet_r03(
            id_reducaozdet_r03, 
            loja_fk, 
            docr02_fk, 
            crz_docr03, 
            totalizadorparcial_docr03,
            valoracumulado_docr03, 
            hash_docr03,
            usuarioaltera, 
            dataaltera)VALUES (
                ${insertReducaoDetData.id_reducaozdet_r03}, 
                ${insertReducaoDetData.loja_fk}, 
                ${insertReducaoDetData.docr02_fk}, 
                ${insertReducaoDetData.crz_docr03}, 
                '${insertReducaoDetData.totalizadorparcial_docr03}',
                '${insertReducaoDetData.valoracumulado_docr03}', 
                '${insertReducaoDetData.hash_docr03}', 
                ${insertReducaoDetData.usuarioaltera}, 
                '${insertReducaoDetData.dataaltera}')`
    }).then(() => {
        statusInsert = 'Registro inserido com sucesso';
    }).catch((err) => {
        statusInsert = err.message;
    });

    return { code: 200, results: { reducaoCab, impressora, idReducaoCab02, reducaoDetr03, statusInsert } }

};

const listarImpressora = async function({ idLoja }){ 

    const impressora = await useDB({ 
    query:  `SELECT * FROM Ecf_Impressora WHERE loja_Fk = ${idLoja} `
 }); 

 return { code: 200, results: { impressora }}  
    
};

const listarAliquota = async function({ idImpr }){ 

    const classfiscal_impressora = await useDB({ 
    query: `SELECT * FROM Lf_Classfiscal_Impressora WHERE ecf_Impressora_Fk=${idImpr} `
 }); 

 return { code: 200, results: { classfiscal_impressora }}  
    
};


module.exports = {
    totaiscodcf,
    excluirFiltro,
    processarFiltro,
    listaDetalheECF,
    salvar,
    listarImpressora,
    listarAliquota
}