const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const iniciar = async function({ idGrpprod }){ 

    const grupoProdId = await useDB({ 
        query: "SELECT distinct(grupoprod_fk) FROM public.cd_produto where  balanca_prod='S' order by grupoprod_fk asc"
     }); 

     const grupoProduto = await useDB({ 
         query: `select * from Cd_Grupoproduto where id_Grpprod=${idGrpprod}` 
    })

 return { code: 200, results: { grupoProdId, grupoProduto }}  
    
};

const gerar = async function({ idLoja, idsGrpprod }){ 

    const gerar1 = await useDB({ 
        query: `SELECT p.grupoprod_fk,id_prod,descricao_prod,precovenda_prod,sigla_unid FROM cd_produto as p  inner join es_estoquegeral as e on e.produto_fk=p.id_prod inner join cd_unidade as u on u.id_unid=p.unidade_fk where  loja_fk=${idLoja} and p.grupoprod_fk in (${idsGrpprod}) and balanca_prod='S' order by p.grupoprod_fk asc`
    }); 

    const gerar2 = await useDB({ 
        query:  `SELECT  sigla_unid,id_prod,descricao_prod,precovenda_prod FROM  cd_produto as p  inner join cd_unidade as u on u.id_unid=p.unidade_fk inner join es_estoquegeral as e on e.produto_fk=p.id_prod where  loja_fk=${idLoja}  and p.grupoprod_fk in (${idsGrpprod}) and balanca_prod='S' order by p.grupoprod_fk asc`
    });

    const gerar3 = await useDB({ 
        query: `SELECT  numero_codbar,descricao_prod,precovenda_prod FROM public.cd_codigobarras AS cb inner join cd_produto as p on p.id_prod=cb.produto_fk inner join es_estoquegeral as e on e.produto_fk=cb.produto_fk where ativo_codbar='S' and loja_fk=${idLoja}  and p.grupoprod_fk in (${idsGrpprod}) and balanca_prod='S' order by p.grupoprod_fk asc`  
    });

    const gerar4 = await useDB({ 
        query: `SELECT  id_prod,descricao_prod,precovenda_prod FROM cd_produto as p  inner join es_estoquegeral as e on e.produto_fk=p.id_prod where  loja_fk=${idLoja}  and p.grupoprod_fk in (${idsGrpprod}) and balanca_prod='S' order by p.grupoprod_fk asc` 
    });

    const gerar5 = await useDB({ 
        query: `SELECT  id_prod,descricao_prod,precovenda_prod FROM cd_produto as p  inner join es_estoquegeral as e on e.produto_fk=p.id_prod where  loja_fk=${idLoja}  and p.grupoprod_fk in (${idsGrpprod}) and balanca_prod='S' order by p.grupoprod_fk asc` 
    })

 return { code: 200, results: { gerar1, gerar2, gerar3, gerar4, gerar5 }}  
    
};

module.exports = {
    iniciar,
    gerar
}