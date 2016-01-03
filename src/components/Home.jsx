var React = require('react');
var Parse = require('parse');

var CreateMission = require('./CreateMission.jsx');
var ShowMissions = require('./ShowMissions.jsx');
var Profile = require('./Profile.jsx');
var Inbox = require('./Inbox.jsx');
var Settings = require('./Settings.jsx');
var Map = require('./Map.jsx');

var Home = React.createClass({
    logOut: function() {
        Parse.User.logOut();
    },
    getLocation: function() {
        if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition;
    }
    else {
        alert("Geolocation is not supported by this browser.");
        }
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h2>Succesful Login :)</h2>
                    <Map userLocation={this.getLocation}/>
                    <button className="btn btn-danger btn-md btn-block" onClick={this.logOut}>Log Out</button>
                </div>
            </div>
        );
    }
});



module.exports = Home;