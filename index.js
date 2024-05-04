const express = require("express");

const body_parser = require("body-parser");

const apiRoutes = require("./routes");

const { sequelize, connectToDb } = require("./database");
let app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", function (req, res) {
  res.status(200).json({ message: "Hello world welcome to backend" });
});

app.listen(PORT, async () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
  await connectToDb();
});
