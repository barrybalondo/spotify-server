var Peoples = require('../models/people');

module.exports = function(router, app) {

  router.route('/people')
    // Get
    .get(function(req, res) {
      Peoples.find({}).
      sort({ createdAt: -1 }).
      exec(function(err, peoples){
        if(err)
          throw err;
        res.json(peoples);
      });     
    })

    // Post
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

  app.use('/api', router);
}