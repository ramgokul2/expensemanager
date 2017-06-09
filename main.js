const express = require('express'),
	  bodyParser = require('body-parser'),
	  ejs = require('ejs'),
	  favicon = require('express-favicon'),
	  config = require('./config')
	  path = require('path');

let app = express();

const db = require('./server/helper/db');
if(process.env.NODE_ENV === "test") {
	dbUrl = config.testDb;
	app.set('port', 8000);
} else {
	dbUrl = config.db;
	app.set('port', 9000);
}	


db.connect(dbUrl);
process.env.TZ = 'Asia/Kolkata';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, './public/')));
app.use(favicon());

app.use('/', require('./server/routes/index'));
app.use('/api/', require('./server/routes/expense'));


app.listen(app.get('port'), () => {
	console.log('Server started and listening @ ' + app.get('port'));
});

module.exports = app;