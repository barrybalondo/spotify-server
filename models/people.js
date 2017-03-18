var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var peopleSchema = new Schema({
    name: String,
    favoriteCity: String },
    { timestamps: true
})

var Peoples = mongoose.model('Peoples', peopleSchema);

module.exports = Peoples;