var React = require("react");
var reactGoogleMaps = require("react-google-maps");
var GoogleMap = reactGoogleMaps.GoogleMap;
var GoogleMapLoader = reactGoogleMaps.GoogleMapLoader;
var Circle = reactGoogleMaps.Circle;
var InfoWindow = reactGoogleMaps.InfoWindow;
var canUseDOM = require("can-use-dom");
var raf = require("raf");


const geolocation = (
    canUseDOM && navigator.geolocation || {
        getCurrentPosition: (success, failure) => {
            failure("Geolocation not supported.");
        }
    }
);


var Geolocation = React.createClass({
    getInitialState(){
        return {
            center: null,
            content: null,
            radius: 4000
        }
    },
    componentDidMount(){
        geolocation.getCurrentPosition((position) => {
            this.setState({
                center: {
                   lat: position.coords.latitude,
                   lng: position.coords.longitude
                },
                content: "Your are here!"
            });
            //This function will animate the circle.
            const tick = () => {
                this.setState({
                    //Return the largest number between 0 and this.state.radius - 20
                    radius: Math.max(this.state.radius - 40, 0)
                });

                if(this.state.radius > 200){
                    raf(tick);
                }
            };
            raf(tick);
        }, (reason) => {
            this.setState({
                center: {
                    lat: 45,
                    lng: -73
                },
                content: `Error: The Geolocation service failed (${ reason }).`
            })
        })
    },
    render: function () {

        const {center, content, radius} = this.state;
        let contents = [];

        if(center){
            contents = contents.concat([
                (<InfoWindow key="info" position={center} content={content} />),
                (<Circle key="circle" center={center} radius={radius} options={{
                    fillColor: "#4259ee",
                    fillOpacity: 0.20,
                    strokeColor: "blue",
                    strokeOpacity: 1,
                    strokeWeight: 1
                }}/>)
            ])
        }

        return (
            <div>
                <GoogleMapLoader
                    containerElement={<div {...this.props} style={{height: "70vh"}} />}
                    googleMapElement={
                        <GoogleMap
                            defaultZoom={12}
                            center={center}
                        >{contents}
                        </GoogleMap>
                    }
                />
            </div>
        )
    }
});


module.exports = Geolocation;