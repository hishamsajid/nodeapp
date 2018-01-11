var express = require('express');
var Bear = require('./app/models/bear')
var app = express();
var bodyParser =  require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node_connection');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

var router = express.Router();
app.use('/api',router);

router.get('/',function(req,res){
    res.send({message: 'api funcitonal'});
});

router.route('/bears')
    .post(function(req,res){
        var bear = new Bear();
        bear.name = req.body.name;

        bear.save(function(err){
            if(err) {
                res.send(err);
            }
            res.json({message:'Bear Created'});
        });

    })

    .get(function(req,res){
        Bear.find(function(err,bears){
            if(err){
                res.send(err)
            }
            res.json(bears)
        });
    });

router.route('/bears/:bear_id')
    
    .get(function(req,res){

        Bear.findById(req.params.bear_id,function(err,bear){
            if(err){
                res.send(err)
            }
            res.json(bear)
        });

    })

    .put(function(req,res){
        
        Bear.findById(req.params.bear_id,function(err,bear){
             if(err){
                res.send(err);
             }
        bear.name = req.body.name;

        bear.save(function(err){
            if(err){
                res.send(err)
            }
            res.json({message: 'Bear updated'});
            });
        });
    })

    .delete(function(req,res){
        Bear.remove({ _id: req.params.bear_id }, function(err,bear){
                
                if(err){
                    res.send(err);
                }
                
                res.json({message: 'Successfully deleted'});
            
            });
        
    });
        
       


app.listen(port);
console.log('port connected at ' + port);