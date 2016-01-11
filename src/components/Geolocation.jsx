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
var InfoBox = require("react-google-maps/lib/addons/InfoBox");
var TimerMixin = require("react-timer-mixin");
var CreateMissionForm = require("./CreateMissionForm.jsx");
var Modal = require('react-bootstrap').Modal;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Col = require('react-bootstrap').Col;
var ClickedMission = require("./ClickedMission.jsx");
var _ = require("lodash");

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
    mixins: [ParseReact.Mixin, TimerMixin],
    observe: function () {
        return {
            Missions: new Parse.Query('Missions').ascending('createdAt').equalTo('status', 'open').equalTo('status', 'pending')
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
            openedMissions: [],
            showModal: false,
            clickedMission: {}
        }
    },
    handleBoundsChanged: _.debounce(function(){
        this.setState({
            bounds: this.refs.map.getBounds(),
            center: this.refs.map.getCenter()
        })
    },100),
    handlePlacesChanged(){
        const places = this.refs.searchBox.getPlaces();
        this.setState({
            center: places[0].geometry.location
        });
    },
    handleMarkerClick(marker){
        var missions = this.state.openedMissions;
        if (missions.indexOf(marker.id.objectId) < 0) {
            this.setState({
                openedMissions: this.state.openedMissions.concat([marker.id.objectId])
            });
        }

    },
    handleCloseClick(marker){
        var missions = this.state.openedMissions;
        if (missions.indexOf(marker.id.objectId) > -1) {
            missions.splice(missions.indexOf(marker.id.objectId), 1);
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
    renderMissionInfo(ref, marker){
        console.log(this.props.user);
        return (
            <CreateMissionForm user={this.props.user}/>
        )
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
    close() {
        this.setState({
            showModal: false
        });
    },

    open(marker) {
        this.setState({
            showModal: true,
            clickedMission: marker
        })
    },
    acceptMission: function(e) {
        var self = this;
        e.preventDefault();
            var setStatus = ParseReact.Mutation.Set(self.state.clickedMission, {
                acceptedBy: self.props.user,
                status: 'pending'
            });
            
            var acceptedAlert = ParseReact.Mutation.Create('Messages', {
                writtenTo: self.state.clickedMission.createdBy,
                content: self.props.user.u_name + 'has accepted your misson!',
                type: 'missionAccepted',
                createdBy: self.props.user,
                read: false
            });

            setStatus.dispatch().then(function(res){
                    self.close();
                    acceptedAlert.dispatch()
                    alert('Mission is pending, watch your inbox!')
                },
                function(error){
                    alert('there was an error, check your self')
                });
        },
        render: function () {
        const {center, content, radius, markers, userPosition} = this.state;
        let contents = [];

        if (userPosition) {
            contents = contents.concat([

                (<Marker key={userPosition} position={userPosition}
                         icon={"https://www.dropbox.com/s/7zl8wl9a73o89hx/robbery.png?dl=1"} defaultAnimation={2}>
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
            <div id="viewContent">
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
                            minimumClusterSize={3}
                            title={"Click to view missions!"}
                            averageCenter={true}
                            enableRetinaIcons={true}
                            gridSize={10}>

                                {this.data.Missions.map((marker, index) => {
    const position = marker.startLocationGeo ? {lat:marker.startLocationGeo.latitude, lng: marker.startLocationGeo.longitude} : null;
    const ref = `marker_${index}`;
    if(position){
        let icon = '';
    switch (marker.category) {
        case "driving":
         icon = "https://www.dropbox.com/s/r22dfeh8lutpwv1/fourbyfour.png?dl=1";
         break;
         case "events":
         icon = "https://www.dropbox.com/s/fgg15qwebunmw5i/event-party.png?dl=1";
         break;
         case "domestinc":
         icon = "https://www.dropbox.com/s/k6mv0xwx9e129li/house.png?dl=1";
         break;
         case "tech":
         icon = "https://www.dropbox.com/s/5frqqae6u70iy61/business-computer-work.png?dl=1";
         break;
         case "business":
         icon = "https://www.dropbox.com/s/7m0hwmq98wx15zg/business-research.png?dl=1";
         break;
         case "creative":
         icon = "https://www.dropbox.com/s/i2wjeigzjetjh99/creative-writing.png?dl=1";
         break;
         default:
         icon = "https://www.dropbox.com/s/dfjpx65j5v3wlih/pirates.png?dl=1";
         break;
    }
    return (
        <Marker key={ref} ref={ref}
                icon={icon}
                position={position}
                title={marker.title}
                onClick={this.open.bind(this, marker)}
                defaultAnimation={2}
                >
                {<InfoWindow key={`infoWindow_${index}`} position={position} ref={`infoWindow_${index}`}>
                <div className="infoWindow">{marker.value + "$"}</div>
                </InfoWindow>}
                {this.state.openedMissions.indexOf(marker.id.objectId) > -1 ? this.renderMissionInfo(ref, marker) : null}
        </Marker>
    );
    }
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
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mission Brief</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {<ClickedMission marker={this.state.clickedMission}/>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={2} xsOffset={8}>
                            <form onSubmit={this.acceptMission}>
                                <ButtonInput type="submit" value="Accept"/>
                            </form>
                        </Col>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
});


module.exports = Geolocation;

