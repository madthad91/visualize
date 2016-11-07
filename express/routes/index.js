var express = require('express');
var router = express.Router();

var request = require('request');

var http = require("http");
var url = require("url");
var db = require("../db");

/* GET. 
 * http://localhost:3000/?url=<urlhere>
 * http://localhost:3000/?url=https://jsonplaceholder.typicode.com/users 
 */
router.get('/', function(req, res, next) {
  var urlParam = req.query.url;
  request.get(urlParam, function(err, body, resp) {
	  return res.json({data: resp});
  });
});

var jsonParse = function(body){
	return JSON.parse(JSON.stringify(body));
}

router.get('/sample',function(req,res,next){
  res.send('hai')
})

router.get('/:hash', function(req,res){
	var pathToFile = "./../shared/" + req.params.hash + ".json"
	// fs.readFile(pathToFile, 'utf8', function(error,content) {
	// 	if (error){
	// 		return res.status(400).json({error: error});
	// 	} 
	// 	return res.json({data: jsonParse(content)});
	// });
	var collections = db.get().collection('hashes');
	collections.find({ hash: req.params.hash }).toArray(function(err, data){
		return res.json({'data': data});
	});

});

router.post('/save-link', function(req,res,next) {
	var ps = JSON.stringify(req.body['data']);
	console.log(ps);
	ps= JSON.parse(ps);
	console.log(ps);
	var type = ps["type"];
	var data = ps["data"];
	var hash = ps["hash"];
	console.log(type);
	saveData = {
		options: type,
		data: data
	};
	console.log(saveData);
	var error = null;
	console.log(hash);
	if (hash){
		var collection = db.get().collection('hashes');
		collection.insert({hash: hash, data: saveData}, function(err, data){
			console.log(data);
			if (err){
				return res.status(400).json({error: err});
			}
		});
	} 
	return res.json({hash: hash});

});

module.exports = router;
