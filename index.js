const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  let cryptos = req.body.crypto;
  let fiat = req.body.fiat;
  let amount = req.body.amount;
  let options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: cryptos,
      to: fiat,
      amount: amount
    }
  };
  request(options, (error, response, body) => {
    const data = JSON.parse(body);
    const price = data.price;
    const currentDate = data.time;
    res.write(`<p>The current date is ${currentDate}</p>`);
    res.write(`<h1>The ${amount} of ${cryptos} is ${price} ${fiat}</h1>`);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
