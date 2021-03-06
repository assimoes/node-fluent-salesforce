var sfnode = require('./sfnode');

var FluentQuery = function(authObject){
   this.authObj = authObject;   
}

var fn = FluentQuery.prototype;

fn.objectName = '';
fn.fields = '';
fn.authObj = '';

fn.from = function(objName) {
    
    this.objectName = objName;
    return this;
}

fn.select = function(f){
    this.fields = f;
    return this;
}

fn.execute = function(){
    
    var query =  {
        q: 'SELECT ' + this.fields + ' FROM ' + this.objectName
    }
    
    return sfnode.regularquery(this.authObj,query);
}

exports.Query = FluentQuery;