const queryDatabase = require("./database/queryDatabase.js");
const insertDatabase = require("./database/insertDatabase.js");
const readData = require("./database/readData.js");
const express = require("express");
const rentCalculations = require("./lib/rentCalculations");

const app = express();
var bodyParser = require("body-parser");
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const PORT = process.env.PORT || 8080;
const mysql = require("mysql");
const fs = require("fs");

const FixedInterest = process.env.INTEREST || 1.82;
const serverCa = fs.readFileSync("DigiCertGlobalRootCA.crt.pem");
const config = {
  host: "keepsafe.mysql.database.azure.com",
  user: "keepsafe",
  password: "cloud11!",
  database: "keepsafe",
  port: 3306,
  ssl: {
    ca: serverCa,
  },
};

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
  res.json({ success: true, message: "service up and running" });
});

app.get("/health", (req, res) => {
  res.json({ success: true, message: "all services healthy" });
});

app.get("/monthlyPayment", (req, res) => {
  const amount = req.query.amount || 20000;
  const length = (req.query.years || 20) * 12;

  const monthlyPayment = rentCalculations.calculateMonthlyPayment(
    amount,
    length,
    FixedInterest
  );

  res.json({ success: true, monthlyPayment });
});

app.get("/totalRent", (req, res) => {
  const amount = req.query.amount || 20000;
  const length = (req.query.years || 20) * 12;

  const totalRent = rentCalculations.calculateTotalRent(
    amount,
    length,
    FixedInterest
  );

  res.json({ success: true, totalRent });
});

app.get("/history", (req, res) => {
  //http://localhost:8080/history?uid=0
  var userID;
  if (req.query.uid == undefined) {
    userID = 0;
  } else {
    userID = req.query.uid;
  }
  var conn = mysql.createConnection(config);
  var userHist = [];
  conn.connect(function (err) {
    if (err) throw err;
    else {
      const dataPromise = readData.readData(conn, userID);
      dataPromise.then((rows) => {
        for (r in rows) {
          const result = Object.values(JSON.parse(JSON.stringify(rows)));
          result.forEach((v) => {
            userHist.push({
              timestamp: v.timestamp,
              calculation: v.calculation,
              file: v.filename,
            });
          });
        }
        res.json({ success: true, userHist });
      });
    }
  });
});

app.get("/queryDatabase", (req, res) => {
  var conn = mysql.createConnection(config);
  conn.connect(function (err) {
    if (err) throw err;
    else {
      queryDatabase.queryDatabase(conn);
    }
  });
});

app.post("/insertDatabase", urlencodedParser, (req, res) => {
  if (
    req.hasOwnProperty("body") &&
    req.body.hasOwnProperty("userID") &&
    req.body.hasOwnProperty("timestamp") &&
    req.body.hasOwnProperty("calculation") &&
    req.body.hasOwnProperty("filename")
  ) {
    var conn = mysql.createConnection(config);
    conn.connect(function (err) {
      if (err) throw err;
      else {
        insertDatabase.insertDatabase(
          conn,
          req.body.userID,
          req.body.timestamp,
          req.body.calculation,
          req.body.filename
        );
      }
    });
  }
});

app.listen(PORT, () => {
  console.debug("Node Js Server is Running");
});
