const Utils = require('./use.js');
const { useDB, useQuery } = Utils; 

/**
 * public void init() {
        situacao = "P";
        SimpleDateFormat sdano = new SimpleDateFormat("yyyy");
        SimpleDateFormat diano = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdmes = new SimpleDateFormat("MM");
        String ano = sdano.format(Calendar.getInstance().getTime());
        try {
            datainicial2 = diano.parse(ano + "-01-01");
        } catch (ParseException ex) {
            Logger.getLogger(ApuracaoICMSBean.class.getName()).log(Level.SEVERE, null, ex);
        }
        datafinal2 = Calendar.getInstance().getTime();
        loja = (CfLoja) Util.pegarObjetoDaSessao("loja");
        this.permissao = Util.verificaPermissaoDaPagina("apuracao-icms");
        listar();

        Calendar primeiroDia = Calendar.getInstance();
        primeiroDia.add(Calendar.MONTH, -1);
        primeiroDia.set(Calendar.DAY_OF_MONTH, 1);

        Calendar ultimoDia = Calendar.getInstance();
        ultimoDia.add(Calendar.MONTH, -1);
        int ultimoDiaMes = ultimoDia.getActualMaximum(Calendar.DAY_OF_MONTH);
        ultimoDia.set(Calendar.DAY_OF_MONTH, ultimoDiaMes);

        Date dataInicio = primeiroDia.getTime();
        Date dataFim = ultimoDia.getTime();

        String mes = sdmes.format(dataInicio);

        String o = "SELECT id_spedperiodo\n"
                + "  FROM public.sped_periodo\n"
                + "  where mesapuracao='" + Integer.valueOf(mes) + "'"
                + " and anoapuracao='" + ano + "' "
                + " and loja_fk=" + loja.getIdLoja() + " "
                + " and anoapuracao is not null and anoapuracao!=''";
        Object io = new CargoRN().porSql2semcache(o);
        if (io == null) {
            Object id = new CargoRN().porSql2semcache("SELECT max(id_spedperiodo)+1 as idc\n"
                    + "  FROM public.sped_periodo\n"
                    + "  where loja_fk=" + loja.getIdLoja() + " ");
            if (id == null) {
                id = 1;
            }
            if (!permissao.equals("L")) {
                new CargoRN().executarconsultacomit("INSERT INTO public.sped_periodo(id_spedperiodo, loja_fk, "
                        + " datainicial, datafinal, mesapuracao,anoapuracao)\n"
                        + "    VALUES (" + id + ", " + loja.getIdLoja() + ","
                        + "  '" + diano.format(dataInicio) + "', '" + diano.format(dataFim) + "',"
                        + "  '" + Integer.valueOf(mes) + "', '" + ano + "');");
            }
        }

    }
 */

const listar = async function({ idLoja, dataInicial, dataFinal }){ 

    const lista = await useDB({ 
        query: `select * from Sped_Periodo  where loja_fk=${idLoja} and (datainicial between  '${dataInicial}' and  '${dataFinal}' ) and anoapuracao is not null  and anoapuracao!=''  order by   cast(mesapuracao as integer), \n     cast(anoapuracao as integer) desc`
    }); 

    /**
     * List<SpedPeriodo> e = sessao.createQuery("select vo from SpedPeriodo vo"
                    + " where vo.cfLoja.idLoja=" + loja.getIdLoja() + ""
                    + " and (vo.datainicial between "
                    + " '" + sd.format(datainicial2) + "' and "
                    + " '" + sd.format(datafinal2) + "' )"
                    + " and vo.anoapuracao is not null  and vo.anoapuracao!='' "
                    + " order by   cast(vo.mesapuracao as integer), \n"
                    + "     cast(vo.anoapuracao as integer) desc").list();
     */

 return { code: 200, results: { lista }}  

//  public void listar() {
    
};

module.exports = {
    listar
}