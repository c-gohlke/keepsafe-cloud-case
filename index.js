const queryDatabase = require("./database/queryDatabase.js");
const readData = require("./database/readData.js");
const updateData = require("./database/updateData.js");
const deleteData = require("./database/deleteData.js");

const express = require("express");
const rentCalculations = require("./lib/rentCalculations");

const app = express();
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
    ca:serverCa 
  },
};

app.get("/", (req, res) => {
  res.json({ success: true, message: "service up and running" });
});


app.get("/health", (req, res) => {
  res.json({ success: true, message: "all services healthy" });
});

// http://localhost:3001/monthlyPayment?amount=20000&years=20
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

// http://localhost:3001/totalRent?amount=20000&years=20
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

app.listen(PORT, () => {
  console.debug("Node Js Server is Running");
  
  var conn = mysql.createConnection(config);
  conn.connect(function (err) {
    if (err) throw err;
    else{
      // queryDatabase.queryDatabase(conn);
      const dataPromise = readData.readData(conn)
      dataPromise.then((rows)=>console.log(rows))
      // updateData.updateData(conn);
      // deleteData.deleteData(conn);
      conn.end(function (err) { 
        if (err) throw err;
        else  console.log('Done.') 
        });
    }
  });
});
