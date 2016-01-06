var React = require("react");
var reactGoogleMap = require("react-google-maps");

var GoogleMap = reactGoogleMap.GoogleMap;
var Marker = reactGoogleMap.Marker;
var SearchBox = reactGoogleMap.SearchBox;

var inputStyle = {
    "border": "1px solid transparent",
    "borderRadius": "1px",
    "boxShadow": "0 2px 6px rgba(0, 0, 0, 0.3)",
    "boxSizing": "border-box",
    "MozBoxSizing": "border-box",
    "fontSize": "14px",
    "height": "32px",
    "marginTop": "27px",
    "outline": "none",
    "padding": "0 12px",
    "textOverflow": "ellipses",
    "width": "400px"
};

var SearchBox = React.createClass({
    getInitialState(){
        return {
            bounds: null,
            center: this.props.center,
            searchMarkers: []
        }
    },
    handleBoundsChanged(){
        this.seState({
            bounds: this.refs.map.getBounds(),
            center: this.refs.map.getCenter()
        })
    },
    handlePlacesChanged(){
        const places = this.refs.searchBox.getPlaces();
        const markers =[]

        //Add marker for every found place
        places.forEach(function (place) {
            markers.push({
                position: place.geometry.location
            });
        });

        //Set markers; set map center to first search result
        const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
        this.setState({
            center: mapCenter,
            markers: markers
        });
        return
    },
    render: function () {
        return (
            <div>

            </div>
        )
    }
});