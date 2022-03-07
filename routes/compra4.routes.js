const express = require('express');
const { useBody } = require('./db/use')

const {
    buscarchave,
    init,
    setareventomdf,
    listarnotasmanifestadas,
    jalancado,
    alterarlotemed,
    setarCompra,
    pesquisarPorColunaproduto,
    pesquisarPorColunaDescricao,
    pegarEstoque,
    pegarCusto,
    verificaTanque2,
    verificaTanque,
    atualizarPreco,
    pegarPrecoAtual,
    pegarPrecocadastro,
    pegarMargem,
    pegarpv,
    pegaremax,
    pegaremin,
    vincularProdutoFornecedor,
    gerarPagamentos,
    confirmaCompra,
    salvaitensformula,
    pixml,
    pxml,
    processarXMLManifesto,
    LerNodet,
    LerNocabecalho,
    LerNoemitente,
    LerNoProt,
    LerNoTransp,
    excluir,
    adicionarLote3,
    onCellEdit,
    pegarCodigoDeBarras,
    pesquisarCodigoProduto,
    pesquisarCodigoCombustivel,
    setarProduto,
    setarCombustivel,
    processarFiltro,
    excluirCompra,
    salvarnotae,
    salvar,
    verificalmc,
    inserir,
    inserir2,
    pesquisarPorColuna,
    preencherListaBusca,
    manifestarnotas2,
    salvareventodfe,
    manifestarnotas233,
    downloadxml,
    downloadxml22,
    downloadxml2,
    buscarNFe,
    pegarDadosnfe,
    consultarStatus,
    imprimirNFe2,
    vermn,
    excluirmed,
    listarlista,
    listarest,
    criarestoques,
    carregarcsts,
    histpv,
    histpvTanque,
    gerarzip
} = require('./db/compra4.models');

const compra4 = express.Router();

compra4.post('/buscarchave', (req, res) => useBody(req, res, buscarchave))
compra4.post('/init', (req, res) => useBody(req, res, init)); 
compra4.post('/setareventomdf', (req, res) => useBody(req, res, setareventomdf));
compra4.post('/listarnotasmanifestadas', (req, res) => useBody(req, res, listarnotasmanifestadas));
compra4.post('/jalancado', (req, res) => useBody(req, res, jalancado));
compra4.post('/alterarlotemed', (req, res) => useBody(req, res, alterarlotemed));
compra4.post('/setarCompra', (req, res) => useBody(req, res, setarCompra));
compra4.post('/pesquisarPorColunaproduto', (req, res) => useBody(req, res, pesquisarPorColunaproduto));
compra4.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao))
compra4.post('/pegarEstoque', (req, res) => useBody(req, res, pegarEstoque));
compra4.post('/pegarCusto', (req, res) => useBody(req, res, pegarCusto));
compra4.post('/verificaTanque2', (req, res) => useBody(req, res, verificaTanque2));
compra4.post('/verificaTanque', (req, res) => useBody(req, res, verificaTanque));
compra4.post('/atualizarPreco', (req, res) => useBody(req, res, atualizarPreco));
compra4.post('/pegarPrecoAtual', (req, res) => useBody(req, res, pegarPrecoAtual));
compra4.post('/pegarPrecocadastro', (req, res) => useBody(req, res, pegarPrecocadastro));
compra4.post('/pegarMargem', (req, res) => useBody(req, res, pegarMargem));
compra4.post('/pegarpv', (req, res) => useBody(req, res, pegarpv));
compra4.post('/pegaremax', (req, res) => useBody(req, res, pegaremax));
compra4.post('/pegaremin', (req, res) => useBody(req, res, pegaremin));
compra4.post('/vincularProdutoFornecedor', (req, res) => useBody(req, res, vincularProdutoFornecedor));
compra4.post('/gerarPagamentos', (req, res) => useBody(req, res, gerarPagamentos));
compra4.post('/confirmaCompra', (req, res) => useBody(req, res, confirmaCompra));
compra4.post('/salvaitensformula', (req, res) => useBody(req, res, salvaitensformula));
compra4.post('/pixml', (req, res) => useBody(req, res, pixml));
compra4.post('/pxml', (req, res) => useBody(req, res, pxml));
compra4.post('/processarXMLManifesto', (req, res) => useBody(req, res, processarXMLManifesto));
compra4.post('/LerNodet', (req, res) => useBody(req, res, LerNodet));
compra4.post('/LerNocabecalho', (req, res) => useBody(req, res, LerNocabecalho));
compra4.post('/LerNoemitente', (req, res) => useBody(req, res, LerNoemitente));
compra4.post('/LerNoProt', (req, res) => useBody(req, res, LerNoProt));
compra4.post('/LerNoTransp', (req, res) => useBody(req, res, LerNoTransp));
compra4.post('/excluir', (req, res) => useBody(req, res, excluir));
compra4.post('/adicionarLote3', (req, res) => useBody(req, res, adicionarLote3));
compra4.post('/onCellEdit', (req, res) => useBody(req, res, onCellEdit));
compra4.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
compra4.post('/pesquisarCodigoProduto', (req, res) => useBody(req, res, pesquisarCodigoProduto));
compra4.post('/pesquisarTipoCombustivel', (req, res) => useBody(req, res, pesquisarCodigoCombustivel));
compra4.post('/setarProduto', (req, res) => useBody(req, res, setarProduto));
compra4.post('/setarCombustivel', (req, res) => useBody(req, res, setarCombustivel));
compra4.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
compra4.post('/excluirCompra', (req, res) => useBody(req, res, excluirCompra));
compra4.post('/salvarnotae', (req, res) => useBody(req, res, salvarnotae));
compra4.post('/salvar', (req, res) => useBody(req, res, salvar));
compra4.post('/verificalmc', (req, res) => useBody(req, res, verificalmc));
compra4.post('/inserir', (req, res) => useBody(req, res, inserir));
compra4.post('/inserir2', (req, res) => useBody(req, res, inserir2));
compra4.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
compra4.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
compra4.post('/manifestarnotas2', (req, res) => useBody(req, res, manifestarnotas2));
compra4.post('/salvareventodfe', (req, res) => useBody(req, res, salvareventodfe));
compra4.post('/manifestarnotas233', (req, res) => useBody(req, res, manifestarnotas233));
compra4.post('/downloadxml', (req, res) => useBody(req, res, downloadxml));
compra4.post('/downloadxml22', (req, res) => useBody(req, res, downloadxml22));
compra4.post('/downloadxml2', (req, res) => useBody(req, res, downloadxml2));
compra4.post('/buscarNFe', (req, res) => useBody(req, res, buscarNFe));
compra4.post('/pegarDadosnfe', (req, res) => useBody(req, res, pegarDadosnfe));
compra4.post('/consultarStatus', (req, res) => useBody(req, res, consultarStatus));
compra4.post('/imprimirNFe2', (req, res) => useBody(req, res, imprimirNFe2));
compra4.post('/vermn', (req, res) => useBody(req, res, vermn));
compra4.post('/excluirmed', (req, res) => useBody(req, res, excluirmed));
compra4.post('/listarlista', (req, res) => useBody(req, res, listarlista));
compra4.post('/listarest', (req, res) => useBody(req, res, listarest));
compra4.post('/criarestoques', (req, res) => useBody(req, res, criarestoques));
compra4.post('/carregarcsts', (req, res) => useBody(req, res, carregarcsts));
compra4.post('/histpv', (req, res) => useBody(req, res, histpv));
compra4.post('/histpvTanque', (req, res) => useBody(req, res, histpvTanque));
compra4.post('/gerarzip', (req, res) => useBody(req, res, gerarzip));

module.exports = compra4;