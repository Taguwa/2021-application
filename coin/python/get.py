import asyncio
from numpy import append
# WebSocketモジュールを宣言する。
import websockets

import requests
import json
import time



coins = {'BTC': 'btc_jpy', 'ETH': 'eth_jpy',
         'XEM': 'xem_jpy', 'BCH': 'bch_jpy'}

URL_R = 'https://coincheck.com/api/rate/'
# URL_T = 'https://coincheck.com/api/ticker/'

BTCp = {'label':'BTC','values':'0','times':'0'}
ETHp = {'label':'ETH','values':'0','times':'0'}
XEMp = {'label':'XEM','values':'0','times':'0'}
BCHp = {'label':'BCH','values':'0','times':'0'}

# BTCp = {'label':'BTC','values':'0'}
# ETHp = {'label':'ETH','values':'0'}
# XEMp = {'label':'XEM','values':'0'}
# BCHp = {'label':'BCH','values':'0'}

def get():  
  coin=[]
  for key, item in coins.items():
    coincheck_R = requests.get(URL_R+item).json()
    # coincheck_T = requests.get(URL_T+item).json()
    # coin.append(coincheck_R['rate'])
    if(key == "BTC"):
          BTCp['values'] = coincheck_R['rate']
          BTCp['times'] = time.time()
          # BTCp['times'] = coincheck_T['timestamp']
          coin.append(BTCp)
    elif(key == "ETH"):
          ETHp['values'] = coincheck_R['rate']
          ETHp['times'] = time.time()
          # ETHp['times'] = coincheck_T['timestamp']
          coin.append(ETHp)
    elif(key == "XEM"):
          XEMp['values'] = coincheck_R['rate']
          XEMp['times'] = time.time()
          # XEMp['times'] = coincheck_T['timestamp']
          coin.append(XEMp)
    elif(key == "BCH"):
          BCHp['values'] = coincheck_R['rate']
          BCHp['times'] = time.time()
          # BCHp['times'] = coincheck_T['timestamp']
          coin.append(BCHp)
    # json_file = open('price.json','w')
    json_data=json.dumps(coin)
  
  return json_data

# クライアント接続すると呼び出す。
async def accept(websocket, path):
  while True:
   v=get()
#    print(v)
   await websocket.send(v)
   await asyncio.sleep(0.1)
   # 無限ループ
  #  while True:
   
  #   # クライアントからメッセージを待機する。
  #   data = await websocket.recv()
   
  #   # コンソールに出力
  #   print("receive : " + data)
  #   # クライアントでechoを付けて再送信する。
  #   await websocket.send("echo : " + data)

 
# WebSocketサーバー生成。ホストはlocalhost、portは3000に生成する。
start_server = websockets.serve(accept, "localhost", 3000)
# 非同期でサーバを待機する。
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()




