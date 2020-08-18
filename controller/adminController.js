const express = require('express'),
      moment = require('moment');
      db = require('../services/database');
      router =  express.Router();

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
        
        let hashedPassword = await bcrypt.hash(password, bcrypt.genSalt(8));

        db.query('INSERT INTO admin SET ?', {username : username, password : password}, (err, result) => {
        if(err) console.log(err);
        else {
            return res.render('adminRegister', {isSucces : 'Register Sukses'})
        }
        });
    });
}

module.exports = {
add : registerAdmin,

};
