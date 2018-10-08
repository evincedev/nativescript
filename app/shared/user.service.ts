import { Injectable } from "@angular/core";
import { User } from "./user.model";


const DB_NAME = "demo.db"

@Injectable()
export class UserService {
    sqlite = require("nativescript-sqlite");
    constructor() {
        this.createUserTable()
    }

    createUserTable() {
        new this.sqlite(DB_NAME, function (err, db) {
            db.execSQL("CREATE TABLE IF NOT EXISTS TestTable (id INTEGER PRIMARY KEY ASC, first_name TEXT, last_name TEXT,company_name TEXT)", [], function (err) {
                console.log("TABLE CREATED");
            });
        })
    }

    insertUserDetails(user: User, onSuccess: Function, onError: Function) {
        new this.sqlite(DB_NAME, function (err, db) {
            db.execSQL("INSERT INTO TestTable (first_name, last_name,company_name) VALUES (?,?,?)", [user.firstname, user.lastname, user.company], function (err, id) {
                if (err) {
                    this.handleErrors(err)
                    onError()
                } else {
                    onSuccess()   
                    console.log("DataInserted",db)                 
                }
            });
        });
    }

    getUserDetails(onSuccess: Function,onError: Function) {
        new this.sqlite(DB_NAME, function (err, db) {
            db.all("SELECT * FROM TestTable ORDER BY id",[], function (err, res) {
                if (err) {
                    console.log("Error fetch",err)
                    onError(err)
                } else {
                    onSuccess(res)                    
                }
            })
        });
    }

    handleErrors(error: any) {
        console.error(error.message);
    }
}
