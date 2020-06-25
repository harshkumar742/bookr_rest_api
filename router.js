const express = require('express');
const api= require('./restapifunc');
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/', api.test);

router.post('/createbook', api.createbook);//using POST
router.get('/readbook/:bookId',   api.readbook);//using GET
router.post('/updatebook/:bookId', api.updatebook);//using POST or PUT
router.get('/deletebook/:bookId', api.deletebook);//using GET


module.exports = router