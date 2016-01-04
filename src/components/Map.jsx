var React = require('react');

var Map = React.createClass({
    getInitialState: function(){
        return {
            //set initial coordinates to Montreal 
            lat: 45.50,
            lng: 73.57  
        }
    },
    componentDidMount: function() {
       
            var map = new Gmaps({
                div: "map-container",
                lat: this.state.lat,
                lng: this.state.lng
            });

            map.addMarker({
                   lat: this.state.lat,
                   lng: this.state.lng 

            });

    },
    render: function() {
        return (
        <div>

        <h1> Longitude: {this.state.lng} + Latitude + {this.state.lat} </h1>
       <div id="map-container"></div>

        </div>
        )
    }
});

module.exports = Map;