const config = require('../configs/Database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={

    list(req, res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM guest;
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
                SELECT * FROM guest WHERE guest_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Guest Data Found',
                    data: results
                });
            });
            connection.release();
        })
    },

    add(req,res){
        let data = {
            name : req.body.name,
            attend : req.body.attend,
            create_dtm : new Date().toISOString().replace("T"," ").substring(0, 19)
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO guest SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Guest Data Saved',
                });
            });
            connection.release();
        })
    },

    update(req,res){
        let dataEdit = {
            name : req.body.name,
            attend : req.body.attend,
            update_dtm : new Date().toISOString().replace("T"," ").substring(0, 19)
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE guest SET ? WHERE guest_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Guest Data Updated',
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
                DELETE FROM guest WHERE guest_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Guest Data Deleted'
                });
            });
            connection.release();
        })
    }
}