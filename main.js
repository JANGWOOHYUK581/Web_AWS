// 미들웨어
const express = require('express');
const ejs = require('ejs');
const app = express();
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const path = require('path');
const methodOverride = require('method-override');
const expressSession = require("express-session");
const expressValidator = require("express-validator");
const flash = require('connect-flash');


dotenv.config({ path: 'config.env' });
const { PORT, MONGO_URI } = process.env;

app.set('layout', './layouts/layout')
app.set("layout extractScripts", true)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejs.renderFile);

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use(expressSession({
    secret: "super-secret-key",
    key: "super-secret-cookie",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}), );
app.use(flash());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
var db = mongoose.connection;
db.on('error', () => {
    console.log('Connection Failed');
});
db.once('open', () => {
    console.log('Connected!');
});


app.get('/images', function(req, res) {
    fs.readFile('Taiwan.jpg', function(error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

// router
app.use('/boards', require('./routes/boardRouter'));
app.use('/utils', require('./routes/utilRouter'));
app.use('/main', require('./routes/mainRouter'));
app.use('/MyPage', require('./routes/myRouter'));
app.use('/tour', require('./routes/tourRouter'));

var server = app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
});