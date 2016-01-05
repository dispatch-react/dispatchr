var React = require("react");
var reactGoogleMaps = require("react-google-maps");
var GoogleMap = reactGoogleMaps.GoogleMap;
var GoogleMapLoader = reactGoogleMaps.GoogleMapLoader;

var Map = React.createClass({
    render: function () {
        return (
            <div>
                <GoogleMapLoader
                    containerElement={<div {...this.props} style={{height: "70vh"}} />}
                    googleMapElement={
                        <GoogleMap
                         ref={(map) => console.log(map)}
                         defaultZoom={8}
                         defaultCenter={{lat: 45.50, lng: -73.57}}
                        />
                    }
                />
            </div>
        )
    }
});

module.exports = Map;