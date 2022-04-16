const config = require('../configs/Database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={

    list(res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM message;
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
            description : req.body.description,
            relation : req.body.relation,
            guest_id : req.body.guest_id,
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
                });
            });
            connection.release();
        })
    },

    update(req,res){
        let dataEdit = {
            description : req.body.description,
            relation : req.body.relation,
            guest_id : req.body.guest_id,
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