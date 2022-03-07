const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

/**
 * public void init() {
        loja = (CfLoja) Util.pegarObjetoDaSessao("loja");
        campo = "datahoraemissaoDav";
        valor = "";
        datai = Calendar.getInstance().getTime();
        dataf = Calendar.getInstance().getTime();
        davs = new DavRN().buscarHQL("select vo from VdDav vo"
                + " where vdDavPK.lojaFk=" + loja.getIdLoja() + ""
                + " and nomedestinatarioDav!='' "
                + " and (cast(vo.datahoraemissaoDav as date) between '" + sd.format(datai) + "'"
                + " and '" + sd.format(dataf) + "')"
                + " order by vo.datahoraemissaoDav desc ");
        for (VdDav d : davs) {
            if (d.getSubtotalDav().doubleValue() == 0) {
                d.setSubtotalDav(d.getValortotalDav()
                        .add(d.getDescontoDav())
                        .subtract(d.getAcrescimoDav(),
                                MathContext.DECIMAL32));
            }
        }
        atualizatotal();
        this.permissao = Util.verificaPermissaoDaPagina("davs");
    }
 */

const setar = async function({ idLoja, idDav, cpfCnpjCli }){ 

    const davDetalhe = await useDB({ 
        query: `select * from Vd_Davdetalhe where loja_Fk=${idLoja} and dav_fk=${idDav}  order by seqitem_Davdet asc`
    }); 

    const pegarCliente = await useDB({ 
        query: `select * from Cd_Cliente where cpfcnpj_Cli='${cpfCnpjCli}'`  
    });

    const cupomCab = await useDB({ 
        query:  `select * from Ecf_Cupomcab where loja_fk=${idLoja} and dav_fk=${idDav} and status_Cupom in('F','O','D') `
    })


 return { code: 200, results: { davDetalhe, pegarCliente, cupomCab }}  
    
};

const filtrar = async function({ idLoja, campo, valor, dataInicial, dataFinal }){ 

    const campoDav = await useDB({ 
        query: `select * from Vd_Dav where loja_Fk=${idLoja} and upper(cast(${campo} as text)) like '%${valor.toUpperCase()}%' and nomedestinatario_Dav!=''  order by ${campo} asc `
    }); 

    const comData = await useDB({ 
        query: `select * from Vd_Dav where loja_Fk=${idLoja} and (cast(datahoraemissao_dav as date) between '${dataInicial}' and '${dataFinal}') and nomedestinatario_Dav!=''  order by datahoraemissao_dav asc ` 
    })

 return { code: 200, results: { campoDav, comData }}  
    
};

module.exports ={
    setar,
    filtrar
}