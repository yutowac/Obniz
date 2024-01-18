const Obniz = require('obniz');
const obniz = new Obniz('OBNIZE ID'); // Obniz_IDに自分のIDを入れます

// obnizがオンラインであることが確認されたら、以下の関数内が自動で実行されます
obniz.onconnect = async function () {
  // LEDの設定
  const led1 = obniz.wired("LED", {anode:8, cathode:9});
  const led2 = obniz.wired("LED", {anode:10, cathode:11});
  // LEDをつける
  led1.on();
  led2.on();
}
