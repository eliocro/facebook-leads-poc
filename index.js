'use strict';

const Hapi = require('hapi');


const server = new Hapi.Server();
server.connection({
  port: process.env.PORT || 5000,
  routes: {
    cors: true
  }
});

server.register([
  require('inert')
], function (err) {
  if(err) {
    return console.log('Hapi: Error loading plugins');
  }

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
      path: '/platform/{something*}',
      handler: {
        directory: {
          path: 'public',
          index: true
        }
      }
    },
    {
      method: '*',
      path: '/facebook',
      handler (request, reply) {
        let qs = request.query;

        let challenge  = qs['hub.challenge'];
        let token = qs['hub.verify_token'];

        if(token === 'abc123') {
          reply(challenge);
        }
        else {
          reply(token);
        }

        console.log(JSON.stringify(request.payload));
      }
    }
  ]);


  server.start(() => {
    console.log('Facebook Leads POC:', 'Started on ' + server.info.port);
  });

});
