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
                SELECT * FROM guest WHERE name = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;
                if(results.length === 0){
                    res.send({ 
                        success: false, 
                        message: 'Guest Data Not Found',
                        data: results
                    });
                }else{
                    res.send({ 
                        success: true, 
                        message: 'Guest Data Found',
                        data: results
                    });   
                }
            });
            connection.release();
        })
    },

    add(req,res){
        let data = {
            name : req.body.name,
            attend : req.body.attend,
            people : req.body.people,
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
            attend : req.body.attend,
            people : req.body.people,
            update_dtm : new Date().toISOString().replace("T"," ").substring(0, 19)
        }
        let id = req.body.name
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE guest SET ? WHERE name = ?;
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