var express = require('express');
var router = express.Router();
var Criminal = require('../models/criminal');

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* GET one criminal */
router.get('/api/criminals/:id', function(req, res, next) {
  var id = req.params.id;

  Criminal.findById({_id: id}, function(err, criminal) {
    if (err) console.log('Could not find criminal b/c:' + err);

    res.json(criminal);
  });
});

/* GET list all criminals */
router.get('/api/criminals', function(req, res, next) {
  Criminal.find(function(err, criminals) {
    if (err) console.log('Could not find any criminal');

    res.json(criminals);
  });
});

/* POST create new criminal */
router.post('/api/criminals', function(req, res, next) {
  var name = req.body.name;
  var location = req.body.location;
  var status = req.body.status;

  var newCriminal = new Criminal({
      name: name,
      location: location,
      status: status
  });
  console.log(newCriminal);

  // Save the criminal
  newCriminal.save(function(err, criminal) {
      if (err) console.log(err);

      res.json(criminal);
  });
});

/* PUT update a criminal */
router.put('/api/criminals/:id/:name/:location/:status', function(req, res, next) {
  var id = req.params.id;
  var name = req.params.name;
  var location = req.params.location;
  var status = req.params.status;

  Criminal.findByIdAndUpdate(id, { name: name, location: location, status: status }, function(err, criminal) {
    if (err) console.log(err);

    res.json(criminal);
  });
});

/* DELETE remove a criminal */
router.delete('/api/criminals/:id', function(req, res, next) {
  var id = req.params.id;

  Criminal.findByIdAndRemove(id, function(err) {
    if (err) console.log('Could not delete criminal b/c:' + err);

    res.json({});
  });
});

module.exports = router;
