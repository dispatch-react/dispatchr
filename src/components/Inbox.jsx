var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Panel = require('react-bootstrap').Panel;
var Label = require('react-bootstrap').Label;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var Inbox = React.createClass({
    mixins: [ParseReact.Mixin],
    getInitialState: function() {
        return {
      text: '',
      writtenTo: ''
        }
    },
    sendMessage: function(e) {
            var nthis = this;
            var att;
            e.preventDefault();
            var fileUpload = this.refs.fileUpload.getInputDOMNode().files;
            
            // Define function to post a mission
            
            function sendMessage() {
            
              var creator = ParseReact.Mutation.Create('Messages', {
                content: nthis.state.text,
                attachment: att,
                createdBy: nthis.props.user,
                writtenTo: ''
            });

            // ...and execute it
            creator.dispatch().then(function(res){
                alert('message sent')
            },
            function(error){
                alert('there was an error, check your self')
            });
        }
            //Check for uploaded file and call sendMsg either way

            if (fileUpload.length === 0) {
                var att = null;
                sendMessage();
                
            }
            else {
                var file = fileUpload[0];
                att = new Parse.File("attach", file);
                att.save().then(function(){
                    sendMessage();
                });
            }
        
    },
    observe: function() {
        return {
            inbox: (new Parse.Query("Messages")).equalTo("writtenTo", this.props.user).ascending('createdAt'),
        };
    },
    render: function() {
       var title = (<h1>Inbox</h1>);
       var attachment = (<h2>attachmentGoesHere</h2>);
        
        return (
            
            
            
    <div id="viewContent">
    
        {/* Begin the inbox section*/}
    
        <Panel header={title} bsStyle="success">
            <Row>
                <Col xs={12}>
                        {this.data.inbox.map(function(c) {
                <Panel key={c.objectId}>
                    <ListGroup fill>
                        <ListGroupItem><Label bsStyle="info">{c.createdBy.u_name}</Label> <span id="msgInfo">{c.content}</span></ListGroupItem>
                    </ListGroup>
                </Panel>
                        })}
                </Col>
            </Row>
        </Panel>
        
        {/* Begin the send message function*/}
        
        <Row>
            <Col xs={12}>
            <form onSubmit={this.sendMessage}>
                <Row>
                    <Col xs={12}>
                        <Input type="textarea" label="Compose" placeholder="send a message..."
                          onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                        <Input type="file" refs="fileUpload" label="File" />
                    </Col>
                    <Col xs={4} xsOffset={4}>
                         <Button bsStyle="primary" type="submit">Send</Button>
                    </Col>
                </Row>
            </form>     
            </Col>
        </Row>
    </div>
    
        )
    
  }
});



module.exports = Inbox;