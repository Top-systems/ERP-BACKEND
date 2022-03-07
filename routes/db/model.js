const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const atualizarsaldo = async function ({ loja, lojaLogada }) {
    const query = ` /* atualizarsaldo loja: ${loja}, lojaLogada: ${lojaLogada} */
    update fn_contasreceber  SET statusreceb_contasreceber='Q'
    /* MK */                WHERE loja_fk=${loja} AND statusreceb_contasreceber='P'
                    AND valorrestante_contasreceber = 0
                    AND valorpago_contasreceber=valortotal_contasreceber;
    
                        UPDATE public.cd_cliente as c
                                       SET  saldodev_cli=(SELECT SUM(r.valorrestante_contasreceber)
                                      FROM public.fn_contasreceber as r
                                      where r.cliente_fk=c.id_cli and r.statusreceb_contasreceber in ('P','F'))
                                    where (SELECT SUM(d.valorrestante_contasreceber)
                                      FROM public.fn_contasreceber as d
                                      where d.cliente_fk=c.id_cli and d.statusreceb_contasreceber in ('P','F')) is not null
                                      and saldodev_cli!=(SELECT SUM(r.valorrestante_contasreceber)
                                      FROM public.fn_contasreceber as r
                                      where r.cliente_fk=c.id_cli and r.statusreceb_contasreceber in ('P','F'));
                    
                                 UPDATE public.cd_cliente as c
                                    SET  saldodev_cli=0
                                 where (SELECT SUM(d.valorrestante_contasreceber)
                                   FROM public.fn_contasreceber as d
                                   where d.cliente_fk=c.id_cli and d.statusreceb_contasreceber in ('P','F')) is  null and saldodev_cli!=0;
                                    
                                    UPDATE public.cd_cliente as c
                                       SET  saldodev_cli=0
                                    where (SELECT SUM(d.valorrestante_contasreceber)
                                      FROM public.fn_contasreceber as d
                                      where d.cliente_fk=c.id_cli and d.statusreceb_contasreceber in ('P','F')) =0
                                      and saldodev_cli!=0;
                                   
                                    
                                    UPDATE public.cd_cliente as c
                                      set diasatraso_cli=(SELECT DATE_PART('day', now() - min(datavenc_contasreceber)) 
                                      FROM public.fn_contasreceber
                                      where cliente_fk=c.id_cli  and statusreceb_contasreceber in ('P','F'))
                                      where (SELECT DATE_PART('day', now() - min(datavenc_contasreceber)) 
                                      FROM public.fn_contasreceber
                                      where cliente_fk=c.id_cli  and statusreceb_contasreceber in ('P','F'))>0
                                      and diasatraso_cli!=(SELECT DATE_PART('day', now() - min(datavenc_contasreceber)) 
                                      FROM public.fn_contasreceber
                                      where cliente_fk=c.id_cli  and statusreceb_contasreceber in ('P','F'));
                                    
                                    
                                    UPDATE public.cd_cliente as c
                                      set diasatraso_cli=0
                                      where ((SELECT DATE_PART('day', now() - min(datavenc_contasreceber))
                                      FROM public.fn_contasreceber
                                      where cliente_fk=c.id_cli  and statusreceb_contasreceber in ('P','F')) is null
                                      or (SELECT DATE_PART('day', now() - min(datavenc_contasreceber)) 
                                      FROM public.fn_contasreceber
                                      where cliente_fk=c.id_cli  and statusreceb_contasreceber in ('P','F')) <0) 
                                      and diasatraso_cli>0;
                    
                      update  fn_contasreceber set valorpago_contasreceber =valortotal_contasreceber
    /* MK */                  where statusreceb_contasreceber='Q' and loja_fk=${lojaLogada}
                      and id_contasreceber in (SELECT  id_contasreceber
                      FROM public.fn_contasreceber
                      where valordesconto_contasreceber=0
                      and valormulta_contasreceber=0
                      and valorjuros_contasreceber=0
                      and valoradicional_contasreceber=0
                      and statusreceb_contasreceber='Q'
                      and valorpago_contasreceber!=valortotal_contasreceber
    /* MK */                  and loja_fk = ${lojaLogada} )
    `

    return await useDB({ query })
}

const opcoesCli = async function ({ escolha, escolhaprod = "T", clientel, loja, datainicial, datafinal }) {
    switch (escolha) {
        case "9":
            if (escolhaprod == "T" || escolhaprod == "P") {
                return await useDB({
                    query: `
                    SELECT produto_fk,descricao_prod,
                        sum( qtde_cupitem) as qt,
                        sum( valorfinal_cupitem+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupitem ELSE 0 END)-descontoglobal_cupitem) as vt
                        FROM public.ecf_cupomdet_prod as det
                        inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk
                        inner join ecf_cupomcab_cliente as cli on cli.cupomcab_fk=cab.id_cupomcab
                        inner join cd_produto as p on p.id_prod=det.produto_fk
                        where det.loja_fk=${loja.id} and cab.loja_fk=${loja.id}
                        and cli.loja_fk=${loja.id}  and status_cupom in('F','O','D')
                        and status_cupitem='F'
                        and (cast(datahora_cupom as date) between '${datainicial}'
                        and '${datafinal}')
                        and cod_cliente=${clientel.id}
                        group by produto_fk,descricao_prod
                        order by descricao_prod
            ` })
            }
            if (escolhaprod.equals("T") || escolhaprod.equals("C")) {
                return await useDB({
                    query: `
                    SELECT tipocombustivel_fk,descricao_tipcomb,
                        sum( qtde_cupdetbic) as qt,
                        sum( (valorfinal_cupdetbic+(CASE WHEN acrescimo_cupomcab>0 THEN valoracrescimo_cupdetbic ELSE 0 END))-descontoglobal_cupitem) as vt
                            FROM public.ecf_cupomdet_bico as det
                            inner join ecf_cupomcab as cab on cab.id_cupomcab=det.cupomcab_fk
                            inner join ecf_cupomcab_cliente as cli on cli.cupomcab_fk=cab.id_cupomcab
                            inner join cd_bico as b on det.bico_fk=b.id_bico
                            inner join cd_tanque as t on t.id_tanque=b.tanque_fk
                            inner join cd_tipocombustivel as p on p.id_tipocombustivel=t.tipocombustivel_fk
                            where det.loja_fk=${loja.id}
                            and cab.loja_fk=${loja.id}
                            and cli.loja_fk=${loja.id}  
                            and t.loja_fk=${loja.id}
                            and b.loja_fk=${loja.id} 
                            and status_cupom in('F','O','D')
                            and status_cupdetbic='F'
                            and (cast(datahora_cupom as date) between '${datainicial}'
                            and '${datafinal}')
                            and cod_cliente= clientel.getIdCli() 
                            group by tipocombustivel_fk,descricao_tipcomb
                            order by descricao_tipcomb
            ` })
            }
    }
}

const opcoes = async function ({ escolha, listCliSelecionado = [], loja, lojai, datainicial, datafinal, empresa, sql = ' 1=1 ' }) {
    switch (escolha) {
        case "4":
            let sql = ""

            let posicao = 1;
            //para aparecer todos selecionados no pdf
            for (let c of listCliSelecionado) {
                sql += "c.id_cli=" + c.id;
                if (posicao < listCliSelecionado.length) {
                    sql += " or "
                }
                posicao++
            }
            if (!sql) {
                sql = " 1=1 "
            }

            return await useDB({
                query: `
                        select c.id_cli,c.nome_cli,c.endereco_cli,c.bairro_cli,c.numero_cli,
                        cidade_cli,uf_cli,cep_cli,
                        CASE
                            WHEN (select current_date - r.datavenc_contasreceber AS intervalo)>emp.diascarencia_empconv
                          THEN (sum(r.valorrestante_contasreceber) +
                        ((sum(r.valorrestante_contasreceber) *emp.mora_empconv)/100*(select current_date - r.datavenc_contasreceber AS intervalo)) +
                        ((sum(r.valorrestante_contasreceber) *emp.multa_empconv)/100)) 
                            ELSE sum(r.valorrestante_contasreceber)
                         END as total
                        from fn_contasreceber as r
                         inner join cd_cliente as c on r.cliente_fk=c.id_cli
                         inner join cd_empresaconveniada as emp on emp.id_empconv=c.empresa_fk
                         where r.statusreceb_contasreceber in ('P','F')
                         and r.loja_fk=${loja.id}
                         and r.datavenc_contasreceber < now() and ( ${sql} )
                         group by c.id_cli,emp.mora_empconv,emp.multa_empconv,
                         emp.diascarencia_empconv, r.datavenc_contasreceber
            ` })
        case "6":
            if (listCliSelecionado.length) {
                e = " and c.cod_empresa=" + empresa.idEmpconv + " ";
            } else {
                e = " and ( ";
            }

            for (let [c, pos] of listCliSelecionado) {
                if (pos == listCliSelecionado.size()) {
                    e = e + " c.cod_cliente=" + c.id + " ";
                } else {
                    e = e + " c.cod_cliente=" + c.id + " or ";
                }
            }


            if (!listCliSelecionado.length) {
                e = e + " ) ";
            }
            return await useDB({
                query: `
                    select cli.id_cli,cli.nome_cli,cp.datahora_cupom,det.codbarra_cupitem,
                        pr.descricao_prod,
                        det.valororig_cupitem,det.qtde_cupitem,det.valordesconto_cupitem,
                        det.valorfinal_cupitem,e.id_empconv,e.razaosocial_empconv
                    from ecf_cupomcab_cliente as c
                            inner join cd_cliente as cli on c.cod_cliente=cli.id_cli
                            inner join ecf_cupomcab as cp  on cp.id_cupomcab=c.cupomcab_fk
                            inner join ecf_cupomdet_prod as det  on cp.id_cupomcab=det.cupomcab_fk
                            inner join cd_produto as pr  on pr.id_prod=det.produto_fk
                            inner join cd_empresaconveniada as e  on e.id_empconv=cli.empresa_fk
                        where c.loja_fk=${lojai.id} and cp.status_cupom in ('F','O') and status_cupitem='F'
                            and (cast(cp.datahora_cupom as date)
                            between '${datainicial}' and '${datafinal}')
                            ${e}
                            order by cp.datahora_cupom asc";
                `
            })
    }
}

module.exports = {
    useDB,
    atualizarsaldo,
    opcoesCli,
    opcoes
}