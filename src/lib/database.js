// Module dependencies
const mongoose = require('mongoose'),
      dbConfig = require('./configLoader').databaseConfig,
      connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database;
      
let   connection = null;

class Database {

    open(callback) {
        mongoose.connect(connectionString);
        connection = mongoose.connection;
        mongoose.Promise = global.Promise;
        mongoose.connection.on('open', () => {
            console.log('We have connected to mongodb');
            callback();
        });

    }

    // disconnect from database
    close() {
        connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }

}

module.exports = new Database();
