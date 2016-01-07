'use strict';

const Hapi = require('hapi');


var server = new Hapi.Server();
server.connection({
  port: process.env.PORT || 5000,
  routes: {
    cors: true
  }
});


server.route([
  {
    method: '*',
    path: '/',
    handler (request, reply) {
      reply('Facebook Leads POC');
    }
  },
  {
    method: 'GET',
    path: '/facebook',
    handler (request, reply) {
      let qs = request.query;

      let challenge  = qs.hub_challenge;
      let token = qs.verify_token;

      if(token === 'abc123') {
        return reply(challenge);
      }
      reply('No match');
    }
  }
]);


server.start(() => {
  console.log('Facebook Leads POC:', 'Started on ' + server.info.port);
});
