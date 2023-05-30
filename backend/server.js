const express = require('express');
const cors = require('cors')
const { con } = require('./middleware/mysql');
const app = express();
app.use(cors());
app.use(express.json())

con.connect(function(err) {

  /* device_configurations /////////////////////////////////////////////////*/
  if (err) throw err;
  app.get("/api/get/device_configurations/:type", (req,res)=>{  /*/ GET  /*/
  const type0 = req.params.type;
  console.log(type0);

  if(type0=='Buscar'){
    con.query("SELECT * FROM device_configurations", function (err, result) {
      if (err) throw err;
        res.send(result)
    }); 
  }
  else{
      con.query("SELECT * FROM device_configurations WHERE uid=?",type0, function (err, result) {
      if (err) throw err;
        res.send(result)
    }); 
  }

  });

  if (err) throw err;
  app.get("/api/id/device_configurations/:id", (req,res)=>{ /*/ ID  /*/
  const id03 = parseInt(req.params.id);
    con.query("SELECT * FROM device_configurations WHERE id = ?", id03, function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/enable/device_configurations", (req,res)=>{  /*/ ENABLE  /*/
  const id02 = req.params.id;
  const enable3 = req.params.enable;
    con.query("UPDATE device_configurations SET enable = ? WHERE id = ?",[id02,enable3], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  app.post("/api/duplicate/device_configurations", (req,res)=>{  /*/ DUPLICATE  /*/
    const id01 = 1;
    con.query("INSERT INTO device_configurations (uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid) SELECT uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid FROM device_configurations WHERE id=?;",[id01], function (err, result) {
      if (err) throw err;
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
      res.send(result)
  });
});
  if (err) throw err;
  app.post("/api/update/device_configurations/", (req,res)=>{  /*/ UPDATE  /*/
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
  const id7 = req.body.id;
    con.query("UPDATE device_configurations SET uid=?,alias=?,origin=?,description_origin=?,application_id=?,topic_name=?,typemeter=?,lat=?,lon=?,cota=?,timezone=?,enable=?,organizationid=? WHERE id = ?",[uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid,id7], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/delete/device_configurations", (req,res)=>{  /*/ DELETE  /*/
    var id09 = req.body.id;
    con.query("DELETE FROM device_configurations WHERE id= ?", id09, function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });



  /* SENSORS_DEVICES /////////////////////////////////////////////////////*/
  if (err) throw err;
  app.get("/api/get/sensors_devices", (req,res)=>{  /*/ GET  /*/
    con.query("SELECT * FROM sensors_devices", function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  if (err) throw err;
  app.get("/api/id/sensors_devices/:id", (req,res)=>{  /*/ ID  /*/
    const idxd = parseInt(req.params.id);
    con.query("SELECT * FROM sensors_devices WHERE id = ?", idxd, function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  if (err) throw err;
  app.get("/api/id_device/sensors_devices/:id", (req,res)=>{  /*/ GET ID_DEVICES  /*/
  const id_device = parseInt(req.params.id);
    con.query("SELECT orden, enable, id_device, id_type_sensor, id, datafield, nodata, (SELECT type FROM sensors_types as t WHERE s.id_type_sensor = t.id) As type_name FROM sensors_devices as s WHERE id_device = ? ORDER BY orden ASC", id_device, function (err, result) {
      if (err) throw err;
        res.send(result)
});
});
if (err) throw err;
  app.post("/api/post/sensors_devices", (req,res)=>{  /*/ PUT  /*/
  const orden = req.body.orden;
  const enable = req.body.enable;
  const id_device = req.body.id_device;
  const id_type_sensor = req.body.id_type_sensor;
  const datafield = req.body.datafield;
  const nodata = req.body.nodata;
    con.query("INSERT INTO sensors_devices (orden, enable,id_device,id_type_sensor,datafield,nodata) VALUES (?,?,?,?,?,?)",[orden,enable,id_device,id_type_sensor,datafield,nodata], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/update/sensors_devices/", (req,res)=>{  /*/ UPDATE  /*/
  const idm = req.body.id;
  const orden = req.body.orden;
  const enable = req.body.enable;
  const id_device = req.body.id_device;
  const id_type_sensor = req.body.id_type_sensor;
  const datafield = req.body.datafield;
  const nodata = req.body.nodata;  
    con.query("UPDATE sensors_devices SET orden=?, enable=? ,id_device=? ,id_type_sensor=? ,datafield=? ,nodata=? WHERE id = ?",[orden,enable,id_device,id_type_sensor,datafield,nodata,idm], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/delete/sensors_devices", (req,res)=>{  /*/ DELETE  /*/
  const id012 = req.body.id;
    con.query("DELETE FROM sensors_devices WHERE id= ?", id012, function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });



  /* SENSORS_TYPES //////////////////////////////////////////*/
  if (err) throw err;
  app.get("/api/get/sensors_types/:type", (req,res)=>{  /*/ GET  /*/
  const type0 = req.params.type;
  console.log(type0);

  if(type0=='Buscar'){
    con.query("SELECT * FROM sensors_types", function (err, result) {
      if (err) throw err;
        res.send(result)
    }); 
  }
  else{
      con.query("SELECT * FROM sensors_types WHERE type=?",type0, function (err, result) {
      if (err) throw err;
        res.send(result)
    }); 
  }

  });
  if (err) throw err;
  const id21 = "1";
  app.get("/api/id/sensors_types/:id", (req,res)=>{  /*/ ID  /*/
  const id05 = parseInt(req.params.id);
    con.query("SELECT * FROM sensors_types WHERE id = ?", id05, function (err, result) {
      if (err) throw err;
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
        res.send(result)
    });
  });
  if (err) throw err;
  //const id = req.params.id
  app.post("/api/update/sensors_types/", (req,res)=>{  /*/ UPDATE  /*/
    type9 = req.body.type;
    metric = req.body.metric;
    description = req.body.description;
    errorvalue = req.body.errorvalue;
    valuemax = req.body.valuemax;
    valuemin = req.body.valuemin;
    id99 = req.body.id;
    con.query("UPDATE sensors_types SET type=?,metric=?,description=?,errorvalue=?,valuemax=?,valuemin=? WHERE id= ?",[type9, metric, description,errorvalue,valuemax,valuemin,id99], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/delete/sensors_types", (req,res)=>{  /*/ DELETE  /*/
    var id0 = req.body.id;
    con.query("DELETE FROM sensors_types WHERE id= ?", id0, function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
});

  app.listen(5172, ()=>{
    console.log(`Sirviendo: http://localhost:5172/api/`)
  })