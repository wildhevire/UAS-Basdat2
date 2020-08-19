const express = require('express'),
      db = require('../services/database');
      router =  express.Router();
     
addPerkuliahan = (req, res) => {
  let {kode_matkul, nip} = req.body;
  console.log(req.body);
  db.query('INSERT INTO perkuliahan SET ?', {kode_matkul : kode_matkul, nip : nip}, (err, result) => {
    if(err) console.log(err);
    else {
      return res.redirect('/perkuliahan');
    }
  });
}

masukPerkuliahan = (req, res) => {
  let {perkuliahan_id, nim} = req.body;
  console.log(req.body);
  db.query('INSERT INTO nilai SET ?', {perkuliahan_id : perkuliahan_id, nim : nim}, (err, result) => {
    if(err) console.log(err);
    else {
      return res.redirect('/perkuliahan');
    }
  });
}

let selectAll = (req, res) =>{
  if(!req.session.userType){
    return res.redirect('/');
  }
  db.query('SELECT * FROM matkul', async (err, resultMatkul) =>{
    db.query('SELECT * FROM perkuliahan', async (err1, resultPerkuliahan) => {
      
      
        let userType = req.session.userType;
        let userId = req.session.userId;
        return res.render('perkuliahan', {resultMatkul : resultMatkul, resultPerkuliahan : resultPerkuliahan, userId : userId, userType : userType});
    
      
    });
  });
}
let update = (req, res) => {
  let {kode_matkul, nama_matkul} = req.body;
  db.query(`UPDATE matkul SET nama_matkul='${nama_matkul}' WHERE kode_matkul='${kode_matkul}'` ,(err, results) => {
    if(err) console.log(err);
    else {
      return res.redirect("/matkul");
    }
  });
};

let remove = (req, res) => {
  let {kode_matkul, nama_matkul} = req.body;
  db.query(`DELETE FROM matkul WHERE kode_matkul='${kode_matkul}'` ,(err, results) => {
    if(err) console.log(err);
    else {
      return res.redirect("/matkul");
    }
  });
};

module.exports = {
  delete : remove,
  selectAll : selectAll,
  add : addPerkuliahan,
  update : update,
  masuk : masukPerkuliahan
};
