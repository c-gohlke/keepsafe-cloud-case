function reinitDatabase(conn) {
  conn.query(
    "DROP TABLE IF EXISTS calculations;",
    function (err, results, fields) {
      if (err) throw err;
      console.log("Dropped calculations table if existed.");
    }
  );
  conn.query(
    "CREATE TABLE calculations (id serial PRIMARY KEY, userID INTEGER, timestamp VARCHAR(50), calculation INTEGER, filename VARCHAR(50));",
    function (err, results, fields) {
      if (err) throw err;
      console.log("Created calculations table.");
    }
  );
}

module.exports = {
  reinitDatabase,
};
