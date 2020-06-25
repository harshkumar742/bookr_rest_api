const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
const birds = require('./router');
app.use(express.static('/router'), birds);
db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        //process.exit(1);
    }
	else{
		console.log('connected to MongoDB');
	}
 });	
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));