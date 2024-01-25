const Obniz = require('obniz');
const obniz = new Obniz('Obniz_ID'); // Obniz_IDに自分のIDを入れます

obniz.onconnect = async function () {
  // スピーカーを利用
  const speaker = obniz.wired('Speaker', { signal: 0, gnd: 1 });

  // ディスプレイ表示
  obniz.display.clear();
  obniz.display.print('Speaker test');

  // スイッチの反応を常時監視
  // 「スイッチ状態が変化した瞬間に1回だけ実行される」ことに注意しましょう
  obniz.switch.onchange = function (state) {
    if (state === 'push') {
      // スイッチが押されている状態
      obniz.display.clear();
      obniz.display.print('beep!');
      // 1000Hz で音を鳴らす
      speaker.play(1000);
    } else if (state === 'none') {
      // スイッチが押されていない状態
      obniz.display.clear();
      obniz.display.print('silent');
      // 音を停止する
      speaker.stop();
    }
  }
}
