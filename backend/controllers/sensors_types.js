const sensors_types = require('../controllers/sensors_types');
const { mysqlConnection } = require('../middleware/mysql');

const get = (dias) =>{
    (req,res)=>{  /*/ GET  /*/
    con.query("SELECT * FROM sensors_types", function (err, result) {
      if (err) throw err;
        res.send(result)
    });
  }
}

const id = (dias) =>{
    (req,res)=>{  /*/ ID  /*/
    const id05 = parseInt(req.params.id);
      con.query("SELECT * FROM sensors_types WHERE id = ?", id05, function (err, result) {
        if (err) throw err;
          res.send(result)
      });
    }
}

module.exports = { get, id }
