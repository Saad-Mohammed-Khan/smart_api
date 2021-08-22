const express = require("express");
var moment = require("moment-timezone");
let { SmartAPI, WebSocket } = require("smartapi-javascript");

const app = express();

let smart_api = new SmartAPI({
  api_key: "smartapi_key", // PROVIDE YOUR API KEY HERE
});

// If user does not have valid access token and refresh token then use generateSession method
smart_api
  .generateSession("CLIENT_CODE", "PASSWORD")
  .then((data) => {
    // Order Methods
    return smart_api.placeOrder({
      variety: "NORMAL",
      tradingsymbol: "SBIN-EQ",
      symboltoken: "3045",
      transactiontype: "BUY",
      exchange: "NSE",
      ordertype: "LIMIT",
      producttype: "INTRADAY",
      duration: "DAY",
      price: "19500",
      squareoff: "0",
      stoploss: "0",
      quantity: "1",
    });
    return smart_api.getOrderBook();
  })
  .then((data) => {
    // Profile details
  })
  .catch((ex) => {
    //Log error
  });

// TO HANDLE SESSION EXPIRY, USERS CAN PROVIDE A CUSTOM FUNCTION AS PARAMETER TO setSessionExpiryHook METHOD
smart_api.setSessionExpiryHook(customSessionHook);

function customSessionHook() {
  console.log("User loggedout");

  // NEW AUTHENTICATION CAN TAKE PLACE HERE
}

app.get("/", (req, res) => {
  var m = moment().tz("Asia/Kolkata").format();
  m = m.split("T");
  m = m[1].split(":");
  if (m[0] >= 10 && m[0] <= 15) {
    if (m[0] === 15 && m[1] != 0) {
      return res.send("time out!");
    }
  } else {
    return res.send("Too early or too late!");
  }
  return res.send("hello!");
});

app.listen(5000, (req, res) => {
  console.log("Server is running");
});
