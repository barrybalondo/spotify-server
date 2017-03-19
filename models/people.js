var mongoose = require('mongoose');

// Forced _id to auto-increment by 1 to mimic the example
// given in the requirements.
var autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = require('bluebird');
var connection = mongoose.createConnection(process.env.DB);
autoIncrement.initialize(connection);

var Schema = mongoose.Schema;
var peopleSchema = new Schema({
    name: String,
    favoriteCity: String },
    { timestamps: true
})

peopleSchema.plugin(autoIncrement.plugin, 'Peoples');
var Peoples = mongoose.model('Peoples', peopleSchema);

module.exports = Peoples;