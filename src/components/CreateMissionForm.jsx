var React = require('react');
var Parse = require('parse');

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
                description: '',
                carReq: false,
                type: ''
                
                
            };
        },
        handleTitleChange: function(e) {
        this.setState({
            title: e.target.value
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

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Create Mission
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Mission Brief</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
              <form>
    <Input type="text" label="Mission title" onChange={this.handleTitleChange} />
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
    <ButtonInput value="Save" />
    
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