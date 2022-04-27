// function readData(conn, callback){
//     const results = new Promise(conn.query('SELECT * FROM inventory', 
//         function (err, results) {
//             if (err)
//                 throw err;
//             else 
//                 resove(results)
//         }
//     )
//     var rows = []
//     for (i = 0; i < results.length; i++) {
//         rows.push(JSON.stringify(results[i]));
//     }
//     return rows
// };

readData = function(connection){
    return new Promise(function(resolve, reject){
      connection.query(
            'SELECT * FROM inventory', 
            function(err, rows){                                                
              if(rows === undefined){
                  reject(new Error("Error rows is undefined"));
              }else{
                  resolve(rows);
              }
          }
      )}
)}

module.exports = {
    readData
}