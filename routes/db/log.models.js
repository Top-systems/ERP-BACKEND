const Utils = require('./use.js');
const { useDB, useQuery } = Utils;

const logipservidor = async function({  }){ 


    const tableName = await useDB({ 
        query: "select table_name from information_schema.tables where table_name='xdb_pub_replog' limit 1"
    }); 

    const select = await useDB({ 
        query: `SELECT c.pub_rep_id, pub_id, sub_server_id, pub_server_id, sub_id, rep_type, table_name, start_time, end_time, status, c.row_count, c.byte_size_kb, error_msg FROM _edb_replicator_pub.xdb_pub_replog as c inner join _edb_replicator_pub.xdb_pub_table_replog as r on r.pub_rep_id=c.pub_rep_id inner join _edb_replicator_pub.rrep_tables as t on t.table_id=r.table_id order by start_time desc limit 100` 
    });

    const select2 = await useDB({ 
        query:  `SELECT src_db_id, target_db_id, src_rrep_sync_id, target_rrep_sync_id,       table_name, conflict_time, resolution_status, resolution_strategy, resolution_time, alert_status, conflict_type, win_db_id, win_rrep_sync_id, notes, pk_value FROM _edb_replicator_pub.xdb_conflicts as c inner join _edb_replicator_pub.rrep_tables as t on t.table_id=c.table_id order by conflict_time desc limit 100`
    });

    const select3 = await useDB({ 
        query: `SELECT d.pub_db_id, db_host, db_port, db_user,  db_name, db_type, rep_group, is_mdn,  db_priority,  has_initial_snapshot FROM _edb_replicator_pub.xdb_pub_database as d inner join _edb_replicator_pub.xdb_mmr_pub_group as g on g.pub_db_id=d.pub_db_id` 
    });
    const select4 = await useDB({ 
        query: `SELECT table_id, table_name, shadow_table_name, table_type FROM _edb_replicator_pub.rrep_tables` 
    });

    const select5 = await useDB({ 
        query:  `SELECT d.trigger_name, d.trigger_group, job_name, job_group, is_volatile  next_fire_time, prev_fire_time, trigger_state, trigger_type start_time, end_time, misfire_instr, priority,repeat_count, repeat_interval, times_triggered FROM _edb_scheduler.sch_pub_triggers as c inner join _edb_scheduler.sch_pub_simple_triggers as d on d.trigger_name=c.trigger_name`
    })

 return { code: 200, results: { tableName, select, select2, select3, select4, select5}}  
    
};

const loginfoserver = async function({  }){ 

    const tableName = await useDB({ 
        query: `select table_name from information_schema.tables where table_name='sym_data' limit 1`
    }); 

    const select = await useDB({ 
        query: `SELECT batch_id, node_id, channel_id, status, error_flag, sql_state, sql_code, sql_message, last_update_time, create_time, summary FROM public.sym_incoming_batch where status!='OK' order by last_update_time desc limit 100` 
    });

    const select2 = await useDB({ 
        query: `SELECT batch_id, node_id, channel_id, status, error_flag, sql_state, sql_code, sql_message, last_update_time, create_time, summary FROM public.sym_outgoing_batch where status!='OK' order by last_update_time desc limit 100`  
    })

 return { code: 200, results: { tableName, select, select2 }}  
    
};


module.exports = {
    logipservidor,
    loginfoserver,
}