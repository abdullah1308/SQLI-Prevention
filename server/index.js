const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "#A8273553b",
    database: "project_290",
    multipleStatements: true,
});

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contacts";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/register", (req, res) => {
    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [req.body.username, req.body.password],
        (err, result) => {
            if(!err) {
                res.send({message: "success"})
            } else {
                res.send({err: err})
            }
        }
    );
});

app.post("/login", (req, res) => {
    username = req.body.username;
    password = req.body.password;
    console.log(
        `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
    );
    db.query(
        `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`,
        [],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                // console.log(1);
            }

            if (result.length > 0) {
                res.send(result);
                // console.log(2);
            } else {
                res.send({ err: "Invalid username or password" });
                // console.log(3);
            }
        }
    );
});

app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert =
        "INSERT INTO contacts (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contacts WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contacts WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const {name, email, contact} = req.body;
  const sqlUpdate = "UPDATE contacts SET name = ?, email = ?, contact = ? WHERE id = ?";
  db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
      if (error) {
          console.log(error);
      }
      res.send(result);
  });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
