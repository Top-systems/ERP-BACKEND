const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

/* public void init() {
    opcao2casa = false;
    movimentos = new ArrayList<>();
    tiporelatorio = "1";
    tiporelatorioex = "PDF";
    lojalogada = (CfLoja) Util.pegarObjetoDaSessao("loja");
    this.textoBusca = "";
    this.fonte = new ArrayList<>(
            Arrays.asList("Codigo", "Nome")
    );
    this.alvo = new ArrayList<>();
    //preenche os campos do filtro com campos da tabela
    this.campos = new HashMap<>();

    //inserir a lista de colunas(fonte) e a lista de colunas selecionadas(alvo)
    this.colunas = new DualListModel<>(this.fonte, this.alvo);
    this.disabled = true;
    this.ultimo = true;
    this.posicao = 0;
    this.insercao = false;
    this.turnoposto = new EcfMovimento();

    this.turnopostob = new EcfMovimento();
    this.turnopostos = new EcfMovimento();
    //coluna inicial de pesquisa
    this.colunaBusca = "ecfMovimentoPK.idMovimento";
    //verifica a permisso do usuario nessa pagina
    this.permissao = Util.verificaPermissaoDaPagina("movimentos");
    this.comparacoes = new ArrayList<>();
    this.filtrosAdicionados = new ArrayList<>();
    conf = new ArrayList<>();
    clientes = new ArrayList<>();
    recs = new ArrayList<>();

    Calendar primeiroDia = Calendar.getInstance();
    primeiroDia.set(Calendar.DAY_OF_MONTH, -15);

    Calendar ultimoDia = Calendar.getInstance();
    /*ultimoDia.add(Calendar.MONTH, 1);
    ultimoDia.set(Calendar.DAY_OF_MONTH, 1);
    ultimoDia.add(Calendar.DAY_OF_MONTH, -1);*/

/*Calendar primeiroDia1 = Calendar.getInstance();
    primeiroDia1.add(Calendar.MONTH, -1);
    primeiroDia1.set(Calendar.DAY_OF_MONTH, 1);

    Calendar ultimoDia1 = Calendar.getInstance();
    //ultimoDia1.add(Calendar.MONTH, -1);
    ultimoDia1.set(Calendar.DAY_OF_MONTH, 1);
    ultimoDia1.add(Calendar.DAY_OF_MONTH, -1);*/
// primeira data do mes atual
/* try {
     String i = sd1.format(primeiroDia.getTime());
     Date ii = sd.parse(i + " 00:00:00");
     this.datai = ii;
     datainicial = datai;
     // ultima data do mes atual
     String i2 = sd1.format(ultimoDia.getTime());
     Date ii2 = sd.parse(i2 + " 23:59:59");
     this.dataf = ii2;
     datafinal = dataf;
 } catch (ParseException ex) {
     Logger.getLogger(MovimentoBean.class.getName()).log(Level.SEVERE, null, ex);
 }

 listar();

 Calendar cd = Calendar.getInstance();
 String h1 = "update public.ecf_cupomdet_bico  set status_cupdetbic='C',abastecimento_fk=null"
         + "where cupomcab_fk in (SELECT cupomcab_fk\n"
         + "  FROM public.ecf_cupomdet_bico as det\n"
         + "  inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk\n"
         + "  where det.loja_fk=" + lojalogada.getIdLoja() + " and cab.loja_fk=" + lojalogada.getIdLoja() + " "
         + " and status_cupom='C' and status_cupdetbic!='C'"
         + "  and datahora_cupom='" + sd1.format(cd.getTime()) + "' )"
         + " ";

 //System.out.println(h1);
 // new CargoRN().executarconsultacomit(h1);
 h1 = "update public.ecf_cupomdet_prod set status_cupitem='C'\n"
         + "where cupomcab_fk in (SELECT cupomcab_fk\n"
         + "  FROM public.ecf_cupomdet_prod  as det\n"
         + "  inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk\n"
         + "  where det.loja_fk=" + lojalogada.getIdLoja() + " "
         + " and cab.loja_fk=" + lojalogada.getIdLoja() + " "
         + " and status_cupom='C' and status_cupitem!='C'"
         + "  and datahora_cupom='" + sd1.format(cd.getTime()) + "')"
         + "  ";

 // System.out.println(h1);
 // new CargoRN().executarconsultacomit(h1);
} */

const ultimoturno = async function ({ dataAberturaMov, idLoja, dataCupomInicial, dataCupomFinal }) {

    const movimento = await useDB({
        query: ` SELECT id_movimento,   loja_fk,  datahoraabertura_mov,  datahorafechamento_mov  FROM public.ecf_movimento  where cast(datahoraabertura_mov as date)='${dataAberturaMov}'  and loja_fk=${idLoja}  and datahorafechamento_mov is not null   order by datahoraabertura_mov  desc `
    });

    const cupomDetBico = await useDB({
        query: `  SELECT numero_tanque,descricao_tipcomb,sum(qtde_cupdetbic) as q, sum(valorfinal_cupdetbic) as v  FROM public.ecf_cupomdet_bico as det  inner join ecf_cupomcab as cab on cab.id_cupomcab =det.cupomcab_fk  inner join cd_bico as b on b.id_bico =det.bico_fk  inner join cd_tanque as t on t.id_tanque =b.tanque_fk  inner join cd_tipocombustivel as tp on tp.id_tipocombustivel =t.tipocombustivel_fk  where det.loja_fk=${idLoja} and cab.loja_fk=${idLoja} and b.loja_fk=${idLoja}  and t.loja_fk=${idLoja}   and cab.status_cupom in ('F','O') AND det.status_cupdetbic='F'  and cab.coo_cupom!=0  and (datahora_cupom between '${dataCupomInicial}'  and '${dataCupomFinal}')  group by numero_tanque,descricao_tipcomb  order by numero_tanque`
    });

    return { code: 200, results: { movimento, cupomDetBico } }

};

const listarx = async function ({ idLoja, idMovimento, vlMov, idTipoPagto }) {

    const movimentoTipoPag = await useDB({
        query: `SELECT  tp.tipopagto_fk,sum(valorpago-troco) as tt,(select sum(vlmov) from ecf_movimento_tipopag  where loja_fk=${idLoja}  and movimento_fk=${idMovimento} and tipopagto_fk=tp.tipopagto_fk) as bb  FROM public.ecf_cupomcab_tipopagto as tp  where tp.loja_fk=${idLoja}  and cupomcab_fk in (select id_cupomcab from ecf_cupomcab   where loja_fk=${idLoja}  and status_cupom in ('F','O','D') and movimento_fk=${idMovimento} )  group by tp.tipopagto_fk`
    });

    const updateMovimentoTipoPag = await useDB({
        query: `UPDATE public.ecf_movimento_tipopag   SET  vlmov=${vlMov} WHERE loja_fk=${idLoja}  and tipopagto_fk=${idTipoPagto}  and movimento_fk=${idMovimento} `
    });

    return { code: 200, results: { movimentoTipoPag, updateMovimentoTipoPag } }

};

const listardet = async function ({ idLoja, idMovimento }) {

    const movimentoTipoPag = await useDB({
        query: `select * from  Ecf_Movimento_Tipopag where loja_Fk=${idLoja} and movimento_fk=${idMovimento} and (vlmov>0 or vlinformado>0) order by tipopagto_Fk asc`
    });

    const cargaSangria = await useDB({
        query: `select * from  Ecf_Cargasangria where loja_fk=${idLoja} and  movimento_fk=${idMovimento} order by datamov_Carsan desc`
    });

    const cupomCabCliente = await useDB({
        query: `select * from Ecf_Cupomcab_Cliente, ecf_cupomcab where Ecf_Cupomcab_Cliente.loja_Fk=${idLoja} and  ecf_Cupomcab.movimento_fk=${idMovimento} and ecf_Cupomcab.status_Cupom in ('F','O') and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomcab_cliente.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const contasReceberRec = await useDB({
        query: `SELECT id_cli,nome_cli,sum(valorpago) AS vp,cpfcnpj_cli  FROM fn_contasreceber_rec AS rec   INNER JOIN fn_contasreceber AS r on rec.contasreceber_fk=r.id_contasreceber  INNER JOIN cd_cliente AS c ON c.id_cli=r.cliente_fk WHERE rec.loja_fk=${idLoja} AND r.loja_fk=${idLoja} AND rec.status='Q' AND movimento_fk=${idMovimento} GROUP BY id_cli,nome_cli,cpfcnpj_cli ORDER BY nome_cli desc`
    });

    const contasReceber = await useDB({
        query: ` SELECT numdoc_contasreceber, cli.nome_cli,  valortotal_contasreceber,td.descricao_tpdesp ,cli.cpfcnpj_cli FROM public.fn_contasreceber as r inner join cd_cliente as cli on cli.id_cli=r.cliente_fk   inner join cd_tipodespesa as td on td. id_tpdesp=r.tipodespesa_id     where loja_fk=${idLoja}  and  movimentoid=${idMovimento} `
    });

    return { code: 200, results: { movimentoTipoPag, cargaSangria, cupomCabCliente, contasReceberRec, contasReceber } }

};

const listardet2 = async function ({ idLoja, idMovimento }) {

    const movimentoTipoPag = await useDB({
        query: `select * from  Ecf_Movimento_Tipopag where loja_Fk=${idLoja} and movimento_fk=${idMovimento} and (vlmov>0 or vlinformado>0) order by tipopagto_Fk asc`
    });

    const cargaSangria = await useDB({
        query: `select * from  Ecf_Cargasangria where loja_fk=${idLoja} and  movimento_fk=${idMovimento} order by datamov_Carsan desc`
    });

    const cupomCabCliente = await useDB({
        query: `select * from Ecf_Cupomcab_Cliente, ecf_cupomcab where Ecf_Cupomcab_Cliente.loja_Fk=${idLoja} and  ecf_Cupomcab.movimento_fk=${idMovimento} and ecf_Cupomcab.status_Cupom in ('F','O') and ecf_Cupomcab.coo_Cupom!=0 and ecf_cupomcab_cliente.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const contasReceberRec = await useDB({
        query: `SELECT id_cli,nome_cli,sum(valorpago) AS vp,cpfcnpj_cli  FROM fn_contasreceber_rec AS rec   INNER JOIN fn_contasreceber AS r on rec.contasreceber_fk=r.id_contasreceber  INNER JOIN cd_cliente AS c ON c.id_cli=r.cliente_fk WHERE rec.loja_fk=${idLoja} AND r.loja_fk=${idLoja} AND rec.status='Q' AND movimento_fk=${idMovimento} GROUP BY id_cli,nome_cli,cpfcnpj_cli ORDER BY nome_cli desc`
    });

    const contasReceber = await useDB({
        query: ` SELECT numdoc_contasreceber, cli.nome_cli,  valortotal_contasreceber,td.descricao_tpdesp ,cli.cpfcnpj_cli FROM public.fn_contasreceber as r inner join cd_cliente as cli on cli.id_cli=r.cliente_fk   inner join cd_tipodespesa as td on td. id_tpdesp=r.tipodespesa_id     where loja_fk=${idLoja}  and  movimentoid=${idMovimento} `
    });

    return { code: 200, results: { movimentoTipoPag, cargaSangria, cupomCabCliente, contasReceberRec, contasReceber } }

};

const listar = async function ({ idLoja, dataInicial, dataFinal, dataHoraAberturaMov, dataCupomInicial, dataCupomFinal, serieEcfCupom }) {

    const movimento = await useDB({
        query: `select * from  Ecf_Movimento where loja_fk=${idLoja} and (datahoraabertura_Mov between '${dataInicial}' and '${dataFinal}') order by datahoraabertura_Mov desc`
    });

    const idMovimento = await useDB({
        query: `SELECT id_movimento  FROM public.ecf_movimento  where datahoraabertura_mov ='${dataHoraAberturaMov}' and loja_fk=${idLoja}`
    });

    const cupomCab = await useDB({
        query: `SELECT sum(totalliquido_cupom)  FROM public.ecf_cupomcab where   loja_fk=${idLoja} and status_cupom in ('F','O') and trim(serieecf_cupom)='${serieEcfCupom}' and (datahora_cupom between '${dataCupomInicial}' and '${dataCupomFinal}')  and coo_cupom!=0   `
    });

    return { code: 200, results: { movimento, idMovimento, cupomCab } }

};

const tarefacorrigitipospag = async function ({ idLoja, dataInicial, dataFinal, idMovimento, idTipoPagto, vlmov, idMovimentoTipoPag }) {

    const cupomCabTipoPagto = await useDB({
        query: `SELECT  tipopagto_fk, sum(valorpago-troco) FROM public.ecf_cupomcab_tipopagto as det  inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk  where det.loja_fk=${idLoja} and cab.loja_fk=${idLoja}   and (cab.datahora_cupom between '${dataInicial}'  and '${dataFinal}')  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0   group by tipopagto_fk`
    });

    const movimentoTipoPag = await useDB({
        query: ` SELECT  id_movimento_tipopag, tipopagto_fk, vlmov FROM public.ecf_movimento_tipopag  where movimento_fk=${idMovimento} and loja_fk=${idLoja} and tipopagto_fk=${idTipoPagto}  `
    });

    const updateMovimentoTipoPag = await useDB({
        query: `UPDATE public.ecf_movimento_tipopag SET vlmov=${vlmov}  WHERE id_movimento_tipopag=${idMovimentoTipoPag} and loja_fk=${idLoja} and tipopagto_fk=${idTipoPagto} `
    });

    return { code: 200, results: { cupomCabTipoPagto, movimentoTipoPag, updateMovimentoTipoPag } }

};

const processarFiltro = async function ({ valor, filtro }) {

    const comecandoCom = await useDB({
        query: `SELECT * FROM ecf_movimento WHERE ${filtro} like '${valor.toUpperCase()}%'`
    });

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM ecf_movimento WHERE ${filtro} LIKE '%${valor.toUpperCase()}%'`
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    return { code: 200, results: { comecandoCom, contendo } }

    //  public void processarFiltro() {

    /**
     * //string da consulta
            StringBuilder sb = new StringBuilder("SELECT vo FROM VdAbastecimentos vo");
     */

};

const salvar = async function ({ }) {

    const movimento = await useDB({
        query: `SELECT * FROM Ecf_Movimento ORDER BY id_Movimento DESC`
    });

    return { code: 200, results: { movimento } }

};

const pesquisarPorColuna = async function ({ idLoja, colunaBusca, textoBusca }) {

    const pesquisa = await useDB({
        query: `SELECT * FROM Ecf_Movimento WHERE loja_Fk=${idLoja} and UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase()}%' ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pesquisa } }

};

const preencherListaBusca = async function ({ idLoja }) {

    const lista = await useDB({
        query: `SELECT * FROM Ecf_Movimento where loja_Fk=${idLoja} order by id_Movimento desc  `
    });

    return { code: 200, results: { lista } }

};

const gerarrelatorio = async function ({ idLoja, idMovimento, idBico, dataAltera, numserieEcf, idTipoPagto, idTanque, idTipoComb, tanque }) {

    const movimento = await useDB({
        query: `SELECT id_movimento, datahoraabertura_mov, datahorafechamento_mov,  usuarioabertura_mov, usuariofechamento_mov FROM public.ecf_movimento  where loja_fk=${idLoja} and id_movimento=${idMovimento}`
    });

    const turnoPostoCombDet = await useDB({
        query: `SELECT b.numero_bic, tp.descricao_tipcomb, qtdabertura,  qtdfechamento, afericao,b.id_bico,tp.id_tipocombustivel,t.id_tanque FROM public.cd_turnopostocombdet as det inner join cd_bico as b on b.id_bico=det.bico_fk inner join cd_tanque as t on t.id_tanque=b.tanque_fk inner join cd_tipocombustivel as tp on t.tipocombustivel_fk=tp.id_tipocombustivel where det.loja_fk=${idLoja}  and b.loja_fk=${idLoja}  and t.loja_fk=${idLoja}  and det.movimento_fk=${idMovimento} order by b.numero_bic asc`
    });

    const abastecimentoQtd = await useDB({
        query: `SELECT sum(qtd) as total FROM public.vd_abastecimentos  where loja_fk=${idLoja} and bico_fk=${idBico} and (dataaltera >=  '${dataAltera}') and numserieecf='${numserieEcf}' and status_abastecimento='A'`
    });

    const abastecimentoEncerranteAntes = await useDB({
        query: `SELECT min(encerranteantes) as total FROM public.vd_abastecimentos  where loja_fk=${idLoja} and bico_fk=${idBico} and (dataaltera >=  '${dataAltera}') and numserieecf='${numserieEcf}' and (status_abastecimento='A' or status_abastecimento='F')`
    });

    const abastecimentoEncerranteDepois = await useDB({
        query: `SELECT max(encerrantedepois) as total FROM public.vd_abastecimentos  where loja_fk=${idLoja} and bico_fk=${idBico} and (dataaltera >=  '${dataAltera}') and numserieecf='${numserieEcf}' and (status_abastecimento='A' or status_abastecimento='F')`
    });

    const cupomDetBico = await useDB({
        query: `SELECT  sum(qtde_cupdetbic) as lt, avg(valorunit_cupdetbic) as vu  FROM public.ecf_cupomdet_bico  as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where status_cupdetbic='F'  and cab.loja_fk=${idLoja} and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and bico_fk=${idBico} `
    });

    const abastecimentoValorUnit = await useDB({
        query: `SELECT valorunit as vt  FROM public.vd_abastecimentos  where bico_fk=${idBico}  and loja_fk=${idLoja}  and coo in (select coo_cupom from ecf_cupomcab   where loja_fk=${idLoja}   and movimento_fk=${idMovimento} ) order by id_abastecimentos desc limit 1`
    });

    const cupomDetBico2 = await useDB({
        query: `SELECT  sum(qtde_cupdetbic) as lt,sum(valorfinal_cupdetbic+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupdetbic ELSE 0 END)) as vt  FROM public.ecf_cupomdet_bico  as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where status_cupdetbic='F'  and cab.loja_fk=${idLoja}  and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and bico_fk=${idBico} and cab.tipo='V'`
    });

    const cupomDetBico3 = await useDB({
        query: `SELECT  sum(qtde_cupdetbic) as lt,sum(valorfinal_cupdetbic+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupdetbic ELSE 0 END)) as vt  FROM public.ecf_cupomdet_bico  as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where status_cupdetbic='F'  and cab.loja_fk=${idLoja}  and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and bico_fk=${idBico} and cab.tipo='P'`
    });

    const movimentoTipoPag = await useDB({
        query: `SELECT d.tipopagto_fk,t.descricao_tipopag,    vlmov as  valorvendas, vlinformado as valorcaixa,(vlmov-vlinformado) as diferenca  FROM public.ecf_movimento_tipopag as d  inner join cd_tipopagto  as t on t.id_tipopagto=d.tipopagto_fk  where d.loja_fk=${idLoja}  and d.movimento_fk=${idMovimento}  and ( vlmov>0 or vlinformado>0) order by d.tipopagto_fk asc`
    });

    const cargaSangria = await useDB({
        query: `SELECT sum(valor_carsan) as tt  FROM public.ecf_cargasangria  where tipo_carsan='S'   AND loja_fk=${idLoja}   and tipopagto_fk=${idTipoPagto}  and movimento_fk=${idMovimento} `
    });

    const cargaSangria2 = await useDB({
        query: `SELECT  SUM(valor_carsan) as totalc  FROM public.ecf_cargasangria  where loja_fk=${idLoja} and  movimento_fk=${idMovimento} and tipo_carsan='C' `
    });

    const cargaSangria3 = await useDB({
        query: `SELECT  motivo_carsan,valor_carsan FROM public.ecf_cargasangria  where loja_fk=${idLoja} and  movimento_fk=${idMovimento} and tipo_carsan='S' `
    });

    const contasRecebr = await useDB({
        query: ` SELECT numdoc_contasreceber, cli.nome_cli,  valortotal_contasreceber,td.descricao_tpdesp  FROM public.fn_contasreceber as r inner join cd_cliente as cli on cli.id_cli=r.cliente_fk   inner join cd_tipodespesa as td on td. id_tpdesp=r.tipodespesa_id     where loja_fk=${idLoja}  and  movimentoid=${idMovimento} `
    });

    const cupomDetProd = await useDB({
        query: `SELECT  gp.id_grpprod,gp.descricao_grpprod, sum((valorfinal_cupitem-descontoglobal_cupitem)+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupitem ELSE 0 END)) as total FROM public.ecf_cupomdet_prod  as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk inner join cd_produto as p on p.id_prod=det.produto_fk inner join cd_grupoproduto as gp on gp.id_grpprod=p.grupoprod_fk where status_cupitem='F'  and cab.loja_fk=${idLoja}  and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  group by  gp.id_grpprod,gp.descricao_grpprod`
    });

    const cartaoMov = await useDB({
        query: `SELECT  cab.datahora_cupom,cab.coo_cupom, descricao_cartao,tipocartao_cartmov,   valorbruto_cartmov FROM public.ecf_cartaomov as p inner join ecf_cupomcab as cab on cab.id_cupomcab=p.cupomcab_fk inner join cd_cartao as c on c.id_cartao=p.cartao_fk where p.loja_fk=${idLoja}  and cab.loja_fk=${idLoja} and  movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0   order by cab.datahora_cupom asc`
    });

    const lmcEstoque = await useDB({
        query: `SELECT  tanque,tp.descricao_tipcomb, estoqueinicial,  estoquefinal,numero_tanque FROM public.cd_lmcestoque as l inner join cd_tanque as t on l.tanque=t.id_tanque inner join cd_tipocombustivel as tp on l.tipocombustivel_fk=tp.id_tipocombustivel where l.loja_fk=${idLoja} and l.tipocombustivel_fk=${idTipoComb} and t.id_tanque=${idTanque}  order by l.lmccab_fk desc limit 1`
    });

    const tanqueMedicao = await useDB({
        query: `SELECT volumemedido FROM public.cd_tanque_medicao  where loja_fk=${idLoja}  and  movimento_fk=${idMovimento} and tanque=${tanque}   order by id_tanque_medicao desc `
    });

    const nfeDet = await useDB({
        query: `select numerodocfiscal_nfecab,descricao_tipcomb,quantidade,valorunitario ,valortotalitem  from nfe_detalhe as det  inner join cd_tipocombustivel as tp on tp.id_tipocombustivel=det.tipocombustivel_fk  inner join nfe_cabecalho as cab on cab.id_nfe_cabecalho=det.nfecab_fk   where nfecab_fk in (SELECT distinct(nfe_cabecalho_fk)  FROM nfe_docreferenciado as doc   where   doc.loja_fk=${idLoja}  and ecf_cupomcab_fk in(select id_cupomcab from ecf_cupomcab  where loja_fk=${idLoja} and status_cupom IN ('F','O') and movimento_fk=${idMovimento}))  and cab.loja_fk=${idLoja} and det.loja_fk=${idLoja} and statusnota_nfecab='5' and tipooperacao_nfecab='4'    order by descricao_tipcomb`
    });

    const cupomDetProd2 = await useDB({
        query: `SELECT nome, cpfcnpj,   (qtde_cupitem*valororig_cupitem  ) as origem , (valorfinal_cupitem) as venda, (valorfinal_cupitem  -qtde_cupitem*valorunit_cupitem) as desconto,coo_cupom      FROM public.ecf_cupomdet_prod AS d   inner join ecf_cupomcab as cab on cab.id_cupomcab=d.cupomcab_fk   inner join ecf_cupomcab_cliente as cli on cli.cupomcab_fk=d.cupomcab_fk   where status_cupitem='F' and d.loja_fk=${idLoja}   and status_cupom in ('F','O')   and cab.loja_fk=${idLoja}  and cli.loja_fk=${idLoja}   and movimento_fk=${idMovimento}   and valorunit_cupitem<valororig_cupitem order by cpfcnpj`
    });

    const cupomDetBico4 = await useDB({
        query: `SELECT nome, cpfcnpj,   (qtde_cupdetbic* valororig_cupdetbic  ) as origem , (qtde_cupdetbic*valorunit_cupdetbic) as venda, (qtde_cupdetbic* valororig_cupdetbic -qtde_cupdetbic*valorunit_cupdetbic) as desconto,coo_cupom      FROM public.ecf_cupomdet_bico AS d   inner join ecf_cupomcab as cab on cab.id_cupomcab=d.cupomcab_fk   inner join ecf_cupomcab_cliente as cli on cli.cupomcab_fk=d.cupomcab_fk   where  status_cupdetbic='F' and d.loja_fk=${idLoja}   and status_cupom in ('F','O')   and cab.loja_fk=${idLoja} and cli.loja_fk=${idLoja}   and movimento_fk=${idMovimento}   and valorunit_cupdetbic< valororig_cupdetbic order by cpfcnpj ;`
    });

    const cupomDetBico5 = await useDB({
        query: `SELECT  sum( descontoglobal_cupitem) as des   FROM public.ecf_cupomdet_bico  as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where status_cupdetbic='F'  and cab.loja_fk=${idLoja}  and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and tipo='V' `
    });

    const cupomDetBico6 = await useDB({
        query: `SELECT  sum( descontoglobal_cupitem) as des   FROM public.ecf_cupomdet_bico  as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where status_cupdetbic='F'  and cab.loja_fk=${idLoja}  and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and tipo='P'`
    });

    return { code: 200, results: { movimento, turnoPostoCombDet, abastecimentoQtd, abastecimentoEncerranteAntes, abastecimentoEncerranteDepois, cupomDetBico, abastecimentoValorUnit, cupomDetBico2, cupomDetBico3, movimentoTipoPag, cargaSangria, cargaSangria2, cargaSangria3, contasRecebr, cupomDetProd, cartaoMov, lmcEstoque, tanqueMedicao, tanqueMedicao, nfeDet, cupomDetProd2, cupomDetBico4, cupomDetBico5, cupomDetBico6 } }

};

const gerarrelatorioitens = async function ({ idLoja, idMovimento }) {

    const cupomDetProd = await useDB({
        query: `SELECT produto_fk,descricao_prod,qtde_cupitem, valorunit_cupitem,descontoglobal_cupitem,   (valorfinal_cupitem-descontoglobal_cupitem+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupitem ELSE 0 END)) as vf, coo_cupom,datahora_cupom FROM public.ecf_cupomdet_prod as det inner join cd_produto as p on p.id_prod=det.produto_fk   inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where status_cupitem='F' and cab.loja_fk=${idLoja} and det.loja_fk=${idLoja} and status_cupom in ('F','O') and movimento_fk=${idMovimento} order by datahora_cupom asc `
    });

    return { code: 200, results: { cupomDetProd } }

};

const gerarrelatoriocupons = async function ({ idLoja, idMovimento, idCupomCab, cooCupomPbm, numSerie }) {

    const movimento = await useDB({
        query: `SELECT id_movimento, datahoraabertura_mov, datahorafechamento_mov,  usuarioabertura_mov, usuariofechamento_mov FROM public.ecf_movimento  where loja_fk=${idLoja} and id_movimento=${idMovimento}`
    });

    const cupomCab = await useDB({
        query: `  SELECT datahora_cupom,coo_cupom,totalliquido_cupom,  sum(valorpago) as vp,sum(troco) as t,id_cupomcab  FROM ecf_cupomcab as cab  left join   public.ecf_cupomcab_tipopagto as tp on (cab.id_cupomcab=tp.cupomcab_fk   and tp.loja_fk=${idLoja} )  where cab.loja_fk=${idLoja}    and cab.status_cupom in ('F','O')  and cab.movimento_fk=${idMovimento} and cab.coo_cupom!=0  group by datahora_cupom,coo_cupom,totalliquido_cupom,id_cupomcab order by coo_cupom`
    });

    const cupomDetBico = await useDB({
        query: `  SELECT sum(valorfinal_cupdetbic-descontoglobal_cupitem+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupdetbic ELSE 0 END))  FROM  ecf_cupomdet_bico as det    inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk  where cab.loja_fk=${idLoja} and cab.status_cupom in ('F','O')  and cab.coo_cupom!=0  and det.status_cupdetbic='F' and cab.loja_fk=${idLoja} and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento} and det.cupomcab_fk=${idCupomCab} `
    });

    const cupomDetProd = await useDB({
        query: `SELECT sum((valorfinal_cupitem-descontoglobal_cupitem)+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupitem ELSE 0 END)) FROM  ecf_cupomdet_prod as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where cab.loja_fk=${idLoja} and cab.status_cupom in ('F','O')  and cab.coo_cupom!=0  and det.status_cupitem='F' and cab.loja_fk=${idLoja} and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and det.cupomcab_fk=${idCupomCab} `
    });

    const pbmDet = await useDB({
        query: `SELECT sum( valorministeriosaude_pbmdet)  FROM public.ecf_pbmdet as dET  inner join ecf_pbmcab as cab on cab.id_pbmcab=det.pbmcab_fk  where  det.loja_fk=${idLoja} and cab.loja_fk=${idLoja}  and coocupom_pbm=${cooCupomPbm}   and numserie='${numSerie}'  and status_cupom_pbm in ('F','O') and pbm_fk=5`
    });

    return { code: 200, results: { movimento, cupomCab, cupomDetBico, cupomDetProd, pbmDet } }

};

const gerarrelatorioqtd = async function ({ idMovimento, idLoja }) {

    const cupomDetBico = await useDB({
        query: `SELECT  det.bico_fk,numero_bic,descricao_tipcomb, sum(det.qtde_cupdetbic) as vendido, (select sum(qtd) from vd_abastecimentos where bico_fk=det.bico_fk and loja_fk=${idLoja} and status_abastecimento='F' and coo in (select coo_cupom from ecf_cupomcab where loja_fk=${idLoja} and movimento_fk=${idMovimento})) as abastecido, min(encerranteantes) as mi, max(encerrantedepois) as ma, (select sum(qtd) from vd_abastecimentos where bico_fk=det.bico_fk and loja_fk=${idLoja} and status_abastecimento='A' and coo in (select coo_cupom from ecf_cupomcab where loja_fk=${idLoja} and movimento_fk=${idMovimento})) as afericao, (max(encerrantedepois)-min(encerranteantes)) as difencerrante, ((max(encerrantedepois)-min(encerranteantes))-sum(det.qtde_cupdetbic) ) as diferentevendido, ((max(encerrantedepois)-min(encerranteantes))-sum(ab.qtd) ) as diferenteab   FROM public.ecf_cupomdet_bico as det   inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk   inner join vd_abastecimentos as ab on ab.id_abastecimentos=det.abastecimento_fk   inner join cd_bico as b on b.id_bico=det.bico_fk  inner join cd_tanque as t on b.tanque_fk=t.id_tanque   inner join cd_tipocombustivel as tp on tp.id_tipocombustivel=t.tipocombustivel_fk   where det.loja_fk=${idLoja}  and cab.loja_fk=${idLoja}   and ab.loja_fk=${idLoja}  and b.loja_fk=${idLoja}  and t.loja_fk=${idLoja}   and det.bico_fk=ab.bico_fk   and status_cupdetbic='F'   and movimento_fk=${idMovimento} and status_cupom in ('F','O','D')   group by det.bico_fk,numero_bic,descricao_tipcomb   order by det.bico_fk`
    });

    return { code: 200, results: { cupomDetBico } }

};

const gerarrelatorioperiodo = async function ({ idLoja, idMovimento, idBico, dataAltera, numserieEcf, idTipoComb, idTanque, tanque }) {

    const movimento = await useDB({
        query: `SELECT id_movimento, datahoraabertura_mov, datahorafechamento_mov,  usuarioabertura_mov, usuariofechamento_mov FROM public.ecf_movimento  where loja_fk=${idLoja} and id_movimento=${idMovimento}`
    });

    const turnoPostoCombDet = await useDB({
        query: `SELECT b.numero_bic, tp.descricao_tipcomb, qtdabertura,  qtdfechamento, afericao,b.id_bico,tp.id_tipocombustivel,t.id_tanque FROM public.cd_turnopostocombdet as det inner join cd_bico as b on b.id_bico=det.bico_fk inner join cd_tanque as t on t.id_tanque=b.tanque_fk inner join cd_tipocombustivel as tp on t.tipocombustivel_fk=tp.id_tipocombustivel where det.loja_fk=${idLoja}  and b.loja_fk=${idLoja}  and t.loja_fk=${idLoja}  and det.movimento_fk=${idMovimento} order by b.numero_bic asc`
    });

    const abastecimentoQtd = await useDB({
        query: `SELECT sum(qtd) as total FROM public.vd_abastecimentos  where loja_fk=${idLoja} and bico_fk=${idBico} and (dataaltera >=  '${dataAltera}') and numserieecf='${numserieEcf}' and status_abastecimento='A'`
    });

    const abastecimentoEncerranteAntes = await useDB({
        query: `SELECT min(encerranteantes) as total FROM public.vd_abastecimentos  where loja_fk=${idLoja} and bico_fk=${idBico} and (dataaltera >=  '${dataAltera}') and numserieecf='${numserieEcf}' and (status_abastecimento='A' or status_abastecimento='F')`
    });

    const abastecimentoEncerranteDepois = await useDB({
        query: `SELECT min(encerranteDepois) as total FROM public.vd_abastecimentos  where loja_fk=${idLoja} and bico_fk=${idBico} and (dataaltera >=  '${dataAltera}') and numserieecf='${numserieEcf}' and (status_abastecimento='A' or status_abastecimento='F')`
    });

    const cupomDetBico = await useDB({
        query: `SELECT  sum(qtde_cupdetbic) as lt, avg(valorunit_cupdetbic) as vu  FROM public.ecf_cupomdet_bico  as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where status_cupdetbic='F'  and cab.loja_fk=${idLoja} and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and bico_fk=${idBico} `
    });

    const cupomDetBico2 = await useDB({
        query: `SELECT  sum(qtde_cupdetbic) as lt, sum(valorfinal_cupdetbic) as vt  FROM public.ecf_cupomdet_bico  as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where status_cupdetbic='F'  and cab.loja_fk=${idLoja}  and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and bico_fk=${idBico} and cab.tipo='V' `
    });



    const cupomDetBico3 = await useDB({
        query: `SELECT  sum(qtde_cupdetbic) as lt,  sum(valorfinal_cupdetbic) as vt  FROM public.ecf_cupomdet_bico  as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk where status_cupdetbic='F'  and cab.loja_fk=${idLoja}  and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and bico_fk=${idBico} and cab.tipo='P'`
    });

    const movimentoTipoPag = await useDB({
        query: `SELECT d.tipopagto_fk,t.descricao_tipopag,    vlmov as  valorvendas, vlinformado as valorcaixa,(vlmov-vlinformado) as diferenca  FROM public.ecf_movimento_tipopag as d  inner join cd_tipopagto  as t on t.id_tipopagto=d.tipopagto_fk  where d.loja_fk=${idLoja}  and d.movimento_fk=${idMovimento}  order by d.tipopagto_fk asc`
    });

    const cargaSangria = await useDB({
        query: `SELECT  SUM(valor_carsan) as totalc  FROM public.ecf_cargasangria  where loja_fk=${idLoja} and  movimento_fk=${idMovimento} and tipo_carsan='C' `
    });

    const cargaSangria2 = await useDB({
        query: `SELECT  motivo_carsan,valor_carsan FROM public.ecf_cargasangria  where loja_fk=${idLoja} and  movimento_fk=${idMovimento} and tipo_carsan='S' `
    });

    const cupomDetProd = await useDB({
        query: `SELECT  gp.id_grpprod,gp.descricao_grpprod, sum((valorfinal_cupitem-descontoglobal_cupitem)+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupitem ELSE 0 END)) as total FROM public.ecf_cupomdet_prod  as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk inner join cd_produto as p on p.id_prod=det.produto_fk inner join cd_grupoproduto as gp on gp.id_grpprod=p.grupoprod_fk where status_cupitem='F'  and cab.loja_fk=${idLoja}   and det.loja_fk=${idLoja}  and cab.movimento_fk=${idMovimento}  and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  group by  gp.id_grpprod,gp.descricao_grpprod`
    });

    const cartaoMov = await useDB({
        query: `SELECT  cab.datahora_cupom,cab.coo_cupom, descricao_cartao,tipocartao_cartmov,   valorbruto_cartmov FROM public.ecf_cartaomov as p inner join ecf_cupomcab as cab on cab.id_cupomcab=p.cupomcab_fk inner join cd_cartao as c on c.id_cartao=p.cartao_fk where cab.loja_fk=${idLoja} and  movimento_fk=${idMovimento}  and p.loja_fk=${idLoja}   and cab.status_cupom in ('F','O') and cab.coo_cupom!=0   order by cab.datahora_cupom asc`
    });

    const lmcEstoque = await useDB({
        query: `SELECT  tanque,tp.descricao_tipcomb, estoqueinicial,  estoquefinal,numero_tanque FROM public.cd_lmcestoque as l inner join cd_tanque as t on l.tanque=t.id_tanque inner join cd_tipocombustivel as tp on l.tipocombustivel_fk=tp.id_tipocombustivel where l.loja_fk=${idLoja}  and t.loja_fk=${idLoja}  and l.tipocombustivel_fk=${idTipoComb} and t.id_tanque=${idTanque}  order by l.lmccab_fk desc limit 1`
    });

    const tanqueMedicao = await useDB({
        query: `SELECT volumemedido  FROM public.cd_tanque_medicao  where loja_fk=${idLoja}  and  movimento_fk=${idMovimento} and tanque=${tanque}   order by id_tanque_medicao desc `
    });

    return { code: 200, results: { movimento, turnoPostoCombDet, abastecimentoQtd, abastecimentoEncerranteAntes, abastecimentoEncerranteDepois, cupomDetBico, cupomDetBico2, cupomDetBico, movimentoTipoPag, cargaSangria, cargaSangria2, cupomDetProd, cartaoMov, lmcEstoque, tanqueMedicao } }

};

const listarTipos = async function ({ idLoja, idMovimento }) {

    const movimentoTipoPag = await useDB({
        query: `select * from Ecf_Movimento_Tipopag where loja_fk=${idLoja} and movimento_fk=${idMovimento} order by tipopagto_Fk asc`
    });

    const cargaSangria = await useDB({
        query: `select * from Ecf_Cargasangria where loja_fk=${idLoja} and movimento_fk=${idMovimento} and (tipo_Carsan='S' or tipo_Carsan='E') `
    });

    const cargaSangria2 = await useDB({
        query: `select * from Ecf_Cargasangria where loja_fk=${idLoja} and movimento_fk=${idMovimento} and tipo_Carsan='C' `
    });

    const cargaSangria3 = await useDB({
        query: `select * from Ecf_Cargasangria where loja_fk=${idLoja} and movimento_fk=${idMovimento} and tipo_Carsan='R' `
    });


    return { code: 200, results: { movimentoTipoPag, cargaSangria, cargaSangria2, cargaSangria3 } }

};

const salvar2 = async function ({ idLoja, idMovTipoPag, idMovimento, idTipoPagto }) {

    const movimentoTipoPag = await useDB({
        query: `select * from Ecf_Movimento_Tipopag where loja_fk=${idLoja} and id_Movimento_Tipopag=${idMovTipoPag}`
    });

    const movimentoTipoPag2 = await useDB({
        query:`select * from  Ecf_Movimento_Tipopag where loja_fk=${idLoja} and movimento_fk=${idMovimento} and  tipopagto_Fk=${idTipoPagto} `
    });

    const idMovimentoTipoPag = await useDB({
        query:`select id_Movimento_Tipopag  from  Ecf_Movimento_Tipopag where loja_fk=${idLoja} order by  id_Movimento_Tipopag desc `
    });

    return { code: 200, results: { movimentoTipoPag, movimentoTipoPag2, idMovimentoTipoPag } }

};

const listarvendas = async function({ idLoja, idMovimento }){ 

    const cupomCab = await useDB({ 
    query: `select * from Ecf_Cupomcab where loja_fk=${idLoja} and status_Cupom IN ('F','O') and movimento_fk=${idMovimento}`
 }); 

 return { code: 200, results: { cupomCab }}  
    
};

module.exports = {
    ultimoturno,
    listarx,
    listardet,
    listardet2,
    listar,
    tarefacorrigitipospag,
    processarFiltro,
    salvar,
    pesquisarPorColuna,
    preencherListaBusca,
    gerarrelatorio,
    gerarrelatorioitens,
    gerarrelatoriocupons,
    gerarrelatorioqtd,
    gerarrelatorioperiodo,
    listarTipos,
    salvar2,
    listarvendas
}