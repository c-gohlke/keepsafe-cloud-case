function insertDatabase(
  conn,
  userID,
  timestamp,
  calculation,
  filename,
  isMonthly,
  cost,
  length,
  interest
) {
  console.log("Database inserted");
  conn.query(
    "INSERT INTO calculations (userID, timestamp, calculation, filename, isMonthly, cost, length, interest) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
    [
      userID,
      timestamp,
      calculation,
      filename,
      isMonthly,
      cost,
      length,
      interest,
    ],
    function (err, results, fields) {
      if (err) throw err;
      else console.log("Inserted " + results.affectedRows + " row(s).");
    }
  );
  conn.end(function (err) {
    if (err) throw err;
    else console.log("Done.");
  });
}

module.exports = {
  insertDatabase,
};
