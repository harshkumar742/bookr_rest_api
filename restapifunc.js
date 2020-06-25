const express = require('express');
const db = require('./database.js');
const restapi = function () {};
restapi.test=function(req,res){
	res.send("Books Server is Running");
}

restapi.createbook = function(req,res){
	//console.log(req.body);
	var id = Number(req.body.id);// should be a number
	var author = req.body.author; // should be alphabets only
	var title = req.body.title; // can be alphanumeric 
	var isbn = req.body.isbn; // can be alphanumeric
	var reldate = req.body.reldate;//year, should be a number
    var regexp1 = /^[a-zA-Z ]+$/;	
    var regexp2 = /^[a-z0-9 ]+$/i;
if (!regexp1.test(author)){
	res.send({"Success":false, "Message": "Enter a Valid Name. Only Alphabets allowed"});
}else if(!regexp2.test(title)){
	res.send({"Success":false, "Message": "Enter a Valid Title. Only AlphaNumerics Allowed"});
}else{
	db.get().collection('books').insertOne({"id":id,"author":author,"title":title,"isbn":isbn,"rel_date":reldate},function(err, result){
		if(err){
			res.send({"Success":false, "Message": "Some Error Occurred"});
		}else{
			//console.log(result);
			res.send({"Success":true, "Message":"Book Created","data":{"id":id,"Author":author,"Title":title,"ISBN":isbn,"Release Date":reldate}});
		}
	});
	
  }
}

restapi.readbook =function(req,res){
 var id = req.params.bookId;
 if(isNaN(id)==true){
	 res.send({"Success":0, "Message": "Enter a valid Book id"});
 }
 else{
	 id = Number(id);
	 db.get().collection('books').findOne({"id":id},function(err, result){
		if(err){
			res.send({"Success":false, "Message": "Some Error Occurred"});
		}else{
			if(result==null){
				res.send({"Success":false, "Message": "Book Not Found"});
				}else{
			  res.send({"Success":true, "Message":"Book Found", "data":{"id":result.id,"Author":result.author,"Title":result.title,"ISBN":result.isbn,"Release Date":result.rel_date}});
			}
		}
	});
 }
}

restapi.updatebook =function(req,res){
	//same logic as createbook but passing id in api and updating title and other fields by using POST and mongo update query.
	var id = Number(req.params.bookId);// should be a number
	var author = req.body.author; // should be alphabets only
	var title = req.body.title; // can be alphanumeric 
	var isbn = req.body.isbn; // can be alphanumeric
	var reldate = req.body.reldate;//year, should be a number
	var regexp1 = /^[a-zA-Z ]+$/;	
    var regexp2 = /^[a-z0-9 ]+$/i;
if (!regexp1.test(author)){
	res.send({"Success":false, "Message": "Enter a Valid Name to Update"});
}else if(!regexp2.test(title)){
	res.send({"Success":false, "Message": "Enter a Valid Title to Update"});
}else{
	db.get().collection('books').updateOne({"id":id},{$set:{"author":author,"title":title,"isbn":isbn,"rel_date":reldate}},function(err, result){
		if(err){
			res.send({"Success":false, "Message": "Some Error Occurred"});
		}else{
			if(result.result.nModified==0){
				res.send({"Success":false, "Message": "No new values to update"});
			}else{
			    res.send({"Success":true, "Message":"Book Fields Updated","data":{"id":id,"Author":author,"Title":title,"ISBN":isbn,"Release Date":reldate}});
		    }
		}
	});
	
  }
}

restapi.deletebook =function(req,res){
	var id= req.params.bookId;
    if(isNaN(id)==true){
	    res.send({"Success":false, "Message": "Enter a valid Book id"});
    }else{
		id = Number(id);
		db.get().collection('books').deleteOne({"id":id},function(err, result){
		if(err){
			res.send({"Success":false, "Message": "Some Error Occurred"});
		}else{
			if(result.result.n==0){
				res.send({"Success":false, "Message": "Book Id is not present in Database"});
			}else{
			     res.send({"Success":true,"Message":"Book Deleted"});
			}
		}
	});
  }
}
module.exports = restapi;