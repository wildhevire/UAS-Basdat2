const express = require('express'),
      db = require('../services/database');
      router =  express.Router();
     
addMatkul = (req, res) => {
  let {kode_matkul, nama_matkul} = req.body;
  let admin_id = req.session.userId;
  db.query('SELECT kode_matkul FROM matkul WHERE ?', {kode_matkul : kode_matkul}, async (err, results) =>{
    if(err) console.log(err);

    if(results.length > 0){
      return res.render('addMatkul', {
        message : 'Kode Mata Kuliah sudah dipakai!'
      });
    }
    
  

    db.query('INSERT INTO matkul SET ?', {kode_matkul : kode_matkul, nama_matkul : nama_matkul, admin_id : admin_id}, (err, result) => {
      if(err) console.log(err);
      else {
        return res.redirect('/matkul');
      }
    });
  });
}

let selectAll = (req, res) =>{
  if(!req.session.userType){
    return res.redirect('/');
  }
  db.query('SELECT * FROM matkul', async (err, results) =>{
    if(results.length > 0){
      let userType = req.session.userType;
      return res.render('Matkul', {results : results, userType : userType});
    } else {
      return res.redirect("/login");
    }
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
  add : addMatkul,
  update : update,
};
