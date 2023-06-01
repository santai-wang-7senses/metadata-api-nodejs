const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 5000;

const app = express()
  .set("port", PORT)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs");

// Static public files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.send("Get ready for OpenSea!");
});

app.get("/api/token/:token_id/metadata.json", function (req, res) {
  const tokenId = parseInt(req.params.token_id).toString();
  const data = JSON.parse(
    fs.readFileSync("./mintedNFTs/20230601.json").toString()
  )[tokenId];
  res.send(data);
});

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});
