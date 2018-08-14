var express = require('express');
// merge params for museums and comments so that req.params.id in comments can find /museums/id
var router = express.Router({ mergeParams: true });
var Museum = require('../models/museum');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// Comments New
router.get('/new', middleware.isLoggedIn, function(req, res) {
  // find museum by id
  console.log(req.params.id);
  Museum.findById(req.params.id, function(err, museum) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { museum: museum });
    }
  });
});

// Comments Create
router.post('/', middleware.isLoggedIn, function(req, res) {
  //lookup museum using ID
  Museum.findById(req.params.id, function(err, museum) {
    if (err) {
      console.log(err);
      res.redirect('/museums');
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          req.flash('error', 'Something went wrong');
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          museum.comments.push(comment);
          museum.save();
          req.flash('success', 'Successfully added comment');
          res.redirect('/museums/' + museum._id);
        }
      });
    }
  });
});

// COMMENT EDIT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(
  req,
  res
) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', {
        museum_id: req.params.id,
        comment: foundComment
      });
    }
  });
});

// COMMENT UPDATE
// /museums/:id/comments/:comment_id
router.put('/:comment_id', middleware.checkCommentOwnership, function(
  req,
  res
) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect('/museums/' + req.params.id);
    }
  });
});

// COMMENT DESTROY ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership, function(
  req,
  res
) {
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect('back');
    } else {
      req.flash('success', 'Comment deleted');
      res.redirect('/museums/' + req.params.id);
    }
  });
});

module.exports = router;
