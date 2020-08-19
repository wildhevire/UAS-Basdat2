const express = require('express'),
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs'),
      moment = require('moment'),
      db = require('../services/database');
      router =  express.Router();
     
const dosenController = require('./dosenController');



//Set session value, req = request param, id = user identifier (admin id, mahasiswa nim, dosen nip)
setSession = (req, id, usertype) => {
  req.session.userId = id;
  req.session.userType = usertype;
}

isLoggedIn = (req, res, next) => {
  if (!req.session.userType) {
    return res.redirect('/login')
  }
  next()
}
loginAdmin = async (req, res) => {
    
    let username = req.body.username;
    let password = req.body.password_admin;
    db.query('SELECT * FROM admin WHERE ?', {username : username}, async (err, results) =>{
      if(results[0].password === password){
        setSession(req, results[0].id, "admin");
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

loginMahasiswa = async (req, res) => {
    
  let nim = req.body.nim;
  let password = req.body.password_mahasiswa;
  db.query('SELECT * FROM mahasiswa WHERE ?', {nim : nim}, async (err, results) =>{
    if(results[0].password === password){
      setSession(req, nim, "mahasiswa");
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

loginDosen = async (req, res) => {
    
  let nip = req.body.nip;
  let password = req.body.password_dosen;
  db.query('SELECT * FROM dosen WHERE ?', {nip : nip}, async (err, results) =>{
    if(results[0].password === password){
      setSession(req, nip, "dosen");
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

let profile = async (req, res) => {

  let id = req.session.userId;
  let mahasiswaQuery = "SELECT * FROM mahasiswa WHERE ?"; 
  let dosenQuery = "SELECT * FROM dosen WHERE ?"; 
  let userType =req.session.userType ;
  if(userType == "mahasiswa"){
    db.query(mahasiswaQuery, {nim : id}, async (err, results) =>{
      if(err) console.log(err);
      if(results.length > 0){
  
        results[0].tanggal_lahir = moment(results[0].tanggal_lahir).format('YYYY-MM-DD');
        results[0].tanggal_lahirFormatted = moment(results[0].tanggal_lahir).format('DD MMMM YYYY')
         return res.render('profile', {results : results[0], userType : userType});
        
      } else {
        return res.redirect("/");
      }
    });   
  } else if(req.session.userType == 'dosen'){
    db.query(dosenQuery, {nip : id}, async (err, results) =>{
      if(err) console.log(err);
      if(results.length > 0){
  
        results[0].tanggal_lahir = moment(results[0].tanggal_lahir).format('YYYY-MM-DD');
        results[0].tanggal_lahirFormatted = moment(results[0].tanggal_lahir).format('DD MMMM YYYY')
         return res.render('profile', {results : results[0], userType : userType});
        
      } else {
        return res.redirect("/");
      }
    });   
  }
}


module.exports = {
  isLoggedIn : isLoggedIn,
  loginAdmin : loginAdmin,
  loginMahasiswa : loginMahasiswa,
  loginDosen : loginDosen,
  profile : profile
};

