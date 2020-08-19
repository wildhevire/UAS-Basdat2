const express = require('express'),
      passport = require('passport'),
      router =  express.Router();
const auth = require('./auth');

const matkulController = require('./matkulController');
const dosenController = require('./dosenController');
const mahasiswaController = require('./mahasiswaController');
const adminController = require('./adminController');


router.get("/",  (req, res) =>{
  if(req.session.userType == "admin"){
    res.render('home', {userType : "admin"});
  } else if(req.session.userType == "mahasiswa"){
    res.render('home', {userType : "mahasiswa"});
  } else if(req.session.userType == "dosen"){
    res.render('home', {userType : "dosen"});
  }else return res.redirect('/login');
});


router.get("/login", (req, res) =>{
  res.render('login');
});

router.get("/profile", auth.profile);

//Admin
router.post("/auth/login/admin", auth.loginAdmin);
router.get("/registerAdmin", (req, res) =>{
  res.render('adminRegister');
});
router.post("/auth/register", adminController.add);


//Matkul
router.get("/matkul", matkulController.selectAll);
router.post("/updateMatkul", matkulController.update);
router.post("/deleteMatkul", matkulController.delete);
router.post("/auth/addMatkul", matkulController.add);


//Dosen
router.post("/auth/login/dosen", auth.loginDosen);
router.get("/dosen", dosenController.selectAll);
router.post("/updateDosen", dosenController.update);
router.post("/deleteDosen", dosenController.delete);
router.post("/auth/addDosen", dosenController.add);


//Mahasiswa
router.post("/auth/login/mahasiswa", auth.loginMahasiswa);
router.get("/mahasiswa", mahasiswaController.selectAll);
router.post("/updateMahasiswa", mahasiswaController.update);
router.post("/deleteMahasiswa", mahasiswaController.delete);
router.post("/auth/addMahasiswa", mahasiswaController.add);


router.get("/addMahasiswa", (req, res) =>{
  if(req.session.userType == "admin"){
    return res.render('addMahasiswa', {userType : "admin"});
  }else {
    return res.redirect('/login');
  }
});

router.get("/addDosen", (req, res) =>{
  if(req.session.userType == "admin"){
    return res.render('addDosen', {userType : "admin"});
  }else {
    return res.redirect('/login');
  }
});

// router.get("/dosen", (req, res) =>{
//   if(req.session.userType == "admin"){
//     res.render('dosen', {userType : "admin"});
//   } else if(req.session.userType == "mahasiswa"){
//     res.redirect('/');
//   } else if(req.session.userType == "dosen"){
//     res.render('dosen', {userType : "dosen"});
//   }else return res.redirect('/matkul');
// });
// router.get("/mahasiswa", (req, res) =>{
//   res.render('Mahasiswa');
// });


router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/login');
  });
});
module.exports = router;