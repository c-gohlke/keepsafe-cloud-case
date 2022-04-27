function deleteData(conn){
    conn.query('DELETE FROM inventory WHERE name = ?', ['orange'], 
         function (err, results, fields) {
             if (err) throw err;
             else console.log('Deleted ' + results.affectedRows + ' row(s).');
        })
    conn.end(
        function (err) { 
             if (err) throw err;
             else  console.log('Done.') 
     });
};

module.exports = {
    deleteData
}