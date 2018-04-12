const Sequelize = require('sequelize');

           
const sequelize = new Sequelize('Autumnworkoutlog', 'postgres', '01tweety', {
    host: 'localhost', 
    dialect: 'postgres'  
});
      
sequelize.authenticate().then(
    function() {
        console.log('Connected to Autumnsworkoutlog postgres database');
    },
    function(err){ 
        console.log(err);
    }
);
                 
module.exports = sequelize;