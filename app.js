var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  Museum = require('./models/museum'),
  Comment = require('./models/comment'),
  User = require('./models/user');

// requiring routes
var commentRoutes = require('./routes/comments'),
  museumRoutes = require('./routes/museums'),
  indexRoutes = require('./routes/index');

var keys = require('./config/keys');

console.log(keys.mongoURI);
mongoose.connect(keys.mongoURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: keys.passportSecret,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// call this username function on every route
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(indexRoutes);
app.use('/museums', museumRoutes);
app.use('/museums/:id/comments', commentRoutes);

// for deploying on Heroku, we need process.env.PORT
const port = process.env.PORT || 3000;

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
}

app.listen(port, function() {
  console.log('Museum Search Server Has Started');
});
