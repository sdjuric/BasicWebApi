const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/node_rest_api';
mongoose.connect(mongoDB);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
module.exports = mongoose;
