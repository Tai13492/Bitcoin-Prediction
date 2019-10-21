const crypto = require("crypto");
const Axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const newDate = new Date();
const apiExpires = newDate.getTime() + 1000 * 60 * 5;

const END_POINT = "https://www.bitmex.com";
const symbol = "XBT";
const depth = 2;

const path = "/api/v1/orderBook/L2" + `?symbol=${symbol}&depth=${depth}`;
const verb = "GET";
const data = "";

const params = `${verb}${path}${apiExpires}${data}`;

const hash = crypto
  .createHmac("sha256", API_SECRET)
  .update(params)
  .digest("hex");

const headers = {
  "api-expires": apiExpires,
  "api-key": API_KEY,
  "api-signature": hash
};

Axios.get(`${END_POINT}${path}`, {
  headers
})
  .then(res => {
    console.log(res.data, "data");
  })
  .catch(error => {
    console.error(error.status, "error");
  });
