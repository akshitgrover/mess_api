/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
		res.view();
	},
	login:function(req,res){
		var vit=require('vitscraped');
		vit.profileScrape({regno:req.param('regno'),passwd:req.param('password')},function(data){
			console.log(data);
			if(data.name){
				User.findOne({regno:req.param('regno')},function(err,user){
					if(user){
						req.session.user=user;
						req.session.authenticated=true;
						Mess.findOne({code:req.session.user.mess},function(err,mess){
							if(err){
								return res.json(501,{err:"Something Went Wrong!"});
							}
							res.json({user:user,mess:mess,token:jwt.issue({id:user.id})});
						});	
					}
					else{
						User.create({regno:req.param('regno')},function(err,user){
							req.session.user=user;
							req.session.authenticated=true;
							user.mess=data.mess.slice(1,5);
							user.save();
							Mess.findOne({code:user.mess},function(err,mess){
								if(err){
									return res.json(501,{err:"Something Went Wrong!"});
								}
								return res.json({user:user,mess:mess,token:jwt.issue({id:user.id})});
							});
						});
					}
				});
			}
			else{
				var array=[];
				User.create({regno:req.param('regno')},function(err,user){
					req.session.user=user;
					req.session.authenticated=true;
				});
				Mess.find(function(err,mess){
					mess.forEach(function(err,mess_one){
						delete mess_one.menu;
						array.push(mess_one);
					});
					return res.json({err:"Couldn't Find Record!",user:req.session.user,mess:array,token:jwt.issue({id:user.id})});
				});
			}
		});
	},
	chngmess:function(req,res){
		User.findOne({regno:req.session.user.regno},function(err,data){
			if(err){
				return res.json(501,{err:"Soemthing went wrong!",token:req.param('token')});
			}
			data.mess=req.param('code');
			data.favdish=[];
			data.save();
			return res.json(200,{flash:'Default Mess Added successfully!',token:req.param('token')});
		});
	},
	findalluser:function(req,res){
		User.find(function(err,data){
			return res.json({user:data});
		});
	},
	delete:function(req,res){
		User.destroy({regno:req.param('regno')},function(err,data){
			if(err){
				res.json(501,{err:"Something Went Wrong!"});
			}
			return res.json({flash:"User Deleted Successfully!"});
		});
	},
	logout:function(req,res){
		req.session.destroy();
		return res.json(200,{flash:"Logged Out Successfully!"});
	},
	adminlogin:function(req,res){
		res.view();
	},
	subadminlogin:function(req,res){
		User.findOne({regno:req.param('regno')},function(err,data){
			req.session.user=user;
			req.session.authenticated=true;
			if(data.admin){
				res.redirect('/user/adminpanel');
			}
			else{
				return res.redirect('/user/adminlogin');
			}
		});
	},
	adminpanel:function(req,res){
		Mess.find(function(err,data){
			return res.view({mess:data});
		});
	},
	addfavdish:function(req,res){
		User.findOne({regno:req.param('regno')},function(err,data){
			if(err){
				return res.json(501,{err:"Something Went Wrong!"});
			}
			var encr=req.param('meal')+req.param('day');
			if(data.favdish){
				data.favdish.push(encr);
				data.save();
				return res.json(200,{flash:"Favorite Dish Added Successfully!"});
			}
			else{
				data.favdish=[];
				data.favdish.push(encr);
				data.save();
				return res.json(200,{flash:"Favorite Dish Added Successfully!",token:req.param('token')});
			}
		});
	},
	getfavdish:function(req,res){
		User.findOne({regno:req.param('regno')},function(err,data){
			if(err){
				return res.json(501,{err:"Something Went Wrong!"});
			}
			if(!data.favdish){
				return res.json(404,{err:"No Favourite Dish Found!"});
			}
			Mess.findOne({code:data.mess},function(err,mess){
				var encr=[];
				var fav=data.favdish;
				var i;
				for(i=0;i<fav.length;i++){
					encr.push(mess.day[parseInt(fav[i][1])][parseInt(fav[i][0])]);
				};
				return res.json(200,{dish:encr,token:req.param('token')});
			});
		});
	},
	delfavdish:function(req,res){
		User.findOne({regno:req.param('regno')},function(err,data){
			if(err){
				return res.json(501,{err:"Something Went Wrong!"});
			}
			var ind=data.favdish.indexOf(req.param('meal')+req.param('day'));
			data.favdish.splice(ind,1);
			data.save();
			console.log(data.favdish);
			return res.json(200,{flash:"Delete Successfully!",token:req.param('token')});
		});
	}
};

