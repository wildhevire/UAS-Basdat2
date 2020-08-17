const express = require('express'),
    app = express(),
    passport = require('passport'),
    flash = require('express-flash'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    path = require('path').join(__dirname, './assets'),
    bodyParser = require('body-parser');
const env = require('dotenv');
    env.config({path:'./.env'});
    db = require('./services/database');


db.connect(function(err) {
    if (err) console.log(err) ;
    console.log("MySQL Connected!");
});



app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

    
app.use(express.static(path));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(flash());


app.use('/', require('./controller/routes'));


app.set('view engine', 'ejs');


app.listen(process.env.PORT, () => {
    console.log("Listening to port "+ process.env.PORT);
});