var React = require('react');
var

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
       <div id= "map-container"></div>
        </div>
        )
    }
});



// function showPosition(position) {
//     lat = position.coords.latitude;
//     lon = position.coords.longitude;
//     latlon = new google.maps.LatLng(lat, lon)
//     mapholder = document.getElementById('mapholder')
//     mapholder.style.height = '250px';
//     mapholder.style.width = '500px';

//     var myOptions = {
//         center: latlon,
//         zoom: 14,
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//         mapTypeControl: false,
//         navigationControlOptions: {
//             style: google.maps.NavigationControlStyle.SMALL
//         }
//     }
//     var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
//     var marker = new google.maps.Marker({
//         position: latlon,
//         map: map,
//         title: "You are here!"
//     });
// }

// function showError(error) {
//     switch(error.code) {
//         case error.PERMISSION_DENIED:
//             alert("User denied the request for Geolocation.")
//             break;
//         case error.POSITION_UNAVAILABLE:
//             alert("Location information is unavailable.")
//             break;
//         case error.TIMEOUT:
//             alert("The request to get user location timed out.")
//             break;
//         case error.UNKNOWN_ERROR:
//             alert("An unknown error occurred.")
//             break;
//     }
// }



module.exports = Map;