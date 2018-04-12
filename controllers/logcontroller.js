var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user')
var Log = sequelize.import('../models/log');

router.get('/', function(req, res){
    var userid= req.user.id;

    Log
    .findAll({
        where: {owner:userid}
    })
    .then(
        function findAllSuccess(data){
          res.json(data);  
        },
        function findAllError(err){
            res.send(500, err.message);
        }
    );
});
 

router.get('/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;
    Log
    .findAll({
        where:{id:data, owner:userid}
    }).then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    );
});


router.post('/', function(req, res){
    var description = req.body.log.description;
    var result = req.body.log.result;
    var owner = req.user.id;

    Log.create({
        description:description,
        result:result,
        owner:owner
    })
    .then(function createSuccess(result,description){
        res.json({
            result:result,
            description:description
        });
    },
    function createError(err){
        res.send(500, err.message);
    }
);
});

router.delete('/:id',function(req, res){
    var data = req.params.id;
    var userid = req.user.id;

    Log
    .destroy({
        where:{id:data, owner:userid}
    }).then(
        function deleteLogSuccess(data){
            res.send('you removed a log');
        },
        function deleteLogError(err){
            res.send(500, err.message);
        }
    );

});


router.put('/:id', function(req, res){
    var owner= req.log.id;
    var description = req.body.log.description;
    var result = req.body.log.result;

    Log
    .update({
        description:description,
        result:result
    },
    {where:{id:owner}}
).then(
    function updateSuccess(updatedLog){
        res.json({
            description:description,
            result:result
        });
    },
    function updateError(err){
        res.send(500, err.message);
    }
)
});

module.exports = router;
