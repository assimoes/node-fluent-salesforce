var https = require('https');
var when = require('when');
var querystring = require('querystring');

var options = {
    hostname: 'login.salesforce.com',
    path:'/services/oauth2/token',
    headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
    method:'POST'
};



var authResponse = {
    id:'',
    issued_at:'',
    instance_url:'',
    signature:'',
    access_token:''
}

function authenticate(postdata){
    
    var deferred = when.defer();
    
    var req = https.request(options, function(res){
        
        res.setEncoding('utf8');
        res.on('data',function(chunk){
            authResponse.access_token = JSON.parse(chunk).access_token;
            authResponse.instance_url = JSON.parse(chunk).instance_url;
            authResponse.id = JSON.parse(chunk).id;
            authResponse.issued_at = JSON.parse(chunk).issued_at;
            authResponse.signature = JSON.parse(chunk).signature;
            deferred.resolve(authResponse);
        });
    });
    
    req.on('error', function(err){
        console.log(err.message);
    });
    
    var p = querystring.stringify(postdata);
    
    req.write(p);
    req.end();
    
    return deferred.promise;
}

function restquery(authObject,objectname,field,id)
{
    var deferred = when.defer();
    var queryopt = {
        hostname: authObject.instance_url.replace('https://',''),
        path:'/services/data/v29.0/sobjects/' + objectname + '/' + field +  '/' + id,
        headers: {'Authorization': 'OAuth ' + authObject.access_token },
        method:'GET'
    }
    
    var data='';
        var req = https.request(queryopt,function(res){ 
  
            res.setEncoding('utf8');
            
            res.on('data',function(chunk){
                data +=chunk;
               
            });
            
            res.on('end',function(){
                deferred.resolve(data);
            });  
        });

    
    req.on('error',function(err){
        console.log(err.message);
    });
    
    req.end();
    
    return deferred.promise;

}

function regularquery(authObject, query){
    
    
    
    var deferred = when.defer();
    
    var queryopt = {
        hostname: authObject.instance_url.replace('https://',''),
        path:'/services/data/v29.0/query/?' + querystring.stringify(query),
        headers: {'Authorization': 'OAuth ' + authObject.access_token },
        method:'GET'
    }
 
    var data = '';
    
    var req = https.request(queryopt, function(res){
       res.setEncoding('utf8');
        
        res.on('data',function(chunk){
           data +=chunk; 
        });
        
        res.on('end',function(){
           deferred.resolve(data);
        });
    });
    
    req.on('error',function(err){ console.log(err.message)});
    
    req.end();
    
    return deferred.promise;
}





exports.authenticate = authenticate;
exports.restquery = restquery;
exports.regularquery = regularquery;
