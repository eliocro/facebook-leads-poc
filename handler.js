'use strict';


module.exports = {

  lead (request, reply) {
    let qs = request.query;

    let challenge  = qs['hub.challenge'];
    let token = qs['hub.verify_token'];

    if(token === 'abc123') {
      reply(challenge);
    }
    else {
      reply(token || 'OK');
    }

    let data = request.payload;
    if(!data || data.object !== 'page' || !data.entry) {
      return;
    }

    var change = data.entry[0] && data.entry[0].changes && data.entry[0].changes[0];
    if(!change || change.field !== 'leadgen'){
      return;
    }

    var genid = change.value.leadgen_id;
    console.log(genid);
  }
};
