const Obniz = require('obniz');
const obniz = new Obniz('7766-3327'); // Obniz_IDに自分のIDを入れます

obniz.onconnect = async function () {
  // 超音波測距センサを利用する
  const hcsr04 = obniz.wired('HC-SR04', { gnd: 0, echo: 2, trigger: 4, vcc: 6 });

  // ディスプレイ
  obniz.display.clear(); // クリア
  obniz.display.print('Hello obniz!');
  //obniz.display.print('Hello obniz!'); // Hello obniz! と表示

  // setIntervalで一定間隔で処理
  setInterval(async function () {
    // 距離を取得
    let distance = await hcsr04.measureWait();
    // そのままだと小数点以下の桁数がやたら多いので整数に丸めてもよい
    //distance = Math.floor(distance);

    // 距離(mm)をターミナルに表示
    console.log(distance + ' mm');
    // obnizディスプレイに表示
    // 一度消してから距離+mmの単位を表示
    obniz.display.clear();
    obniz.display.print(distance + ' mm');

    // 距離がある程度未満かどうかの判定
    if (distance < 50) { // 50mm = 5cm 以下の場合
      // obnizディスプレイに近接していることを表示
      obniz.display.clear();
      obniz.display.print('Too close!!');
    }
  }, 1000); // 1000ミリ秒 = 1秒おきに実行
}