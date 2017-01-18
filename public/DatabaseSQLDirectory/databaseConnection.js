var mysql = require('mysql');

function Connection() {
    var pool = null;

    this.init = function(){
        pool = mysql.createPool({
            host     : 'localhost',
            user     : 'raphael',
            password : '123',
            database : 'santauti'
        });
    };

    this.acquire = function(callback){
        pool.getConnection(function(err,connection){
            if(err){
                console.log("Connection to database failed");
            }
            else
                console.log("Connection to database established")
        });
    };
    this.getRegistro = function (user,passw) {
        var sqlString = "select * from Profissional where Usuario='1' and Senha='1'";
        pool.query(sqlString,function (err,rs) {
            if(err){console.log("pau")};
            console.log(rs);
        })
    }
}

module.exports = new Connection();
