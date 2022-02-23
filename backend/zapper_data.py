import json
import logging
import pprint as pp
import time
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from urllib.request import Request, urlopen

import pandas as pd
import pygsheets
from croniter import croniter

import sql as sql


def get_cur_time(): # NYC timezone
    utc_dt = datetime.utcnow().replace(tzinfo=timezone.utc)
    cur_time = utc_dt.astimezone(timezone(timedelta(hours=-8))) # -5 is NY, -8 is CA
    return cur_time

# def str_to_datetime_with_timezone(time_str: str) -> datetime:
#     timestamp = datetime.strptime(time_str, "%Y-%m-%d %H:%M:%S").replace(tzinfo=timezone(timedelta(hours=-5)))
#     return timestamp


class ZapperBalance(object):
    _baseUrl='https://api.zapper.fi/v1/'
    _walletUrl='protocols/tokens/balances'
    _convexUrl='protocols/convex/balances'
    _curveUrl='protocols/curve/balances'
    _farmUrl='farms/balances'
    # _address='0x8c6c8c306fbcea9330e9dd6c18b8659bdf2445a4'
    # TODO 1. change address
    _address='0x84cA6410386cB694846f1AAEe961Db894D5ef2C4'.lower()
    _apikey='96e0cc51-a62e-42ca-acee-910ea7d2a241'
    
    def __init__(self, address: str) -> None:
        # self.logger=self.setup_custom_logger('ZapperBalance')
        self.address = address.lower()

        client = pygsheets.authorize(service_file = "defi-334000-410407de395b.json")
        sh = client.open('defi-database')
        # self.wks = sh.sheet1
        # TODO 2. Change worksheet
        self.wks = sh.worksheet_by_title('Sheet2')
        

    # def setup_custom_logger(self,name, log_level=logging.DEBUG):
    #     formatter = logging.Formatter(fmt='%(asctime)s - %(levelname)s - %(module)s - %(message)s')
    #     handler = logging.StreamHandler()
    #     handler.setFormatter(formatter)
    #     logger = logging.getLogger(name)
    #     logger.setLevel(log_level)
    #     logger.addHandler(handler)
    #     return logger

    def get_row(self):
        while True:
            try:
                df = pd.DataFrame(self.wks.get_all_records())
                break
            except:
                print("google sheet read error, retry in 5 seconds")
                time.sleep(5)
        return len(df)+2

    def _http_get_request(self, params={},url=None):
        headers = {
            'User-Agent': 'PostmanRuntime/7.28.4',
            'Content-type': 'application/json; charset=utf-8',
        }
        postdata=''
        for key,value in params.items():
            postdata+=key
            postdata+='='
            postdata+=value
            postdata+='&'
        url+="?"+postdata[:-1]
        request = Request(url=url, headers=headers,unverifiable=True)
        while True:
            try:
                #本地访问
                content = urlopen(request, timeout=30).read()
                break
            except Exception as e:
                print("(get)Http Error try to resend in one second error: {} \n url:{}".format(e,url))
                time.sleep(1)
        content = content.decode('utf-8')
        json_data = json.loads(content)
        return json_data

    def get_wallet_tokens(self):
        params={
            "addresses%5B%5D":self._address,
            'network':'ethereum',
            "api_key":self._apikey
        }
        result=self._http_get_request(params,self._baseUrl+self._walletUrl)
        # pp.pprint(result)
        assets=result[self._address]['products'][0]['assets']
        meta=result[self._address]['meta']
        total_value=next(filter(lambda x:x['label']=='Total',iter(meta)))['value']
        l=[]
        for i in assets:
            keep_val = {'balance', 'balanceUSD', 'price', 'symbol'}
            cur = {key: value for key, value in i.items() if key in keep_val}
            l.append(cur)
        # for i in assets:
        #     l.append([i['symbol'],round(i['balance'],2),i['price'],round(i['balanceUSD'],2)])
        return l,total_value

    def get_data(self, network: str, protocol_url: str):
        params={
            "addresses%5B%5D":self._address,
            'network':network,
            "api_key":self._apikey
        }
        result=self._http_get_request(params,self._baseUrl + protocol_url)
        products=result[self._address]['products']
        
        items = []
        for product in products:
            items += self.recursion_get_convex_items(product['assets'], [])

        meta=result[self._address]['meta']
        total_value=next(filter(lambda x:x['label']=='Total',iter(meta)))['value']
        
        return items, total_value

    def recursion_get_convex_items(self, assets, items):
        if len(assets)==0:
            return
        for i in assets:
            subitems = []
            if i['balanceUSD']==0:
                continue
            elif 'tokens' in i and i['tokens']:
                subitems = self.recursion_get_convex_items(i['tokens'], [])
            keep_val = {'balance', 'balanceUSD', 'category', 'price', 'symbol', 'type', 'appName'}
            cur = {key: value for key, value in i.items() if key in keep_val}
            if subitems:
                cur['token'] = subitems
            items.append(cur)
        return items

    def write_row(self, row, data):
        self.wks.append_table(values=data)
        # for i in range(len(data)):
        #     col = chr(ord('A')+i)
        #     self.wks.update_value(addr=col+str(row), val=data[i])

    def process(self, network: str = 'ethereum'):
        time = get_cur_time().strftime("%Y-%m-%d %H:%M")
        convex_data, convex_total = self.get_data(network, self._convexUrl)
        curve_data, curve_total = self.get_data(network, self._curveUrl)
        wallet_data, wallet_total = self.get_wallet_tokens()

        datas = []
        
        for wallet in wallet_data:
            row_data = [self.address, time, network, 'N/A', 'wallet', wallet['symbol'], round(wallet['price'], 5), round(wallet['balance'],5), round(wallet['balanceUSD'],5), ""]
            # self.wks.append_table(values=row_data)
            datas.append(row_data)

        for protocol_datas in [convex_data, curve_data]:
            for protocol_data in protocol_datas:
                cur_item = None
                if protocol_data['type'] == 'vault':
                    cur_item = protocol_data
                elif protocol_data['type'] == 'claimable':
                    cur_item = protocol_data['token'][0]
                elif protocol_data['type'] == 'farm':
                    cur_item = protocol_data['token'][0]
                row_data = [self.address, time, network, protocol_data['appName'], protocol_data['type'], cur_item['symbol'], round(cur_item['price'], 5), round(cur_item['balance'],5), round(cur_item['balanceUSD'],5), ""]
                # self.wks.append_table(values=row_data)
                datas.append(row_data)
                if protocol_data['type'] == 'farm':
                    for claimable in protocol_data['token'][1:]:
                        row_data = [self.address, time, network, protocol_data['appName'], 'claimable', claimable['symbol'], round(claimable['price'], 5), round(claimable['balance'],5), round(claimable['balanceUSD'],5), cur_item['symbol']]
                        # self.wks.append_table(values=row_data)
                        datas.append(row_data)
        return datas


    def cron_trigger(self, crontab: str):  # e.g. crontab "*/10 * * * *" is triger every 10- minites
        last_trigger = get_cur_time()
        self.logger.info('Begin processing')
        waiting = False
        while True:
            cron = croniter(crontab, last_trigger)
            next_time = cron.get_next(datetime)
            if get_cur_time() > next_time:
                self.logger.info(f'Triggered at {get_cur_time().strftime("%Y-%m-%d %H:%M")}')
                self.process(network='ethereum')
                last_trigger = get_cur_time()
                waiting = False
            else:
                if not waiting:
                    self.logger.info(f'Waiting for the next trigger: {next_time.strftime("%Y-%m-%d %H:%M")}')
                    waiting = True
                time.sleep(60)


if __name__ == '__main__':    
    zb=ZapperBalance(address='0x84cA6410386cB694846f1AAEe961Db894D5ef2C4')
    zb.process(network='ethereum')
    pp.pprint(zb.get_wallet_tokens())
    zb.get_convex_tokens()
    
    zb.cron_trigger("0 * * * *")
