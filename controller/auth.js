const express = require('express'),
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs'),
      db = require('../services/database');
      router =  express.Router();
  
const validationResult = require("express-validator");
const loginService = require("./adminController");
      

registerAdmin = (req, res) => {
  let {username, password} = req.body;

  db.query('SELECT username FROM admin WHERE ?', {username : username}, async (err, results) =>{
    if(err) console.log(err);

    console.log(password);
    console.log(results.length);
    if(results.length > 0){
      return res.render('adminRegister', {
        message : 'Username Sudah Terpakai'
      });
    }
    //let hashedPassword = await bcrypt.hash(password, bcrypt.genSalt(8));

    db.query('INSERT INTO admin SET ?', {username : username, password : password}, (err, result) => {
      if(err) console.log(err);
      else {
        return res.render('adminRegister', {isSucces : 'Register Sukses'})
      }
    });
  });
}

loginAdmin = async (req, res) => {
    
    let username = req.body.username;
    let password = req.body.password_admin;
    db.query('SELECT * FROM admin WHERE ?', {username : username}, async (err, results) =>{
      console.log(results);  
      if(results[0].password === password){
        req.session.id = results[0].id;
        req.session.userType = "admin";
        return res.redirect('/');
      } else {
        return res.redirect("/login");
      }

      //console.log("from DB"+ results[0].password);
      //console.log("Hashed : "+ await bcrypt.hash(password, 8));
      //console.log(results);
      // if(await bcrypt.compare(password, results[0].password)){
      //   return res.render('login', {
      //     message : 'Password atau Username tidak ada'
      //   });
      // } else {
      //   console.log("Bisa Login");
      // }
    });
}

addDosen = (req, res) => {
  let {nip, nama, password, email, tanggal_lahir, alamat} = req.body;
  console.log(req.body);
  db.query('SELECT nip FROM dosen WHERE ?', {nip : nip}, async (err, results) =>{
    if(err) console.log(err);

    
    console.log(results.length);
    if(results.length > 0){
      return res.render('addDosen', {
        message : 'Dosen dengan NIP :' + nip + 'sudah tersedia!'
      });
    }
    let hashedPassword = await bcrypt.hash(password, 8);
    db.query('INSERT INTO dosen SET ?', {nip : nip, nama : nama, password : hashedPassword, email:email, tanggal_lahir:tanggal_lahir, alamat:alamat}, (err, result) => {
      if(err) console.log(err);
      else {
        return res.render('addDosen', {isSucces : 'Tambah Dosen Sukses'})
      }
    });
  });
}

module.exports = {
  loginAdmin : loginAdmin,
  registerAdmin : registerAdmin,
  addDosen : addDosen
};

