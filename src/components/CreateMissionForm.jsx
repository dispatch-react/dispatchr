var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
Parse.initialize("ttJuZRLZ5soirHP0jetkbsdqSGR3LUzO0QXRTwFN", "BDmHQzYoQ87Dpq0MdBRj9er20vfYytoh3YF5QXWd");

var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var FormControls = require('react-bootstrap').FormControls;
var Col = require('react-bootstrap').Col;

var Autocomplete = require('./Autocomplete.jsx');


var CreateMissionForm = React.createClass({

    getInitialState() {
            return {
                showModal: false,
                title: '',
                value: '',
                lat: '',
                lng: '',
                description: '',
                carReq: false,
                remote: false,
                category: '',
                type: ''
            };
        },

        handleTitleChange: function(e) {
        this.setState({
            title: e.target.value
        });
    },
        handleValueChange: function(e) {
        this.setState({
            value: e.target.value
        });
    },
        handleDescriptionChange: function(e) {
            this.setState({
                description: e.target.value
        });
    },
        handleCarReqChange: function(e) {
            this.setState({
                carReq: !this.state.carReq
        });
    },
        handleRemoteChange: function(e) {
            this.setState({
                remote: !this.state.remote
        });
    },
        handleCategoryChange: function(e) {
        this.setState({
            category: e.target.value
        })
    },
        handleTypeChange: function(e) {
        this.setState({
            type: e.target.value
        })
    },
        handleStartLocationChange: function(e) {
            this.setState({
                lat: e.latitude,
                lng: e.longitude
            })
        },
        handleFormSubmit: function(e) {
            e.preventDefault();
            var self = this;
            var att;
            var loc = new Parse.GeoPoint({latitude: this.state.lat, longitude: this.state.lng});
            var fileUpload = this.refs.fileUpload.getInputDOMNode().files;
            
            // Define function to post a mission
            
            function postMission() {
            
              var creator = ParseReact.Mutation.Create('Missions', {
                title: self.state.title,
                value: self.state.value,
                startLocationGeo: loc,
                description: self.state.description,
                category: self.state.category,
                type: self.state.type,
                carReq: self.state.carReq,
                remote: self.state.remote,
                missionAttachment: att,
                createdBy: self.props.user,
                status: "open"
            });

            // ...and execute it
            creator.dispatch().then(function(res){
                console.log("res")
            },
            function(error){
                alert('there was an error, check your self')
            });
        }
            //Check for uploaded file and call postMission either way

            if (fileUpload.length === 0) {
                att = null;
                this.close();
                postMission();
                
            }
            else {
                var file = fileUpload[0];
                att = new Parse.File("attach", file);
                att.save().then(function(){
                    this.close();
                    postMission();
                    
                });
            }
        },
        close() {
            this.setState({
                showModal: false
            });
        },
        open() {
            this.setState({
                showModal: true

            // }, ()=>{
            //      var reactId= this.refs.autocomplete.getInputDOMNode();
            // new google.maps.places.Autocomplete(reactId);

            // });
        });
        },

        render: function() {
                var typeOptions;
                
                var drivingOptions = (  <Input type="select" label="Type" placeholder="Type" labelClassName="col-xs-2" wrapperClassName="col-xs-4" onChange={this.handleCategoryChange}>
                                        <option value="driving">Goods Delivery</option>
                                        <option value="events">Food Delivery</option>
                                        <option value="domestic">Taxi</option>
                                        <option value="tech">Moving</option>
                                        </Input>)
                var eventsOptions = (   <Input type="select" label="Type" placeholder="Type" labelClassName="col-xs-2" wrapperClassName="col-xs-4" onChange={this.handleCategoryChange}>
                                        <option value="entertainment">Entertainment</option>
                                        <option value="planning">Planning</option>
                                        <option value="staffing">Staffing</option>
                                        </Input>)
                var domesticOptions = ( <Input type="select" label="Type" placeholder="Type" labelClassName="col-xs-2" wrapperClassName="col-xs-4" onChange={this.handleCategoryChange}>
                                        <option value="repair">Entertainment</option>
                                        <option value="cleaning">Cleaning</option>
                                        <option value="cooking">Cooking</option>
                                        <option value="painting">Painting</option>
                                        <option value="renovation">Renovation</option>
                                        <option value="aesthetics">Aesthetics</option>
                                        </Input>)
                var techOptions = (   <Input type="select" label="Type" placeholder="Type" labelClassName="col-xs-2" wrapperClassName="col-xs-4" onChange={this.handleCategoryChange}>
                                        <option value="coding">Coding</option>
                                        <option value="webDesign">Web Design</option>
                                        <option value="techEditing">Editing</option>
                                        <option value="techSupport">Support</option>
                                        </Input>)
                var businessOptions = ( <Input type="select" label="Type" placeholder="Type" labelClassName="col-xs-2" wrapperClassName="col-xs-4" onChange={this.handleCategoryChange}>
                                        <option value="research">Research</option>
                                        <option value="sales">Sales</option>
                                        <option value="dataEntry">Data Entry</option>
                                        <option value="networking">Networking</option>
                                        <option value="businessTesting">Testing</option>
                                        </Input>)
                var creativeOptions = ( <Input type="select" label="Type" placeholder="Type" labelClassName="col-xs-2" wrapperClassName="col-xs-4" onChange={this.handleCategoryChange}>
                                        <option value="writing">Writing</option>
                                        <option value="photography">Photography</option>
                                        <option value="film">Film</option>
                                        <option value="creativeEditing">Editing</option>
                                        <option value="creativeDesign">Design</option>
                                        </Input>)
            {
                    this.state.category === "events" ?  typeOptions = eventsOptions:
                    this.state.category === "domestic" ? typeOptions = domesticOptions:
                    this.state.category === "tech" ? typeOptions = techOptions:
                    this.state.category === "business" ? typeOptions = businessOptions:
                    this.state.category === "creative" ? typeOptions = creativeOptions:
                    typeOptions = drivingOptions
                    
            }
                    
            return (
                <div>
        <img onClick={this.open} src="../src/img/logo-med.png" id="nav-icon"/>

        <Modal show={this.state.showModal} onHide={this.close}>
          <form onSubmit={this.handleFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Dispatchr</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
              
    <Input type="text" placeholder="Mission Title" onChange={this.handleTitleChange} />
    <Input type="textarea" label="Mission description" placeholder="140 characters max" onChange={this.handleDescriptionChange}/>
    <Input type="text" onChange={this.handleValueChange} addonBefore="Set Bounty" addonAfter="$" />
    <Autocomplete setLocation={this.handleStartLocationChange} className="autocomplete"/>
    
    <Input type="select" label="Category" placeholder="Category" labelClassName="col-xs-2" wrapperClassName="col-xs-4" onChange={this.handleCategoryChange}>
      <option value="driving">Driving</option>
      <option value="events">Events</option>
      <option value="domestic">Domestic</option>
      <option value="tech">Tech</option>
      <option value="business">Business</option>
      <option value="creative">Creative</option>
      <option value="other">Other</option>
    </Input>
    
    <Input type="checkbox" label="Car required" wrapperClassName="col-xs-6" onClick={this.handleCarReqChange} checked={this.state.carReq} />
    
    {typeOptions}
    
    <Input type="checkbox" label="Remote Work" wrapperClassName="col-xs-6" onClick={this.handleRemoteChange} checked={this.state.remote} />
    
    <Input type="file" id="MissionAttachment" ref="fileUpload" placeholder="attachment" help="[Optional]" />
    
            </Modal.Body>
          <Modal.Footer>
            <Col xs={2}>
                <ButtonInput type="reset" value="Reset"/>
            </Col>
            <Col xs={2} xsOffset={7}>    
                <ButtonInput bsStyle="success" type="submit" value="Dispatch!" />
            </Col>
          </Modal.Footer>
          
          </form>
        </Modal>
      </div>
            );
        }
});

module.exports = CreateMissionForm;