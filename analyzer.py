from collections import defaultdict
import pandas as pd
import pprint as pp

class Analyzer():
    def __init__(self) -> None:
        self.raw_df = pd.read_csv('https://docs.google.com/spreadsheets/d/1ndxRN2FSpMnT6StAU7oSiuWlUT3WdLmEo7KdGkB7Tt8/export?gid=0&format=csv')
        self.daily_df = self.raw_df[self.raw_df['Time'].str.contains(' 0:00') | self.raw_df['Time'].str.contains(' 12:00')]
        self.type2pool = {
            "cvxibGBP+sGBP-f": "GBP",
            "cvxMIM-UST-f": "USDT",
            "cvxibbtc/sbtcCRV-f": "BTC"
        }
        self.pool2types = defaultdict(list)
        for key, val in self.type2pool.items():
            self.pool2types[val].append(key)
        # print(self.raw_df.dtypes)

    def process_data(self):
        dates = sorted(list(set(list(self.daily_df.Time))))
        result_df = pd.DataFrame()
        for date in dates:
            cur_row = {}
            cur_df = self.daily_df[self.daily_df.Time == date]
            # print(cur_df)
            cur_row['Time'] = date
            cur_row["Networth"] = sum(cur_df["Value($)"])
            for pool in self.pool2types.keys():
                cur_row[pool+'_price'] = float(cur_df[cur_df.Name.isin(self.pool2types[pool])]['Price($)'])
                cur_row[pool+'_value'] = sum(cur_df[cur_df.Name.isin(self.pool2types[pool]) | cur_df.Source.isin(self.pool2types[pool])]['Value($)'])
                cur_row[pool+'_quantity'] = cur_row[pool+'_value']/cur_row[pool+'_price']
                cur_row[pool+'_token_value'] = sum(cur_df[cur_df.Source.isin(self.pool2types[pool])]['Value($)'])
                
                cur_row[pool+'_daily_token_return_value'] = cur_row[pool+'_token_value']-result_df[pool+'_token_value'].iloc[-1] if not result_df.empty else 0
                cur_row[pool+'_daily_return_quantity'] = cur_row[pool+'_quantity']-result_df[pool+'_quantity'].iloc[-1] if not result_df.empty else 0
                cur_row[pool+'_daily_return_value'] = cur_row[pool+'_daily_return_quantity']*cur_row[pool+'_price']
                cur_row[pool+'_accumulative_return'] = cur_row[pool+'_daily_return_value']+result_df[pool+'_accumulative_return'].iloc[-1] if not result_df.empty else cur_row[pool+'_daily_return_value']
                
            # s  = pd.Series(cur_row,index=cur_row.keys())
            if result_df.empty:
                result_df = pd.DataFrame(columns=cur_row.keys())            
            result_df = result_df.append(cur_row, ignore_index=True)
            # print(result_df[pool+'_volume'].iloc[-1])
        # print(result_df)
        # result_df.to_excel('defi-result2.xlsx')
        return result_df

if __name__ == '__main__':
    analyzer = Analyzer()
    result_df = analyzer.process_data()
    print(result_df)