var express = require('express')
    , app = express();
var path = require('path')
    , mongoose = require('mongoose')
    , session = require('express-session')
    , flash = require('connect-flash')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override');

// 데이터베이스
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once("open", function() {
    console.log("데이터베이스 연결성공");
});
db.on("error", function(err) {
    console.log("데이터베이스 에러 : ", err);
});

// 뷰 엔진
app.set("view engine", 'ejs');

// 미들웨어 등록
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:'MySecret'}));

// 패스포트
var passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', require('./routes/home'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

// 서버 시작
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('서버 시작');
});