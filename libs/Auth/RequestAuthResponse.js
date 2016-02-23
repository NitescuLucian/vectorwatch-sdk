var util = require('util');
var Response = require('../Response.js');
var Promise = require('bluebird');


function RequestAuthResponse() {
    Response.apply(this, arguments);
}
util.inherits(RequestAuthResponse, Response);

RequestAuthResponse.prototype.getPayloadAsync = function() {
    var authProvider = this.getServer().getAuthProvider();

    if (!authProvider) {
        return Promise.resolve();
    }

    return authProvider.getLoginUrlAsync().then(function(loginUrl) {
        return {
            protocol: authProvider.getProtocol(),
            version: authProvider.getVersion(),
            loginUrl: loginUrl
        };
    });
};

module.exports = RequestAuthResponse;