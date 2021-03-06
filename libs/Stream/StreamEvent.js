var util = require('util');
var Event = require('../Event.js');
var UserSettings = require('../UserSettings.js');

/**
 * @constructor
 * @augments Event
 */
function StreamEvent() {
    Event.apply(this, arguments);

    this.channelLabel = null;
    this.authCredentials = null;
}
util.inherits(StreamEvent, Event);

/**
 * Returns the channelLabel
 * @returns {null|string}
 */
StreamEvent.prototype.getChannelLabel = function() {
    this.getUserSettings();
    return this.channelLabel;
};

/**
 * @inheritdoc
 */
StreamEvent.prototype.getAuthCredentials = function() {
    this.getUserSettings();
    return this.authCredentials;
};

/**
 * @inheritdoc
 */
StreamEvent.prototype.getUserSettings = function() {
    if (!this.userSettings) {
        var configStreamSettings = this.req.body.configStreamSettings || {};
        var userSettingsMap = configStreamSettings.userSettingsMap || {};

        for (var channelLabel in userSettingsMap) {
            var userSettingsObject = userSettingsMap[channelLabel] || {};
            this.channelLabel = channelLabel;
            this.authCredentials = userSettingsObject.auth;
            this.userSettings = UserSettings.fromUserSettingsObject(userSettingsObject.userSettings);
            break;
        }
    }

    return this.userSettings;
};

module.exports = StreamEvent;