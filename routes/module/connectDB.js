const mongoose = require("mongoose");

const connectDB = () => {
  // MongoDB 연결
  const username = encodeURIComponent(process.env.DB_USERNAME);
  const password = encodeURIComponent(process.env.DB_PASSWORD);
  const dbName = "lostarkDB";
  const host = encodeURIComponent(process.env.DB_HOST);
  const port = encodeURIComponent(process.env.DB_PORT);

  mongoose
    .connect(
      `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};

module.exports = connectDB;
