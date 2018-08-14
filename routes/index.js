var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var keys = require('../config/keys');

router.get('/', function(req, res) {
  res.render('landing');
});

// show register form
router.get('/register', function(req, res) {
  res.render('register', { page: 'register' });
});

// handle sign up logic
router.post('/register', function(req, res) {
  var newUser = new User({ username: req.body.username });
  // User.register from passport-local-mongoose
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register', { error: err.message });
      // req.flash("error", err.message);
      // return res.redirect("back");
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Welcome to Museum Search ' + user.username);
      res.redirect('/museums');
    });
  });
});
//show admin register form

router.get('/admin', function(req, res) {
  res.render('admin', { page: 'admin' });
});

//handle admin sign up logic

router.post('/admin', function(req, res) {
  var newUser = new User({ username: req.body.username });

  // from config/keys
  if (req.body.adminCode === keys.secretOrKey) {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register', { error: err.message });
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Welcome to Museum Search ' + user.username);
      res.redirect('/museums');
    });
  });
});

// show login form
router.get('/login', function(req, res) {
  res.render('login', { page: 'login' });
});

// handling login logic: app.post("/login", middleware, callback)
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/museums',
    failureRedirect: '/login'
  }),
  function(req, res) {}
);

// logout route
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Logged you out!');
  res.redirect('/museums');
});

module.exports = router;
