var React = require('react');
var Parse = require('parse');

var CreateMission = require('./CreateMission.jsx');
var ShowMissions = require('./ShowMissions.jsx');
var Profile = require('./Profile.jsx');
var Inbox = require('./Inbox.jsx');
var Settings = require('./Settings.jsx');
var Map = require('./Map.jsx');
var Nav = require('./Nav.jsx');

var Home = React.createClass({
    logOut: function() {
        console.log('calling logout')
        Parse.User.logOut();
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <p>You're home</p>
                </div>
            </div>
        );
    }
});



module.exports = Home;