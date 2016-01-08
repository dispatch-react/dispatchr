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
                description: '',
                carReq: false,
                type: '',
                createdBy: this.props.user.id
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
        selectChangeHandler: function(e) {
        this.setState({
            type: e.target.value
        })
    },
        handleFormSubmit: function(e) {
            var nthis = this
            e.preventDefault();
            var fileUpload = this.refs.fileUpload.getInputDOMNode().files;
            
            function postMission() {
            
              var creator = ParseReact.Mutation.Create('Missions', {
                title: nthis.state.title,
                value: nthis.state.value,
                type: nthis.state.type,
                description: nthis.state.description,
                carReq: nthis.state.carReq,
                missionAttachment: att,
                createdBy: nthis.props.user.objectId
            });

            // ...and execute it
            creator.dispatch().then(function(res){
                alert('new mission created!')
            },
            function(error){
                alert('there was an error, check your self')
            });
        }

            if (fileUpload.length === 0) {
                var att = null;
                postMission();
            }
            else {
                var file = fileUpload[0];
                att = new Parse.File("attach", file);
                att.save().then(function(){
                    postMission();
                    nthis.close();
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
// <Input ref="autocomplete" type="text" label="" addonBefore="Start Place" autocomplete="on" />
        render() {

            return (
                <div>
        <img onClick={this.open} src="../src/img/logo-med.png" id="nav-icon"/>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Mission Brief</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
              <form onSubmit={this.handleFormSubmit}>
    <Input type="text" label="Mission title" onChange={this.handleTitleChange} />
    <Input type="text" label="Bounty" onChange={this.handleValueChange} addonBefore="$" addonAfter=".00" />
    <Input type="text" label="" onChange={this.handleStartLocationChange} addonBefore="Start Location" />
    <Input type="textarea" label="Mission description" placeholder="be descriptive!" onChange={this.handleDescriptionChange}/>
    
    <Input type="select" label="Type" placeholder="select" labelClassName="col-xs-2" wrapperClassName="col-xs-4" onChange={this.handleTypeChange}>
      <option value="delivery">Delivery</option>
      <option value="online">Online</option>
      <option value="domestic">Domestic</option>
      <option value="creative">Creative</option>
    </Input>
    
    <Input type="checkbox" label="Car required" wrapperClassName="col-xs-6" onClick={this.handleCarReqChange} checked={this.state.carReq} />
    
    <Input type="file" id="MissionAttachment" ref="fileUpload" label="File" help="[Optional]" />
    
  </form>

            </Modal.Body>
          <Modal.Footer>
            <Col xs={2} xsOffset={8}>
                <ButtonInput type="reset" value="Reset" />
            </Col>
            <Col xs={2}>    
                <ButtonInput type="submit" value="Create" />
            </Col>
          </Modal.Footer>
        </Modal>
      </div>
            );
        }
});



module.exports = CreateMissionForm;