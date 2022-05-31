const config = require('../configs/Database');
const pg = require('pg');
const pool = new pg.Client(config);

pool.connect();
pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={

    list(req, res){

        pool.query(
            'SELECT * FROM message order by message_id desc'
        , function (error, results) {
            if(error) throw error;  
            if (results.rowCount === 0) {
                res.send({ 
                    success: false, 
                    message: 'No Data Found'
                });
            }else{
                res.send({ 
                    success: true, 
                    message: 'Success Load Data',
                    data: results.rows
                });
            }
        });

    },

    add(req,res){

        let name = req.body.name;
        let description = req.body.description;
        let relation = req.body.relation;
        let create_dtm = new Date().toISOString().replace("T"," ").substring(0, 19);

        pool.query(
            'INSERT INTO message (name, description, relation, create_dtm) VALUES ($1, $2, $3, $4)'
        , [name, description, relation, create_dtm],
        function (error, results) {
            if(error) throw error;  
            res.send({ 
                success: true, 
                message: 'Message Data Saved'
            });
        });

    },

    delete(req,res){

        let id = req.body.id

        pool.query(
            'DELETE FROM message WHERE message_id = $1'
        , [id],
        function (error, results) {
            if(error) throw error;  
            res.send({ 
                success: true, 
                message: 'Message Data Deleted'
            });
        });

    }
}