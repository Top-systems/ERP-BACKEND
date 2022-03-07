const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

const salvarCheque = async function({ idLoja, idBanco, agenciaChq, ccChq, numCheque, cpfCnpjCLi }){ 

    const cheque1 = await useDB({ 
        query: `SELECT * FROM Cd_Cheque WHERE loja_Fk=${idLoja}  AND banco_Fk=${idBanco} AND agencia_Chq=${agenciaChq} AND cc_Chq=${ccChq} AND numcheque_Chq=${numCheque}`
    }); 

    /**
     * String hqlco = "SELECT vo FROM CdCheque vo"
                    + " WHERE vo.cdChequePK.lojaFk=" + loja.getIdLoja() + ""
                    + "  AND vo.bancoFk=" + this.cheque.getBancoFk().getIdBanco() + ""
                    + " AND vo.agenciaChq=" + this.cheque.getAgenciaChq() + ""
                    + " AND vo.ccChq=" + this.cheque.getCcChq() + ""
                    + " AND vo.numchequeChq=" + this.cheque.getNumchequeChq() + "";
     */

    const cheque2 = await useDB({ 
        query: `SELECT * FROM Cd_Cheque WHERE loja_Fk=${idLoja} AND statuscheque_Chq='3' AND cpfcnpj_Cli='${cpfCnpjCLi}'` 
    });

    /**
     *String hqlco2 = "SELECT vo FROM CdCheque vo"
                    + " WHERE vo.cdChequePK.lojaFk=" + loja.getIdLoja() + ""
                    + " AND vo.statuschequeChq='3'"
                    + " AND vo.cpfcnpjCli='" + this.cheque.getCpfcnpjCli() + "'"; 
     */

    const tipoPagto4 = await useDB({ 
        query: "SELECT * FROM Cd_Tipopagto WHERE id_Tipopagto=4" 
    });

    const tipoPagto2 = await useDB({ 
        query: "SELECT * FROM Cd_Tipopagto WHERE id_Tipopagto=2" 
    })

    /**
     * if (this.tipocheque.equals("P")) {

                    hql = "SELECT vo FROM CdTipopagto vo"
                            + " WHERE vo.idTipopagto=4";
                } else {

                    hql = "SELECT vo FROM CdTipopagto vo"
                            + " WHERE vo.idTipopagto=2";
                }
     */

    const chequePorLoja = await useDB({ 
        query: `SELECT * FROM Cd_Cheque WHERE loja_Fk=${idLoja} ORDER BY id_Cheque DESC` 
    });

    /**
     *  String hqlc = "SELECT vo FROM CdCheque vo"
                        + " WHERE vo.cdChequePK.lojaFk=" + loja.getIdLoja() + ""
                        + " ORDER BY vo.cdChequePK.idCheque DESC";
     */

 return { code: 200, results: { cheque1, cheque2, tipoPagto4, tipoPagto2, chequePorLoja }}  

//  public void salvarCheque() {
    
};

const baixar = async function({ saldoatual_conta, saldoanterior_conta, idConta, idLoja }){ 

    let statusUpdate = "";

    const update = await useDB({ 
        query: `UPDATE public.fn_conta SET saldoatual_conta = ${saldoatual_conta}, saldoanterior_conta=${saldoanterior_conta} WHERE id_conta=${idConta} AND loja_fk=${idLoja}`
    }).then(()=>{
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    /**
     *  sessao.createSQLQuery("UPDATE public.fn_conta\n"
                                + "   SET saldoatual_conta=" + atu + ","
                                + " saldoanterior_conta=" + this.conta.getSaldoatualConta() + "\n"
                                + " WHERE id_conta=" + this.conta.getIdConta() + ""
                                + "  and loja_fk=" + c.getCfLoja().getIdLoja() + " ").executeUpdate();
     */

    const contahist = await useDB({ 
        query: `SELECT * FROM Fn_Movcontahist WHERE loja_Fk=${idLoja} ORDER BY id_Movcontahist DESC` 
    });

    /**
     * String hql = "SELECT vo FROM FnMovcontahist vo"
                                + " WHERE vo.fnMovcontahistPK.lojaFk=" + c.getCfLoja().getIdLoja() + ""
                                + " ORDER BY vo.fnMovcontahistPK.idMovcontahist DESC";
     */

 return { code: 200, results: { statusUpdate, contahist }}  

//  public void baixar() {
    
};

const editarCheques = async function({ saldoatual_conta, saldoanterior_conta, idConta, idLoja }){ 

    let statusUpdate = "";

    const update = await useDB({ 
        query: `UPDATE public.fn_conta SET saldoatual_conta = ${saldoatual_conta}, saldoanterior_conta=${saldoanterior_conta} WHERE id_conta=${idConta} AND loja_fk=${idLoja}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    /**
     *  sessao.createSQLQuery("UPDATE public.fn_conta\n"
                                + "   SET saldoatual_conta=" + atu + ","
                                + " saldoanterior_conta=" + this.conta.getSaldoatualConta() + "\n"
                                + " WHERE id_conta=" + this.conta.getIdConta() + ""
                                + "  and loja_fk=" + c.getCfLoja().getIdLoja() + " ").executeUpdate();
     */

    const contahist = await useDB({ 
        query: `SELECT * FROM Fn_Movcontahist WHERE loja_Fk=${idLoja} ORDER BY id_Movcontahist DESC` 
    });

    /**
     * String hql = "SELECT vo FROM FnMovcontahist vo"
                                + " WHERE vo.fnMovcontahistPK.lojaFk=" + c.getCfLoja().getIdLoja() + ""
                                + " ORDER BY vo.fnMovcontahistPK.idMovcontahist DESC";
     */

 return { code: 200, results: { statusUpdate, contahist }}  

//  public void editarCheques() {
    
};

/**
 *  public void consultar() {
        this.lista = new ArrayList<>();
        this.cheques = new ArrayList<>();
        boolean ok = true;

        if (this.datafinal.before(this.datainicial)) {
            ok = false;
            Util.criarMensagemErro("Data Final não pode ser menor que Data Inicial!");
        }

        if (ok) {
            SimpleDateFormat formatdataHQL = new SimpleDateFormat("yyyy-MM-dd");

            CfLoja loja = (CfLoja) Util.pegarObjetoDaSessao("loja");

            String tipo1 = "";

            if (!this.situacao.equals("AB")) {
                tipo1 = " AND vo.statuschequeChq='" + this.situacao + "'";
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
                loja1 = " AND vo.cdChequePK.lojaFk=" + loja.getIdLoja() + "";
            }
            String hql = "SELECT vo FROM CdCheque vo"
                    + " WHERE vo." + this.tipoData + ""
                    + " BETWEEN '" + formatdataHQL.format(this.datainicial) + "'"
                    + " AND '" + formatdataHQL.format(this.datafinal) + "'"
                    + tipo1
                    + empresa1
                    + cliente1
                    + loja1
                    + " ORDER BY vo." + this.tipoData + " ASC";
            //System.out.println(hql);
            this.listab = new ChequeRN().listarChequeHQL(hql);
            Util.executarJavascript("PF('dlgopcoes').hide();");
            atualizarTotais();
        } else {

            Util.atualizarForm("erros");
            Util.executarJavascript("PF('erros').show();");
        }

    }
 */



module.exports = {
    salvarCheque,
    baixar,
    editarCheques
}