const Utils = require('./use.js');
const { useDB, useQuery } = Utils;


const buscarncmelista = async function ({ numCodBar }) {

    const preco = await useDB({
        query: `select * from Cd_Atuaprecodet where codigobarras='${numCodBar}'`
    });

    return { code: 200, results: { preco } }
    //  public void buscarncmelista() {
    // "select vo from CdAtuaprecodet vo"
    // + " where vo.codigobarras='" + codbarra.getNumeroCodbar().trim() + "'"
    // + "  "
};

const usarSim = async function ({ nomeFabricante, namePrincipioativo, nameTipocrtLoja, nameNcm, ncsmsCest }) {

    const fabricante = await useDB({
        query: `select * from Cd_Fabricante where nome_Fab like '%${nomeFabricante}%'`
    });

    const tiposItens = await useDB({
        query: "select * from Cd_Tipoitem where id_Tipoitem=1"
    });

    const genericos = await useDB({
        query: "select * from Cd_Grupoproduto  where descricao_Grpprod like '%GENERICO%'"
    });

    const etico = await useDB({
        query: "select * from  Cd_Grupoproduto where descricao_Grpprod like '%ETICO%'"
    })

    const positivo = await useDB({
        query: "select * from Cd_Listapositivo where descricao_Listpositivo like '%POSITIV%'"
    })

    const negativo = await useDB({
        query: "select * from Cd_Listapositivo where descricao_Listpositivo like '%NEGATIV%'"
    })

    const neutro = await useDB({
        query: "select * from Cd_Listapositivo where descricao_Listpositivo like '%NEUTR%'"
    })

    const principioativo = await useDB({
        query: `select * from Cd_Principioativo where descricao_Princat like '%${namePrincipioativo}%'`
    })

    const icms = await useDB({
        query: "select * from Cd_Tributacaoicms where id=6"
    })

    const ncm = await useDB({
        query: `select * from Trib_Ncm where ncm_Completo='${nameNcm}' and tiporegimento=${nameTipocrtLoja}`
    })

    const ncms = await useDB({
        query: `select * from Cd_Cest where cest='${ncsmsCest}'`
    })

    return { code: 200, results: { fabricante, tiposItens, genericos, etico, positivo, negativo, neutro, principioativo, icms, ncm, ncms } }
    //  "select vo from CdFabricante vo where nomeFab like '%" + d.getFabricante() + "%'"
};

const setarcest2 = async function ({ ex, ncmCompleto }) {

    let exQs;
    if (!ex) {
        exQs = " and (ex=0 or ex is null) ";
    } else {
        exQs = " and ex=" + ex + " ";
    }

    const ibpt = await useDB({
        query: `select * from Cd_Ibpt where codigo='${ncmCompleto}' ${exQs}`
    });

    return { code: 200, results: { ibpt } }
};

const setarcest = async function ({ ex, ncmCompleto }) {
    let exQs;
    if (!ex) {
        exQs = " and (ex=0 or ex is null) ";
    } else {
        exQs = ` and ex=${ex} `;
    }

    const hql = await useDB({
        query: `select * from Cd_Cest where ncm='${ncmCompleto}'`
    });

    const ibpt = await useDB({
        query: `select * from Cd_Ibpt where codigo='${ncmCompleto}' ${exQs}`
    });

    return { code: 200, results: { hql, ibpt } }

};

const atualizarCodigodeBarras = async function ({ idProd }) {

    const produto = await useDB({
        query: `select * from Cd_Codigobarras where produto_Fk=${idProd}`
    });

    return { code: 200, results: { produto } }
    // CodBarraRN rn = new CodBarraRN();
    // List < CdCodigobarras > listadecodigos = rn.listarCodBarraHQL(hql);
    // if (codigo.getAtivoCodbar().equals("S")) {
    //     for (CdCodigobarras cb : listadecodigos) {
    //         if (Objects.equals(codigo.getIdCodigobarras(), cb.getIdCodigobarras())) {
    //             cb.setAtivoCodbar("S");
    //             rn.salvar(cb);
    //         } else {
    //             cb.setAtivoCodbar("N");
    //             rn.salvar(cb);
    //         }
    //     }
    // } else {
    //     codigo.setAtivoCodbar("N");
    //     rn.salvar(codigo);

    // }
    // pegarCodBarras();
    // Util.atualizarForm("form:tab:lcb");
};

const listaAlvo = async function ({ idProd, idLoja }) {

    const estoque = await useDB({
        query: `select * from Es_Estoquegeral where produto_Fk=${idProd} and loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoque } }

};


const retornaFoto = async function ({ idProd }) {



    const foto = await useDB({
        query: `select foto_prod from cd_produto where id_prod=${idProd}`
    });




    return { code: 200, results: { data: foto[0].foto_prod } }

};

const recebeFoto = async function ({ File, idProd }) {

    let statusUpdate = "";

    const update = await useDB({
        query: `update cd_produto set foto_prod=${File.name} where id_prod=${idProd}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    return { code: 200, results: { update, statusUpdate } }

};

const removerFoto = async function ({ File, idProd }) {

    let statusUpdate = "";

    const remove = await useDB({
        query: `update cd_produto set foto_prod=${File.name} where id_prod=${idProd}`
    }).then(() => {
        statusUpdate = "Registro atualizado com sucesso";
    }).catch((err) => {
        statusUpdate = err.message;
    })

    return { code: 200, results: { remove } }

};

//erro 500 na requisição
const salvar = async function ({ ncmCompleto, numeroCodbar, idProd, idCodBar, idLoja, getIdSegmento, idNcm, idFabricante, idGrupo, idSubGrupo, idProdutoSecao, idUnidade, idTipoItem, idTributacaoIcms, precoProdutoProd }) {
    let qidprod = '', qidcdb = '', ok, msm = [], novo = true;
    if (idProd) {
        novo = false;
        qidprod = ` and id_Prod!=${idProd}`;
        qidcdb = ` and id_Codigobarras!=${idCodBar}`;
    }

    if (!numeroCodbar) {
        const exists = await useDB({
            query: `select * from Cd_Codigobarras where numero_Codbar='${numeroCodbar}'${qidcdb}`
        });

        verificacdb = exists.length;
        if (verificacdb) {
            ok = false;
            msm.push(`Código de barras ${numeroCodbar} já cadastrado!`)

            // ??? Util.criarMensagem("Código de barras " + verificacdb.getNumeroCodbar() + " já cadastrado!");
        }
    }

    if (numeroCodbar) {
        if (getIdSegmento == 1 || getIdSegmento == 2) {
            const hqlbico = await useDB({
                query: `select * from Cd_Bico where cast(numero_Bic as text)='${numeroCodbar.replaceAll("[^0-9]", "")}' and loja_Fk=${idLoja}`
            });

            if (hqlbico.length) {
                // ??? Util.criarMensagemWarning("Código de barras inválido!");
                msm.push("Código de barras inválido!")
                ok = false;
            }

            const hqlbico2 = await useDB({
                query: `select * from Codigobarras_Bico where codigobarras='${numeroCodbar}' and loja_Fk=${idLoja}`
            });

            if (hqlbico2.length) {
                // ??? Util.criarMensagemWarning("Código de barras inválido!");
                msm.push("Código de barras inválido!")
                ok = false;
            }
        }
    }

    if (!idNcm) {
        // Util.criarMensagemWarning("Selecione Ncm!");
        msm.push("Selecione Ncm!")
        ok = false;
    }

    if (!idNcm) {
        if (!ncmCompleto) {
            // Util.criarMensagemWarning("Selecione Ncm!");
            msm.push("Selecione Ncm!")
            ok = false;

        } else if (!ncmCompleto.length) {
            // Util.criarMensagemWarning("Selecione Ncm!");
            msm.push("Selecione Ncm!")
            ok = false;

        }
    }

    if (!idFabricante) {
        // Util.criarMensagemWarning("Selecione Fabricante!");
        msm.push("Selecione Fabricante!")
        ok = false;
    }

    if (!idGrupo) {
        // Util.criarMensagemWarning("Selecione o Grupo!");
        msm.push("Selecione o Grupo!")
        ok = false;
    }

    if (!idSubGrupo) {
        // Util.criarMensagemWarning("Selecione o Subgrupo!");
        msm.push("Selecione o Subgrupo!");
        ok = false;
    }
    if (!idProdutoSecao) {
        // Util.criarMensagemWarning("Selecione a Seção!");
        msm.push("Selecione a Seção!");
        ok = false;
    }

    if (!idUnidade) {
        // Util.criarMensagemWarning("Selecione Unidade!");
        msm.push("Selecione Unidade!");
        ok = false;
    }
    if (!idTipoItem) {
        // Util.criarMensagemWarning("Selecione Tipo Item!");
        msm.push("Selecione Tipo Item!");
        ok = false;
    }

    if (!idTributacaoIcms) {
        // Util.criarMensagemWarning("Selecione Tributação Icms!");
        msm.push("Selecione Tributação Icms!");
        ok = false;
    }

    if (precoProdutoProd <= 0.00) {
        // Util.criarMensagemWarning("Custo caixa não pode ser igual a zero!");
        msm.push("Custo caixa não pode ser igual a zero!");
        ok = false;
    }

    // if (this.produto.getClasseterapeuticaProd() != null) {
    //     if (this.produto.getClasseterapeuticaProd().equals("2")) {
    //         if (this.produto.getListapsicoFk() == null
    //                 && (lojaLogada.getSegmentoFk().getIdSegmento() == 3
    //                 || lojaLogada.getSegmentoFk().getIdSegmento() == 4)) {
    //             Util.criarMensagemWarning("Selecione Lista Psico");
    //             ok = false;
    //         }
    //     }
    // }

    const codbar = await useDB({
        query: `select * from Cd_Codigobarras where numero_Codbar='${numeroCodbar}'${qidcdb}`
    });

    // const salvar = salvarProduto({ novo })

    return { code: 200, results: { codbar, ok, msm } }

};

const histpv = async function ({ idLoja, idProd, idUsuario, precoVenda, precoCusto, dateTime, idEstoqueGeral }) {

    let statusInsert = "";
    let prod;
    if (!idEstoqueGeral) {
        let id = await useDB({
            query: `select max(id)+1 as idc from es_althist_preco  where loja_fk=${idLoja} `
        });

        id = id.results[0].idc

        if (!id) {
            id = 1;
        }

        prod = await useDB({
            query: `INSERT INTO public.es_althist_preco(
                            id, 
                            loja_fk, 
                            produto_fk, 
                            precovenda,  
                            precocusto, 
                            dataaltera, 
                            usuarioaltera,
                            origem 
                          ) VALUES (
                            ${id},
                            ${idLoja}, 
                            ${idProd},  
                            ${precoVenda}, 
                            ${precoCusto}, 
                            '${dateTime}',  
                            ${idUsuario}, 
                            'cadastro produto') 
                          returning *;`
        }).then(() => {
            statusInsert = "Registro inserido com sucesso"
        }).catch((err) => {
            statusInsert = err.message;
        })

    }


    return { code: 200, results: { prod, statusInsert } }

};

const temvenda = async function ({ idProd }) {
    let cupon = false;
    let nfe = false;
    let compra = false;
    let p = null;


    if (p != null) {
        let det = await useDB({
            query: `select qtde_Cupitem from Ecf_CupomdetProd where produto_Fk=${idProd}  and status_Cupitem='F' `
        });

        cupon = det != null;

        let detn = await useDB({
            query: `select quantidade from Nfe_Detalhe where produto_Fk=${idProd}`
        });

        nfe = detn != null;

        let detnc = await useDB({
            query: `select quantidade from Fn_CompraDetalhe where produto_Fk=${idProd}`
        });

        compra = detnc != null;

        return { code: 200, results: { ok: cupon || nfe || compra } };

    }
    return { code: 200, results: { ok: true } }


};

const pegarTodosOsEstoques = async function ({ idProd }) {

    const estoque = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE produto_Fk=${idProd} ORDER BY loja_Fk ASC`
    });

    return { code: 200, results: { estoque } }

};

const pegarTodosOsLotes = async function ({ idProd }) {

    const lista = await useDB({
        query: `SELECT Cd_Lote.* FROM Cd_produto,Cd_Lote WHERE cd_produto.id_prod = Cd_Lote.produto_fk and Cd_Lote.produto_Fk=${idProd} and cast(Cd_Lote.qtde_Lote as double precision)>0.00  and (cd_produto.classeterapeutica_Prod!='0')`
    });

    return { code: 200, results: { lista } }

};

const pegarCodigoDeBarras = async function ({ idProd }) {

    const codBar = await useDB({
        query: `SELECT numero_codbar FROM public.cd_codigobarras where ativo_codbar='S' and produto_fk=${idProd} `
    });

    return { code: 200, results: { codBar } }

};

const pegarCodBarras = async function ({ idProd }) {

    const codBar = await useDB({
        query: `SELECT * FROM Cd_Codigobarras WHERE produto_Fk=${idProd} ORDER BY id_Codigobarras DESC`
    });

    const alteracoes = await useDB({
        query: `select * from Cd_Produtoalteracoes  where produto_Fk=${idProd}  order by id_Produtoalteracoes desc`
    });

    return { code: 200, results: { codBar, alteracoes } }

};

const pegarEstoque1 = async function ({ idLoja, idProd }) {

    const estoque = await useDB({
        query: `SELECT estoque FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { estoque } }

};

const pegarPromo = async function ({ idLoja, idProd }) {

    const promo = await useDB({
        query: `SELECT precopromo_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { promo } }

};

const pegarCusto = async function ({ idLoja, idProd }) {

    const custo = await useDB({
        query: `SELECT precocusto_Prod FROM Es_Estoquegeral WHERE produto_Fk=${idProd} AND  loja_fk=${idLoja}`
    });

    return { code: 200, results: { custo } }

};

const pegarVenda = async function ({ idLoja, idProd }) {

    const venda = await useDB({
        query: `SELECT precovenda_Prod FROM Es_Estoquegeral vo WHERE produto_Fk=${idProd} AND loja_fk=${idLoja}`
    });

    return { code: 200, results: { venda } }

};

const pesquisarPorColunafracionavel = async function ({ colunaBusca, textoBusca }) {
    let busca;

    if (textoBusca === 'codigoBarra') {
        busca = await useDB({
            query: `SELECT * FROM  Cd_Produto WHERE CAST(${colunaBusca} as text)  LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
        });
    } else {
        busca = await useDB({
            query: `select * from Cd_Codigobarras where numero_Codbar like '%${textoBusca.replaceAll("\\D", "")}%'`
        })
    }

    return { code: 200, results: { busca } }

};

const pesquisarPorColuna = async function ({ colunaBusca, textoBusca }) {

    let busca;

    if (textoBusca === 'codigoBarra') {
        busca = await useDB({
            query: `SELECT * FROM  Cd_Produto WHERE CAST(${colunaBusca} as text)  LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
        });
    } else {
        busca = await useDB({
            query: `select * from Cd_Codigobarras where numero_Codbar like '%${textoBusca.replaceAll("\\D", "")}%'`
        })
    }

    return { code: 200, results: { busca } }

};

const pesquisarPorColunacl12 = async function ({ colunaBusca, textoBusca }) {

    let busca;

    if (textoBusca === 'codigoBarra') {
        busca = await useDB({
            query: `SELECT * FROM  Cd_Produto WHERE CAST(${colunaBusca} as text)  LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%'  and (classeterapeutica_Prod='1' or vo.classeterapeutica_Prod='2') ORDER BY ${colunaBusca} ASC`
        });
    } else {
        busca = await useDB({
            query: `select Cd_Codigobarras.* from cd_produto, Cd_Codigobarras where numero_Codbar like '%${textoBusca.replaceAll("\\D", "")}%' and (cd_produto.classeterapeutica_Prod='1' or cd_produto.classeterapeutica_Prod='2')`
        })
    }

    return { code: 200, results: { busca } }

};

const pesquisarPorColunaDescricao = async function ({ colunaBusca, textoBusca }) {

    const busca = await useDB({
        query: `SELECT * FROM Cd_Produto WHERE CAST(${colunaBusca} as text)  LIKE '%${textoBusca.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBusca} ASC`
    });

    return { code: 200, results: { busca } }

};

const preencherListaBusca = async function ({ }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Produto ORDER BY descricao_Prod ASC`
    });

    return { code: 200, results: { lista } }

};

const preencherListaBuscafracionavel = async function ({ }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Produto  ORDER BY descricao_Prod ASC`
    });

    return { code: 200, results: { lista } }

};

const preencherListaBuscacl12 = async function ({ }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Produto where (classeterapeutica_Prod='1' or classeterapeutica_Prod='2') ORDER BY descricao_Prod ASC`
    });

    return { code: 200, results: { lista } }
    
};
    
    const pegarhist = async function ({ idProd }) {
        
        const hist = await useDB({
        query: `select * from Es_Althist_Preco  where produto_Fk =${idProd}  order by id desc`
    });

    return { code: 200, results: { hist } }

};

const pegarEstoque = async function ({ idProd, ex, ncmCompleto, idLoja }) {
    let exQs;
    if (!ex) {
        exQs = " and (ex=0 or ex is null) ";
    } else {
        exQs = ` and ex=${ex} `;
    }

    const estoque = await useDB({
        query: `SELECT * FROM Es_Estoquegeral WHERE loja_Fk=${idLoja} AND produto_Fk=${idProd}`
    });

    const ibpt = await useDB({
        query: `select * from Cd_Ibpt where codigo='${ncmCompleto}'   ${exQs}  `
    })

    const uCompras = await useDB({
        query: `SELECT dataentradasaida_compracab, numerodocfiscal_compracab, nome_forn, (quantidade*qtdecaixa) as qtd,  (valortotalitem+ subicmsvalor+seguro+ frete+ ipi+ outrasdespesas+ fcpst)/(quantidade*qtdecaixa)as precocompra, valordesconto/(quantidade*qtdecaixa) as desconto, ((valortotalitem+ subicmsvalor+seguro+ frete+ ipi+ outrasdespesas+ fcpst)-valordesconto)/(quantidade*qtdecaixa) as precocompral   FROM public.fn_compra_detalhe as det   inner join fn_compra_cabecalho as cab on  cab.id_compracab=det.compracab_fk   inner join cd_fornecedor as f on f.id_forn=cab.fornecedor_fk   where  produto_fk is not null   and det.loja_fk=${idLoja}   and cab.loja_fk=${idLoja}   and produto_fk=${idProd} order by 1 desc limit 10`
    })

    const alteracoes = await useDB({
        query: `select * from Cd_Produtoalteracoes where produto_Fk=${idProd}  order by id_Produtoalteracoes desc`
    })

    return { code: 200, results: { estoque, ibpt, uCompras, alteracoes } }

};

const pesquisarPorColunacest = async function ({ colunaBuscacest, textoBuscacest }) {

    const lista = await useDB({
        query: `SELECT * FROM Cd_Cest WHERE UPPER(CAST(${colunaBuscacest} as text))  like '%${textoBuscacest.toUpperCase().replaceAll("\\D", "")}%' ORDER BY ${colunaBuscacest} ASC`
    });

    return { code: 200, results: { lista } }

};

const listarcompras = async function ({ idProd, datainicial2, datafinal2 }) {

    const lista = await useDB({
        query: ` SELECT qtde_cupitem, valororig_cupitem, valorfinal_cupitem,  valordesconto_cupitem, valoracrescimo_cupitem,  unid_cupitem, codbarra_cupitem, descontoglobal_cupitem,p.descricao_prod, cab.coo_cupom,cab.datahora_cupom,cab.serieecf_cupom  FROM public.ecf_cupomdet_prod  as det inner join cd_produto as p on p.id_prod=det.produto_fk inner join ecf_cupomcab as cab on (cab.id_cupomcab =det.cupomcab_fk and cab.loja_fk=det.loja_fk) where det.produto_fk =${idProd} and (cast(cab.datahora_cupom as date) between '${datainicial2}' and '${datafinal2}') and cab.status_cupom in ('F','O') and cab.coo_cupom!=0  and status_cupitem='F'  order by cab.datahora_cupom  desc`
    });

    //  + " inner join ecf_cupomcab_cliente as c on (cab.id_cupomcab =c.cupomcab_fk and cab.loja_fk=c.loja_fk)\n"
    return { code: 200, results: { lista } }

};

const listardesc = async function ({ idProd, idLoja }) {

    const lista = await useDB({
        query: `select * from Cd_Desconto_Produto where produto_Fk=${idProd}  and loja_fk=${idLoja}  order by quantidade desc`
    });

    return { code: 200, results: { lista } }

};

const listardescp = async function ({ idProd, idLoja }) {

    const lista = await useDB({
        query: `select * from Cd_Preco_Pbm where produto_Fk=${idProd}  and loja_fk=${idLoja}  order by preco desc`
    });

    return { code: 200, results: { lista } }

};

module.exports = {
    buscarncmelista,
    usarSim,
    setarcest2,
    setarcest,
    atualizarCodigodeBarras,
    listaAlvo,
    retornaFoto,
    recebeFoto,
    removerFoto,
    salvar,
    listardescp,
    listardesc,
    listarcompras,
    pesquisarPorColunacest,
    pegarhist,
    preencherListaBuscacl12,
    histpv,
    temvenda,
    pegarTodosOsEstoques,
    pegarTodosOsLotes,
    pegarCodigoDeBarras,
    pegarCodBarras,
    pegarEstoque1,
    pegarPromo,
    pegarCusto,
    pegarVenda,
    pesquisarPorColunafracionavel,
    pesquisarPorColuna,
    pesquisarPorColunacl12,
    pesquisarPorColunaDescricao,
    pegarEstoque,
    preencherListaBusca,
    preencherListaBuscafracionavel
}