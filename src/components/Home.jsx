var React = require('react');

var Geolocation = require("./Geolocation.jsx");

var Home = React.createClass({
    render: function() {
        return (
            <div>
                <Geolocation />
            </div>
        );
    }
});

module.exports = Home;