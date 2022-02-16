import dash
import dash_html_components as html
import dash_core_components as dcc
import plotly.express as px

from analyzer import Analyzer

def dash_host(df):
    app = dash.Dash(__name__)

    fig_networth = px.line(df, x="Time", y=['Networth'], title='Fund Porfolio Growth(USD)')
    # fig_networth.update_layout(xaxis = dict(title='Date', tickmode='array', tickvals= list(range(len(df))), ticktext=list(df.Time)))
    fig_btc_price = px.line(df, x="Time", y=['BTC_price'], title='BTC Price(USD)')
    
    fig_daily_token_return = px.line(df, x="Time", y=["BTC_daily_token_return_value","USDT_daily_token_return_value","GBP_daily_token_return_value"], title="Daily Token Return Value(USD)")
    fig_daily_return = px.bar(df, x="Time", y=["BTC_daily_return_value","USDT_daily_return_value","GBP_daily_return_value"], title="Daily Return Value(USD)")
    fig_daily_return_line = px.line(df, x="Time", y=["BTC_daily_return_value","USDT_daily_return_value","GBP_daily_return_value"], title="Daily Return Value(USD)")
    fig_accumulative_return = px.line(df, x="Time", y=["BTC_accumulative_return","USDT_accumulative_return","GBP_accumulative_return"], title="Accumulative Return Value(USD)")
    fig_btc_value = px.line(df, x='Time', y=["BTC_value"], title="Total Value in BTC Pools(USD)")
    fig_usdt_value = px.line(df, x='Time', y=["USDT_value"], title="Total Value in USDT Pools(USD)")
    fig_gbp_value = px.line(df, x='Time', y=["GBP_value"], title="Total Value in GBP Pools(USD)")

    app.layout = html.Div(
        [
            # html.H2('Fund Porfolio Growth(USD)'),
            dcc.Graph(figure=fig_networth),
            # html.H2('BTC Price(USD)'),
            dcc.Graph(figure=fig_btc_price),
            # html.H2('Daily Return Value(USD)'),
            dcc.Graph(figure=fig_daily_token_return),
            dcc.Graph(figure=fig_daily_return),
            dcc.Graph(figure=fig_daily_return_line),
            dcc.Graph(figure=fig_accumulative_return),
            dcc.Graph(figure=fig_btc_value),
            dcc.Graph(figure=fig_usdt_value),
            dcc.Graph(figure=fig_gbp_value),
        ]
    )
    app.run_server(host='localhost', port=5102)

if __name__ == '__main__':
    analyzer = Analyzer()
    result_df = analyzer.process_data()
    print(result_df)
    dash_host(result_df)