var querystring = require('querystring');

module.exports = function(grant_type,client_id,client_secret,username,password)
{
    
    this.grant_type = grant_type;
    this.client_id= client_id;
    this.client_secret = client_secret;
    this.username = username;
    this.password = password;

}