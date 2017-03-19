var Peoples = require('../models/people');

module.exports = function(router, app) {

  router.route('/people')
    // Get function, get all people list
    .get(function(req, res) {
      Peoples.find({}).
      sort({ createdAt: -1 }).
      exec(function(err, peoples){
        if(err)
          throw err;
        res.json(peoples);
      });     
    })
    // Post function, create people
    .post(function(req, res){
      var newPeople = Peoples({
        name: req.body.name,
        favoriteCity: req.body.favoriteCity,
      });
      newPeople.save(function(err){
        if(err)
          throw err;
        res.send('Success');    
      });
    })
    // Get specifc info for people by :id
    router.route('/people/:people_id')
      .get(function(req, res) {
          Peoples.findById(req.params.people_id, function(err, people) {
              if (err)
                  res.send(err);
              res.json(people);
          });
      })
      .put(function(req, res) {
        // find by people by :id and update
        Peoples.findById(req.params.people_id, function(err, people) {
            if (err)
                res.send(err);
            people.name = req.body.name;  // update the info
            people.favoriteCity = req.body.favoriteCity;
            // save
            people.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'People updated!' });
            });

        });
      })
      // Delete specific people by :id
      .delete(function(req, res) {
        Peoples.remove({
            _id: req.params.people_id
        }, function(err, people) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

  app.use('/api', router);
}