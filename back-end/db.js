const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('coeyDB');

const initDB = () => {
    db.serialize(() => {
        db.prepare("drop table  IF EXISTS users").run().finalize();
        db.run("CREATE TABLE IF NOT EXISTS users (username TEXT,password TEXT)");
       
        const stmt = db.prepare("INSERT INTO users VALUES (?,?)");
        stmt.run(['coey','1234']);
        stmt.finalize();
    
       // db.prepare("drop table IF EXISTS dogs").run().finalize();
        db.run("CREATE TABLE IF NOT EXISTS dogs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,age INTEGER, breeds TEXT, weight INTEGER,height INTEGER)");
        db.get("select * from dogs", (err,result)=> {
            if(!result){
                db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES ('bobo',8,'Dalmatian',48,24)").run().finalize();
                db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES ('lego',3,'German Spitz',21,12)").run().finalize();
                db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES ('coco',5,'Hovawart',55,23)").run().finalize();
                db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES ('kong',10,'Norwegian Elkhound',50,20)").run().finalize();
                db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES ('sky',2,'Poodle',10,10)").run().finalize();
                db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES ('sisi',9,'Vizsla',40,21)").run().finalize();
                db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES ('alpha',6,'Whoodle',20,12)").run().finalize();
                db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES ('nana',5,'Frenchton',11,17)").run().finalize();
                db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES ('fever',4,'Drever',35,13)").run().finalize();
                db.prepare("INSERT INTO dogs(name,age,breeds,weight,height) VALUES ('coey',5,'Chigi',10,7)").run().finalize();
            }
        });
        
    });
    return db;
    db.close();
}

module.exports = initDB;