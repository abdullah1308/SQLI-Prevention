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

app.post("/login", (req, res) => {
    username = req.body.username;
    password = req.body.password;
    const dynamicLoginQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const staticLoginQuery = `SELECT * FROM users WHERE username = '' AND password = ''`;

    console.log("RTQ:", dynamicLoginQuery);

    if(compareQueries(staticLoginQuery, dynamicLoginQuery) == true) {
        db.query(
            dynamicLoginQuery,
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
    } else {
        res.send({ err: "SQL Injection detected" });
        // console.log(4);
    }
    
});

app.post("/register", (req, res) => {
    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [req.body.username, req.body.password],
        (err, result) => {
            if (!err) {
                res.send({ message: "success" });
            } else {
                res.send({ err: err });
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

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contacts";
    db.query(sqlGet, (error, result) => {
        res.send(result);
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
    const { name, email, contact } = req.body;
    const sqlUpdate =
        "UPDATE contacts SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
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

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

// Utils

// Compares the dynamic and static sql query after removing parameter values
function compareQueries(staticQuery, dynamicQuery) {
    
    var delDynamicQuery = dynamicQuery.replace(/'(?:(?!'|')[\s\S])*'/g, '\'\'');
    console.log("DRTQ:", delDynamicQuery);

    return delDynamicQuery == staticQuery;
}