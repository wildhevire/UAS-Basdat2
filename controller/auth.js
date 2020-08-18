const express = require('express'),
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs'),
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






module.exports = {
  isLoggedIn : isLoggedIn,
  loginAdmin : loginAdmin,

};

