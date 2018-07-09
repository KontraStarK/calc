
var fs= require("fs");
var express = require('express');
var app = express();

app.use(express.static(__dirname));

var bodyParser=require ("body-parser"); ///стрічки обовязкові для Пост запитів
app.use(bodyParser.urlencoded({ extended: false }));//
app.use(bodyParser.json());




app.get('/', function (req, res) {
	res.sendFile(__dirname+"/user.html");

})


app.get('/GetUser', function (req, res) {
fs.readFile("data.json","utf-8",
	function(err,data){
			console.log(data);
			res.send(data);
		})
  
})




app.post('/delete', function (req, res) {
	fs.readFile("data.json","utf-8",function(err,data){
		var mas = JSON.parse(data);
		mas.splice(req.body.index,1);
		var masjson = JSON.stringify(mas);
		fs.writeFile("data.json",masjson);
	})
	
			res.send("Delete User!!!");
})




app.post('/addUser', function (req, res) {
	 fs.readFile("data.json","utf-8",function(err,data){
	 	var mas = JSON.parse(data);
	 	mas.push(req.body);
	 	var masjson = JSON.stringify(mas);
	 	fs.writeFile("data.json",masjson);
	})
	        console.log(req.body);
			res.send("Add User!!!");
})


app.post('/update', function (req, res) {
	


	 fs.readFile("data.json","utf-8",function(err,data){
	 	var index = req.body.trIndex;
	    delete req.body.trIndex;
	 	var mas = JSON.parse(data);
	 	mas.splice(index,1,req.body);
	 	var masjson = JSON.stringify(mas);
	 	fs.writeFile("data.json",masjson);
	})
	        console.log(req.body);
			res.send("Update User!!!");
})



app.listen(process.env.PORT||8080);
console.log("Server Run !!!!")