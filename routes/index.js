const express = require("express");
const schedule = require("node-schedule");
const fetchDataAndSave = require("./module/fetchData");
const connectDB = require("./module/connectDB");
var router = express.Router();
require("dotenv").config();
// // MongoDB 연결
connectDB();

// 매 분마다 데이터 파싱 (node-schedule 사용)
schedule.scheduleJob("*/1 * * * *", () => {
  const categoryCode = [50000, 60000, 90000];
  const pageNo = [8, 6, 4];

  for (let i = 0; i < categoryCode.length; i++) {
    for (let j = 1; j <= pageNo[i]; j++) {
      fetchDataAndSave(categoryCode[i], j); // 매 분 실행
    }
  }
});

// app.get("/data", async (req, res) => {
//   try {
//     const data = await Data.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

module.exports = router;
