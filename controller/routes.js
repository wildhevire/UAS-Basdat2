const express = require('express'),
      passport = require('passport'),
      router =  express.Router();
const auth = require('./auth');


router.get("/",  (req, res) =>{
  if(req.session.userType == "admin"){
    res.render('home', {userType : "admin"});
  } else if(req.session.userType == "mahasiswa"){
    res.render('home', {userType : "mahasiswa"});
  } else if(req.session.userType == "dosen"){
    res.render('home', {userType : "dosen"});
  }else {
    res.redirect('/login');
  }
});
router.get("/addMahasiswa", (req, res) =>{
  res.render('addMahasiswa');
});

router.get("/addDosen", (req, res) =>{
  res.render('addDosen');
});
router.post("/auth/addDosen", auth.addDosen);


router.get("/login", (req, res) =>{
  res.render('login');
});
router.post("/auth/login/admin", auth.loginAdmin);

router.post("/auth/login/mahasiswa", (req, res) =>{
  res.send("Login Mahasiswa");
});
router.post("/auth/login/dosen", (req, res) =>{
  res.send("Login Dosen");
});


router.get("/registerAdmin", (req, res) =>{
  res.render('adminRegister');
});
router.post("/auth/register", auth.registerAdmin);


router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
});
module.exports = router;