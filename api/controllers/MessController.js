/**
 * MessController
 *
 * @description :: Server-side logic for managing messes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create:function(req,res){
		var array=[];
		array.push(req.param('breakfast'));
		array.push(req.param('lunch'));
		array.push(req.param('snacks'));
		array.push(req.param('dinner'));	
		Mess.findOne({code:req.param('code')},function(err,data){
			//console.log(data);
			if(!data){
				Mess.create({code:req.param('code'),name:req.param('name')},function(err,data){
					if(err){
						return res.json({err:err});
					}
					data.day=[];
					data.day.push(array);
					data.save();
					return res.json({mess:data});
				});
			}
			else{
				console.log(data);
				data.day.push(array);
				data.save();
				return res.json({mess:data});
			}
		});
	},
	filecreate:function(req,res){
		var fs=require('fs');
			req.file('files').upload(function(err,file){
				console.log(err)
				fs.readFile(file[0].fd,'utf8',function(err,data){
					console.log(data)
					var parse=require('csv-parse');
					parse(data,function(err,output){
					Mess.findOne({code:req.param('code')},function(err,mess){
						mess.day=output;
						mess.save();
						console.log(mess);
						return res.json(200,{flash:"Mess Created SuccessFully!"});
					})	
				});
			});
		});
	},
	getmenu:function(req,res){
		Mess.findOne({code:req.param('code')},function(err,data){
			if(err){
				return res.json({err:"Something Went Worng",token:req.param('token')});
			}
			return res.json({menu:data,token:req.param('token')});
		});
	},
	getdaymenu:function(req,res){
		Mess.findOne({code:req.param('code')},function(err,data){
			if(err){
				return res.json(501,{err:"Something Went Wrong!",token:req.param('token')});
			}
			var day=[];
			var d=new Date();
			day=data.day[d.getDate()-1];
			return res.json(200,{menu:day,token:req.param('token')});
		});
	},
	delete:function(req,res){
		Mess.destroy({code:req.param('code')},function(err,data){
			if(err){
				return res.json(501,{err:"Something Went Wrong!"});
			}
			return res.json(200,{flash:"Mess Deleted Successfully!"});
		});
	},
	edit:function(req,res){
		Mess.findOne({code:req.param('code')},function(err,data){
			var array=[];
			array.push(req.param('breakfast'));
			array.push(req.param('lunch'));
			array.push(req.param('snacks'));
			array.push(req.param('dinner'));
			data.day[req.param('number')-1]=array;
			data.save();
			return;
		});
	},
	destroyday:function(req,res){
		Mess.findOne({code:req.param('code')},function(err,data){
			data.day.splie(req.param('day')-1,1);
			data.save();
			return;
		});
	},
	getmess:function(req,res){
		Mess.find(function(err,mess){
			if(err){
				return res.json(501,{err:"Something went wrong!",token:req.param('token')});
			}
			return res.json({token:req.param('token'),mess:mess});
		});
	},
	showmessall:function(req,res){
		Mess.find(function(err,data){
			if(err){
				return res.json({err:err});
			}
			return res.json({mess:data});
		});
	},
	showmess:function(req,res){
		Mess.findOne(function(err,data){
			if(err){
				return res.json({err:err});
			}
			return res.view({mess:data});
		});
	}

};