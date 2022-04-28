readData = function (connection, userID) {
  return new Promise(function (resolve, reject) {
    connection.query(
      "SELECT * FROM calculations WHERE userID = ?",
      [userID],
      function (err, rows) {
        if (err) throw err;
        else {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            resolve(rows);
          }
        }
      }
    );
  });
};

module.exports = {
  readData,
};
