module.exports = {
    user : process.env.user_name,
    host : 'ec2-34-230-153-41.compute-1.amazonaws.com',
    database : process.env.database,
    password : process.env.password,
    port : process.env.port,
    ssl: {
        rejectUnauthorized: false,
    },
};