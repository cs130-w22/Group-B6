import time
from datetime import datetime, timedelta, timezone
import logging
import sqlite3
import pandas as pd

from croniter import croniter

import sql as sql
import zapper_data as zapper

LOG_FORMAT = "%(asctime)s - %(levelname)s - %(message)s"
# LOG_FORMAT = "%(message)s"
logging.basicConfig(filename='test.log', level=logging.INFO, format=LOG_FORMAT, filemode='w')


def batch_process(address_list, time: datetime):
    db = sql.Database('zapper.sqlite')
    db.create("zapper", ['Address TEXT', 'Time DATETIME', 'Network TEXT', 'Protocol TEXT', 'Category TEXT', 'Name TEXT', 'Price NUMBER', 'Quantity NUMBER', 'Value NUMBER', 'Source TEXT'])

    for address in address_list:
        zp = zapper.ZapperBalance(address=address)
        datas = zp.process(time=time)
        for data in datas:
            db.insert('zapper', data)
    
def entry(time: datetime):
    with open('address_list.txt', 'r') as f:
        address_list = f.readlines()
    address_list = [i.strip() for i in address_list]
    print(address_list)
    batch_process(address_list, time)

def cron_trigger(crontab: str):  # e.g. crontab "*/10 * * * *" is triger every 10- minites
    last_trigger = zapper.get_cur_time()
    logging.info('Begin processing')
    waiting = False
    while True:
        cron = croniter(crontab, last_trigger)
        next_time = cron.get_next(datetime)
        if zapper.get_cur_time() > next_time:
            logging.info(f'Triggered at {zapper.get_cur_time().strftime("%Y-%m-%d %H:%M")}')
            entry(next_time)
            last_trigger = zapper.get_cur_time()
            waiting = False
        else:
            if not waiting:
                logging.info(f'Waiting for the next trigger: {next_time.strftime("%Y-%m-%d %H:%M")}')
                waiting = True
            time.sleep(60)

def analysis_entry():
    con = sqlite3.connect("zapper.sqlite")
    df = pd.read_sql_query("SELECT * from zapper", con)
    print(df)

def get_zapper(address):
    con = sqlite3.connect("zapper.sqlite")
    df = pd.read_sql_query(f'SELECT * from zapper WHERE address="{address}"', con)
    print(df)
    return df


if __name__=='__main__':
    # entry()
    cron_trigger(crontab="0 */2 * * *")
    # cron_trigger(crontab="*/5 * * * *")
