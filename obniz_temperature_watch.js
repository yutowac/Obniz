const Obniz = require('obniz');
const obniz = new Obniz('Obniz_ID');  // Obniz_IDに自分のIDを入れてください

// obnizがオンラインであることが確認されたら、以下の関数内が自動で実行されます
obniz.onconnect = async function () {
  //温度センサーの設定
  const tempsens = obniz.wired('LM60', { gnd: 0, output: 1, vcc: 2 });
  //温度センサーの値が変わったら実行される
  tempsens.onchange = function (temp) {
    console.log(temp);
  };
}
