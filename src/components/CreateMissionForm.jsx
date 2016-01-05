var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
Parse.initialize("ttJuZRLZ5soirHP0jetkbsdqSGR3LUzO0QXRTwFN", "BDmHQzYoQ87Dpq0MdBRj9er20vfYytoh3YF5QXWd");

var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var FormControls = require('react-bootstrap').FormControls;


var CreateMissionForm = React.createClass({

    getInitialState() {
            return {
                showModal: false,
                title: '',
                value: 0,
                startDate: '',
                endDate: '',
                startLocation: '',
                endLocation: '',
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
        handleStartDateChange: function(e) {
            this.setState({
                startDate: e.target.value
            });
        },
        handleEndDateChange: function(e) {
        this.setState({
            endDate: e.target.value
        });
    },
        handleStartLocationChange: function(e) {
        this.setState({
            startLocation: e.target.value
        });
    },
        handleEndLocationChange: function(e) {
        this.setState({
            endLocation: e.target.value
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
              var creator = ParseReact.Mutation.Create('Missions', {
                title: this.state.title,
                value: this.state.value,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                startLocation: this.state.startLocation,
                endLocation: this.state.endLocation,
                description: this.state.description,
                carReq: this.state.carReq
            });

            // ...and execute it
            creator.dispatch().then(function(res){
                alert('new mission created!')
            },
            function(error){
                alert('there was an error, check your self')
            });
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

        render() {

            return (
                <div>
        <Button onClick={this.open}><img src="../src/img/logo.png" id="nav-icon"/></Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Mission Brief</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
              <form onSubmit={this.handleFormSubmit}>
    <Input type="text" label="Mission title" onChange={this.handleTitleChange} />
    <Input type="text" label="Bounty" onChange={this.handleValueChange} addonBefore="$" addonAfter=".00" />
    <Input type="text" label="" onChange={this.handleStartDateChange} addonBefore="Start Date" />
    <Input type="text" label="" onChange={this.handleEndDateChange} addonBefore="End Date" help="[Optional]"/>
    <Input type="text" label="" onChange={this.handleStartLocationChange} addonBefore="Start Location" />
    <Input type="text" label="" onChange={this.handleEndLocationChange} addonBefore="End Location" help="[Optional]"/>
    <Input type="textarea" label="Mission description" placeholder="be descriptive!" onChange={this.handleDescriptionChange}/>
    <Input type="checkbox" label="Car required" onClick={this.handleCarReqChange} checked={this.state.carReq} />
    
    <Input type="select" label="Type" placeholder="select" onChange={this.handleTypeChange}>
      <option value="delivery">Delivery</option>
      <option value="online">Online</option>
      <option value="domestic">Domestic</option>
      <option value="creative">Creative</option>
    </Input>
    
    <Input type="file" label="File" help="[Optional]" />
    
    <ButtonInput type="submit" value="Create" />
    <ButtonInput type="reset" value="Reset" />
    
  </form>

            </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
            );
        }
});

module.exports = CreateMissionForm;