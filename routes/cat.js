var express = require('express');
var router = express.Router();
const request = require('request');

/* GET random cat image. */
router.get('/', async (req, res) => {
  // 外部のThe Cat APIにリクエストを送信します
  request('https://api.thecatapi.com/v1/images/search', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // 返ってきたテキストデータをJSON形式に解析します
      const data = JSON.parse(body);
      // 解析したデータをそのままブラウザにJSONとして応答します
      res.json(data);
    } else {
      res.status(500).json({ error: '猫の画像が取得できませんでした' });
    }
  });
});

module.exports = router;