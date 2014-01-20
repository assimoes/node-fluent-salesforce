var sfnode = require('./lib/sfnode');
var AuthOptions = require('./lib/AuthOptions');
var FluentQuery = require('./lib/FluentQuery');


var authOptions = new AuthOptions('password',
                               'your consumer key',
                               'your client secret',
                               'your username',
                               'your password + token')


var auth = sfnode.authenticate(authOptions)
.then(function(data){

    var q = new FluentQuery.Query(data);
    q.from('Account')
    .select('ID,NAME')
    .execute()
    .then(function(d){
        console.log(d);
    });

});

