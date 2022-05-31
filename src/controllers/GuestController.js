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
            'SELECT * FROM guest'
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

    load(req,res){

        let id = req.params.id;

        pool.query(
            'SELECT * FROM guest WHERE name = $1'
        , [id],
        function (error, results) {
            if (error) throw error;
            if (results.rowCount === 0) {
                res.send({ 
                    success: false, 
                    message: 'No Data Found',
                    data: results.rows
                });
            }else{
                res.send({ 
                    success: true, 
                    message: 'Guest Data Found',
                    data: results.rows[0]
                });   
            }
        });

    },

    add(req,res){

       let name = req.body.name;
       let attend = req.body.attend;
       let people = req.body.people;
       let create_dtm = new Date().toISOString().replace("T"," ").substring(0, 19);

       pool.query(
            'INSERT INTO guest (name, attend, people, create_dtm) VALUES ($1, $2, $3, $4)'
        , [name, attend, people, create_dtm], 
        function (error, results) {
            if(error) throw error;  
            res.send({ 
                success: true, 
                message: 'Guest Data Saved',
            });
        });

    },

    update(req,res){

        let attend = req.body.attend;
        let people = req.body.people;
        let update_dtm = new Date().toISOString().replace("T"," ").substring(0, 19);
        let id = req.body.name

        pool.query(
            'UPDATE guest SET attend = $1, people = $2, update_dtm = $3 WHERE name = $4'
        , [attend, people, update_dtm, id],
        function (error, results) {
            if(error) throw error;
            res.send({ 
                success: true, 
                message: 'Guest Data Updated',
            });
        });

    },

    delete(req,res){

        let id = req.body.id

        pool.query(
            'DELETE FROM guest WHERE name = $1'
        , [id],
        function (error, results) {
            if(error) throw error;  
            res.send({ 
                success: true, 
                message: 'Guest Data Deleted'
            });
        });

    }
}