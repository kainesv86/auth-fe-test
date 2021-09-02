import { MongoClient, Db } from "mongodb";

const url = "mongodb://localhost:27017";

let _db: any;

function initDb(dbName: string) {
        MongoClient.connect(url, (error, result) => {
                _db = result?.db(dbName);
        });
}

function getDb(): Db | null {
        if (!_db) {
                console.log("You need initialize database");
                return null;
        }
        return _db;
}

export { getDb, initDb };
