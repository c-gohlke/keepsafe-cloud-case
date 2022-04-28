function deleteUserdata(conn, userID) {
  conn.query(
    "DELETE FROM calculations WHERE userID = ?",
    [userID],
    function (err, results, fields) {
      if (err) throw err;
      else console.log("Deleted " + results.affectedRows + " row(s).");
    }
  );
  conn.end(function (err) {
    if (err) throw err;
    else console.log("Done.");
  });
}

module.exports = {
  deleteUserdata,
};
