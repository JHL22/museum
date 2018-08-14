var Museum = require('../models/museum');
var Comment = require('../models/comment');

// all the middleware goes here

var middlewareObj = {};

middlewareObj.checkMuseumOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Museum.findById(req.params.id, function(err, foundMuseum) {
      if (err) {
        req.flash('error', 'Museum not found');
        res.redirect('back');
      } else {
        // does user own the museum?
        // must use built in Mongoose equality method because foundMuseum.author.id is a mongoose object and req.user._id is a string
        if (foundMuseum.author.id.equals(req.user._id) || req.user.isAdmin) {
          next();
        } else {
          req.flash('error', "You don't have permission to do that");
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect('back');
      } else {
        // does user own the comment?
        // must use built in Mongoose equality method because foundComment.author.id is a mongoose object and req.user._id is a string
        if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
          next();
        } else {
          req.flash('error', "You don't have permission to do that");
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be logged in to do that');
  res.redirect('/login');
};

module.exports = middlewareObj;
