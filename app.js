var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');

const db=mysql.createConnection({
	host:'localhost',
	user:'root',
	password: 'abc123',
	database: 'nmysql'
});




db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('connected mysql');
});

var app=express();


app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/*+json' }));
// app.use(express.bodyParser());

//on getting a get request server will send back the data..


	app.get('/contactlist',(req,res) => {
	let sql="SELECT * FROM customers";
	db.query(sql,(err,docs) => {
		if(err) throw err;
	//	console.log(docs);
		
		res.json(docs);
	});
});
	app.post('/contactlist',(req,res)=>{
		console.log(req.body);

	//	db.contactlist.insert(req.body,function(err,doc){
	//		res.json(doc);
	//	});
	 var data = req.body;
	  console.log('request received:', data);

    db.query('INSERT INTO customers SET ?', data, function(err,doc){
      if(err) throw err;
        console.log('record inserted');
         res.json(doc);
    }); 
    }); 
	/* var sql = "INSERT INTO customers "(req.body);
  	db.query(sql, function (err, doc) {
    if (err) throw err;
    console.log("1 record inserted");
    res.json(doc);
  	}); */
  	// app.delete('/contactlist/:id',function(req,res){
  	//	var id=req.params.id;
  	//	console.log(id);
  	// });

  	//rest api to delete record from mysql database
/*	app.delete( '/contactlist' , (req, res) => {

		// var id=req.params.id;
		console.log(id);
		console.log('jjjjjj');
   		// console.log(req.body);
   		db.query('DELETE FROM `customers` WHERE `ID`=1', [req.body.id], function (error, results, fields) {
	  	if (error) throw error;
	 	 res.end('Record has been deleted!');
	});
	}); */


app.delete('/contactlist/:id', function (req, res) {
	
	var id=req.params.id;
	 console.log(id);
	//  console.log('jjjjjj');
  // console.log(req.body);
   db.query('DELETE FROM customers WHERE ID =?', [req.params.id], function (error, doc) {
	  if (error) throw error;
	 res.json(doc);
	});
});




	


	app.get('/contactlist/:id',function(req,res){
	var id=req.params.id;
	//console.log(id);
	//console.log(req.body);
	 db.query('SELECT * FROM customers WHERE ID=?', [req.params.id], function (error, doc) {

	 //	console.log(JSON.stringify(doc));
	  if (error) throw error;
	 res.json(doc);
	// res.end(JSON.stringify(doc));
	});
});

	app.put('/contactlist/:id',function(req,res){
		var id=req.params.id;
		// console.log(id);
		// console.log(req.body.name);
		 db.query("UPDATE customers SET name =?,email =? ,number=? WHERE ID = ?", [ [req.body.name]
, [req.body.email]
,[req.body.number],[req.params.id] ], function (error, result) {
		 	console.log(result.affectedRows + " record(s) updated");
	  	if (error) throw error;
	 	res.json(result);
	
	});
	/*	 var sql = "UPDATE customers SET name = 'req.body.name' ,email ='req.body.email' ,number='req.body.number' WHERE ID = ?,";
 		 db.query(sql, function (err, result) {
    		if (err) throw err;
    		console.log(result.affectedRows + " record(s) updated");
  });
  */
	});





app.listen(3000,function(){
	console.log('ready');
});

