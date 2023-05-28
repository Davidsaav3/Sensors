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
  app.get("/api/get/device_configurations", (req,res)=>{ /*/ GET  /*/
    con.query("SELECT * FROM device_configurations", function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  if (err) throw err;
  app.get("/api/id/device_configurations/:id", (req,res)=>{ /*/ ID  /*/
  const id03 = parseInt(req.params.id);
  console.log(id03)
    con.query("SELECT * FROM device_configurations WHERE id = ?", id03, function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/enable/device_configurations", (req,res)=>{  /*/ ENABLE  /*/
  const id02 = req.params.id;
  const enable3 = req.params.enable;
    con.query("UPDATE device_configurations SET enable = ? WHERE id = ?",[id02,enable3], function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  app.post("/api/duplicate/device_configurations", (req,res)=>{  /*/ DUPLICATE  /*/
    const id01 = 1;
    con.query("INSERT INTO device_configurations (uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid) SELECT uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid FROM device_configurations WHERE id=?;",[id01], function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  app.post("/api/post/device_configurations", (req,res)=>{  /*/ PUT  /*/
  const uid = req.body.uid;
  const alias = req.body.alias;
  const origin = req.body.origin;
  const description_origin = req.body.description_origin;
  const application_id = req.body.application_id;
  const topic_name = req.body.topic_name;
  const typemeter = req.body.typemeter;
  const lat = req.body.lat;
  const lon = req.body.lon;
  const cota = req.body.cota;
  const timezone = req.body.timezone;
  const enable = req.body.enable;
  const organizationid = req.body.organizationid;
  con.query("INSERT INTO device_configurations (uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",[uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid], function (err, result) {
    if (err) throw err;
      console.log(result);
      res.send(result)
  });
});
  if (err) throw err;
  //const id = req.params.id;
  const id7 = "1";
  app.post("/api/update/device_configurations/:id", (req,res)=>{  /*/ UPDATE  /*/
    con.query("UPDATE device_configurations SET title = content WHERE id = ?",id7, function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  if (err) throw err;
  app.delete("/api/delete/device_configurations/:id", (req,res)=>{  /*/ DELETE  /*/
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
  app.get("/api/get/sensors_devices", (req,res)=>{  /*/ GET  /*/
    con.query("SELECT * FROM sensors_devices", function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  if (err) throw err;
  app.get("/api/id/sensors_devices/:id", (req,res)=>{  /*/ ID  /*/
    con.query("SELECT * FROM sensors_devices WHERE id = ?", id, function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  if (err) throw err;
  const id_device = "1";
  app.get("/api/id_device/sensors_devices/", (req,res)=>{  /*/ GET ID_DEVICES  /*/
    con.query("SELECT orden, enable, id_device, id_type_sensor, id, datafield, nodata, (SELECT type FROM `sensors_types` as t WHERE s.id_type_sensor = t.id) As type_name FROM `sensors_devices` as s WHERE id_device = ?", id_device, function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
});
});
if (err) throw err;
  app.post("/api/post/sensors_devices", (req,res)=>{  /*/ PUT  /*/
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
  app.post("/api/update/sensors_devices/:id", (req,res)=>{  /*/ UPDATE  /*/
    con.query("UPDATE sensors_devices SET title = content WHERE id = ?",id1, function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  if (err) throw err;
  app.delete("/api/delete/sensors_devices/:id", (req,res)=>{  /*/ DELETE  /*/
  const id0 = req.params.id;
  const id1 = "1";
    con.query("DELETE FROM sensors_devices WHERE id= ?", id1, function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });



  /* SENSORS_TYPES //////////////////////////////////////////*/
  if (err) throw err;
  app.get("/api/get/sensors_types", (req,res)=>{  /*/ GET  /*/
    con.query("SELECT * FROM sensors_types", function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  if (err) throw err;
  const id21 = "1";
  app.get("/api/id/sensors_types/", (req,res)=>{  /*/ ID  /*/
    con.query("SELECT * FROM sensors_types WHERE id = ?", id21, function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/post/sensors_types", (req,res)=>{  /*/ PUT  /*/
    const type = req.body.type;
    const metric = req.body.metric;
    const description = req.body.description;
    const errorvalue = req.body.errorvalue;
    const valuemax = req.body.valuemax;
    const valuemin = req.body.valuemin;
    con.query("INSERT INTO sensors_types (type,metric,description,errorvalue,valuemax,valuemin) VALUES (?,?,?,?,?,?)",[type, metric, description,errorvalue,valuemax,valuemin], function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  if (err) throw err;
  //const id = req.params.id
  app.post("/api/update/sensors_types/:id", (req,res)=>{  /*/ UPDATE  /*/
    type = req.body.type;
    metric = req.body.metric;
    description = req.body.description;
    errorvalue = req.body.errorvalue;
    valuemax = req.body.valuemax;
    valuemin = req.body.valuemin;
    id = req.body.id;
    con.query("UPDATE sensors_types SET (?,?,?,?,?,?) INTO (type,metric,description,errorvalue,valuemax,valuemin) WHEWRE id= ?",[type, metric, description,errorvalue,valuemax,valuemin,id], function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
  if (err) throw err;
  app.delete("/api/delete/sensors_types", (req,res)=>{  /*/ DELETE  /*/
    var id0 = req.params.id;
    var id1 = '29';
    con.query("DELETE FROM sensors_types WHERE id= ?", id1, function (err, result) {
      if (err) throw err;
        console.log(result);
        res.send(result)
    });
  });
});

  app.listen(PORT, ()=>{
    console.log(`Server is running on ＄{PORT}`)
  })