var React = require('react');
var SimpleMap = require('./react-google-map.jsx')

var Map = React.createClass({
    getInitialState: function(){
        return {
            location: this.props.userLocation 
        }
    },
    render: function() {
        return (
        <div>
        <h1>I'm a map component!</h1>
        <p>{this.state.location} something else</p>
        <SimpleMap location={this.state.location} />
        </div>
        )
    }
});




module.exports = Map;