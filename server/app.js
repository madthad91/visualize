const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());



/* Config cors */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


let jsonParse = (body)=> {
	return JSON.parse(JSON.stringify(body));
}

app.get('/', (req,res)=> {
	return res.json({'Ward': 'data'});
});

app.get('/:hash', (req,res)=> {
	const pathToFile = "./../shared/" + req.params.hash + ".json"
	fs.readFile(pathToFile, 'utf8', (error,content)=> {
		if (error){
			return res.status(400).json({error: error});
		} 
		return res.json({data: jsonParse(content)});
	});

});

app.post('/save-link', (req,res,next)=> {
	const bodyParams = req.body['data'];
	const { type, data, hash } = JSON.parse(bodyParams);
	saveData = JSON.stringify({
		options: type,
		data: data
	});
	console.log(saveData);
	let error = null;
	if (hash && type && data){
		const pathToFile = './../shared/'+hash+'.json';
		fs.writeFile(pathToFile, saveData, (err)=> {
			if (err) {
				error = err;
			}

		});

	} 
	if (error){
		return res.status(400).json({error: error});
	} 
	return res.json({link: hash});

});

app.listen(3000, ()=>{
	console.log("App listening on port 3000");
});
