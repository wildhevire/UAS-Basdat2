const express = require('express'),
      moment = require('moment');
      db = require('../services/database');
      router =  express.Router();

addMahasiswa = (req, res) => {
  let {nim, nama, password, email, tanggal_lahir, alamat} = req.body;
  let admin_id = req.session.userId;
  console.log(admin_id);
  db.query('SELECT nim FROM mahasiswa WHERE ?', {nim : nim}, async (err, results) =>{
    if(err) console.log(err);

    
    console.log(results.length);
    if(results.length > 0){
      return res.render('addMahasiswa', {
        message : 'Mahasiswa dengan NIM :' + nim + 'sudah tersedia!'
      });
    }
    let hashedPassword = await bcrypt.hash(password, 8);
    db.query('INSERT INTO mahasiswa SET ?', {nim : nim, nama : nama, password : password, email:email, tanggal_lahir:tanggal_lahir, alamat:alamat, admin_id:admin_id}, (err, result) => {
      if(err) console.log(err);
      else {
        return res.render('addMahasiswa', {isSucces : 'Tambah Dosen Sukses'})
      }
    });
  });
}

let selectAll = (req, res) =>{
  if(req.session.userType != "admin"){
    return res.redirect('/');
  }
  db.query('SELECT * FROM mahasiswa', async (err, results) =>{
    if(results.length > 0){
      let userType = req.session.userType;
      let result = results;
      result.forEach((item) => {
        item.tanggal_lahir = moment(item.tanggal_lahir).format('YYYY-MM-DD');
        item.tanggal_lahirFormatted = moment(item.tanggal_lahir).format('DD MMMM YYYY')
      });
      return res.render('mahasiswa', {results : result, userType : userType});
    } else {
      return res.redirect("/");
    }
  });
}

let update = (req, res) => {
  let {nim, nama, password, email, tempat_lahir, tanggal_lahir, alamat} = req.body;
  
  db.query("UPDATE mahasiswa SET ? WHERE nim='"+ nim +"'", {nama : nama, password : password, email : email, tanggal_lahir : tanggal_lahir, tempat_lahir : tempat_lahir, alamat : alamat } ,(err, results) => {
    if(err) console.log(err);
    else {
      return res.redirect("/");
    }
  });
};

let remove = (req, res) => {
  let nim = req.body.nip;
  
  db.query(`DELETE FROM mahasiswa WHERE nim='${nim}'` ,(err, results) => {
    if(err) console.log(err);
    else {
      return res.redirect("/");
    }
  });
};
module.exports = {
  add : addMahasiswa,
  delete : remove,
  selectAll : selectAll,
  update : update,
};
