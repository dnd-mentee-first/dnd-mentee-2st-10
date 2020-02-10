var express = require('express')
    , router = express.Router()
    , mongoose = require('mongoose')
    , passport = require('../config/passport.js');

router.get('/', function(req, res) {
    res.redirect('/posts');
});

router.get('/login', function(req, res) {
    res.render('login/login', {email:req.flash("email")[0], loginError:req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/posts',
    failureRedirect : '/login',
    failureFlash : true
}));

router.get('/logout', function(req, res) {
    req.logout();
    req.flash("postsMessage", "안녕히가세요");
    res.redirect('/');
});

module.exports = router;