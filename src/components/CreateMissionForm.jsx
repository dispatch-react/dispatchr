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
                category: 'construction, trades',
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
                console.log('found attachment')
                var file = fileUpload[0];
                att = new Parse.File("attach", file);
                att.save().then(function(){
                    self.close();
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
        });
        },

        render: function() {

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
    
    <Input type="select" label="Category" labelClassName="col-xs-2" wrapperClassName="col-xs-5" onChange={this.handleCategoryChange}>
      <option readOnly>-Select a Category-</option>
      <option value="construction, trades">Construction, Trades</option>
      <option value="bar, food, hospitality">Bar, Food, Hospitality</option>
      <option value="housekeeping, childcare">Housekeeping, Childcare</option>
      <option value="driver, delivery">Driver, Delivery</option>
      <option value="gigs">Gigs</option>
      <option value="general labour">General Labour</option>
      <option value="other">Other</option>
    </Input>
    
    <Input type="checkbox" label="Car required" wrapperClassName="col-xs-6" onChange={this.handleCarReqChange} checked={this.state.carReq} />

    <Input type="checkbox" label="Remote Work" wrapperClassName="col-xs-6" onChange={this.handleRemoteChange} checked={this.state.remote} />
    
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