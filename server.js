const express = require('express');
const cors = require('cors')
const app = express();
const  PORT = 5172;
app.use(cors());
app.use(express.json())


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sensors"
});

con.connect(function(err) {

  /* device_configurations /////////////////////////////////////////////////*/
  if (err) throw err;
  app.get("/api/get/device_configurations", (req,res)=>{
        con.query("SELECT * FROM device_configurations", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  app.get("/api/id/device_configurations/:id", (req,res)=>{
        con.query("SELECT * FROM device_configurations WHERE id = ?", id, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/post/user", (req,res)=>{
        //const username = req.body.userName;
        //const title = req.body.title;
        //const text = req.body.text;
        const title = "xd";
        const content = "xd";
        con.query("INSERT INTO device_configurations (title, content) VALUES (?,?)",[title,content], function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  //const id = req.params.id;
  const id7 = "1";
  app.post("/api/update/device_configurations/:id", (req,res)=>{
        con.query("UPDATE device_configurations SET title = content WHERE id = ?",id7, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  app.delete("/api/delete/device_configurations/:id", (req,res)=>{
  //const id = req.params.id;
  const id8 = "1";
          con.query("DELETE FROM device_configurations WHERE id= ?", id8, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });



  /* SENSORS_DEVICES /////////////////////////////////////////////////////*/
  if (err) throw err;
  app.get("/api/get/sensors_devices", (req,res)=>{
        con.query("SELECT * FROM sensors_devices", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  app.get("/api/id/sensors_devices/:id", (req,res)=>{
        con.query("SELECT * FROM sensors_devices WHERE id = ?", id, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/post/sensors_devices", (req,res)=>{
        //const username = req.body.userName;
        //const title = req.body.title;
        //const text = req.body.text;
        const title = "xd";
        const content = "xd";
        con.query("INSERT INTO sensors_devices (title, content) VALUES (?,?)",[title,content], function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  //const id = req.params.id;
  const id1 = "1";
  app.post("/api/update/sensors_devices/:id", (req,res)=>{
        con.query("UPDATE sensors_devices SET title = content WHERE id = ?",id1, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  app.delete("/api/delete/sensors_devices/:id", (req,res)=>{
  //const id = req.params.id;
  const id2 = "4";
          con.query("DELETE FROM sensors_devices WHERE id= ?", id2, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });



  /* SENSORS_TYPES //////////////////////////////////////////*/
  if (err) throw err;
  app.get("/api/get/sensors_types", (req,res)=>{
        con.query("SELECT * FROM sensors_types", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  app.get("/api/id/sensors_types/:id", (req,res)=>{
        con.query("SELECT * FROM sensors_types WHERE id = ?", id, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/post/sensors_types", (req,res)=>{
        //const username = req.body.userName;
        //const title = req.body.title;
        //const text = req.body.text;
        const name = "xd";
        const language = "xd";
        con.query("INSERT INTO sensors_types (title, content) VALUES (?,?)",[name,language], function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  //const id = req.params.id;
  const id5 = "1";
  app.post("/api/update/sensors_types/:id", (req,res)=>{
        con.query("UPDATE sensors_types SET title = content WHERE id = ?",id5, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
  if (err) throw err;
  app.delete("/api/delete/sensors_types/:id", (req,res)=>{
  //const id = req.params.id;
  const id6 = "1";
          con.query("DELETE FROM sensors_types WHERE id= ?", id6, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
    });
  });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ＄{PORT}`)
})