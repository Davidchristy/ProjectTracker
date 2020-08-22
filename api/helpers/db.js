const assert = require("assert");
const mysql = require("mysql");
let _db;

module.exports = {
    getDb,
    initDb
};

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    // TODO: Also set up a more complete DB
    // TODO: Salt the passwords, they are stored in clear text
    // TODO: Set up local config file to hold this and more data
    // TODO: Use a pool of connections and not just one
    let database = new Database({
        host: '127.0.0.1',
        user: 'projectTrackerDBUser',
        password: 'PTPassword',
        database: 'project_tracker'
    })
    database.connection.connect(connected);
    function connected(err) {
        if (err) {
            return callback(err);
        }
        console.log("DB initialized");
        _db = database;
        return callback(null, _db);
    }
}

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

class Database {
    // This example of “promisify” the database client comes from this website.
    //https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}