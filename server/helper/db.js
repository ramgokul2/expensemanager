var mongoose = require('mongoose');

mongoose.connection.on('error', console.error);

// mongoose.conection.once('open', function() {
//   console.log("DB connection Established..");
// });

exports.connect = function(dburl, callback) {
	mongoose.connect(dburl);
};
