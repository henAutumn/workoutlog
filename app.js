require('dotenv').config();

var express = require('express'); 
var app = express(); 
var user=require('./controllers/usercontroller');
var log = require('./controllers/logcontroller');
var sequelize=require('./db');
var bodyParser=require('body-parser');
 
sequelize.sync();
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/api', user);
app.use(require('./middleware/validate-session'));
app.use('/api/log',log)

app.listen(3000, function(){
    console.log('Hey its working')
});
