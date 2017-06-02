const express = require('express'),
	  bodyParser = require('body-parser'),
	  ejs = require('ejs'),
	  path = require('path');

let app = express();

const db = require('./server/helper/db'),
	  dbUrl = 'mongodb://localhost/expensemanager';

db.connect(dbUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, './public/')));

app.use('/', require('./server/routes/index'));
app.use('/api/', require('./server/routes/expense'));
app.set('port', 9000);

app.listen(app.get('port'), () => {
	console.log('Server started and listening @ ' + app.get('port'));
});