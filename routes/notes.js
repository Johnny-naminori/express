var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');


const uri = 'mongodb+srv://setsu:mongo1173@cluster0.uhcrgha.mongodb.net/?appName=Cluster0';
const client = new MongoClient(uri);

/* GET notes listing. */
router.get('/', async (req, res) => {
  try {
    // ① まずMongoDBに接続します
    await client.connect();
    
    // ② データベースとコレクションを指定します
    const database = client.db('notesDB');
    const notes = database.collection('notes');

    // ③ コレクション内のすべてのデータを配列として取得します
    const noteList = await notes.find({}).toArray();

    // ④ 取得したデータをブラウザに送信します
    res.json(noteList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    // ⑤ 通信が終わったら安全に接続をクローズします
    await client.close();
  }
});

module.exports = router;