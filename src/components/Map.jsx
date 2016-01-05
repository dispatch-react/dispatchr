var React = require('react');
var GMaps = require('../gmaps.js');
var Autocomplete = require('./Autocomplete.jsx');



var Map = React.createClass({

    getInitialState(){
        return {
            location: ''
        }
    },
    componentDidMount(){
        GMaps.geolocate({
            success: position => {
                var map = new GMaps({
                    el: this.refs.map,
                    lat: 45.50,
                    lng: -73.57,
                    zoom: 10
                });

                map.setCenter(position.coords.latitude, position.coords.longitude);
                map.addMarker({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });

            },
            error: error => {
                alert('Geolocation failed: '+error.message);
            },
            not_supported:()=> {
                alert("Your browser does not support geolocation");
            }
        });

    },
    render(){

        return (
            <div className="map-holder">
                <div className="main-map" ref="map"><img src="../src/img/loading.gif" alt=""/></div>
                <Autocomplete />
            </div>
        );
    }

});


module.exports = Map;