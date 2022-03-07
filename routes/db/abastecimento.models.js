const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

/**
 *     public void init() {
        this.textoBusca = "";
        mostracartao = false;
        todaslojas = false;
        this.alvo = new ArrayList<>();
        //preenche os campos do filtro com campos da tabela
        this.campos = new HashMap<>();

        //inserir a lista de colunas(fonte) e a lista de colunas selecionadas(alvo)
        this.colunas = new DualListModel<>(this.fonte, this.alvo);
        this.disabled = true;
        this.ultimo = true;
        this.posicao = 0;
        this.insercao = false;
        this.ab = new VdAbastecimentos();
        this.abb = new VdAbastecimentos();
        this.abs = new VdAbastecimentos();
        this.escolha = "1";
        //coluna inicial de pesquisa
        this.colunaBusca = "";
        //verifica a permisso do usuario nessa pagina
        this.permissao = Util.verificaPermissaoDaPagina("abs");
        this.comparacoes = new ArrayList<>();
        this.filtrosAdicionados = new ArrayList<>();

        lojaLogada = (CfLoja) Util.pegarObjetoDaSessao("loja");

        Calendar primeiroDia = Calendar.getInstance();
        primeiroDia.set(Calendar.DAY_OF_MONTH, 1);

        Calendar ultimoDia = Calendar.getInstance();
        ultimoDia.add(Calendar.MONTH, 1);
        ultimoDia.set(Calendar.DAY_OF_MONTH, 1);
        ultimoDia.add(Calendar.DAY_OF_MONTH, -1);

        try {
            String di = sd.format(Calendar.getInstance().getTime());
            Date di2 = sdh.parse(di + " 00:00:00");
            Date df2 = sdh.parse(di + " 23:59:59");
            // primeira data do mes atual
            this.datai = di2;
            // ultima data do mes atual
            this.dataf = df2;
        } catch (Exception e) {
            e.printStackTrace();
        }

        sit = "0";
        cartaoi = "0";
        tanq = "todos";
        tanqs = new ArrayList<>();
        String imp = "SELECT vo\n"
                + "  FROM CdTanque vo where vo.lojaFk=" + lojaLogada.getIdLoja() + " "
                + " order by numeroTanque asc";
        tanqs = new TanqueRN().listarTanqueHQL(imp);

        bic = "todos";
        bics = new ArrayList<>();
        String impb = "SELECT vo\n"
                + "  FROM CdBico vo where vo.lojaFk=" + lojaLogada.getIdLoja() + " "
                + " order by numeroBic asc";
        bics = new BicoRN().listarBicoHQL(impb);
        List<Object> cartaox = new CargoRN().listarobjsql("select identfid "
                + " from vd_abastecimentos \n"
                + " where loja_fk=" + lojaLogada.getIdLoja() + " "
                //    + " and cast(datahora as date)='" + sd.format(Calendar.getInstance().getTime()) + "'\n"
                + " and identfid!=''\n"
                + " and identfid is not null"
                + " group by identfid");
        if (cartao == null) {
            cartao = new ArrayList<>();
        }
        for (Object object : cartaox) {
            cartao.add(object.toString());
        }

        listar();

    }

*/

const verificaab = async function({ idLoja, dataInicial, dataFinal, id_abastecimentos, loja_fk, bico_fk, datahora, encerranteantes, qtd, encerrantedepois, valorunit, valorfinal, coo, idCupomBico, idAbastecimento}){ 

    let statusInserir = "";
    let statusUpdate = "";

    const verifica = await useDB({ 
        query: `SELECT det.bico_fk, qtde_cupdetbic,  valororig_cupdetbic, valorfinal_cupdetbic, serieecf_cupom,coo_cupom,datahora_cupom,id_cupomdet_bico,(SELECT max(encerrantedepois)  FROM public.vd_abastecimentos where bico_fk=det.bico_fk and datahora<=datahora_cupom and loja_fk=det.loja_fk) as encerrante,abastecimento_fk,id_abastecimentos FROM public.ecf_cupomdet_bico as det inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk left join vd_abastecimentos as ab on (ab.coo=cab.coo_cupom and ab.numserieecf=cab.serieecf_cupom and ab.bico_fk=det.bico_fk and det.qtde_cupdetbic=ab.qtd) where status_cupdetbic='F'  and det.loja_fk= ${idLoja} and cab.loja_fk=${idLoja} and abastecimento_fk is null   and (cast(datahora as date) between '${dataInicial}' and '${dataFinal}' )  and status_cupom in ('F','O') order by id_cupomdet_bico desc`
    }); 

    /**
     *  String aj = "SELECT det.bico_fk, qtde_cupdetbic,  valororig_cupdetbic, valorfinal_cupdetbic,\n"
                + "serieecf_cupom,coo_cupom,datahora_cupom,id_cupomdet_bico,"
                + "(SELECT max(encerrantedepois)  FROM public.vd_abastecimentos\n"
                + "where bico_fk=det.bico_fk and datahora<=datahora_cupom and loja_fk=det.loja_fk) as encerrante,"
                + "abastecimento_fk,id_abastecimentos\n"
                + "FROM public.ecf_cupomdet_bico as det\n"
                + "inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk\n"
                + "left join vd_abastecimentos as ab on (ab.coo=cab.coo_cupom and ab.numserieecf=cab.serieecf_cupom and ab.bico_fk=det.bico_fk and det.qtde_cupdetbic=ab.qtd)\n"
                + "where status_cupdetbic='F' \n"
                + "and det.loja_fk= " + lojaLogada.getIdLoja() + "\n"
                + "and cab.loja_fk=" + lojaLogada.getIdLoja() + "\n"
                + "and abastecimento_fk is null\n"
                + "  and (cast(datahora as date) between '" + sd.format(datai) + "' and '" + sd.format(dataf) + "' ) \n"
                + "and status_cupom in ('F','O')\n"
                + "order by id_cupomdet_bico desc";
     */

    const verfica2 = await useDB({ 
        query: `SELECT max(id_abastecimentos)+1 as idc FROM vd_abastecimentos where loja_fk=${idLoja}`
    });

    /**
     * Integer idab = (Integer) new CargoRN().porSql2semcache("SELECT max(id_abastecimentos)+1 as idc\n"
                        + "  FROM public.vd_abastecimentos\n"
                        + "  where loja_fk=" + lojaLogada.getIdLoja() + " ");
     */

    const inserir = await useDB({ 
        query: `INSERT INTO public.vd_abastecimentos(id_abastecimentos, loja_fk, bico_fk, datahora, encerranteantes, qtd, encerrantedepois, valorunit, valorfinal, status_abastecimento, coo, numnota, numserieecf, estacaosel, hash_abastecimento, selecionado) VALUES ( 
        ${id_abastecimentos},
        ${loja_fk}, 
        ${bico_fk},
        '${datahora}',
        ${encerranteantes},
        ${qtd},
        ${encerrantedepois},
        ${valorunit},
        ${valorfinal},
        'F',
        ${coo},
        0,
        'serieecf',
        0,
        '',
        'S')`
    }).then(()=>{
        statusInserir = "Inserido com sucesso"
    }).catch((err)=>{
        statusInserir = err.message
    });

    /**
     * String jj = "INSERT INTO public.vd_abastecimentos(\n"
                        + "id_abastecimentos, loja_fk, bico_fk, datahora, encerranteantes, \n"
                        + "qtd, encerrantedepois, valorunit, valorfinal, status_abastecimento, \n"
                        + "coo, numnota, numserieecf, estacaosel, hash_abastecimento, selecionado)\n"
                        + "    VALUES (" + idab + ","
                        + " " + lojaLogada.getIdLoja() + ","
                        + " " + bico + ","
                        + "'" + sdh.format(datah) + "',"
                        + " " + enc + ", "
                        + "" + qtd + ", "
                        + " " + (enc.doubleValue() + qtd.doubleValue()) + ","
                        + " " + vu + ","
                        + " " + vf + ","
                        + " 'F',"
                        + " " + coo + ", "
                        + "0,"
                        + " '" + serieecf + "',"
                        + " 0,"
                        + " '',"
                        + " 'S');";
     */

    const update = await useDB({ 
        query:  `UPDATE public.ecf_cupomdet_bico SET abastecimento_fk=${idAbastecimento} WHERE id_cupomdet_bico=${idCupomBico} and loja_fk=${idLoja}`
    }).then(()=>{
        statusUpdate = "Atualizado com sucesso"
    }).catch((err)=>{
        statusUpdate = err.message
    });
    
    /**
     * new CargoRN().executarconsultacomit("UPDATE public.ecf_cupomdet_bico\n"
                        + "   SET abastecimento_fk=" + abid + "\n"
                        + " WHERE id_cupomdet_bico=" + iddet + " and loja_fk=" + lojaLogada.getIdLoja() + " ");
     */

 return { code: 200, results: { verifica, verfica2, statusInserir, statusUpdate }}  

 //private void verificaab() throws ParseException, NumberFormatException {
    
};


//   public void listar() {

//         /*  try {

//             verificaab();
//         } catch (Exception e) {
//             e.printStackTrace();
//             Util.logerp(e);
//         }*/
//         bicos = new ArrayList<>();
//         tanques = new ArrayList<>();

//         /* String kl = "  SELECT id_cupomcab,totalitens_cupom,\n"
//                 + " (select count(id_cupomdet_bico) from ecf_cupomdet_bico where loja_fk=" + lojaLogada.getIdLoja() + " and cupomcab_fk=cab.id_cupomcab and status_cupdetbic='F') as totalbicof,\n"
//                 + " (select count(id_cupomdet_bico) from ecf_cupomdet_bico where loja_fk=" + lojaLogada.getIdLoja() + " and cupomcab_fk=cab.id_cupomcab ) as totalbico,"
//                 + " (select count(id_cupomdet_prod) from ecf_cupomdet_prod where loja_fk=" + lojaLogada.getIdLoja() + "and cupomcab_fk=cab.id_cupomcab and status_cupitem='F') as totalprodf,\n"
//                 + " (select count(id_cupomdet_prod) from ecf_cupomdet_prod where loja_fk=" + lojaLogada.getIdLoja() + " and cupomcab_fk=cab.id_cupomcab ) as totalprod\n"
//                 + "  FROM ecf_cupomcab as cab \n"
//                 + "  where cab.loja_fk=" + lojaLogada.getIdLoja() + ""
//                 + "  and (cast(datahora_cupom as date) between '" + sd.format(datai) + "' and '" + sd.format(dataf) + "' )\n"
//                 + "  and cab.status_cupom in ('F','O') \n"
//                 + "  order by coo_cupom asc";
//         List<Object[]> ak = new CargoRN().pegarListaObjeto2sql(kl);
//         for (Object[] o : ak) {
//             int idcupom = Integer.valueOf(o[0].toString());
//             BigDecimal totalitens = new BigDecimal(o[1].toString());
//             BigDecimal totalitensf = new BigDecimal(o[2].toString());
//             BigDecimal totalitensb = new BigDecimal(o[3].toString());

//             BigDecimal totalitensfp = new BigDecimal(o[4].toString());
//             BigDecimal totalitensbp = new BigDecimal(o[5].toString());

//             if (totalitens.doubleValue() == (totalitensb.doubleValue() + totalitensbp.doubleValue())
//                     && totalitens.doubleValue() != (totalitensf.doubleValue() + totalitensfp.doubleValue())) {
//                 System.out.println("o");
//                 new CargoRN().executarconsultacomit("UPDATE public.ecf_cupomdet_bico\n"
//                         + "   SET  status_cupdetbic='F'\n"
//                         + " WHERE loja_fk=" + lojaLogada.getIdLoja() + " and  cupomcab_fk=" + idcupom + "");
//             }

//         }*/
//         String o = "";
//         if (!sit.equals("0")) {
//             o = " and vo.statusAbastecimento='" + sit + "' ";
//         }
//         String ci = "";
//         if (!cartaoi.equals("0")) {
//             ci = " and vo.identfid='" + cartaoi + "' ";
//         }

//         String l = "";

//         String tt = "";
//         String tb = "";
//         if (!todaslojas) {
//             l = " vo.cfLoja.idLoja=" + lojaLogada.getIdLoja() + " ";
//             if (!tanq.equals("todos")) {
//                 tt = " and vo.bicoFk.tanqueFk.cdTanquePK.idTanque=" + tanq + ""
//                         + " and vo.bicoFk.tanqueFk.lojaFk.idLoja=" + lojaLogada.getIdLoja() + "  ";
//             } else {
//                 tt = " and vo.bicoFk.tanqueFk.lojaFk.idLoja=" + lojaLogada.getIdLoja() + "  ";
//             }

//             if (!bic.equals("todos")) {
//                 tb = " and vo.bicoFk.cdBicoPK.idBico=" + bic + " "
//                         + " and vo.bicoFk.lojaFk.idLoja=" + lojaLogada.getIdLoja() + "  ";
//             } else {
//                 tb = " and vo.bicoFk.lojaFk.idLoja=" + lojaLogada.getIdLoja() + "  ";
//             }
//         } else {
//             l = " 1=1 ";
//             if (!tanq.equals("todos")) {
//                 tt = " and vo.bicoFk.tanqueFk.cdTanquePK.idTanque=" + tanq + " ";
//             }
//             if (!bic.equals("todos")) {
//                 tb = " and vo.bicoFk.cdBicoPK.idBico=" + bic + " ";
//             }
//         }

//         String turnox = "";
//         String data = "";
//         if (turno != null) {
//             if (turno.getEcfMovimentoPK().getIdMovimento() != null) {
//                 turnox = " and coo in (select vo.cooCupom from EcfCupomcab vo"
//                         + " where vo.ecfMovimento.ecfMovimentoPK.idMovimento=" + turno.getEcfMovimentoPK().getIdMovimento() + ""
//                         + " and vo.cfLoja.idLoja=" + turno.getCfLoja().getIdLoja() + ""
//                         + " and statusCupom in ('F','O','D')) ";
//                 data = "";
//             } else {
//                 data = " and (vo.datahora  between '" + sdh.format(datai) + "' and '" + sdh.format(dataf) + "') ";
//             }
//         } else {
//             data = " and (vo.datahora  between '" + sdh.format(datai) + "' and '" + sdh.format(dataf) + "') ";
//         }

//         AbastecimentosRN abx = new AbastecimentosRN();
//         String g = "select vo from  VdAbastecimentos vo"
//                 + " where " + l
//                 + o + tt + tb
//                 + data
//                 + turnox
//                 + ci
//                 + " order by vo.datahora desc";
//         System.out.println(g);
//         lista = abx.listarPorHqlsemcache(g);
//         totalp = BigDecimal.ZERO;
//         totalf = BigDecimal.ZERO;
//         totalpv = BigDecimal.ZERO;
//         totalfv = BigDecimal.ZERO;
//         totala = BigDecimal.ZERO;
//         totalcupom = BigDecimal.ZERO;

//         for (VdAbastecimentos v : lista) {
//             switch (v.getStatusAbastecimento()) {
//                 case "P":
//                     totalp = totalp.add(v.getQtd());
//                     totalpv = totalpv.add(v.getValorfinal());
//                     break;
//                 case "A":
//                     totala = totala.add(v.getQtd());
//                     break;
//                 case "F":
//                     /* String hx = "SELECT  id_cupomcab,status_cupom,totalliquido_cupom,datahora_cupom\n"
//                             + "  FROM public.ecf_cupomcab\n"
//                             + "  where serieecf_cupom='" + v.getNumserieecf() + "'"
//                             + "  and  coo_cupom=" + v.getCoo() + " "
//                             + "  and loja_fk=" + v.getCfLoja().getIdLoja() + ""
//                             + " ";
//                     Object[] dd = new CargoRN().pegarListaObjectsql(hx);
//                     if (dd != null) {
//                         try {
//                             if (dd[3] != null) {
//                                 Date gc = sdh.parse(dd[3].toString());
//                                 String gd = sd.format(gc);
//                                 String ad = sd.format(v.getDatahora());
//                                 if (!gd.equals(ad)) {
//                                     new CargoRN().executarconsultacomit("UPDATE public.vd_abastecimentos\n"
//                                             + "   SET  datahora='" + dd[3].toString() + "'\n"
//                                             + " WHERE id_abastecimentos=" + v.getAbastecimentosPK().getIdAbastecimentos() + ""
//                                             + "  and loja_fk=" + v.getCfLoja().getIdLoja() + "");
//                                     v.setDatahora(gc);
//                                 }
//                             }
//                         } catch (Exception e) {
//                             Util.logerp(e);
//                         }
//                     }
//                     if (dd != null) {
//                         if (dd[3] != null) {
//                             if (!dd[1].toString().equals("F")) {
//                                 new CargoRN().executarconsultacomit("UPDATE public.vd_abastecimentos\n"
//                                         + "   SET  status_abastecimento='R'\n"
//                                         + " WHERE id_abastecimentos=" + v.getAbastecimentosPK().getIdAbastecimentos() + ""
//                                         + "  and loja_fk=" + v.getCfLoja().getIdLoja() + "");
//                                 v.setStatusAbastecimento("R");
//                             } else {
//                                 totalf = totalf.add(v.getQtd());
//                                 totalfv = totalfv.add(v.getValorfinal());
//                             }
//                         } else {
//                             totalf = totalf.add(v.getQtd());
//                             totalfv = totalfv.add(v.getValorfinal());
//                         }
//                     } else {
//                         totalf = totalf.add(v.getQtd());
//                         totalfv = totalfv.add(v.getValorfinal());
//                     }*/

//                     totalf = totalf.add(v.getQtd());
//                     totalfv = totalfv.add(v.getValorfinal());

//                     if (mostrardt) {
//                         String h = "SELECT  datahora_cupom\n"
//                                 + "  FROM public.ecf_cupomcab\n"
//                                 + "  where serieecf_cupom='" + v.getNumserieecf() + "'"
//                                 + "  and  coo_cupom=" + v.getCoo() + " "
//                                 + "  and loja_fk=" + v.getCfLoja().getIdLoja() + " ";
//                         Date dh = (Date) new CargoRN().porSql2semcache(h);
//                         if (dh != null) {
//                             v.setDatahoravenda(dh);
//                         }

//                     }

//                     break;

//             }
//         }

//         try {

//             String ll = "";
//             if (!todaslojas) {
//                 ll = " v.loja_fk=" + lojaLogada.getIdLoja() + " ";
//             } else {
//                 ll = " 1=1 ";
//             }

//             String tts = "";
//             if (!tanq.equals("todos")) {
//                 tts = " and t.id_tanque=" + tanq + " ";
//             }

//             String tbs = "";
//             if (!bic.equals("todos")) {
//                 tbs = " and b.id_bico=" + bic + " ";
//             }

//             String st = "";
//             if (!sit.equals("0")) {
//                 st = " and v.status_abastecimento='" + sit + "' ";
//             }

//             String ci1 = "";
//             if (!cartaoi.equals("0")) {
//                 ci1 = " and v.identfid='" + cartaoi + "' ";
//             }

//             String data1 = "";
//             String turnox1 = "";

//             if (turno != null) {
//                 if (turno.getEcfMovimentoPK().getIdMovimento() != null) {
//                     turnox1 = " and coo in (select coo_cupom from ecf_cupomcab "
//                             + " where movimento_fk=" + turno.getEcfMovimentoPK().getIdMovimento() + ""
//                             + " and loja_fk=" + turno.getCfLoja().getIdLoja() + " "
//                             + " and status_cupom in ('F','O','D')) ";
//                     data1 = "";
//                 } else {
//                     data1 = " and (datahora  "
//                             + " between '" + sdh.format(datai) + "' and '" + sdh.format(dataf) + "') ";
//                 }
//             } else {
//                 data1 = " and (datahora  "
//                         + " between '" + sdh.format(datai) + "' and '" + sdh.format(dataf) + "') ";
//             }

//             String b = "SELECT numero_bic,tp.descricao_tipcomb,sum(qtd) as l ,sum(valorfinal) as v,"
//                     + "  v.bico_fk "
//                     + " FROM public.vd_abastecimentos as v\n"
//                     + "inner join cd_bico as b on (b.id_bico=v.bico_fk and b.loja_fk=v.loja_fk)\n"
//                     + "inner join cd_tanque as t on (b.tanque_fk=t.id_tanque and b.loja_fk=t.loja_fk)\n"
//                     + "inner join cd_tipocombustivel as tp on t.tipocombustivel_fk=tp.id_tipocombustivel\n"
//                     + "where  " + ll
//                     + data1
//                     + turnox1
//                     + ci1
//                     + " " + tbs + tts
//                     + " and status_abastecimento!='R' " + st + " \n"
//                     + "group by numero_bic,tp.descricao_tipcomb,v.bico_fk\n"
//                     + "order by numero_bic;";
//             List<Object[]> bb = abx.pegarListaObject2sql(b);
//             CargoRN rn = new CargoRN();
//             for (Object[] oo : bb) {
//                 To t = new To();
//                 t.setId(bicos.size() + 1);
//                 t.setNumero(Integer.valueOf(oo[0].toString()));
//                 t.setTipo(oo[1].toString());
//                 t.setLitros(Double.valueOf(oo[2].toString()));
//                 t.setValor(Double.valueOf(oo[3].toString()));
//                 /*BigDecimal ei = (BigDecimal) rn.porSql2semcache("SELECT  encerranteantes "
//                         + " from vd_abastecimentos\n"
//                         + "  where bico_fk=" + oo[4].toString() + " \n"
//                         + "  and loja_fk=" + lojaLogada.getIdLoja() + " "
//                         + " and status_abastecimento in ('F','P','A')"
//                         + "  " + data1
//                         + "  order by datahora asc");
//                 if (ei == null) {
//                     ei = BigDecimal.ZERO;
//                 }
//                 t.setEi(ei.doubleValue());
//                 //
//                 BigDecimal ef = (BigDecimal) rn.porSql2semcache("SELECT  encerrantedepois "
//                         + " from vd_abastecimentos\n"
//                         + "  where bico_fk=" + oo[4].toString() + " \n"
//                         + "  and loja_fk=" + lojaLogada.getIdLoja() + " "
//                         + " and status_abastecimento in ('F','P','A')"
//                         + " " + data1
//                         + "  order by datahora desc");
//                 if (ef == null) {
//                     ef = BigDecimal.ZERO;
//                 }
//                 t.setEf(ef.doubleValue());*/
//                 bicos.add(t);
//             }

//             String bt = "SELECT numero_tanque,tp.descricao_tipcomb,sum(qtd) as l ,sum(valorfinal) as v "
//                     + " FROM public.vd_abastecimentos as v\n"
//                     + "inner join cd_bico as b on (b.id_bico=v.bico_fk and b.loja_fk=v.loja_fk)\n"
//                     + "inner join cd_tanque as t on (b.tanque_fk=t.id_tanque and b.loja_fk=t.loja_fk)\n"
//                     + "inner join cd_tipocombustivel as tp on t.tipocombustivel_fk=tp.id_tipocombustivel\n"
//                     + "where  " + ll
//                     + data1
//                     + turnox1
//                     + ci1
//                     + " " + tbs + tts
//                     + " and status_abastecimento!='R' " + st + " "
//                     + "group by numero_tanque,tp.descricao_tipcomb\n"
//                     + "order by numero_tanque;";
//             List<Object[]> bbt = abx.pegarListaObject2sql(bt);
//             for (Object[] oo : bbt) {
//                 To t = new To();
//                 t.setId(tanques.size() + 1);
//                 t.setNumero(Integer.valueOf(oo[0].toString()));
//                 t.setTipo(oo[1].toString());
//                 t.setLitros(Double.valueOf(oo[2].toString()));
//                 t.setValor(Double.valueOf(oo[3].toString()));
//                 tanques.add(t);
//             }

//         } catch (Exception e) {
//             Util.logerp(e);
//             Util.abrirAvisos("Erro: " + e.toString());
//         }
// }

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM Vd_Abastecimentos WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 
 
    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM Vd_Abastecimentos WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
    })

    /**
     * if (filtro.getComparacao().equals("Contendo")) {
            comparacaoLike = " LIKE '%" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

 return { code: 200, results: { comecandoCom, contendo }}  

 //  public void processarFiltro() {

/**
 * //string da consulta
        StringBuilder sb = new StringBuilder("SELECT vo FROM VdAbastecimentos vo");
 */

};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }){ 

    const pesquisa = await useDB({ 
        query: `SELECT * FROM Vd_Abastecimentos WHERE UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D")}%' ORDER BY ${colunaBusca} ASC`
    }); 

 return { code: 200, results: { pesquisa }}  
    
};

const logo = async function({ idLoja }){ 

    const foto = await useDB({ 
        query: `select logo_loja from cf_loja where id_loja=${idLoja}`
    }); 

 return { code: 200, results: { foto }}  
    
};
 

module.exports = {
    verificaab,
    processarFiltro,
    pesquisarPorColuna,
    logo
}