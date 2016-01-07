var React = require("react");
var reactGoogleMaps = require("react-google-maps");
var GoogleMap = reactGoogleMaps.GoogleMap;
var GoogleMapLoader = reactGoogleMaps.GoogleMapLoader;
var Circle = reactGoogleMaps.Circle;
var InfoWindow = reactGoogleMaps.InfoWindow;
var canUseDOM = require("can-use-dom");
var raf = require("raf");
var MarkerClusterer = require("react-google-maps/lib/addons/MarkerClusterer");
var Marker = reactGoogleMaps.Marker;
var SearchBox = reactGoogleMaps.SearchBox;
var OverlayView = reactGoogleMaps.OverlayView;

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

var Parse = require('parse');
var ParseReact = require('parse-react');
Parse.initialize("ttJuZRLZ5soirHP0jetkbsdqSGR3LUzO0QXRTwFN", "BDmHQzYoQ87Dpq0MdBRj9er20vfYytoh3YF5QXWd");


const geolocation = (
    canUseDOM && navigator.geolocation || {
        getCurrentPosition: (success, failure) => {
            failure("Geolocation not supported.");
        }
    }
);


var Geolocation = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function () {
        return {
            Missions: new Parse.Query('Missions').ascending('createdAt')
        };
    },
    getInitialState(){
        return {
            userPosition: null,
            center: null,
            content: null,
            radius: 4000,
            //These are the markers created by user. Mission markers.
            bounds: null,
            //These are display tags above the markers
            openedMissions: []
        }
    },
    handleBoundsChanged(){
        this.setState({
            bounds: this.refs.map.getBounds(),
            center: this.refs.map.getCenter()
        })
    },
    handlePlacesChanged(){
        const places = this.refs.searchBox.getPlaces();
        this.setState({
            center: places[0].geometry.location
        });
    },
    handleMarkerClick(marker){
        var missions = this.state.openedMissions;
        if(missions.indexOf(marker.id.objectId) < 0){
            this.setState({
                openedMissions: this.state.openedMissions.concat([marker.id.objectId])
            });
        }

    },
    handleCloseClick(marker){
        var missions = this.state.openedMissions;
        if(missions.indexOf(marker.id.objectId) > -1){
            missions.splice(missions.indexOf(marker.id.objectId),1);
            this.setState({
                openedMissions: missions
            });
        }
    },
    renderInfoWindow(ref, marker){
        return (
            <InfoWindow key={ref}
                        onCloseclick={this.handleCloseClick.bind(this, marker)}
            >
                <div>
                    <strong>{marker.description}</strong>
                </div>

            </InfoWindow>
        )
    },
    getPixelPositionOffset(width, height){
        return {x: -(width/2), y: -(height/2)-70};
    },
    componentDidMount(){
        geolocation.getCurrentPosition((position) => {
            this.setState({
                userPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                content: "Your are here!",
                missions: this.data.Missions
            });

            //This function will animate the circle.
            const tick = () => {
                this.setState({
                    //Return the largest number between 0 and this.state.radius - 20
                    radius: Math.max(this.state.radius - 300, 0)
                });

                if (this.state.radius > 150) {
                    raf(tick);
                }
            };
            raf(tick);
        }, (reason) => {
            this.setState({
                center: {
                    lat: 45.5017,
                    lng: -73.5673
                },
                content: `Error: The Geolocation service failed (${ reason }).`
            })
        })
    },
    render: function () {
        const {center, content, radius, markers, userPosition} = this.state;
        const STYLES = {
          overlayView: {
              background: "white",
              border: "1px solid #ccc"
          }
        };
        let contents = [];

        if (userPosition) {
            contents = contents.concat([

                (<Marker key={userPosition} position={userPosition} icon={"https://www.dropbox.com/s/7zl8wl9a73o89hx/robbery.png?dl=1"} defaultAnimation={2}>
                    {<InfoWindow key="info" position={userPosition} content={content}/>}
                </Marker>),
                (<Circle key="circle" center={userPosition} radius={radius} options={{
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
                            containerProps={{...this.props}}
                            ref="map"
                            onBoundsChanged={this.handleBoundsChanged}
                            defaultZoom={12}
                            center={
                                center ? center: userPosition
                            }
                        >{contents}
                          <MarkerClusterer
                            averageCenter={true}
                            enableRetinaIcons={true}
                            gridSize={20}>

                                {this.data.Missions.map((marker, index) => {
    const ref = `${marker.id.objectId}_info`;
    let icon = '';

    switch (marker.type) {
        case "hit":
         icon = "https://www.dropbox.com/s/likbnwqx8y5kywv/shooting.png?dl=1";
         break;
         case "transport":
         icon = "https://www.dropbox.com/s/r22dfeh8lutpwv1/fourbyfour.png?dl=1";
         break;
         default:
         icon = "https://www.dropbox.com/s/dfjpx65j5v3wlih/pirates.png?dl=1";
         break;
    }
    return (
        <Marker key={ref} ref={ref} defaultAnimation={2}
                icon={icon}
                position={{lat:marker.startLocationGeo.latitude, lng: marker.startLocationGeo.longitude}}
                title={marker.title}
                onClick={this.handleMarkerClick.bind(this, marker)}>
                {<InfoWindow key="info_marker" position={{lat:marker.startLocationGeo.latitude, lng: marker.startLocationGeo.longitude}} content={marker.value} />}
            {this.state.openedMissions.indexOf(marker.id.objectId) > -1 ? this.renderInfoWindow(ref, marker) : null}
        </Marker>
    );
})}
                            </MarkerClusterer>
                            <SearchBox
                                bounds={this.state.bounds}
                                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                                onPlacesChanged={this.handlePlacesChanged}
                                ref="searchBox"
                                placeholder="Search address"
                                style={inputStyle}
                            />
                        </GoogleMap>
                    }
                />
            </div>
        )
    }
});


module.exports = Geolocation;







