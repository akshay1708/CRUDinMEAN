const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();
var router = express.Router();
var port = 3000;

app.use(cors());

//const config = require('./config/db');
mongoose.connect('mongodb://localhost:27017/textposts');
mongoose.connection.on("connected",function () {
  console.log("connected : "+config.dbUrl);
});
mongoose.connection.on("error",function (err) {
  console.log("database error: "+err);
});
var mongoPost  =   require("./config/postsmodel");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use(express.static(__dirname + '/client'));


app.get('/',function (req,res) {
    //  res.json({"hello":"hi!"});
      res.sendFile('./client/index.html');
});
router.get("/api/posts",function(req,res){
        var response = {};
        mongoPost.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {data};
            }
            res.json(response);
        });
    });
    router.post("/addpost",function(req,res){
            var db = new mongoPost();
            var response = {};
            // fetch email and password from REST request.
            // Add strict validation when you use this in Production.
            db.heading = req.body.heading;
            db.content = req.body.content;


            db.save(function(err){
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
                if(err) {
                    response = {"error" : true,"message" : "Error adding data"};
                      res.json(response);
                }
                else {
                  mongoPost.find({},function(err,data){
                  // Mongo command to fetch all data from collection.
                      if(err) {
                          response = {"error" : true,"message" : "Error fetching data"};
                      } else {
                          response = {data};
                      }
                      res.json(response);

              });
                }
              });//save
        });

        router.delete('/deletepost/:id', function(req,res,next){
          //res.send('delete');
          console.log(req);
              mongoPost.findOneAndRemove({_id: req.params.id},function (err) {
                if(err)
                  res.send(err);

                mongoPost.find({},function(err,data){
                // Mongo command to fetch all data from collection.
                    if(err) {
                        response = {"error" : true,"message" : "Error fetching data"};
                    } else {
                        response = {data};
                    }
                    res.json(response);

            });
        });
      });
        app.use('/',router);

app.listen(port);
console.log("listening at"+port);
