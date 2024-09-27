// fetchData.js
const axios = require("axios");
const mongoose = require("mongoose");
const Item = require("./../../models/Item");
require("dotenv").config();

// MongoDB 연결
const username = process.env.DB_USERNAME || "admin";
const password = process.env.DB_PASSWORD || "red0127%21";
const dbName = "lostarkDB";
const host = "svc.sel5.cloudtype.app";
const port = "30937";
console.log(`mongodb://${username}:${password}@${host}:${port}/${dbName}`);
mongoose
  .connect(`mongodb://${username}:${password}@${host}:${port}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const fetchDataAndSave = async (categoryCode, pageNo) => {
  try {
    const response = await axios.post(
      "https://developer-lostark.game.onstove.com/markets/items",
      {
        Sort: "GRADE",
        CategoryCode: categoryCode,
        CharacterClass: null,
        ItemTier: null,
        ItemGrade: null,
        ItemName: null,
        PageNo: pageNo,
        SortCondition: "ASC",
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `bearer ${process.env.LOSTARK_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // API 응답 구조 확인
    if (response.data && response.data.Items) {
      const Data = response.data.Items.map((x) => {
        return {
          Id: x.Id,
          RecentPrice: x.RecentPrice,
          CurrentMinPrice: x.CurrentMinPrice,
          Time: getCurrentDateTime(),
        };
      });

      const savedItems = await Item.insertMany(Data);
      console.log(savedItems);
    } else {
      console.error("No items found in response:", response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

module.exports = fetchDataAndSave;
