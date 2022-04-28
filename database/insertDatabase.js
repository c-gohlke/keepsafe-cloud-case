function insertDatabase(conn, userID, timestamp, calculation, filename) {
  conn.query(
    "INSERT INTO calculations (userID, timestamp, calculation, filename) VALUES (?, ?, ?, ?);",
    [userID, timestamp, calculation, filename],
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
