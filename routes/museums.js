var express = require('express');
var router = express.Router();
var Museum = require('../models/museum');
var middleware = require('../middleware');
var NodeGeocoder = require('node-geocoder');
var keys = require('../config/keys');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

//INDEX - show all museums
router.get('/', function(req, res) {
  // Fuzzy search using regular expression function
  var noMatch = null;
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');

    Museum.find({ name: regex }, function(err, allMuseums) {
      if (err) {
        console.log(err);
      } else {
        if (allMuseums.length < 1) {
          noMatch = 'No museums match that search, please try again.';
        }
        res.render('museums/index', {
          museums: allMuseums,
          noMatch: noMatch,
          page: 'museums'
        });
      }
    });
  } else {
    //Get all museums from DB
    Museum.find({}, function(err, allMuseums) {
      if (err) {
        console.log(err);
      } else {
        res.render('museums/index', {
          museums: allMuseums,
          noMatch: noMatch,
          page: 'museums'
        });
      }
    });
  }
});

//CREATE - add new museum to DB
router.post('/', middleware.isLoggedIn, function(req, res) {
  //get data from form and add to museums array
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };

  geocoder.geocode(req.body.location, function(err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newMuseum = {
      name: name,
      price: price,
      image: image,
      description: desc,
      author: author,
      location: location,
      lat: lat,
      lng: lng
    };

    //Create a new museum and save to DB
    Museum.create(newMuseum, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        //redirect defaults to GET request for museums page
        console.log(newlyCreated);
        console.log(req.body.location);
        res.redirect('/museums');
      }
    });
  });
});

//NEW - show form to create new museum
router.get('/new', middleware.isLoggedIn, function(req, res) {
  res.render('museums/new');
});

//SHOW - shows more info about one museum
router.get('/:id', function(req, res) {
  //find the museum with provided ID
  Museum.findById(req.params.id)
    .populate('comments')
    .exec(function(err, foundMuseum) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundMuseum);
        //render show template with that museum
        res.render('museums/show', { museum: foundMuseum });
      }
    });
});

//EDIT MUSEUM ROUTE
router.get('/:id/edit', middleware.checkMuseumOwnership, function(req, res) {
  Museum.findById(req.params.id, function(err, foundMuseum) {
    if (err) {
      res.redirect('back');
    } else {
      res.render('museums/edit', { museum: foundMuseum });
    }
  });
});

//UPDATE MUSEUM ROUTE

router.put('/', middleware.isLoggedIn, function(req, res) {
  geocoder.geocode(req.body.location, function(err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newData = {
      name: name,
      price: price,
      image: image,
      description: desc,
      author: author,
      location: location,
      lat: lat,
      lng: lng
    };

    //find and update the correct museum
    // Museum.findByIdAndUpdate(req.params.id, req.body.museum, function(err, updatedMuseum){

    Museum.findByIdAndUpdate(req.params.id, newData, function(
      err,
      updatedMuseum
    ) {
      if (err) {
        req.flash('error', err.message);
        res.redirect('back');
      } else {
        req.flash('success', 'Successfully updated museum!');
        res.redirect('/museums/' + req.params.id);
      }
    });
  });
});

// DESTROY MUSEUM ROUTE
router.delete('/:id', middleware.checkMuseumOwnership, function(req, res) {
  Museum.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/museums');
    } else {
      res.redirect('/museums');
    }
  });
});

// Fuzzy search function
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = router;
