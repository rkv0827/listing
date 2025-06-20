const pgsqlpool=require('pg').Pool
const pool=new pgsqlpool({
    user:"postgres",
    password:"postgres",
    database:"voterslist",
    host:"localhost",
    port:"5432",
    max:10
})
pool.connect((err,connection)=>{
    if(err) throw err;
    console.log('Connection successfull...');
    connection.release()

})
module.exports=pool;