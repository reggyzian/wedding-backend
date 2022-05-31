const config = require('../configs/Database');
const Pool = require('pg').Pool;
const pool = new Pool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={

    list(req, res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM message order by message_id desc;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Success Load Data',
                    data: results 
                });
            });
            connection.release();
        })
    },

    load(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM message WHERE message_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                console.log(error)
                res.send({ 
                    success: true, 
                    message: 'Message Data Found',
                    data: results
                });
            });
            connection.release();
        })
    },

    add(req,res){
        let data = {
            name : req.body.name,
            description : req.body.description,
            relation : req.body.relation,
            create_dtm : new Date().toISOString().replace("T"," ").substring(0, 19)
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO message SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Message Data Saved',
                    data: data
                });
            });
            connection.release();
        })
    },

    update(req,res){
        let dataEdit = {
            name : req.body.name,
            description : req.body.description,
            relation : req.body.relation,
            update_dtm : new Date().toISOString().replace("T"," ").substring(0, 19)
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE message SET ? WHERE message_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Message Data Updated',
                });
            });
            connection.release();
        })
    },

    delete(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM message WHERE message_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Message Data Deleted'
                });
            });
            connection.release();
        })
    }
}