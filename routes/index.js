const express = require("express");
const schedule = require("node-schedule");
const fetchDataAndSave = require("./module/fetchData");
const app = express();
var router = express.Router();
const PORT = 3000;
require("dotenv").config();
// // MongoDB 연결
// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// 매 분마다 데이터 파싱 (node-schedule 사용)
schedule.scheduleJob("*/1 * * * *", () => {
  const categoryCode = [50000, 60000, 90000];
  const pageNo = [8, 6, 4];

  for (let i = 0; i < categoryCode.length; i++) {
    for (let j = 1; j <= pageNo[i]; j++) {
      fetchDataAndSave(categoryCode[i], j); // 매 분 실행
      console.log("test");
    }
  }
});
console.log("ok");
console.log(process.env.LOSTARK_KEY);
// app.get("/data", async (req, res) => {
//   try {
//     const data = await Data.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

module.exports = router;
