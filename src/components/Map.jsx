var React = require('react');

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
        </div>
        )
    }
});

//Some notes to test out github desktop

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