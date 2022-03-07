const Utils = require('./use.js');
const { useDB, useQuery } = Utils;
/**
 *     public void init() {
        this.textoBusca = "";
        Util.atualizasequencia("id_funcionario", "cd_funcionario", "cd_funcionario_id_funcionario_seq");
        Util.atualizasequencia("id_cli", "cd_cliente", "cd_cliente_id_cli_seq");
        this.fonte = new ArrayList<>(
                Arrays.asList("Codigo", "Nome", "CPF", "Status", "Comissao", "Desconto Maximo")
        );
        this.alvo = new ArrayList<>();
        //preenche os campos do filtro com campos da tabela
        this.campos = new HashMap<>();
        this.campos.put(this.fonte.get(0), "idCli");
        this.campos.put(this.fonte.get(1), "nomeCli");
        this.campos.put(this.fonte.get(2), "cpfcnpjCli");
        this.campos.put(this.fonte.get(3), "statusCli");
        this.campos.put(this.fonte.get(4), "perccomissaoFunc");
        this.campos.put(this.fonte.get(5), "percentmaxdescFunc");

        //inserir a lista de colunas(fonte) e a lista de colunas selecionadas(alvo)
        this.colunas = new DualListModel<>(this.fonte, this.alvo);
        this.disabled = true;
        this.ultimo = true;
        usuariologado = (CdUsuario) Util.pegarObjetoDaSessao("usuarioLogado");
        this.posicao = 0;
        this.insercao = false;
        this.cliente = new CdCliente();
        this.clienteb = new CdCliente();
        this.clientes = new CdCliente();
        //coluna inicial de pesquisa
        this.colunaBusca = "nomeCli";
        this.textoBusca = "";
        //verifica a permisso do usuario nessa pagina
        this.permissao = Util.verificaPermissaoDaPagina("funcionarios");
        this.comparacoes = new ArrayList<>();
        this.filtrosAdicionados = new ArrayList<>();
        this.funcionario = new CdFuncionario();
        //pegar os dados conforme a loja logada
        if (Util.pegarURI().equals("/ERP/restrito/cadastros/funcionarios.ip")) {
            CfLoja loja = (CfLoja) Util.pegarObjetoDaSessao("loja");
            String hql = "SELECT vo FROM CdCliente vo"
                    + " WHERE vo.funcionarioFk!=null"
                    + " AND vo.funcionarioFk.lojaFk=" + loja.getIdLoja() + ""
                    + " ORDER BY vo.idCli ASC";
            this.cliente = new ClienteRN().pegarCliente(hql);
        }
        this.clienteVerificado = new CdCliente();

    }
 */

const verificaCPF = async function({ cpf }){ 

    const verifica = await useDB({ 
        query: `SELECT * FROM Cd_Cliente WHERE cpfcnpj_Cli='${cpf}'AND funcionario_Fk IS NULL`
    }); 
    /*
    String hql = "SELECT vo FROM CdCliente vo"
            + " WHERE vo.cpfcnpjCli='" + cpf + "'"
            + " AND vo.funcionarioFk.idFuncionario IS NULL";

    */
 return { code: 200, results: { verifica }}  
    
//  public void verificaCPF() {
};  

const retornaFoto = async function({ idFunc }){ 

    const foto = await useDB({ 
        query: `select foto_func from cd_funcionario where id_funcionario=${idFunc}`
    }); 

    /**
     *  byte[] foto = (byte[]) new CargoRN().porSql2semcache("select foto_func from cd_funcionario where id_funcionario=" + this.funcionario.getIdFuncionario() + " ");
     */

 return { code: 200, results: { foto }}  
//  public String retornaFoto() {
    
};

const recebeFoto = async function({ Foto, idFunc }){ 

    let statusUpdate = "";

    const foto = await useDB({ 
        query: `UPDATE cd_funcionario SET foto_func='${Foto} 'WHERE id_funcionario=${idFunc}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    });

    /**
     *  new CargoRN().executarSQL("update cd_funcionario set foto_func=?"
     * + " where id_funcionario=? ", parametrosc);
     */

 return { code: 200, results: { statusUpdate }}  

//  public void recebeFoto(FileUploadEvent event) {

    
};

const removerFoto = async function({ idFunc }){ 

    let statusUpdate = "";

    const foto = await useDB({ 
        query: `UPDATE cd_funcionario SET foto_func=null WHERE id_funcionario=${idFunc}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso"
    }).catch((err) => {
        statusUpdate = err.message;
    })

    /**
     * new CargoRN().executarSQL(
                    "update cd_funcionario set foto_func=?"
                    + " where id_funcionario=? ", parametrosc);
     */

 return { code: 200, results: { foto, statusUpdate }}  

//  public void removerFoto() {
    
};

const processarFiltro = async function({ valor, filtro }){ 

    const comecandoCom = await useDB({ 
        query: `SELECT * FROM Cd_cliente WHERE ${filtro.replaceAll("\\D", "")} like '${valor.replaceAll("\\D", "").toUpperCase()}%'`
    }); 

    /**
     * if (filtro.getComparacao().equals("Começando com")) {
            comparacaoLike = " like '" + Util.removeAspa(filtro.getValor()) + "%'";
        }
     */

    const contendo = await useDB({
        query: `SELECT * FROM Cd_cliente WHERE ${filtro.replaceAll("\\D", "")} LIKE '%${valor.replaceAll("\\D", "").toUpperCase()}%'`
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
        StringBuilder sb = new StringBuilder("SELECT vo FROM CdCliente vo");
 */

}

const alterarStatus = async function({ idFunc, idLoja }){ 

    const status = await useDB({ 
        query: `SELECT Cd_Usuario.*, id_funcionario FROM Cd_Usuario, cd_funcionario WHERE Cd_Usuario.funcionario_Fk=${idFunc} AND Cd_Usuario.funcionario_Fk = id_funcionario AND cd_funcionario.Loja_fk=${idLoja}`

    }); 

    /**
     * String hql = "SELECT vo FROM CdUsuario vo"
                + " WHERE vo.funcionarioFk.idFuncionario=" + this.funcionario.getIdFuncionario() + ""
                + " AND vo.funcionarioFk.lojaFk=" + loja.getIdLoja() + "";
     */

    
    return { code: 200, results: { status }}  
    
    // public void alterarStatus() {
};

const salvar = async function({ cpf, idCli }){ 

    const salvar1 = await useDB({ 
        query: `select nome_Cli from Cd_Cliente where cpfcnpj_Cli='${cpf}'`
    }); 

    /**
     * if (cliente.getIdCli() == null) {
            String hql = "select vo.nomeCli from CdCliente vo"
                    + " where vo.cpfcnpjCli='" + cliente.getCpfcnpjCli() + "'";
        
     */

    const salvar2 = await useDB({ 
        query: `select nome_Cli from Cd_Cliente  where cpfcnpj_Cli='${cpf}' and id_Cli!=${idCli}` 
    });

    /*
    else {
        String hql = "select vo.nomeCli from CdCliente vo"
                + " where vo.cpfcnpjCli='" + cliente.getCpfcnpjCli() + "'"
                + " and vo.idCli!=" + cliente.getIdCli() + "";
    */

 return { code: 200, results: { salvar1, salvar2 }}  

//  public void salvar() {
    
};

const pesquisarPorTexto = async function({ colunaBusca, textoBusca, idLoja }){ 

    const pesquisa = await useDB({ 
        query: `SELECT Cd_Cliente.*, id_funcionario, loja_fk FROM Cd_Cliente, cd_funcionario WHERE UPPER(CAST(Cd_Cliente.${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' AND  cd_funcionario.id_Funcionario IS NOT NULL AND cd_funcionario.loja_Fk=${idLoja}`
    }); 

    /**
     *   String hql = "SELECT vo FROM CdCliente vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + " LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%'"
                + " AND  vo.funcionarioFk.idFuncionario IS NOT NULL"
                + " AND vo.funcionarioFk.lojaFk=" + loja.getIdLoja() + "";

     */

 return { code: 200, results: { pesquisa }}  

 //public void pesquisarPorTexto(String texto) {
    
};

const pesquisarPorInteiro = async function({ colunaBusca, textoBusca, idLoja }){ 

    const pesquisa = await useDB({ 
        query: `SELECT Cd_Cliente.*, id_funcionario, loja_fk FROM Cd_Cliente, cd_funcionario WHERE UPPER(CAST(Cd_Cliente.${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' AND  cd_funcionario.id_Funcionario IS NOT NULL AND cd_funcionario.loja_Fk=${idLoja}`
    }); 
    /**
     *  String hql = "SELECT vo FROM CdCliente vo"
                + " WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "
                + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' "
                + " AND  vo.funcionarioFk.idFuncionario IS NOT NULL"
                + " AND vo.funcionarioFk.lojaFk=" + loja.getIdLoja() + "";
     */

 return { code: 200, results: { pesquisa }}  
 //public void pesquisarPorInteiro(String texto) {
    
};

const preencherListaBusca = async function({ idLoja }){ 

    const lista = await useDB({ 
        query: `SELECT Cd_Cliente.*, loja_fk FROM Cd_Cliente, cd_funcionario WHERE Cd_Cliente.funcionario_Fk IS NOT NULL AND cd_funcionario.loja_Fk=${idLoja}`
    }); 

   /**
    * String hql = "SELECT vo FROM CdCliente vo"
                + " WHERE vo.funcionarioFk.idFuncionario IS NOT NULL"
                + " AND vo.funcionarioFk.lojaFk=" + loja.getIdLoja() + "";
    */

 return { code: 200, results: { lista }} 
 
 //public void preencherListaBusca() {
    
};

module.exports = {
    verificaCPF,
    retornaFoto,
    recebeFoto,
    removerFoto,
    processarFiltro,
    alterarStatus,
    salvar,
    pesquisarPorTexto,
    pesquisarPorInteiro,
    preencherListaBusca
}