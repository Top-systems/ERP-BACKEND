const express = require('express');
const { useBody } = require('./db/use');

const {
    ex,
    listareventos,
    listarnotasmanifestadas,
    salvarNota2,
    salvarNota,
    salvarEntrega,
    salvarDestinatario,
    salvarfaturapagamento,
    salvarcabnfe,
    salvarloteitemnfe,
    salvaritemnfe,
    salvarnaturezaeinfo,
    salvaritemnfe2,
    salvarnfecab2,
    salvarlotesitemnfe3,
    salvaritensnfe3,
    salvarnfecab3,
    salvarcuponsnfe4,
    salvaritensnfe4 ,
    salvarnotasnfe5a, 
    salvarnotasnfe5,
    salvarnotasnfe4s,
    salvarcuponsnfe7,
    salvaritensnfe7,
    atualizaSequenciador,
    salvarEmitente,
    salvarRetirada,
    preencherListaBuscaNormal,
    preencherListaBusca,
    pegardestinatario,
    pesquisarNotasNormais2,
    consultaLotesNota,
    consultarLotesNotaTransferencia, 
    consultarNotas,
    consultarNotass2,
    consultarNotass,
    consultarDetalhes,
    consultarDetalhess,
    selecionaNatureza,
    listaOperacao,
    listaOperacao2,
    pegarCodigoDeBarras,
    adicionarProduto3,
    adicionarProduto3s,
    verificaritens2,
    inseriritenscupons2,
    listaCupom,
    listaCupom22,
    pegaritensusandocupom,
    pesquisarCuponsAvista,
    pesquisarCuponsAvista2,
    verificadocref,
    verificadocref2,
    verificadocref3,
    jaReferenciado,
    jaReferenciado2,
    setarModeloSeriexml,
    setaplanoconta,
    setarModeloSerie,
    adicionarCupons,
    verificaListaCupons,
    setarProduto,
    pesquisarPorColunaDescricao,
    pesquisarCodigoProduto,
    pesquisarCodigoServico,
    pegaibpt,
    pegarEstoque,
    pegarVenda,
    pegarCusto,
    onCellEdit,
    confirmarBusca,
    codigoibgeuf,
    numeroserie,
    processarFiltro,
    salvarTransportadora,
    salvarTransportadora2,
    setarCombustivel,
    inserir,
    pesquisarPorColuna,
    consultarStatus,
    validar,
    validarxml,
    validar2,
    cancelarNFe,
    cancelarNFe3,
    cartaNFe,
    inutilizarNFe,
    imprimirNFe,
    imprimirNFe2,
    xmlpdf,
    xmlpdfprevia,
    enviarNFE,
    enviarNFE2,
    histpv,
    atualizaconvenio,
    pegarDadosnfe,
    consultar,
    verificardesttr,
    verificardestte,
    verificardestt,
    verificardest,
    mailnfe,
    LerNoProtv,
    LerNoProt,
    LerNonfe,
    LerNoecf,
    LerNodet,
    pxmlv,
    pxmlinut,
    pxml,
    preencherLista1,
    carregarcsts,
    confirmanfe,
    excluirnfe,
    consultarf,
    gerarf,
    gerarzip,
    preencherListaBuscaDestinatario,
    pesquisarPordestd
} = require('./db/nfeCabecalho4.models');

const nfeCabecalho4 = express.Router();

nfeCabecalho4.post('/ex', (req, res) => useBody(req, res, ex));
nfeCabecalho4.post('/listareventos', (req, res) => useBody(req, res, listareventos));
nfeCabecalho4.post('/listarnotasmanifestadas', (req, res) => useBody(req, res, listarnotasmanifestadas));
nfeCabecalho4.post('/salvarNota2', (req, res) => useBody(req, res, salvarNota2));
nfeCabecalho4.post('/salvarNota', (req, res) => useBody(req, res, salvarNota));
nfeCabecalho4.post('/salvarEntrega', (req, res) => useBody(req, res, salvarEntrega));
nfeCabecalho4.post('/salvarDestinatario', (req, res) => useBody(req, res, salvarDestinatario));
nfeCabecalho4.post('/salvarfaturapagamento', (req, res) => useBody(req, res, salvarfaturapagamento));
nfeCabecalho4.post('/salvarcabnfe', (req, res) => useBody(req, res, salvarcabnfe));
nfeCabecalho4.post('/salvarloteitemnfe', (req, res) => useBody(req, res, salvarloteitemnfe));
nfeCabecalho4.post('/salvaritemnfe', (req, res) => useBody(req, res, salvaritemnfe));
nfeCabecalho4.post('/salvarnaturezaeinfo', (req, res) => useBody(req, res, salvarnaturezaeinfo));
nfeCabecalho4.post('/salvaritemnfe2', (req, res) => useBody(req, res, salvaritemnfe2));
nfeCabecalho4.post('/salvarnfecab2', (req, res) => useBody(req, res, salvarnfecab2));
nfeCabecalho4.post('/salvarlotesitemnfe3', (req, res) => useBody(req, res, salvarlotesitemnfe3));
nfeCabecalho4.post('/salvaritensnfe3', (req, res) => useBody(req, res, salvaritensnfe3));
nfeCabecalho4.post('/salvarnfecab3', (req, res) => useBody(req, res, salvarnfecab3));
nfeCabecalho4.post('/salvarcuponsnfe4', (req, res) => useBody(req, res, salvarcuponsnfe4));
nfeCabecalho4.post('/salvaritensnfe4', (req, res) => useBody(req, res, salvaritensnfe4));
nfeCabecalho4.post('/salvarnotasnfe5a', (req, res) => useBody(req, res, salvarnotasnfe5a));
nfeCabecalho4.post('/salvarnotasnfe5', (req, res) => useBody(req, res, salvarnotasnfe5));
nfeCabecalho4.post('/salvarnotasnfe4s', (req, res) => useBody(req, res, salvarnotasnfe4s));
nfeCabecalho4.post('/salvarcuponsnfe7', (req, res) => useBody(req, res, salvarcuponsnfe7));
nfeCabecalho4.post('/salvaritensnfe7', (req, res) => useBody(req, res, salvaritensnfe7));
nfeCabecalho4.post('/atualizaSequenciador', (req, res) => useBody(req, res, atualizaSequenciador));
nfeCabecalho4.post('/salvarEmitente', (req, res) => useBody(req, res, salvarEmitente));
nfeCabecalho4.post('/salvarRetirada', (req, res) => useBody(req, res, salvarRetirada));
nfeCabecalho4.post('/preencherListaBuscaNormal', (req, res) => useBody(req, res, preencherListaBuscaNormal));
nfeCabecalho4.post('/preencherListaBusca', (req, res) => useBody(req, res, preencherListaBusca));
nfeCabecalho4.post('/pegardestinatario', (req, res) => useBody(req, res, pegardestinatario));
nfeCabecalho4.post('/pesquisarNotasNormais2', (req, res) => useBody(req, res, pesquisarNotasNormais2));
nfeCabecalho4.post('/consultaLotesNota', (req, res) => useBody(req, res, consultaLotesNota));
nfeCabecalho4.post('/consultarLotesNotaTransferencia', (req, res) => useBody(req, res, consultarLotesNotaTransferencia));
nfeCabecalho4.post('/consultarNotas', (req, res) => useBody(req, res, consultarNotas));
nfeCabecalho4.post('/consultarNotass2', (req, res) => useBody(req, res, consultarNotass2));
nfeCabecalho4.post('/consultarNotass', (req, res) => useBody(req, res, consultarNotass));
nfeCabecalho4.post('/consultarDetalhes', (req, res) => useBody(req, res, consultarDetalhes));
nfeCabecalho4.post('/consultarDetalhess', (req, res) => useBody(req, res, consultarDetalhess));
nfeCabecalho4.post('/selecionaNatureza', (req, res) => useBody(req, res, selecionaNatureza));
nfeCabecalho4.post('/listaOperacao', (req, res) => useBody(req, res, listaOperacao));
nfeCabecalho4.post('/listaOperacao2', (req, res) => useBody(req, res, listaOperacao2));
nfeCabecalho4.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));
nfeCabecalho4.post('/adicionarProduto3', (req, res) => useBody(req, res, adicionarProduto3));
nfeCabecalho4.post('/adicionarProduto3s', (req, res) => useBody(req, res, adicionarProduto3s));
nfeCabecalho4.post('/verificaritens2', (req, res) => useBody(req, res, verificaritens2));
nfeCabecalho4.post('/inseriritenscupons2', (req, res) => useBody(req, res, inseriritenscupons2));
nfeCabecalho4.post('/listaCupom', (req, res) => useBody(req, res, listaCupom));
nfeCabecalho4.post('/listaCupom22', (req, res) => useBody(req, res, listaCupom22));
nfeCabecalho4.post('/pegaritensusandocupom', (req, res) => useBody(req, res, pegaritensusandocupom));
nfeCabecalho4.post('/pesquisarCuponsAvista', (req, res) => useBody(req, res, pesquisarCuponsAvista));
nfeCabecalho4.post('/pesquisarCuponsAvista2', (req, res) => useBody(req, res, pesquisarCuponsAvista2));
nfeCabecalho4.post('/verificadocref', (req, res) => useBody(req, res, verificadocref));
nfeCabecalho4.post('/verificadocref2', (req, res) => useBody(req, res, verificadocref2));
nfeCabecalho4.post('/verificadocref3', (req, res) => useBody(req, res, verificadocref3));
nfeCabecalho4.post('/jaReferenciado', (req, res) => useBody(req, res, jaReferenciado));
nfeCabecalho4.post('/jaReferenciado2', (req, res) => useBody(req, res, jaReferenciado2));
nfeCabecalho4.post('/setarModeloSeriexml', (req, res) => useBody(req, res, setarModeloSeriexml));
nfeCabecalho4.post('/setaplanoconta', (req, res) => useBody(req, res, setaplanoconta));
nfeCabecalho4.post('/setarModeloSerie', (req, res) => useBody(req, res, setarModeloSerie));
nfeCabecalho4.post('/adicionarCupons', (req, res) => useBody(req, res, adicionarCupons));
nfeCabecalho4.post('/verificaListaCupons', (req, res) => useBody(req, res, verificaListaCupons));
nfeCabecalho4.post('/setarProduto', (req, res) => useBody(req, res, setarProduto));
nfeCabecalho4.post('/pesquisarPorColunaDescricao', (req, res) => useBody(req, res, pesquisarPorColunaDescricao));
nfeCabecalho4.post('/pesquisarCodigoProduto', (req, res) => useBody(req, res, pesquisarCodigoProduto));
nfeCabecalho4.post('/pesquisarCodigoServico', (req, res) => useBody(req, res, pesquisarCodigoServico));
nfeCabecalho4.post('/pegaibpt', (req, res) => useBody(req, res, pegaibpt));
nfeCabecalho4.post('/pegarEstoque', (req, res) => useBody(req, res, pegarEstoque));
nfeCabecalho4.post('/pegarVenda', (req, res) => useBody(req, res, pegarVenda));
nfeCabecalho4.post('/pegarCusto', (req, res) => useBody(req, res, pegarCusto));
nfeCabecalho4.post('/onCellEdit', (req, res) => useBody(req, res, onCellEdit));
nfeCabecalho4.post('/confirmarBusca', (req, res) => useBody(req, res, confirmarBusca));
nfeCabecalho4.post('/codigoibgeuf', (req, res) => useBody(req, res, codigoibgeuf));
nfeCabecalho4.post('/numeroserie', (req, res) => useBody(req, res, numeroserie));
nfeCabecalho4.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
nfeCabecalho4.post('/salvarTransportadora', (req, res) => useBody(req, res, salvarTransportadora));
nfeCabecalho4.post('/salvarTransportadora2', (req, res) => useBody(req, res, salvarTransportadora2));
nfeCabecalho4.post('/setarCombustivel', (req, res) => useBody(req, res, setarCombustivel));
nfeCabecalho4.post('/inserir', (req, res) => useBody(req, res, inserir));
nfeCabecalho4.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
nfeCabecalho4.post('/consultarStatus', (req, res) => useBody(req, res, consultarStatus));
nfeCabecalho4.post('/validar', (req, res) => useBody(req, res, validar));
nfeCabecalho4.post('/validarxml', (req, res) => useBody(req, res, validarxml));
nfeCabecalho4.post('/validar2', (req, res) => useBody(req, res, validar2));
nfeCabecalho4.post('/cancelarNFe', (req, res) => useBody(req, res, cancelarNFe));
nfeCabecalho4.post('/cancelarNFe3', (req, res) => useBody(req, res, cancelarNFe3));
nfeCabecalho4.post('/cartaNFe', (req, res) => useBody(req, res, cartaNFe));
nfeCabecalho4.post('/inutilizarNFe', (req, res) => useBody(req, res, inutilizarNFe));
nfeCabecalho4.post('/imprimirNFe', (req, res) => useBody(req, res, imprimirNFe));
nfeCabecalho4.post('/imprimirNFe2', (req, res) => useBody(req, res, imprimirNFe2));
nfeCabecalho4.post('/xmlpdf', (req, res) => useBody(req, res, xmlpdf));
nfeCabecalho4.post('/xmlpdfprevia', (req, res) => useBody(req, res, xmlpdfprevia));
nfeCabecalho4.post('/enviarNFE', (req, res) => useBody(req, res, enviarNFE));
nfeCabecalho4.post('/enviarNFE2', (req, res) => useBody(req, res, enviarNFE2));
nfeCabecalho4.post('/histpv', (req, res) => useBody(req, res, histpv));
nfeCabecalho4.post('/atualizaconvenio', (req, res) => useBody(req, res, atualizaconvenio));
nfeCabecalho4.post('/pegarDadosnfe', (req, res) => useBody(req, res, pegarDadosnfe));
nfeCabecalho4.post('/consultar', (req, res) => useBody(req, res, consultar));
nfeCabecalho4.post('/verificardesttr', (req, res) => useBody(req, res, verificardesttr));
nfeCabecalho4.post('/verificardestte', (req, res) => useBody(req, res, verificardestte));
nfeCabecalho4.post('/verificardestt', (req, res) => useBody(req, res, verificardestt));
nfeCabecalho4.post('/verificardest', (req, res) => useBody(req, res, verificardest));
nfeCabecalho4.post('/mailnfe', (req, res) => useBody(req, res, mailnfe));
nfeCabecalho4.post('/LerNoProtv', (req, res) => useBody(req, res, LerNoProtv));
nfeCabecalho4.post('/LerNoProt', (req, res) => useBody(req, res, LerNoProt));
nfeCabecalho4.post('/LerNonfe', (req, res) => useBody(req, res, LerNonfe));
nfeCabecalho4.post('/LerNoecf', (req, res) => useBody(req, res, LerNoecf));
nfeCabecalho4.post('/LerNodet', (req, res) => useBody(req, res, LerNodet));
nfeCabecalho4.post('/pxmlv', (req, res) => useBody(req, res, pxmlv));
nfeCabecalho4.post('/pxmlinut', (req, res) => useBody(req, res, pxmlinut));
nfeCabecalho4.post('/pxml', (req, res) => useBody(req, res, pxml));
nfeCabecalho4.post('/preencherLista1', (req, res) => useBody(req, res, preencherLista1));
nfeCabecalho4.post('/carregarcsts', (req, res) => useBody(req, res, carregarcsts));
nfeCabecalho4.post('/confirmanfe', (req, res) => useBody(req, res, confirmanfe));
nfeCabecalho4.post('/excluirnfe', (req, res) => useBody(req, res, excluirnfe));
nfeCabecalho4.post('/consultarf', (req, res) => useBody(req, res, consultarf));
nfeCabecalho4.post('/gerarf', (req, res) => useBody(req, res, gerarf));
nfeCabecalho4.post('/gerarzip', (req, res) => useBody(req, res, gerarzip));
nfeCabecalho4.post('/preencherListaBuscaDestinatario', (req, res) => useBody(req, res, preencherListaBuscaDestinatario));

module.exports = nfeCabecalho4