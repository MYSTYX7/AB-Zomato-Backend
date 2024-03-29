const express = require("express");
const app = express();
const port = 8080;
const db = require("./connector.js");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const connection = require("./connector.js");

//get all orders to display at the home page
app.get("/", (req, res) => {
  res.json("Server is live 🟢");
});

app.get("/SingleOrder/:id", (req, res) => {
  let id = req.params.id;
  // console.log(id);
  try {
    let sqlQuery = "SELECT * FROM orders WHERE _id=?";

    db.query(sqlQuery, [id], (err, data) => {
      if (err) {
        console.log("Error in fetching single order : ", err);
        res.status(400).json(err);
      } else {
        // console.log(data);
        res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log("Err : ", error);
  }
});

app.get("/finalOrder", (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM myOrders ";

    db.query(sqlQuery, (err, data) => {
      if (err) {
        console.log("Error in fetching single order : ", err);
        res.status(400).json(err);
      } else {
        // console.log(data);
        res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log("Err : ", error);
  }
});

app.put("/updateOrder/:id", (req, res) => {
  console.log("Updatong the order .... ");
  const _id = req.params.id;
  const newServing = req.body.newServing;
  console.log(_id);
  console.log(newServing);
  try {
    let sqlQuery = "UPDATE myOrders SET `quantity` =?  WHERE _id=? ";
    let values = [newServing];

    db.query(sqlQuery, [...values, _id], (err, data) => {
      if (err) {
        console.log("Error in Updating order : ", err);
        res.status(400).json(err);
      } else {
        console.log("Updated order with id ✅ : ", _id);
        res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log("Err : ", error);
  }
});

app.post("/addDish", (req, res) => {
  // console.log(req.body);
  try {
    let sqlQuery =
      "INSERT INTO  myOrders (`_id`,`image`,`quantity`,`dateMade`)  VALUES(?)";
    let values = [
      req.body.id,
      // req.body.image,
      req.body.title,
      req.body.quantity,
      req.body.currDate,
    ];
    db.query(sqlQuery, [values], (err, data) => {
      if (err) {
        console.log("Error in Adding dish to myOrders table : ", err);
        res.status(400).json(err);
      } else {
        // console.log(data);
        res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log("Err : ", error);
  }
});

app.get("/allOrders", (req, res) => {
  let sqlQuery = "select * from orders";
  // let sqlQuery = "SELECT * FROM Orders";
  db.query(sqlQuery, (err, data) => {
    if (err) {
      console.log("Error : ", err);
      res.json(err);
    } else {
      console.log(res.json(data));
      res.json(data);
    }
  });
});
app.get("/someOrders", (req, res) => {
  let sqlQuery = "select * from orders limit 6 offset 0";
  // let sqlQuery = "SELECT * FROM Orders";
  db.query(sqlQuery, (err, data) => {
    if (err) {
      console.log("Error : ", err);
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.delete("/deleteOrder/:id", (req, res) => {
  console.log("Delete Endpoint : ", req.params);
  try {
    let sqlQuery = "DELETE FROM myOrders where _id=?";
    let _id = req.params.id;
    db.query(sqlQuery, [_id], (err, data) => {
      if (err) {
        console.log("Error : ", err);
        res.json(err);
      } else {
        console.log("Deleted ✅");
        res.json(data);
      }
    });
  } catch (error) {
    console.log("Error in deleting : ", error);
  }
});

app.get("/orders/:lim/:off", (req, res) => {
  connection.query(
    "select * from orders limit " +
      req.params.lim +
      " offset " +
      req.params.off,
    (err, result, next) => {
      if (err) {
        res.status(400).json({ message: "400 bad request" });
        next();
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
