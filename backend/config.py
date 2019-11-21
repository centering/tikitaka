class Access_info:
    SECRET_KEY='2ZwfCL6OmldiOfQXXl4ns3vcB6TsfKqmchP6OnaO'

class Inference_connection_info:
    host = '52.141.7.185'
    port = 8000

class DB_connection_info:
    host = '52.141.6.60'
    port = 3306
    user = 'root'
    passwd = 'piglet'
    db = 'tikitaka'
    charset = 'utf8'

class log_connection_info:
    host = '52.231.39.19'       #for AMC
    port = 9200

    kibana_user = 'user'
    kibana_pw = 'polpdEqytUn3'  #for kibana

    kibana_port = 5601

    single_turn_gen_index = 'single_turn_generation_index'
    multi_turn_gen_index = 'multi_turn_generation_index'
    multi_turn_log_index = 'multi_turn_logging_index'
    woz_log_index = 'woz_log_index'

class mail_info:
    mail_server = 'smtp.gmail.com'
    mail_port = 587
    mail_host = 'sktelecom.piglet@gmail.com'
    mail_password = 'fovedhzsuiqoowhn'

