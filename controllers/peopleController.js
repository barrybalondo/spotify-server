var Peoples = require('../models/people');

module.exports = function(router, app) {

  router.route('/people')
    // Get route -> get all people list
    .get(function(req, res) {
      Peoples.find({}).
      sort({ createdAt: -1 }).
      exec(function(err, peoples){
        if(err)
          throw err;
        res.json(peoples);
      });     
    })
    // Post route -> create new people object
    .post(function(req, res){
      var newPeople = Peoples({
        name: req.body.name,
        favoriteCity: req.body.favoriteCity,
      });
      newPeople.save(function(err){
        if(err)
          throw err;
        res.json({ message: 'Successfully Added!' });    
      });
    })
    // Get :id route -> Get specifc people object by :id
    router.route('/people/:people_id')
      .get(function(req, res) {
          Peoples.findById(req.params.people_id, function(err, people) {
              if (err)
                  res.send(err);
              res.json(people);
          });
      })
      // Update route -> find by people object by :id and update
      .put(function(req, res) {
        Peoples.findById(req.params.people_id, function(err, people) {
            if (err)
                res.send(err);
            // info updated here
            people.name = req.body.name; 
            people.favoriteCity = req.body.favoriteCity;
            // save
            people.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully Updated!' });
            });
        });
      })
      // Delete route -> delete specific people object by :id
      .delete(function(req, res) {
        Peoples.remove({
            _id: req.params.people_id
        }, function(err, people) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully Deleted!' });
        });
    });

  app.use('/api', router);
}