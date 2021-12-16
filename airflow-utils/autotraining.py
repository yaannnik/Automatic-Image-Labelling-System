from datetime import datetime, timedelta
import time
import yaml
import sys

# The DAG object; we'll need this to instantiate a DAG
from airflow import DAG

# Operators; we need this to operate!
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
# These args will get passed on to each operator
# You can override them on a per-task basis during operator initialization
default_args = {
    'owner': '',
    'depends_on_past': False,
    'email': [''],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(seconds=30),
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2016, 1, 1),
    # 'wait_for_downstream': False,
    # 'dag': dag,
    # 'sla': timedelta(hours=2),
    # 'execution_timeout': timedelta(seconds=300),
    # 'on_failure_callback': some_function,
    # 'on_success_callback': some_other_function,
    # 'on_retry_callback': another_function,
    # 'sla_miss_callback': yet_another_function,
    # 'trigger_rule': 'all_success'
}

with open("Global-Config.yaml", 'r') as fp:
    global_cfg = yaml.load(fp.read(), Loader=yaml.Loader)

train_script = global_cfg["train_script"]
config_file = global_cfg["config_file"]

with DAG(
    'auto_training',
    default_args=default_args,
    description='A simple toy DAG',
    schedule_interval=timedelta(days=7),
    start_date=datetime(2021, 1, 1),
    catchup=False,
    tags=['example'],
) as dag:

    auto_training = BashOperator(
            task_id='auto_training',
            bash_command='python %s --config-file %s' % (train_script, config_file),
            retries=3,
        )