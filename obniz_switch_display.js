const Obniz = require('obniz');
const obniz = new Obniz('Obniz_ID');  // Obniz_IDに自分のIDを入れてください

// obnizがオンラインであることが確認されたら、以下の関数内が自動で実行されます
obniz.onconnect = async function () {
  obniz.display.clear(); // 画面を消去
  obniz.display.print('Hello obniz!');  // Hello obniz! と画面に表示

  // スイッチの反応を常時監視、変化があれば実行します
  obniz.switch.onchange = function (state) {
    if (state === 'push') {
      // 押されたとき
      console.log('pushed');
      obniz.display.clear(); // 画面を消去
      obniz.display.print('pushed');  // pushed と画面に表示
    } else if (state === 'right') {
      // 右にスイッチを倒したとき（やさしく）
      console.log('pressed right');
      obniz.display.clear(); // 画面を消去
      obniz.display.print('pressed right');  // pressed right と画面に表示
    } else if (state === 'left') {
      // 左にスイッチを倒したとき（やさしく）
      console.log('pressed left');
      obniz.display.clear(); // 画面を消去
      obniz.display.print('pressed left');  // pressed left と画面に表示
    }
  }
}
