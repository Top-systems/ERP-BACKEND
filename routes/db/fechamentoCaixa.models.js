const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

/* public void init() {
    lojalogada = (CfLoja) Util.pegarObjetoDaSessao("loja");
    outrassaidas = new ArrayList<>();
    datahoje = Calendar.getInstance().getTime();
    datahojes = sd.format(datahoje);

    Calendar a = Calendar.getInstance();
    a.add(Calendar.DATE, -1);
    dataontem = a.getTime();
    dataontems = sd.format(dataontem);
    datainicial = Calendar.getInstance().getTime();
    datafinal = Calendar.getInstance().getTime();

    String hql = "select vo.ecfCupomcab.datahoraCupom " + " from EcfCupomcabTipopagto vo"
            + " where vo.ecfCupomcab.cfLoja=" + lojalogada.getIdLoja() + "" + " and vo.ecfCupomcab.statusCupom in ('F','O','D') "
            + " and (vo.tipopagtoFk.idTipopagto!=9 or vo.tipopagtoFk.idTipopagto!=8)"
            + " order by vo.ecfCupomcab.datahoraCupom asc";
    primeiravenda = (Date) new EcfCupomCabRN().pegarObject(hql);

    Session sessao;
    Transaction tx = null;
    try {
        sessao = Util.pegaSessaoAtual();
        tx = sessao.beginTransaction();

        String hqlx = "select vo from FnCaixa vo" + " where vo.cfLoja=" + lojalogada.getIdLoja() + ""
                + " and vo.diaCaixa='" + sd.format(primeiravenda) + "'";
        FnCaixa c = (FnCaixa) sessao.createQuery(hqlx).setMaxResults(1).setCacheable(true).uniqueResult();

        if (c == null && primeiravenda != null) {
            calcularpratras = true;
            Calendar calendar = new GregorianCalendar();
            calendar.setTime(primeiravenda);
            int pos = 0;
            while (calendar.getTime().before(Calendar.getInstance().getTime())) {
                Date result = calendar.getTime();
                //System.out.println(sd.format(result));

                String hqlxt = "select vo from FnCaixa vo" + " where vo.cfLoja=" + lojalogada.getIdLoja() + ""
                        + " and vo.diaCaixa='" + sd.format(result) + "'";
                FnCaixa ct = (FnCaixa) sessao.createQuery(hqlxt).setMaxResults(1).setCacheable(true).uniqueResult();

                if (ct == null) {
                    FnCaixa caixa2 = new FnCaixa();
                    caixa2.setFnCaixaPK(new FnCaixaPK());
                    caixa2.setCfLoja(lojalogada);

                    String hqls = "select vo from FnCaixa vo" + " where vo.cfLoja=" + lojalogada.getIdLoja() + ""
                            + " order by vo.diaCaixa desc";
                    FnCaixa v = (FnCaixa) sessao.createQuery(hqls).setMaxResults(1).setCacheable(true)
                            .uniqueResult();

                    if (v == null) {
                        caixa2.getFnCaixaPK().setIdCaixa(1);
                    } else {
                        caixa2.getFnCaixaPK().setIdCaixa(v.getFnCaixaPK().getIdCaixa() + 1);
                    }

                    caixa2.getFnCaixaPK().setLojaFk(lojalogada.getIdLoja());
                    caixa2.setDiaCaixa(result);
                    caixa2.setValorEntradas(BigDecimal.ZERO);
                    caixa2.setValorFinal(BigDecimal.ZERO);
                    caixa2.setValorInicial(BigDecimal.ZERO);
                    caixa2.setValorSaidas(BigDecimal.ZERO);
                    sessao.save(caixa2);
                }

                calendar.add(Calendar.DATE, 1);
                pos++;
                if (pos % 30 == 0) {
                    sessao.flush();
                    sessao.clear();
                }
            }
            tx.commit();

        } else {

            String hqls3 = "select vo from FnCaixa vo" + " where vo.cfLoja=" + lojalogada.getIdLoja() + ""
                    + " order by vo.diaCaixa desc";
            FnCaixa v3 = (FnCaixa) sessao.createQuery(hqls3).setMaxResults(1).setCacheable(true).uniqueResult();

            Calendar ontem = Calendar.getInstance();
            ontem.add(Calendar.DATE, -1);
            //System.out.println(v3.getDiaCaixa());
            //System.out.println(ontem.getTime());

            if (!sd.format(v3.getDiaCaixa()).equals(sd.format(ontem.getTime()))
                    && !sd.format(Calendar.getInstance().getTime()).equals(sd.format(v3.getDiaCaixa()))) {

                calcularpratras = true;
                Calendar calendar = new GregorianCalendar();
                calendar.setTime(v3.getDiaCaixa());
                int pos = 0;
                while (calendar.getTime().before(Calendar.getInstance().getTime())) {
                    Date result = calendar.getTime();
                    //System.out.println(sd.format(result));

                    String hqlxt = "select vo from FnCaixa vo" + " where vo.cfLoja=" + lojalogada.getIdLoja() + ""
                            + " and vo.diaCaixa='" + sd.format(result) + "'";
                    FnCaixa ct = (FnCaixa) sessao.createQuery(hqlxt).setMaxResults(1).setCacheable(true)
                            .uniqueResult();

                    if (ct == null) {
                        FnCaixa caixa2 = new FnCaixa();
                        caixa2.setFnCaixaPK(new FnCaixaPK());
                        caixa2.setCfLoja(lojalogada);

                        String hqls = "select vo from FnCaixa vo" + " where vo.cfLoja=" + lojalogada.getIdLoja()
                                + "" + " order by vo.diaCaixa desc";
                        FnCaixa v = (FnCaixa) sessao.createQuery(hqls).setMaxResults(1).setCacheable(true)
                                .uniqueResult();

                        if (v == null) {
                            caixa2.getFnCaixaPK().setIdCaixa(1);
                        } else {
                            caixa2.getFnCaixaPK().setIdCaixa(v.getFnCaixaPK().getIdCaixa() + 1);
                        }

                        caixa2.getFnCaixaPK().setLojaFk(lojalogada.getIdLoja());
                        caixa2.setDiaCaixa(result);
                        caixa2.setValorEntradas(BigDecimal.ZERO);
                        caixa2.setValorFinal(BigDecimal.ZERO);
                        caixa2.setValorInicial(BigDecimal.ZERO);
                        caixa2.setValorSaidas(BigDecimal.ZERO);
                        sessao.save(caixa2);
                    }

                    calendar.add(Calendar.DATE, 1);
                    pos++;
                    if (pos % 30 == 0) {
                        sessao.flush();
                        sessao.clear();
                    }
                }
                tx.commit();

            } else {
                calcularpratras = false;
            }
        }
    } catch (Exception e) {
        Util.logerp(e);
        if (tx != null) {
            // if(tx.getStatus()==TransactionStatus.ACTIVE){
            tx.rollback();
            // }
        }
    }
    //System.out.println("calcula pra tras?" + calcularpratras);
    listarhoje();
    // tipospag();

} */

const tipospag = async function ({ }) {

    const tipoPagto = await useDB({
        query: `select * from Cd_Tipopagto order by descricao_Tipopag asc`
    });

    return { code: 200, results: { tipoPagto } }

};

const salvar = async function ({ idLoja, diaCaixa }) {

    const caixa = await useDB({
        query: `select * from Fn_Caixa where loja_fk=${idLoja} and dia_Caixa='${diaCaixa}'`
    });

    const caixa2 = await useDB({
        query: `select * from Fn_Caixa where loja_fk=${idLoja} order by id_Caixa desc`
    });

    return { code: 200, results: { caixa, caixa2 } }

};

const consultar = async function ({ idLoja, dataInicial, dataFinal }) {

    const caixa = await useDB({
        query: `select * from Fn_Caixa where loja_fk=${idLoja} and (dia_Caixa between '${dataInicial}' and '${dataFinal}') order by dia_Caixa asc`
    });

    return { code: 200, results: { caixa } }

};

const listarhoje = async function ({ idLoja, diaCaixa }) {

    const caixa = await useDB({
        query: `select * from Fn_Caixa where loja_fk=${idLoja} and dia_Caixa='${diaCaixa}'`
    });

    const caixa2 = await useDB({
        query: `select * from Fn_Caixa where loja_fk=${idLoja} order by id_Caixa desc`
    });

    const caixa3 = await useDB({
        query: `select * from Fn_Caixa where loja_fk=${idLoja} and valor_Inicial >0 order by dia_Caixa desc`
    });

    return { code: 200, results: { caixa, caixa2, caixa3 } }

};

const consultarlancamentos = async function ({ idLoja, dataMov, dataHoraAbertura, dataHoraCupom, dataPagto }) {

    const cargaSangria = await useDB({
        query: `select valor_Carsan,tipo_Carsan from  Ecf_Cargasangria where (cast(datamov_Carsan as date) ='${dataMov}')  and loja_fk=${idLoja} and (tipo_Carsan='S' or tipo_Carsan='C')`
    });

    const movTipoPag = await useDB({
        query: `select sum(vlinicial) from  Ecf_Movimento_Tipopag, ecf_Movimento where (cast(ecf_Movimento.datahoraabertura_Mov as date) ='${dataHoraAbertura}')  and Ecf_Movimento_Tipopag.loja_fk=${idLoja} and ecf_Movimento_tipopag.movimento_fk = ecf_movimento.id_movimento`
    });

    const tipoPagto = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom,ecf_Cupomcab.datahora_Cupom,abs(troco),cd_tipopagto.descricao_Tipopag from Ecf_Cupomcab_Tipopagto, ecf_cupomcab, cd_tipopagto where ecf_Cupomcab.loja_fk=${idLoja} and ecf_cupomcab_tipopagto.loja_fk = ${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab and ecf_cupomcab_tipopagto.tipopagto_fk = cd_tipopagto.id_tipopagto   order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const tipoPagto2 = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom,ecf_Cupomcab.datahora_Cupom,troco, valorpago,cd_tipopagto.descricao_Tipopag from Ecf_Cupomcab_Tipopagto, ecf_cupomcab, cd_tipopagto where ecf_Cupomcab.loja_fk=${idLoja} and ecf_cupomcab_tipopagto.loja_fk = ${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and cd_tipopagto.id_tipopagto = 1 and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const tipoPagto3 = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom,ecf_Cupomcab.datahora_Cupom, valorpago,cd_tipopagto.descricao_Tipopag from Ecf_Cupomcab_Tipopagto, ecf_cupomcab, cd_tipopagto where ecf_Cupomcab.loja_fk=${idLoja} and ecf_cupomcab_tipopagto.loja_fk = ${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and cd_tipopagto.id_tipopagto = 2 and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const tipoPagto4 = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom,ecf_Cupomcab.datahora_Cupom,troco, valorpago,cd_tipopagto.descricao_Tipopag from Ecf_Cupomcab_Tipopagto, ecf_cupomcab, cd_tipopagto where ecf_Cupomcab.loja_fk=${idLoja} and ecf_cupomcab_tipopagto.loja_fk = ${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and cd_tipopagto.id_tipopagto = 3 and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const tipoPagto5 = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom,ecf_Cupomcab.datahora_Cupom, valorpago,cd_tipopagto.descricao_Tipopag from Ecf_Cupomcab_Tipopagto, ecf_cupomcab, cd_tipopagto where ecf_Cupomcab.loja_fk=${idLoja} and ecf_cupomcab_tipopagto.loja_fk = ${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and cd_tipopagto.id_tipopagto = 4 and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const tipoPagto6 = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom,ecf_Cupomcab.datahora_Cupom,troco, valorpago,cd_tipopagto.descricao_Tipopag from Ecf_Cupomcab_Tipopagto, ecf_cupomcab, cd_tipopagto where ecf_Cupomcab.loja_fk=${idLoja} and ecf_cupomcab_tipopagto.loja_fk = ${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and cd_tipopagto.id_tipopagto = 5 and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const tipoPagto7 = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom,ecf_Cupomcab.datahora_Cupom,troco, valorpago,cd_tipopagto.descricao_Tipopag from Ecf_Cupomcab_Tipopagto, ecf_cupomcab, cd_tipopagto where ecf_Cupomcab.loja_fk=${idLoja} and ecf_cupomcab_tipopagto.loja_fk = ${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and cd_tipopagto.id_tipopagto = 6 and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const tipoPagto8 = await useDB({
        query: `select ecf_Cupomcab.coo_Cupom,ecf_Cupomcab.datahora_Cupom,troco, valorpago,cd_tipopagto.descricao_Tipopag from Ecf_Cupomcab_Tipopagto, ecf_cupomcab, cd_tipopagto where ecf_Cupomcab.loja_fk=${idLoja} and ecf_cupomcab_tipopagto.loja_fk = ${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and cd_tipopagto.id_tipopagto = 7 and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab order by ecf_Cupomcab.datahora_Cupom desc`
    });

    const contasReceberRec = await useDB({
        query: `select 
                fn_Contasreceber.numdoc_Contasreceber,
                fn_Contasreceber.datalanc_Contasreceber,
                fn_Contasreceber.valortotal_Contasreceber,
                datapagto,
                valorpago,
                fn_Contasreceber.lojabaixa_Contasreceber 
            from 
                Fn_Contasreceber_Rec,
                fn_contasreceber 
            where   
                fn_Contasreceber.loja_fk=${idLoja} 
            and
                fn_contasreceber_rec.loja_fk=${idLoja}
            and 
                cast(datapagto as date)='${dataPagto}' 
            and 
                ((status='Q' and fn_Contasreceber.statusreceb_Contasreceber='Q')
            or
                (status='E' and fn_Contasreceber.statusreceb_Contasreceber in ('P','F'))
            or
                (status='E' and fn_Contasreceber.statusreceb_Contasreceber='Q')
            or
                (status='Q' and fn_Contasreceber.statusreceb_Contasreceber in ('P','F')))
            and
                fn_contasreceber_rec.contasreceber_fk = fn_contasreceber.id_contasreceber 
            order by 
                datapagto desc`
    });

    const contasReceberRec2 = await useDB({
        query: `select 
                fn_Contasreceber.numdoc_Contasreceber,
                fn_Contasreceber.datalanc_Contasreceber,
                fn_Contasreceber.valortotal_Contasreceber,
                datapagto,
                valorpago,
                fn_Contasreceber.lojabaixa_Contasreceber 
            from 
                Fn_Contasreceber_Rec,
                fn_contasreceber 
            where 
                fn_Contasreceber.loja_fk=${idLoja} 
            and
                fn_contasreceber_rec.loja_fk=${idLoja}
            and
                cast(datapagto as date)='${dataPagto}' 
            and 
                status='C' 
            and
                fn_contasreceber_rec.contasreceber_fk = fn_contasreceber.id_contasreceber 
            order by 
                datapagto desc`
    });

    const contasPagarPag = await useDB({
        query:`select 
                fn_Contaspagar.numdoc_Contaspagar,
                fn_Contaspagar.datalanc_Contaspagar,
                fn_Contaspagar.valor_Contaspagar,
                datapagto,
                valorpago,
                contaspagar_fk 
            from  
                Fn_Contaspagar_Pag,
                fn_contaspagar
            where 
                fn_Contaspagar.loja_fk=${idLoja}
            and
                fn_contaspagar_pag.loja_fk=${idLoja} 
            and 
                cast(datapagto as date)='${dataPagto}' 
            and 
                ((fn_Contaspagar.status_Contaspagar='Q' and status='Q') 
            or 
                (fn_Contaspagar.status_Contaspagar='P' and status='Q')) 
            and
                fn_contaspagar.id_contaspagar = fn_contaspagar_pag.contaspagar_fk
            order by 
                datapagto desc`
    });

    const contasPagarPag2 = await useDB({
        query:`select 
                fn_Contaspagar.numdoc_Contaspagar,
                fn_Contaspagar.datalanc_Contaspagar,
                fn_Contaspagar.valor_Contaspagar,
                datapagto,
                valorpago,
                contaspagar_fk 
            from  
                Fn_Contaspagar_Pag,
                fn_contaspagar
            where 
                fn_Contaspagar.loja_fk=${idLoja}
            and
                fn_contaspagar_pag.loja_fk=${idLoja} 
            and 
                cast(datapagto as date)='${dataPagto}' 
            and 
               status='C'
            and
                fn_contaspagar.id_contaspagar = fn_contaspagar_pag.contaspagar_fk
            order by 
                datapagto desc`
    });

    return { code: 200, results: { cargaSangria, movTipoPag, tipoPagto, tipoPagto2, tipoPagto3, tipoPagto4, tipoPagto5, tipoPagto6, tipoPagto7, tipoPagto8, contasReceberRec, contasReceberRec2, contasPagarPag, contasPagarPag2 } }

};

const consutarlancamentosdiaanterior = async function({ diaCaixa, idLoja }){ 

    const caixa = await useDB({ 
    query: `select * from Fn_Caixa where dia_Caixa='${diaCaixa}' and loja_fk=${idLoja}`
 }); 

 return { code: 200, results: { caixa }}  
    
};

const troco = async function({ idLoja, diaCaixa }){ 

    const tipoPagto = await useDB({ 
    query: `select sum(abs(troco)) from Ecf_Cupomcab_Tipopagto, ecf_cupomcab where ecf_Cupomcab.loja_fk=${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${diaCaixa}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab `
 }); 

 return { code: 200, results: { tipoPagto }}  
    
};

const inicial = async function({ dataHoraAbertura, idLoja }){ 

    const movimentoTipoPagto = await useDB({ 
    query: `select sum(vlinicial) from  Ecf_Movimento_Tipopag, ecf_movimento where (cast(ecf_Movimento.datahoraabertura_Mov as date) ='${dataHoraAbertura}')  and ecf_movimento_tipopag.loja_fk=${idLoja} and ecf_movimento_tipopag.movimento_fk = ecf_movimento.id_movimento `
 }); 

 return { code: 200, results: { movimentoTipoPagto }}  
    
};

const carga = async function({ dataMov, idLoja }){ 

    const cargaSangria = await useDB({ 
    query: `select sum(valor_Carsan) from  Ecf_Cargasangria where (cast(datamov_Carsan as date) ='${dataMov}')  and loja_fk=${idLoja} and (tipo_Carsan='C')`
 }); 

 return { code: 200, results: { cargaSangria }}  
    
};

const sangria = async function({ dataMov, idLoja }){ 

    const cargaSangria = await useDB({ 
    query: `select sum(valor_Carsan) from  Ecf_Cargasangria where (cast(datamov_Carsan as date) ='${dataMov}')  and loja_fk=${idLoja} and (tipo_Carsan='S')`
 }); 

 return { code: 200, results: { cargaSangria }}  
    
};

const contaspagarentrada = async function({ idLoja, dataPagto }){ 

    const contasPagarPag = await useDB({ 
    query: `select sum(valorpago) from  Fn_Contaspagar_Pag where loja_fk=${idLoja} and cast(datapagto as date)='${dataPagto}' and status='C'`
 }); 

 return { code: 200, results: { contasPagarPag }}  
    
};

const contaspagarsaida = async function({ dataPagto, idLoja }){ 

    const contasPagarPag = await useDB({ 
    query: `select sum(valorpago) from  Fn_Contaspagar_Pag, fn_contaspagar where fn_Contaspagar_pag.loja_fk=${idLoja} and cast(datapagto as date)='${dataPagto}' and ((fn_Contaspagar.status_Contaspagar='Q' and status='Q') or (fn_Contaspagar.status_Contaspagar='P' and status='Q')) and fn_contaspagar_pag.contaspagar_fk = fn_contaspagar.id_contaspagar`
 }); 

 return { code: 200, results: { contasPagarPag }}  
    
};

const contasrecebersaida = async function({ idLoja, dataPagto }){ 

    const contasReceberRec = await useDB({ 
    query: `select sum(valorpago) from Fn_Contasreceber_Rec where loja_fk=${idLoja} and cast(datapagto as date)='${dataPagto}' and status='C'`
 }); 

 return { code: 200, results: { contasReceberRec }}  
    
};

const contasreceberentrada = async function({ dataPagto, idLoja }){ 

    const contasReceberRec = await useDB({ 
    query: `select sum(valorpago) from Fn_Contasreceber_Rec, fn_contasreceber where fn_Contasreceber.loja_fk=${idLoja} and cast(datapagto as date)='${dataPagto}' and ((status='Q' and fn_Contasreceber.statusreceb_Contasreceber='Q') or (status='E' and fn_Contasreceber.statusreceb_Contasreceber in ('P','F')) or (status='E' and fn_Contasreceber.statusreceb_Contasreceber='Q') or (status='Q' and fn_Contasreceber.statusreceb_Contasreceber in ('P','F'))) and fn_contasreceber_rec.contasreceber_fk = fn_contasreceber.id_contasreceber`
 }); 

 return { code: 200, results: { contasReceberRec }}  
    
};

const cupomtipo7 = async function({ idLoja, dataHoraCupom }){ 

    const tipoPagto = await useDB({ 
    query: `select sum(valorpago) from Ecf_Cupomcab_Tipopagto, ecf_Cupomcab where ecf_Cupomcab_tipopagto.loja_fk=${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and (tipopagto_Fk=7) and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab`
 }); 

 return { code: 200, results: { tipoPagto }}  
    
};

const cupomtipo6 = async function({ idLoja, dataHoraCupom }){ 

    const tipoPagto = await useDB({ 
    query: `select sum(valorpago) from Ecf_Cupomcab_Tipopagto, ecf_Cupomcab where ecf_Cupomcab_tipopagto.loja_fk=${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and (tipopagto_Fk=6) and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab`
 }); 

 return { code: 200, results: { tipoPagto }}  
    
};

const cupomtipo5 = async function({ idLoja, dataHoraCupom }){ 

    const tipoPagto = await useDB({ 
    query: `select sum(valorpago) from Ecf_Cupomcab_Tipopagto, ecf_Cupomcab where ecf_Cupomcab_tipopagto.loja_fk=${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and (tipopagto_Fk=5) and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab`
 }); 

 return { code: 200, results: { tipoPagto }}  
    
};

const cupomtipo4 = async function({ idLoja, dataHoraCupom }){ 

    const tipoPagto = await useDB({ 
    query: `select sum(valorpago) from Ecf_Cupomcab_Tipopagto, ecf_Cupomcab where ecf_Cupomcab_tipopagto.loja_fk=${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and (tipopagto_Fk=4) and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab`
 }); 

 return { code: 200, results: { tipoPagto }}  
    
};

const cupomtipo3 = async function({ idLoja, dataHoraCupom }){ 

    const tipoPagto = await useDB({ 
    query: `select sum(valorpago) from Ecf_Cupomcab_Tipopagto, ecf_Cupomcab where ecf_Cupomcab_tipopagto.loja_fk=${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and (tipopagto_Fk=3) and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab`
 }); 

 return { code: 200, results: { tipoPagto }}  
    
};

const cupomtipo2 = async function({ idLoja, dataHoraCupom }){ 

    const tipoPagto = await useDB({ 
    query: `select sum(valorpago) from Ecf_Cupomcab_Tipopagto, ecf_Cupomcab where ecf_Cupomcab_tipopagto.loja_fk=${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and (tipopagto_Fk=2) and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab`
 }); 

 return { code: 200, results: { tipoPagto }}  
    
};

const cupomtipo1 = async function({ idLoja, dataHoraCupom }){ 

    const tipoPagto = await useDB({ 
    query: `select sum(valorpago) from Ecf_Cupomcab_Tipopagto, ecf_Cupomcab where ecf_Cupomcab_tipopagto.loja_fk=${idLoja} and cast(ecf_Cupomcab.datahora_Cupom as date)='${dataHoraCupom}' and ecf_Cupomcab.status_Cupom in ('F','O','D') and (tipopagto_Fk=1) and ecf_cupomcab_tipopagto.cupomcab_fk = ecf_cupomcab.id_cupomcab`
 }); 

 return { code: 200, results: { tipoPagto }}  
    
};





module.exports = {
    tipospag,
    salvar,
    consultar,
    listarhoje,
    consultarlancamentos,
    consutarlancamentosdiaanterior,
    troco,
    inicial,
    carga,
    sangria,
    contaspagarentrada,
    contaspagarsaida,
    contasrecebersaida,
    contasreceberentrada,
    cupomtipo7,
    cupomtipo6,
    cupomtipo5,
    cupomtipo4,
    cupomtipo3,
    cupomtipo2,
    cupomtipo1
}