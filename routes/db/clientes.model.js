const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const atualizasequencia = async function({ id, tabela, sequence, valor }) {

    const max = await useDB({
        query: `SELECT max(${id}) FROM ${tabela}`
    })

    const set = await useDB({
        query: `SELECT setval('${sequence}',${(valor) + 1})`
    })

    return { code: 200, results: { max, set } }

    // public static void atualizasequencia()
    //     "SELECT last_value FROM " + sequence + ");"
    //     "SELECT setval('" + sequence + "'," + " + " ((valor) + 1) + ");"
    //     "SELECT setval('" + sequence + "'," + " + " ((valor) + 1) + ");"
}

const clientemsg = async function({ idCli }) {
    const max = await useDB({
        query: `SELECT max(datalanc_contasreceber) FROM public.fn_contasreceber WHERE cliente_fk=${idCli}`
    })

    const min = await useDB({
        query: `SELECT min(datavenc_contasreceber) FROM public.fn_contasreceber WHERE cliente_fk=${idCli} and statusreceb_contasreceber in ('P','F')`
    })

    return { code: 200, results: { max, min } }
    // private void clientemsg()
    //      SELECT max(datalanc_contasreceber) FROM public.fn_contasreceber WHERE cliente_fk=" + cliente.getIdCli() + " "));
    //      SELECT min(datavenc_contasreceber) FROM public.fn_contasreceber WHERE cliente_fk=" + cliente.getIdCli() and statusreceb_contasreceber in ('P','F')"));
}

const precovar = async function({ idLoja, idProd }) {

    const preco = await useDB({
        query: `select precovenda_Prod from Es_Estoquegeral vo where loja_fk=${idLoja} and produto_Fk=${idProd}`
    })

    return { code: 200, results: { preco } }
    // public BigDecimal precovar(CdProduto p)
    //      "select precovendaProd from  EsEstoquegeral vo where cfLoja=" + loja.getIdLoja() + " and produtoFk=" + p.getIdProd();
}

const precovarcbico = async function({ idBico, idLoja }) {

    const preco = await useDB({
        query: `SELECT precovar_bic FROM public.cd_bico where id_bico=${idBico}and loja_fk=${idLoja}`
    })

    return { code: 200, results: { preco } }
    // public BigDecimal precovarcbico(CdClienteDescCombustivel p)
    //      "SELECT precovar_bic FROM public.cd_bico where id_bico=" p.getBico_fk() "and loja_fk=" p.getLoja_fk()";
}

const precovarc = async function({ idLoja, idTipoCombustivel }) {

    const preco = await useDB({
        query: `select precoavista from Cd_Tipocomb_Preco vo where loja_Fk=${idLoja} and tipocombustivel_Fk=${idTipoCombustivel}`
    });

    return { code: 200, results: { preco } }
    // public BigDecimal precovarc(CdTipocombustivel p)
    // "select precoavista from  CdTipocombPreco vo where lojaFk=" + loja.getIdLoja() + " and tipocombustivelFk=" + p.getIdTipocombustivel(); 

};

const listarve = async function({ idCli }) {

    const lista = await useDB({
        query: `select vo from Cd_Veiculo vo where cliente_Fk=${idCli} order by  vo.placa_Veic asc `
    });

    return { code: 200, results: { lista } }
    //  public void listarve()
    // "select vo from CdVeiculo vo where clienteFk.idCli=" + cliente.getIdCli() + order by  vo.placaVeic asc"); 
};

const listarcompras = async function({ idCli, cpfCnpjCli, idLoja, datainicial2, datafinal2 }) {

    const lista = await useDB({
        query: `
            SELECT 
                qtde_cupitem,  
                valorunit_cupitem, 
                valorfinal_cupitem, 
                valordesconto_cupitem, 
                valoracrescimo_cupitem, 
                unid_cupitem, 
                codbarra_cupitem, 
                descontoglobal_cupitem, 
                p.descricao_prod, 
                cab.coo_cupom,
                cab.datahora_cupom,
                p.id_prod,
                cab.tipo 
            FROM 
                public.ecf_cupomdet_prod  as det 
                inner join cd_produto as p on p.id_prod=det.produto_fk
                inner join ecf_cupomcab as cab on (cab.id_cupomcab =det.cupomcab_fk and cab.loja_fk=det.loja_fk) 
                inner join ecf_cupomcab_cliente as c on (cab.id_cupomcab =c.cupomcab_fk and cab.loja_fk=c.loja_fk)
            where 
                (c.cod_cliente =${idCli} or c.cpfcnpj='${cpfCnpjCli.replaceAll("\\D", "")}') 
            and 
                cab.loja_fk=${idLoja}
            and 
                c.loja_fk=${idLoja} 
            and 
                (cast(cab.datahora_cupom as date) between '${datainicial2}' and '${datafinal2}') 
            and 
                cab.status_cupom in ('F','O') 
            and 
                cab.coo_cupom!=0  
            and 
                status_cupitem='F' 
            order by cab.datahora_cupom  desc
        `
    });

    const listaCupom = await useDB({
        query: `
            SELECT  
                qtde_cupdetbic,  
                valorunit_cupdetbic, 
                valorfinal_cupdetbic, 
                valordesconto_cupdetbic,
                valoracrescimo_cupdetbic, 
                unid_cupdetbic, 
                numero_bic as codbarra, 
                descontoglobal_cupitem,
                p.descricao_tipcomb,
                cab.coo_cupom,
                cab.datahora_cupom,
                det.bico_fk,
                cab.tipo 
            FROM 
                public.ecf_cupomdet_bico  as det
                inner join cd_bico as b on b.id_bico=det.bico_fk
                inner join cd_tanque as t on t.id_tanque=b.tanque_fk
                inner join cd_tipocombustivel as p on p.id_tipocombustivel=t.tipocombustivel_fk
                inner join ecf_cupomcab as cab on (cab.id_cupomcab =det.cupomcab_fk and cab.loja_fk=det.loja_fk)
                inner join ecf_cupomcab_cliente as c on (cab.id_cupomcab =c.cupomcab_fk and cab.loja_fk=c.loja_fk)
            where 
                (c.cod_cliente =${idCli} or c.cpfcnpj='${cpfCnpjCli.replaceAll("\\D", "")}') 
            and 
                (cast(cab.datahora_cupom as date) between '${datainicial2}' and '${datafinal2}')
            and 
                cab.status_cupom in ('F','O') 
            and 
                cab.coo_cupom!=0 
            and 
                cab.loja_fk=${idLoja}
            and 
                b.loja_fk=${idLoja}
            and 
                t.loja_fk=${idLoja}
            and 
                c.loja_fk=${idLoja}
            and 
                status_cupdetbic='F' 
            order by cab.datahora_cupom  desc;
        `
    });

    return { code: 200, results: { lista, listaCupom } }
    //     public void listarcompras()
    // "SELECT qtde_cupitem,  valorunit_cupitem, valorfinal_cupitem, valordesconto_cupitem, valoracrescimo_cupitem, unid_cupitem, 
    // codbarra_cupitem, descontoglobal_cupitem, p.descricao_prod, cab.coo_cupom,cab.datahora_cupom,p.id_prod ,cab.tipo 
    // FROM public.ecf_cupomdet_prod  as det 
    // inner join cd_produto as p on p.id_prod=det.produto_fk
    // inner join ecf_cupomcab as cab on (cab.id_cupomcab =det.cupomcab_fk and cab.loja_fk=det.loja_fk) 
    // inner join ecf_cupomcab_cliente as c on (cab.id_cupomcab =c.cupomcab_fk and cab.loja_fk=c.loja_fk)
    // where (c.cod_cliente =" + cliente.getIdCli() + " or c.cpfcnpj='" + cliente.getCpfcnpjCli().replaceAll("\\D", "") + "') 
    // " and cab.loja_fk=" + loja.getIdLoja() + " and c.loja_fk=" + loja.getIdLoja() + " and (cast(cab.datahora_cupom as date) 
    // between '" + sd2.format(datainicial2) + "' and '" + sd2.format(datafinal2) + "') + " and cab.status_cupom in ('F','O') 
    // and cab.coo_cupom!=0  and status_cupitem='F' order by cab.datahora_cupom  desc";

    // "SELECT  qtde_cupdetbic,  valorunit_cupdetbic, valorfinal_cupdetbic, 
    // valordesconto_cupdetbic ,valoracrescimo_cupdetbic, 
    // unid_cupdetbic, numero_bic as codbarra, descontoglobal_cupitem,p.descricao_tipcomb,
    // cab.coo_cupom,cab.datahora_cupom,det.bico_fk,cab.tipo 
    // FROM public.ecf_cupomdet_bico  as det
    // inner join cd_bico as b on b.id_bico=det.bico_fk
    // inner join cd_tanque as t on t.id_tanque=b.tanque_fk
    // inner join cd_tipocombustivel as p on p.id_tipocombustivel=t.tipocombustivel_fk
    // inner join ecf_cupomcab as cab on (cab.id_cupomcab =det.cupomcab_fk and cab.loja_fk=det.loja_fk)
    // inner join ecf_cupomcab_cliente as c on (cab.id_cupomcab =c.cupomcab_fk and cab.loja_fk=c.loja_fk)
    // where (c.cod_cliente =" + cliente.getIdCli() + " or c.cpfcnpj='" + cliente.getCpfcnpjCli().replaceAll("\\D", "") + "') 
    // "and (cast(cab.datahora_cupom as date) between '" + sd2.format(datainicial2) + "' and '" + sd2.format(datafinal2) + "')"
    // and cab.status_cupom in ('F','O') and cab.coo_cupom!=0 "and cab.loja_fk=" + loja.getIdLoja() + " "
    // and b.loja_fk=" + loja.getIdLoja() + " and t.loja_fk=" + loja.getIdLoja() + " "
    // and c.loja_fk=" + loja.getIdLoja() + " and status_cupdetbic='F' order by cab.datahora_cupom  desc";
};

const retornaFoto = async function({ idCli }) {
    const foto = await useDB({
        query: `select foto from cd_cliente where id_cli=${idCli}`
    });

    return { code: 200, results: { foto } }
    //  public String retornaFoto()
    // "select foto from cd_cliente where id_cli=" + this.cliente.getIdCli() + " ";
};

const recebeFoto = async function({ File, idCli }) {

    let statusUpdate = "";

    const foto = await useDB({
        query: `update cd_cliente set foto=${File.name} where id_cli=${idCli}`
    }).then(() => {
        statusUpdate = "registrado atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    return { code: 200, results: { foto, statusUpdate } }
    //  public void recebeFoto(FileUploadEvent event)
    //  "update cd_cliente set foto=? where id_cli=? ", parametrosc);
};

const removerFoto = async function({ idCli, File }) {

    let statusUpdate = "";

    const foto = await useDB({
        query: `update cd_cliente set foto=${File.name} where id_cli=${idCli}`
    }).then(() => {
        statusUpdate = "registrado atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    return { code: 200, results: { foto, statusUpdate } }
    //  public void removerFoto()
    //  "update cd_cliente set foto=? where id_cli=? ", parametrosc);
};

const listarhistcli = async function({ idCli }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Clientendereco WHERE cliente_Fk=${idCli} and numero_Cliend='checkout' order by dataaltera desc`
    });

    return { code: 200, results: { lista } }
    //  public void listarhistcli()
    //  "SELECT vo FROM CdClientendereco vo WHERE vo.clienteFk=" + this.cliente.getIdCli() + " and numeroCliend='checkout' order by dataaltera desc";
};

const listarEnderecos = async function({ idCli }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Clientendereco WHERE cliente_Fk=${idCli} and numero_Cliend!='checkout'`
    });

    return { code: 200, results: { lista } }
    //  public void listarEnderecos()
    //  "SELECT vo FROM CdClientendereco vo WHERE vo.clienteFk=" + this.cliente.getIdCli() + " and numeroCliend!='checkout'";
};

const listarEmpresas = async function({}) {

    const lista = await useDB({
        query: "SELECT * FROM Cd_Empresaconveniada "
    });

    const listaWithEmpresa = await useDB({
        query: `SELECT id_cli, nome_cli, id_empconv, nomefantasia_empconv FROM Cd_Cliente
                as CLI JOIN Cd_Empresaconveniada as EMPRE ON CLI.empresa_fk = EMPRE.id_empconv
                ORDER BY id_cli ASC`
    });



    return { code: 200, results: { lista, listaWithEmpresa } }
    //  public void listarEmpresas()
    //  "SELECT vo FROM CdEmpresaconveniada vo";
};

const listarDependentes = async function({ idCli }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Dependentecliente WHERE cliente_Fk=${idCli}`
    });

    return { code: 200, results: { lista } }
    //  public void listarDependentes()
    //  "SELECT vo FROM CdDependentecliente vo WHERE vo.clienteFk=" + this.cliente.getIdCli() + "";
};

const onCellEditc = async function({ idLoja, idTipoCombustivel }) {

    const event = await useDB({
        query: `SELECT  precoavista FROM public.cd_tipocomb_preco where loja_fk=${idLoja} and tipocombustivel_fk=${idTipoCombustivel}`
    });

    return { code: 200, results: { event } }
    //  public void onCellEditc(CellEditEvent event)
    //  "SELECT  precoavista FROM public.cd_tipocomb_preco where loja_fk=" + loja.getIdLoja() + " and tipocombustivel_fk=" + e.getCdCombustivel().getIdTipocombustivel() + "";
};

const adicionarCombustivelDesconto = async function({ idLoja, idTipoCombustivel }) {

    const avista = await useDB({
        query: `SELECT  precoavista FROM public.cd_tipocomb_preco where loja_fk=${idLoja} and tipocombustivel_fk=${idTipoCombustivel}`
    });

    const descCombustivel = await useDB({
        query: `SELECT  precoavista FROM public.cd_tipocomb_preco where loja_fk=${idLoja} and tipocombustivel_fk=${idTipoCombustivel}`
    });

    const descProduto = await useDB({
        query: `SELECT  precoavista FROM public.cd_tipocomb_preco where loja_fk=${idLoja} and tipocombustivel_fk=${idTipoCombustivel}`
    });

    return { code: 200, results: { avista, descCombustivel, descProduto } }
    //  public void adicionarCombustivelDesconto()
    //  "SELECT  precoavista FROM public.cd_tipocomb_preco where loja_fk=" + loja.getIdLoja() + " and tipocombustivel_fk=" + clienteDescComb.getCdCombustivel().getIdTipocombustivel() + "";
    //  "SELECT vo FROM CdClienteDescCombustivel vo ORDER BY vo.cdClienteDescCombustivelPK.id DESC";
    //  "SELECT vo FROM CdClienteDescProduto vo ORDER BY vo.cdClienteDescProdutoPK.id DESC";
};

const listarDescProduto = async function({ idCli }) {

    const descProduto = await useDB({
        query: `SELECT * FROM Cd_Cliente_Desc_Produto WHERE cliente_Fk=${idCli}`
    });

    return { code: 200, results: { descProduto } }
    //  public void listarDescProduto()
    //  "SELECT vo FROM CdClienteDescProduto vo WHERE vo.cdClienteDescProdutoPK.clienteFk=" + this.cliente.getIdCli() + "";
};

const listarDescCombustivel = async function({ idCli, idLoja, idBico }) {

    const descCombustivel = await useDB({
        query: `SELECT * FROM Cd_Cliente_Desc_Combustivel WHERE cliente_Fk=${idCli}`
    });

    const nBico = await useDB({
        query: `SELECT numero_bic FROM public.cd_bico where id_bico=${idBico} and loja_fk=${idLoja}`
    })

    return { code: 200, results: { descCombustivel, nBico } }
    //  public void listarDescCombustivel()
    //  "SELECT vo FROM CdClienteDescCombustivel vo WHERE vo.cdClienteDescCombustivelPK.clienteFk=" + this.cliente.getIdCli() + "";
    //  "SELECT numero_bic FROM public.cd_bico where id_bico=" + cd.getBico_fk() + " and loja_fk=" + cd.getLoja_fk() + ""));
};

const processarFiltro = async function({}) {

    const lista = await useDB({
        query: "SELECT * FROM Cd_Cliente ORDER BY id_cli"
    });



    return { code: 200, results: { lista } }
    //  public void processarFiltro()
    //  "SELECT vo FROM CdCliente vo";
};

const salvar = async function({ cpfCnpjCli, idEmpconv, idCli }) {

    const idContasreceber = await useDB({
        query: `SELECT id_contasreceber FROM public.fn_contasreceber where statusreceb_contasreceber in ('P','F') and cliente_fk=${idCli}  and cupomcab_fk is not null`
    });

    const vo_idCli = await useDB({
        query: `select vo.id_Cli from Cd_Cliente vo where vo.cpfcnpj_Cli='${cpfCnpjCli}' and vo.empresa_Fk=${idEmpconv}`
    });

    const vo_idCli_diferente = await useDB({
        query: `select vo.id_Cli from Cd_Cliente vo where vo.cpfcnpj_Cli='${cpfCnpjCli}' and vo.id_Cli!=${idCli} and vo.empresa_Fk=${idEmpconv}`
    });

    return { code: 200, results: { idContasreceber, vo_idCli, vo_idCli_diferente } }
    //  public void salvar()
    //  "SELECT id_contasreceber FROM public.fn_contasreceber where statusreceb_contasreceber in ('P','F') and cliente_fk=" + cliente.getIdCli() + "  and cupomcab_fk is not null";
    //  "select vo.idCli from CdCliente vo where vo.cpfcnpjCli='" + cliente.getCpfcnpjCli() + "'" + " and vo.empresaFk=" + cliente.getEmpresaFk().getIdEmpconv() + "";
    //  "select vo.idCli from CdCliente vo where vo.cpfcnpjCli='" + cliente.getCpfcnpjCli() + "'" + " and vo.idCli!=" + cliente.getIdCli() + " and vo.empresaFk=" + cliente.getEmpresaFk().getIdEmpconv() + "";
};

const run = async function({ idCli, maxdias, dias }) {

    let statusUpdate = "",
        statusUpdate2 = "";

    const contasReceber = await useDB({
        query: `SELECT 
            datavenc_contasreceber, 
            statusreceb_contasreceber, 
            cliente_fk,
            diasbloqueio_empconv 
        FROM 
            public.fn_contasreceber as rec
        inner join cd_cliente as c on c.id_cli=rec.cliente_fk
        inner join cd_empresaconveniada as e on c.empresa_fk=e.id_empconv
        where 
            statusreceb_contasreceber in ('P','F')`
    });

    const statusToB = await useDB({
        query: `UPDATE public.cd_cliente SET status_cli='B',maxdiasatraso_cli=${maxdias},diasatraso_cli=${dias}  WHERE  id_cli=${idCli}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    });

    const statusToA = await useDB({
        query: `UPDATE public.cd_cliente SET status_cli='A',maxdiasatraso_cli=${maxdias},diasatraso_cli=0 WHERE id_cli=${idCli}`
    }).then(() => {
        statusUpdate2 = "Registrado apagado com sucesso"
    }).catch((err) => {
        statusUpdate2 = err.message
    })

    return { code: 200, results: { contasReceber, statusUpdate, statusUpdate2 } }
    //  public void run()
    //  "SELECT datavenc_contasreceber, statusreceb_contasreceber, cliente_fk,diasbloqueio_empconv FROM public.fn_contasreceber as rec
    //  inner join cd_cliente as c on c.id_cli=rec.cliente_fk
    //  inner join cd_empresaconveniada as e on c.empresa_fk=e.id_empconv
    //  where  statusreceb_contasreceber in ('P','F') ";

    //  "UPDATE public.cd_cliente SET status_cli='B',maxdiasatraso_cli=" + maxdias + "," + "diasatraso_cli=" + dias + "  WHERE  id_cli=" + idcli);
    //  "UPDATE public.cd_cliente SET status_cli='A',maxdiasatraso_cli=" + maxdias + "," + "diasatraso_cli=0 WHERE id_cli=" + idcli);
};

const pesquisarPorColuna = async function({ colunaBusca, textoBusca }) {

    const cliente = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { cliente } }
    //  public void pesquisarPorColuna()
    //  "SELECT vo FROM CdCliente vo WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) " + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
};

const preencherListaBuscanfe = async function({}) {

    const pJur = await useDB({
        query: "SELECT * FROM Cd_Cliente WHERE fisjur_Cli='J'"
    });

    const pFis = await useDB({
        query: "SELECT * FROM Cd_Cliente WHERE fisjur_Cli='F'"
    });

    const lista = await useDB({
        query: "SELECT * FROM Cd_Cliente"
    });

    return { code: 200, results: { pJur, pFis, lista } }
    //  public void preencherListaBuscanfe(String tipo)
    //  "SELECT vo FROM CdCliente vo WHERE vo.fisjurCli='J'";
    //  "SELECT vo FROM CdCliente vo WHERE vo.fisjurCli='F'";
    //  "SELECT vo FROM CdCliente vo";
};

const pesquisarPorColunanfe = async function({ colunaBusca, textoBusca, cnpjLoja }) {

    const pJur = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE fisjur_Cli='J' and UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    });

    const pFis = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE fisjur_Cli='F' and UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    });

    const pJurCpfCnpjFilter = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE fisjur_Cli='J' and UPPER(CAST(${colunaBusca} as text)) LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%'  and cpfcnpj_Cli like '%${cnpjLoja.slice(0, 8)}%' ORDER BY ${colunaBusca} ASC`
    });

    const lista = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { pJur, pFis, pJurCpfCnpjFilter, lista } }
    //  public void pesquisarPorColunanfe(String tipo)
    //  "SELECT vo FROM CdCliente vo WHERE vo.fisjurCli='J' and UPPER(CAST(vo." + this.colunaBusca + " as text)) LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
    //  "SELECT vo FROM CdCliente vo WHERE vo.fisjurCli='F' and UPPER(CAST(vo." + this.colunaBusca + " as text)) LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
    //  "SELECT vo FROM CdCliente vo WHERE vo.fisjurCli='J' and UPPER(CAST(vo." + this.colunaBusca + " as text)) LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' 
    //  + " and vo.cpfcnpjCli like '" + loja.getCnpjLoja().substring(0, 8) + "%' + " ORDER BY vo." + this.colunaBusca + " ASC";

    //  "SELECT vo FROM CdCliente vo WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%' ORDER BY vo." + this.colunaBusca + " ASC";
};

const preencherListaBuscaFuncionario = async function() {

    const lista = await useDB({
        query: "select * from Cd_Cliente "
    });

    return { code: 200, results: { lista } }
    //  public void preencherListaBuscaFuncionario()
    //  "select vo from CdCliente vo ";
};

const pesquisarPorColunaFuncionario = async function({ colunaBusca, textoBusca }) {

    const vColuna = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE UPPER(CAST(${colunaBusca} as text))   LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    });


    return { code: 200, results: { vColuna } }
    //  public void pesquisarPorColunaFuncionario()
    //  "SELECT vo FROM CdCliente vo WHERE UPPER(CAST(vo." + this.colunaBusca + " as text)) + "  LIKE '%" + Util.removeAspa(this.textoBusca.toUpperCase()) + "%'" + " ORDER BY vo." + this.colunaBusca + " ASC";
    //  "SELECT vo FROM CdCliente vo WHERE vo." + empresa1;
};

const pesquisaRelatorioEmp = async function({ idEmp }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Cliente WHERE empresa_fk=${idEmp}`
    });

    return { code: 200, results: { lista } }

    //  public void pesquisaRelatorioEmp() {
    //     String empresa1 = "";
    //     if (this.empresa.getIdEmpconv() != null) {
    //         empresa1 = " empresaFk=" + this.empresa.getIdEmpconv() + "";
    //     }
    //     String hql = "SELECT vo FROM CdCliente vo"
    //             + " WHERE vo." + empresa1;

};

const logo = async function({ idLoja }) {

    const logo = await useDB({
        query: `select vo.logo_Loja from Cf_Loja vo where vo.id_Loja=${idLoja}`
    });

    return { code: 200, results: { logo } }
    //  public String logo()
    //  "select vo.logoLoja from CfLoja vo "where vo.idLoja=" + loja.getIdLoja();
};

const verificardest = async function({ idLoja }) {

    const configNfe = await useDB({
        query: `select * from Cf_Config_Nfe where loja_Fk = ${idLoja}`
    });

    return { code: 200, results: { configNfe } }
    //  public void verificardest() 
    //  "select vo from CfConfigNfe vo where vo.cfConfigNfePK.lojaFk = " + l.getIdLoja();
};

const atualizaCliente = async function({ }) {
    return { code: 200, results: "Registro atualizado com sucesso" }
};

module.exports = {
    useDB,
    atualizasequencia,
    clientemsg,
    precovar,
    precovarcbico,
    precovarc,
    listarve,
    listarcompras,
    retornaFoto,
    recebeFoto,
    removerFoto,
    listarhistcli,
    listarEnderecos,
    listarEmpresas,
    listarDependentes,
    onCellEditc,
    adicionarCombustivelDesconto,
    listarDescProduto,
    listarDescCombustivel,
    processarFiltro,
    salvar,
    run,
    pesquisarPorColuna,
    preencherListaBuscanfe,
    pesquisarPorColunanfe,
    preencherListaBuscaFuncionario,
    pesquisarPorColunaFuncionario,
    logo,
    verificardest,
    pesquisaRelatorioEmp,
    atualizaCliente
}