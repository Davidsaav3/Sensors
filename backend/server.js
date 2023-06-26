const express = require('express');
const cors = require('cors')
const { con } = require('./middleware/mysql');
const app = express();
app.use(cors());
app.use(express.json())

con.connect(function(err) {
  app.get("/api/max/device_configurations", (req,res)=>{ /*/ MAX  /*/
    con.query("SELECT id FROM device_configurations WHERE id=(SELECT max(id) FROM device_configurations)", function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  /* device_configurations /////////////////////////////////////////////////*/
  if (err) throw err;
  app.get("/api/get/device_configurations/:type/:type1/:type2/:type3/:type4/:type5/:type6/:x1/:x2/:y1/:y2", (req,res)=>{  /*/ GET  /*/
  const type0 = req.params.type;
  const type1 = req.params.type1;
  const type2 = req.params.type2;  
  const type3 = parseInt(req.params.type3);
  const tam = parseInt(req.params.type5);
  const act = (req.params.type4-1)*parseInt(req.params.type5);
  const type6 = req.params.type6;

  const x1 = req.params.x1;
  const x2 = req.params.x2;
  const y1 = req.params.y1;
  const y2 = req.params.y2;

  //console.log(x1)
  //console.log(x2)
  //console.log(y1)
  //console.log(y2)

  let array= [];
  var array2 = type2.split(",");
  for (var i = 0; i < array2.length; i++) {
    array.push(`(SELECT id_device FROM sensors_devices Where id_type_sensor=${array2[i]})`);
  }
  let consulta= array.join(" AND id IN ")
  console.log(consulta)
  console.log("-")

  if(x1!='0' && x2!='0' && y1!='0' && y2!='0'){
    let xx1= parseInt(x1);
    let xx2= parseInt(x2);
    let yy1= parseInt(y1);
    let yy2= parseInt(y2);

    con.query(`SELECT * FROM device_configurations WHERE lon BETWEEN ${xx1} AND ${xx2} AND lat BETWEEN ${yy1} AND ${yy2}`, function (err, result) {
      if (err) throw err;
        res.send(result)
    }); 
  }
  if(x1=='0' && x2=='0' && y1=='0' && y2=='0'){
    if(type0=='Buscar'){
      if(type2!=0 || type3!=2){
        if(type2!=0 && type3!=2){
          con.query(`SELECT * FROM device_configurations where id IN ${consulta} AND enable=${type3} order by ${type1} ${type6} LIMIT ${tam} OFFSET ${act}`, function (err, result) {
            if (err) throw err;
              res.send(result)
          }); 
        }
        else{
            if(type2!=0){
              con.query(`SELECT * FROM device_configurations where id IN ${consulta} order by ${type1} ${type6} LIMIT ${tam} OFFSET ${act}`, function (err, result) { /////////////////////////////////////////////////////////
                if (err) throw err;
                  res.send(result)
              }); 
          }
          if(type3!=2){
            con.query(`SELECT * FROM device_configurations where enable=${type3} order by ${type1} ${type6} LIMIT ${tam} OFFSET ${act}`, function (err, result) {
              if (err) throw err;
                res.send(result)
            }); 
          }
        }
      
      }
      else{
        con.query(`SELECT * FROM device_configurations order by ${type1} ${type6} LIMIT ${tam} OFFSET ${act}`, function (err, result) {
          if (err) throw err;
            res.send(result)
        }); 
      }
    }
    else{
        con.query(`SELECT * FROM device_configurations WHERE uid LIKE '%${type0}%' OR alias LIKE '%${type0}%' OR origin LIKE '%${type0}%' OR description_origin LIKE '%${type0}%' OR application_id LIKE '%${type0}%' OR topic_name LIKE '%${type0}%' OR typemeter LIKE '%${type0}%' OR lat LIKE '%${type0}%' OR lon LIKE '%${type0}%' OR cota LIKE '%${type0}%' OR timezone LIKE '%${type0}%' OR enable LIKE '%${type0}%' OR organizationid LIKE '%${type0}%' LIMIT ${tam} OFFSET ${act};`, function (err, result) {
        if (err) throw err;
          res.send(result)
      }); 
    }
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
  const id02 = req.body.id;
  const enable3 = req.body.enable;

    con.query("UPDATE device_configurations SET enable = ? WHERE id = ?",[id02,enable3], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  app.post("/api/duplicate/device_configurations/:id/:uid", (req,res)=>{  /*/ DUPLICATE  /*/
    const id01 = parseInt(req.params.id);
    const uid = req.params.uid;
    con.query("INSERT INTO device_configurations (uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid) SELECT ?,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid FROM device_configurations WHERE id=?",[uid,id01], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  app.post("/api/post/device_configurations", (req,res)=>{  /*/ PUT  /*/
  let uid='';
  if(!req.body.uid){return res.status(400).json({ error: 'El campo uid es requerido.' });}else{uid = req.body.uid;}
  const alias = req.body.alias;
  const origin = req.body.origin;
  const description_origin = req.body.description_origin;
  const application_id = req.body.application_id;
  let topic_name='';
  if(!req.body.topic_name){return res.status(400).json({ error: 'El campo topic_name es requerido.' });}else{topic_name = req.body.topic_name;}
  const typemeter = req.body.typemeter;
  const lat = req.body.lat;
  const lon = req.body.lon;
  const cota = req.body.cota;
  const timezone = req.body.timezone;
  const enable = req.body.enable;
  const organizationid = req.body.organizationid;
  const createdAt = req.body.createdAt;
  const updatedAt = req.body.updatedAt;
  con.query("INSERT INTO device_configurations (uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid,createdAt,updatedAt], function (err, result) {
    if (err) throw err;
      res.send(result)
  });
});
  if (err) throw err;
  app.post("/api/update/device_configurations/", (req,res)=>{  /*/ UPDATE  /*/
  let uid='';
  if(!req.body.uid){return res.status(400).json({ error: 'El campo uid es requerido.' });}else{uid = req.body.uid;}
  const alias = req.body.alias;
  const origin = req.body.origin;
  const description_origin = req.body.description_origin;
  const application_id = req.body.application_id;
  let topic_name='';
  if(!req.body.topic_name){return res.status(400).json({ error: 'El campo topic_name es requerido.' });}else{topic_name = req.body.topic_name;}
  const typemeter = req.body.typemeter;
  const lat = req.body.lat;
  const lon = req.body.lon;
  const cota = req.body.cota;
  const timezone = req.body.timezone;
  const enable = req.body.enable;
  const organizationid = req.body.organizationid;
  const id7 = req.body.id;
  const updatedAt = req.body.updatedAt;
    con.query("UPDATE device_configurations SET uid=?,alias=?,origin=?,description_origin=?,application_id=?,topic_name=?,typemeter=?,lat=?,lon=?,cota=?,timezone=?,enable=?,organizationid=?, updatedAt=? WHERE id = ?",[uid,alias,origin,description_origin,application_id,topic_name,typemeter,lat,lon,cota,timezone,enable,organizationid,updatedAt,id7], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  if (err) throw err;
  app.post("/api/delete/device_configurations", (req,res)=>{  /*/ DELETE  /*/
    var id09 = req.body.id;
    //console.log(id09)
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
  app.get("/api/id_device/sensors_devices/:id/:type", (req,res)=>{  /*/ GET ID_DEVICES  /*/
  const id_device = parseInt(req.params.id);
  const type1 = parseInt(req.params.type);
  ////console.log(id_device);
  ////console.log(type1);

    con.query(`SELECT orden, enable, id_device, id_type_sensor, id, datafield, nodata, (SELECT type FROM sensors_types as t WHERE s.id_type_sensor = t.id) As type_name FROM sensors_devices as s WHERE id_device = '${id_device}' order by orden`, function (err, result) {
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
  let nodata = req.body.nodata;
  if(nodata==true){
    nodata= 1;
  }
  else{
    nodata= 0; 
  }
  console.log(nodata)

    con.query("INSERT INTO sensors_devices (orden, enable,id_device,id_type_sensor,datafield,nodata) VALUES (?,?,?,?,?,?)",[orden,enable,id_device,id_type_sensor,datafield,nodata], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });

  app.get("/api/duplicate/sensors_devices/:id1/:id2", (req,res)=>{  /*/ DUPLICATE  /*/
  const id1 = parseInt(req.params.id1);
  const id2 = parseInt(req.params.id2);

    con.query("INSERT INTO sensors_devices (orden, enable, id_device, id_type_sensor, datafield, nodata) SELECT orden, enable, ?, id_type_sensor, datafield, nodata FROM sensors_devices WHERE id_device = ?",[id2,id1], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });

  if (err) throw err;
  app.post("/api/delete_all/sensors_devices", (req,res)=>{  /*/ DELETE ALL /*/
  var id010 = req.body.id;
  con.query("DELETE FROM sensors_devices WHERE id_device= ?", id010, function (err, result) {
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
  app.get("/api/get/sensors_types/:type/:type1/:type2", (req,res)=>{  /*/ GET  /*/
  const type0 = req.params.type;
  const type1 = req.params.type1;
  const type2 = req.params.type2;

    if(type0=='Buscar'){
      con.query(`SELECT * FROM sensors_types order by ${type1} ${type2}`,function (err, result) {
        if (err) throw err;
          res.send(result)
      }); 
    }
    else{
        con.query(`SELECT * FROM sensors_types WHERE type LIKE '%${type0}%' OR metric LIKE '%${type0}%' OR description LIKE '%${type0}%' OR errorvalue LIKE '%${type0}%' OR valuemax LIKE '%${type0}%' OR valuemin LIKE '%${type0}%' order by ${type1} ${type2}`, function (err, result) {
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
  app.get("/api/max/sensors_types", (req,res)=>{ /*/ MAX  /*/
  con.query("SELECT id FROM sensors_types WHERE id=(SELECT max(id) FROM sensors_types)", function (err, result) {
    if (err) throw err;
      res.send(result) 
  });
});
  app.post("/api/duplicate/sensors_types/:id/:type", (req,res)=>{  /*/ DUPLICATE  /*/
  const id01 = parseInt(req.params.id);
  const type = req.params.type;

  con.query("INSERT INTO sensors_types (type,metric,description,errorvalue,valuemax,valuemin) SELECT ?,metric,description,errorvalue,valuemax,valuemin FROM sensors_types WHERE id=?;",[type,id01], function (err, result) {
    if (err) throw err;
      res.send(result)
  });
});
  if (err) throw err;
  app.post("/api/post/sensors_types", (req,res)=>{  /*/ PUT  /*/
  if(!req.body.type){return res.status(400).json({ error: 'El campo type es requerido.' });}else{type = req.body.type;}
  if(!req.body.metric){return res.status(400).json({ error: 'El campo metric es requerido.' });}else{metric = req.body.metric;}
    const description = req.body.description;
    const errorvalue = req.body.errorvalue;
    const valuemax = req.body.valuemax;
    const valuemin = req.body.valuemin;
    const orden = req.body.orden;
    con.query("INSERT INTO sensors_types (type,metric,description,errorvalue,valuemax,valuemin,orden) VALUES (?,?,?,?,?,?,?)",[type, metric, description,errorvalue,valuemax,valuemin,orden], function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  });
  if (err) throw err;
  //const id = req.params.id
  app.post("/api/update/sensors_types/", (req,res)=>{  /*/ UPDATE  /*/
    if(!req.body.type){return res.status(400).json({ error: 'El campo type es requerido.' });}else{type9 = req.body.type;}
    if(!req.body.metric){return res.status(400).json({ error: 'El campo metric es requerido.' });}else{metric = req.body.metric;}
    description = req.body.description;
    errorvalue = req.body.errorvalue;
    valuemax = req.body.valuemax;
    valuemin = req.body.valuemin;
    id99 = req.body.id;

    con.query("UPDATE sensors_types SET type=?,metric=?,description=?,errorvalue=?,valuemax=?,valuemin=? WHERE id= ?",[type9, metric, description,errorvalue,valuemax,valuemin,id99], function (err, result) {
      if (err) throw err;
        res.send(result)
        console.log(result)
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