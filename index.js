var sfnode = require('./lib/sfnode');
var AuthOptions = require('./lib/AuthOptions');
var FluentQuery = require('./lib/FluentQuery');


var authOptions = new AuthOptions('password',
							   '',
                               '',
                               '',
                               '')


var auth = sfnode.authenticate(authOptions)
.then(function(data){


    var q = new FluentQuery.Query(data);
    q.from('Account')
    .select('ID,NAME')
    .execute()
    .then(function(d){
        console.log(d);
		if(d.nextRecordsUrl){
			
            var proceed = true;
            
            while(proceed === true){
                q.nextRecords(d.nextRecordsUrl).execute().then(function(nextdata){
                    console.log(nextdata);
                    if(!nextdata.nextRecordsUrl) proceed = false;
                });
            }
		}
		else {
			console.log('Query complete!');
		}
    });

});

