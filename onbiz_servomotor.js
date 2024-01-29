const Obniz = require('obniz');
const obniz = new Obniz('OBNIZ_ID'); // Obniz_IDに自分のIDを入れます

obniz.onconnect = async function () {
  // サーボモータを利用
  const servo = obniz.wired('ServoMotor', { signal: 4 });

  // 角度を保持する変数
  let degrees = 90.0;

//   // ディスプレイ表示（初期画面）
//   // obniz.display.clear();
//   // obniz.display.print('Hello obniz!');
//   var angle = 0;    //まずは0度に

//   obniz.repeat(async function () {    //1秒ごとにループさせる
//       servo.angle(angle);    //サーボーモーターを(angle)度に回す
//       if (angle == 0) {    //0度なら
//           angle = 90;    //90度に
//       } else {    //0度じゃなかったら
//           angle = 0;    //0度に
//       }
//   }, 1000);    //ループ間隔を1000ミリ秒 = 1秒に設定


  // スイッチの反応を常時監視
  // 「スイッチ状態が変化した瞬間に1回だけ実行される」ことに注意しましょう
  obniz.switch.onchange = async function (state) {
    // スイッチの状態で角度を決め、最後に動かします
    // if (state === 'push') {
    //   // スイッチが押されている状態
    //   console.log('pushed');
    //   degrees = 45.0;
    // } else if (state === 'right') {
    //   // 右にスイッチを倒したとき
    //   console.log('right');
    //   degrees = 0.0;
    // } else if (state === 'left') {
    //   // 左にスイッチを倒したとき
    //   console.log('left');
    //   degrees = 180.0;
    // } else {
    //   // スイッチが押されていない状態
    //   console.log('released');
    //   degrees = 90.0;
    // }
    if (state === 'right') {
      console.log('pushed');
      degrees = 180.0;
      servo.angle(degrees);
      await obniz.wait(400);
      degrees = 90.0;
      servo.angle(degrees);
      await obniz.wait(400);
      degrees = 180.0;
      servo.angle(degrees);
      await obniz.wait(400);
      degrees = 90.0;
      servo.angle(degrees);
      await obniz.wait(400);
    }
  
  // ディスプレイに角度を表示
  obniz.display.clear();
  obniz.display.print(`Current: ${degrees} deg`);
  // サーボを指定の角度まで動かします
  servo.angle(degrees);
  }
}

// const Obniz2 = require('obniz');
const obniz2 = new Obniz('8263-0676'); // Obniz_IDに自分のIDを入れます

obniz2.onconnect = async function () {
  // 超音波測距センサを利用する
  const hcsr04 = obniz2.wired('HC-SR04', { gnd: 3, echo: 2, trigger: 1, vcc: 0 });

  // ディスプレイ
  obniz2.display.clear(); // クリア
  obniz2.display.print('Hello obniz!');
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
    obniz2.display.clear();
    obniz2.display.print(distance + ' mm');

    // 距離がある程度未満かどうかの判定
    if (distance < 50) { // 50mm = 5cm 以下の場合
      // obnizディスプレイに近接していることを表示
      obniz2.display.clear();
      obniz2.display.print('Too close!!');
    }
  }, 1000); // 1000ミリ秒 = 1秒おきに実行
}