const express = require('express'),
      moment = require('moment');
      db = require('../services/database');
      router =  express.Router();


addDosen = (req, res) => {
  let {nip, nama, password, email, tanggal_lahir, tempat_lahir, alamat} = req.body;
  let admin_id = req.session.userId;
  
  db.query('SELECT nip FROM dosen WHERE ?', {nip : nip}, async (err, results) =>{
    if(err) console.log(err);

    
    if(results.length > 0){
      
      return res.render('addDosen', {
        message : 'Dosen dengan NIP :' + nip + 'sudah tersedia!'
      });
    }
    let hashedPassword = await bcrypt.hash(password, 8);
    db.query('INSERT INTO dosen SET ?', {nip : nip, nama : nama, password : password, email:email, tempat_lahir :tempat_lahir,tanggal_lahir:tanggal_lahir, alamat:alamat, admin_id:admin_id}, (err, result) => {
      if(err) console.log(err);
      else {
        return res.redirect("/dosen");
      }
    });
  });
}
let selectAll = (req, res) =>{
  if(req.session.userType != "admin"){
    return res.redirect('/');
  }
  db.query('SELECT * FROM dosen', async (err, results) =>{
    if(results.length > 0){
      let userType = req.session.userType;
      let result = results;
      result.forEach((item) => {
        item.tanggal_lahir = moment(item.tanggal_lahir).format('YYYY-MM-DD');
        item.tanggal_lahirFormatted = moment(item.tanggal_lahir).format('DD MMMM YYYY')
      });
      return res.render('dosen', {results : result, userType : userType});
    } else {
      return res.redirect("/");
    }
  });
}

let update = (req, res) => {
  let {nip, nama, password, email, tempat_lahir, tanggal_lahir, alamat} = req.body;
  
  db.query("UPDATE dosen SET ? WHERE nip='"+ nip +"'", {nama : nama, password : password, email : email, tanggal_lahir : tanggal_lahir, tempat_lahir : tempat_lahir, alamat : alamat } ,(err, results) => {
    if(err) console.log(err);
    else {
      return res.redirect("/dosen");
    }
  });
};

let remove = (req, res) => {
  let nip = req.body.nip;
  
  db.query(`DELETE FROM dosen WHERE nip='${nip}'` ,(err, results) => {
    if(err) console.log(err);
    else {
      return res.redirect("/dosen");
    }
  });
};

module.exports = {
  add : addDosen,
  delete : remove,
  selectAll : selectAll,
  update : update,
};
