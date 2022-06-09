
// ウェブサーバを接続する。
var webSocket = new WebSocket("ws://localhost:3000");
// ソケット接続すれば呼び出す関数。
webSocket.onopen = function(){
  console.log("Server connect...\n");
}
// ソケット接続が切ると呼び出す関数。
webSocket.onclose = function(){
  console.log("Server Disconnect...\n");
};
// ソケット通信中でエラーが発生すれば呼び出す関数。
webSocket.onerror = function(){
  console.log("error...\n");
};

const coins = ['btc_jpy', 'eth_jpy','xem_jpy', 'bch_jpy'];

const url_R = 'https://coincheck.com/api/rate/';
const url_T = 'https://coincheck.com/api/ticker';

var URL_P=Array(coins.length);

var data_BTC=[
  {
    label: "BTC",
    values: []
  }
];

var data_ETH=[
    {
    label: "ETH",
    values: []
  }
];

var data_XEM=[
 {
    label: "XEM",
    values: []
  }
];

var data_BCH=[
{
    label: "BCH",
    values: []
  }
];


var BTC={times:0,value:0,total:0,numOfCoins:0};
var ETH={times:0,value:0,total:0,numOfCoins:0};
var XEM={times:0,value:0,total:0,numOfCoins:0};
var BCH={times:0,value:0,total:0,numOfCoins:0};

window.onload=function(){
  document.getElementById("total_BTC_money").textContent=BTC.total;
  document.getElementById("total_ETH_money").textContent=ETH.total;
  document.getElementById("total_XEM_money").textContent=XEM.total;
  document.getElementById("total_BCH_money").textContent=BCH.total;

  document.getElementById("total_BTC_coins").textContent=BTC.numOfCoins;
  document.getElementById("total_ETH_coins").textContent=ETH.numOfCoins;
  document.getElementById("total_XEM_coins").textContent=XEM.numOfCoins;
  document.getElementById("total_BCH_coins").textContent=BCH.numOfCoins;

  for(var i=0;i<coins.length;i++){
   URL_P[i]=url_R+coins[i];
  }
}

function addTableRowBuy(nameAdd){
  var CoinName=0;
  var total_money_Id="";
  var numOfName="";
  var newRow=document.getElementById(nameAdd).insertRow();

  switch(nameAdd){
      case 'BTC_buy':
        CoinName=BTC;
        total_money_Id="total_BTC_money";
        numOfName="numOfBTC_buy";
        total_number_Id="total_BTC_coins";
      break;

      case 'ETH_buy':
        CoinName=ETH;
        total_money_Id="total_ETH_money";
        numOfName="numOfETH_buy";
        total_number_Id="total_ETH_coins";
      break;

      case 'XEM_buy':
        CoinName=XEM;
        total_money_Id="total_XEM_money";
        numOfName="numOfXEM_buy";
        total_number_Id="total_XEM_coins";
      break;

      case 'BCH_buy':
        CoinName=BCH;
        total_money_Id="total_BCH_money";
        numOfName="numOfBCH_buy";
        total_number_Id="total_BCH_coins";
      break;
  }

  var S_number=document.getElementById(numOfName).value;
  var number=Number(S_number);

  var date=new Date(CoinName.times*1000);
  var table_cell=newRow.insertCell();
  var TimeValue=document.createTextNode(
    date.getFullYear()+"/"+
    (date.getMonth()+1)+"/"+
    date.getDate()
    +" "+
    date.getHours()+":"+
    date.getMinutes()+":"+
    date.getSeconds()
  );
  table_cell.appendChild(TimeValue);

  table_cell=newRow.insertCell();
  var coinValue=CoinName.value*-1*number;
  var coinValue_String=String(coinValue);
  var coinValue_Text=document.createTextNode(coinValue_String);
  table_cell.appendChild(coinValue_Text);

  CoinName.total+=coinValue;
  var total_String=String(CoinName.total);
  document.getElementById(total_money_Id).textContent=total_String;

  table_cell=newRow.insertCell();
  var number_String=String(number);
  var number_Text=document.createTextNode(number_String);
  table_cell.appendChild(number_Text);

  CoinName.numOfCoins+=number;
  var number_String=String(CoinName.numOfCoins);
  document.getElementById(total_number_Id).textContent=number_String;
}

function addTableRowSell(nameAdd){
    var CoinName=0;
    var total_money_Id="";
    var numOfName="";

    switch(nameAdd){
      case 'BTC_sell':
        CoinName=BTC;
        total_money_Id="total_BTC_money";
        numOfName="numOfBTC_sell";
        total_number_Id="total_BTC_coins";
      break;

      case 'ETH_sell':
        CoinName=ETH;
        total_money_Id="total_ETH_money";
        numOfName="numOfETH_sell";
        total_number_Id="total_ETH_coins";
      break;

      case 'XEM_sell':
        CoinName=XEM;
        total_money_Id="total_XEM_money";
        numOfName="numOfXEM_sell";
        total_number_Id="total_XEM_coins";
      break;

      case 'BCH_sell':
        CoinName=BCH;
        total_money_Id="total_BCH_money";
        numOfName="numOfBCH_sell";
        total_number_Id="total_BCH_coins";
      break;
  }
  var S_number=document.getElementById(numOfName).value;
  if((CoinName.numOfCoins-S_number)<0){
    return 0;
  }
  else{
    var newRow=document.getElementById(nameAdd).insertRow();
    
    var number=Number(S_number);

    var date=new Date(CoinName.times*1000);
    var table_cell=newRow.insertCell();
    var TimeValue=document.createTextNode(
        date.getFullYear()+"/"+
        (date.getMonth()+1)+"/"+
        date.getDate()
        +" "+
        date.getHours()+":"+
        date.getMinutes()+":"+
        date.getSeconds()
    );
    table_cell.appendChild(TimeValue);

    var coinValue=CoinName.value*number;
    table_cell=newRow.insertCell();
    var coinValue_String=String(coinValue);
    var coinValue_Text=document.createTextNode(coinValue_String);
    table_cell.appendChild(coinValue_Text);
    
    CoinName.total+=coinValue;
    document.getElementById(total_money_Id).textContent=String(CoinName.total);

    table_cell=newRow.insertCell();
    var number_String=String(number);
    var number_Text=document.createTextNode(number_String);
    table_cell.appendChild(number_Text);

    CoinName.numOfCoins-=number;
    document.getElementById(total_number_Id).textContent=String(CoinName.numOfCoins);
  }
}

var coin_names=[BTC,ETH,XEM,BCH];
var rate_names_Id=["rate_BTC_coins","rate_ETH_coins","rate_XEM_coins","rate_BCH_coins"];
var difference_rate_Id=["difference_BTC_rate","difference_ETH_rate","difference_XEM_rate","difference_BCH_rate"];
$(function() {
  function SetData(json_data) {
    var differenceRate=0;
    for(i=0;i<difference_rate_Id.length;i++){
      differenceRate=json_data[i].values-coin_names[i].value;
      document.getElementById(difference_rate_Id[i]).textContent=String(differenceRate);
    }
    for(i=0;i<coin_names.length;i++){
      coin_names[i].value=json_data[i].values;
      coin_names[i].times=json_data[i].times;
      //console.log(i,json_data[i].values);
    }
    for(i=0;i<rate_names_Id.length;i++){
      document.getElementById(rate_names_Id[i]).textContent=String(coin_names[i].value);
    }
    chart_BTC.push([{time:BTC.times, y:BTC.value}]);
    chart_ETH.push([{time:ETH.times, y:ETH.value}]);
    chart_XEM.push([{time:XEM.times, y:XEM.value}]);
    chart_BCH.push([{time:BCH.times, y:BCH.value}]);
  }
  var chart_BTC = $('#real-time-line-BTC').epoch({
      type: 'time.line',
      data: data_BTC,
      axes: [ 'bottom', 'right']
  });

  var chart_ETH = $('#real-time-line-ETH').epoch({
      type: 'time.line',
      data: data_ETH,
      axes: [ 'bottom', 'right']
  });

   var chart_XEM = $('#real-time-line-XEM').epoch({
      type: 'time.line',
      data: data_XEM,
      axes: [ 'bottom', 'right']
  });

   var chart_BCH = $('#real-time-line-BCH').epoch({
      type: 'time.line',
      data: data_BCH,
      axes: [ 'bottom', 'right']
  });
  // ソケットサーバからメッセージが受信すれば呼び出す関数。
  webSocket.onmessage=function(event){
    var json_data=JSON.parse(event.data)
    SetData(json_data);
  }
});
