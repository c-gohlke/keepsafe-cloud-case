function updateData(conn){
    conn.query('UPDATE inventory SET quantity = ? WHERE name = ?', [200, 'banana'], 
         function (err, results, fields) {
             if (err) throw err;
             else console.log('Updated ' + results.affectedRows + ' row(s).');
        })
    conn.end(
        function (err) { 
             if (err) throw err;
             else  console.log('Done.') 
     });
};

module.exports = {
    updateData
}