function reinitDatabase(conn) {
  conn.query(
    "DROP TABLE IF EXISTS calculations;",
    function (err, results, fields) {
      if (err) throw err;
      console.log("Dropped calculations table if existed.");
    }
  );
  conn.query(
    "CREATE TABLE calculations (id serial PRIMARY KEY, userID INTEGER, timestamp INTEGER, calculation VARCHAR(50), filename VARCHAR(50));",
    function (err, results, fields) {
      if (err) throw err;
      console.log("Created calculations table.");
    }
  );
  conn.query(
    "INSERT INTO calculations (userID, timestamp, calculation, filename) VALUES (?, ?, ?, ?);",
    [0, 0, "a=b", "a_equal_b"],
    function (err, results, fields) {
      if (err) throw err;
      else console.log("Inserted " + results.affectedRows + " row(s).");
    }
  );
  conn.query(
    "INSERT INTO calculations (userID, timestamp, calculation, filename) VALUES (?, ?, ?, ?);",
    [0, 0, "a=c", "a_equal_c"],
    function (err, results, fields) {
      if (err) throw err;
      console.log("Inserted " + results.affectedRows + " row(s).");
    }
  );
}

module.exports = {
  reinitDatabase,
};
