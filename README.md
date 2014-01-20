<H1>node-fluent-salesforce</H1>
======================

Node Fluent API to query Salesforce using Salesforce REST API.

This is a very initial work towards the development of a fluent API to enable you to query your Salesforce Organization.

For now you can Authenticate and Authorize against your Salesforce organization using the OAuth2 username-password flow.

This basically means that you will have to have a known username and password, and all subsequent requests will be made
using the returned access token.

You will also need to create/configure a Connected App in your Salesforce organization in order to have access to a
Consumer Key and a Client Secret.

<H3>Example usage</H3>

<pre>
<code>
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

</code>
</pre>

