var express = require('express');
var router = express.Router();
var stripe = require('stripe')('sk_test_5xFFFciuPWBbrgX0A4DOnUzF00bocnHDuz')
const path = require('path');
const ABSPATH = path.dirname(require.main.filename);

var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.customRender(path.join(__dirname, '/admin'),'index',function (err,html) {
        if (err)
            res.send(404);
        else
            res.send(200,html);
    });
  // res.render('index', { title: 'Express' });
});








module.exports = router;
