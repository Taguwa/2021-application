// ウェブサーバを接続する。
var webSocket = new WebSocket("ws://localhost:3000");
// ソケット接続すれば呼び出す関数。
webSocket.onopen = function(){
  console.log("Server connect...\n");
};
// ソケット接続が切ると呼び出す関数。
webSocket.onclose = function(){
  console.log("Server Disconnect...\n");
};
// ソケット通信中でエラーが発生すれば呼び出す関数。
webSocket.onerror = function(){
  console.log("error...\n");
};
// ソケットサーバからメッセージが受信すれば呼び出す関数。
webSocket.onmessage = function(event){
    var json_data=JSON.parse(event.data)
  // 出力areaにメッセージを表示する。
 console.log("Recieve From Server => "+json_data[0].values+"\n");
};
// サーバにメッセージを送信する関数。

// 通信を切断する。
function disconnect(){
  webSocket.close();
}