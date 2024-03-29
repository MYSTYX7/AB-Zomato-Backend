let con = require("./connector");
let data = require("./data");

let a = async (err) => {
  if (err)
    return console.log("Failed to connect to MySQL Server/Database", err);
  else {
    await new Promise((resolve, reject) => {
      con.query("DROP TABLE IF EXISTS orders, myOrders", (err) => {
        if (err) reject(err);
        else {
          resolve(1);
        }
      });
    });

    await new Promise((resolve, reject) => {
      con.query(
        "CREATE TABLE orders(_id varchar(200),image varchar(300),title varchar(100),description varchar(1000))",
        (err) => {
          if (err) reject(err);
          else resolve(1);
        }
      );
    });
    await new Promise((resolve, reject) => {
      con.query(
        "CREATE TABLE myOrders (_id varchar(200),image varchar(300), title varchar(100),quantity INT NOT NULL,dateMade VARCHAR(100) NOT NULL);",
        (err) => {
          if (err) reject(err);
          else resolve(1);
        }
      );
    });

    for (let i = 0; i < data.length; i++)
      await new Promise((resolve, reject) => {
        con.query(
          `INSERT into orders values("${data[i]._id}","${data[i].image}","${data[i].title}","${data[i].description}")`,
          (err) => {
            if (err) reject(err);
            else {
              resolve(1);
            }
          }
        );
      });
  }
  let [error, result] = await new Promise((resolve, reject) => {
    con.query("SELECT * FROM orders", (err) => {
      if (err) reject([err, undefined]);
      else resolve([undefined, data]);
    });
  });
  if (error) {
    console.log(er);
  }
};
a();
