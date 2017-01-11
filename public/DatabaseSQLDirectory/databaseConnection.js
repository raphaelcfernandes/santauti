var mysql = require('mysql');

function Connection() {
    this.pool = null;

    this.init = function(){
        this.pool = mysql.createPool({
            host     : 'localhost',
            user     : 'raphael',
            password : '123',
            database : 'santauti'
        });
    };

    this.acquire = function(callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                console.log("Connection to database failed");
            }
            else
                console.log("Connection to database established")
        });
    };
}

module.exports = new Connection();
