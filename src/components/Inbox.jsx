var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonInput = require('react-bootstrap').ButtonInput;
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
            messageType: 'reply',
            recipient: '',
            recipientUserName: 'No user selected...'
        }
    },
    setRecipientMissionReply: function(userObj, userName, missionLink) {
        this.setState({
            recipient: userObj,
            recipientUserName: userName,
            messageType: 'acceptedReply',
            missionLink: missionLink
        })
    },
    handleBodyChange: function(e) {
        this.setState({
            text: e.target.value
        })
    },

    sendMessage: function(e) {
        e.preventDefault();
        var nthis = this;
        var att;
        var fileUpload = this.refs.fileUpload.getInputDOMNode().files;

        // get Recipient function

        // function findRecipient(element, index, array) {
        //     console.log(nthis.state.writtenTo);
        //     console.log(element.userName);
        //     nthis.state.writtenTo === element.userName || nthis.state.writtenTo === element.email
        // }

        // var recipient = this.data.contacts.find(findRecipient);

        // Define function to post a mission

        function sendMessage() {

            var creator = ParseReact.Mutation.Create('Messages', {
                content: nthis.state.text,
                attachment: att,
                createdBy: nthis.props.user,
                writtenTo: nthis.state.recipient,
                authorUserName: nthis.props.user.userName,
                authorEmail: nthis.props.user.email,
                type: nthis.state.messageType,
                missionLink: nthis.state.missionLink,
                read: false
            });
            // ...and execute it
            creator.dispatch().then(function(res) {
                    alert('message sent')
                    nthis.refs.formElement.reset();
                    nthis.setState({recipientUserName: 'No user selected...'})
                },
                function(error) {
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
            att.save().then(function() {
                sendMessage();
            });
        }

    },
    confirmMission: function(e) {
        if (e.target.value === "Accept") {
            // set status to active
        }
        else {
            //set status to open
        }
    },
    observe: function() {
        return {
            inbox: (new Parse.Query("Messages")).equalTo("writtenTo", this.props.user).descending('createdAt')

        };
    },
    render: function() {
        var self = this;
        var title = (<h1>Inbox</h1>);
        var Buttons;

        return (

            <div id="viewContent">
        
            {/* Begin the inbox section*/}
        
            <Panel header={title} bsStyle="success">
                <Row>
                    <Col xs={12}>
                            {this.data.inbox.map(function(c) {
                            console.log(c.createdBy)
                            if (c.type === "missionAccepted") {
                                Buttons = (
                                        
                                            <form onSubmit={self.confirmMission}>
                                                <Col xs={2}><ButtonInput bsStyle="danger" type="submit" value="Reject"/></Col>
                                                <Col xs={2}><ButtonInput bsStyle="success" type="submit" value="Accept"/></Col>
                                           </form>
                                          )
                            }
                            else {
                                Buttons = (<form onSubmit={self.messageChange}>
                                                <Col xs={2}><ButtonInput bsStyle="danger" type="submit" value="Delete"/></Col>
                                                <Col xs={2}><ButtonInput bsStyle="info" type="submit" value="Reply"/></Col>
                                            </form>)
                            }
                            
                            return (
                    <Panel key={c.objectId}>
                        <ListGroup fill>
                            <ListGroupItem>
                            <Row>
                                <Col xs={7}>
                                    <Label bsStyle="info" id="msgAuthor" onClick={self.setRecipientMissionReply.bind(self, c.createdBy, c.authorUserName, c.missionLink)}>{c.authorUserName}</Label> 
                                    <span id="msgInfo">{c.content}</span>
                                </Col>
                                    {Buttons}
                            </Row>
                            </ListGroupItem>
                                
                        
                        </ListGroup>
                                
                    </Panel>
                            )}
                        )}
                    </Col>
                </Row>
            </Panel>
            
            {/* Begin the send message function*/}
            
            <Row>
                <Col xs={12}>
                <form onSubmit={this.sendMessage} ref="formElement">
                    
                    <h1>Send a new message</h1>
                    <Row id="recipient">
                        <Col xs={2}>
                            <Label>To:</Label>
                        </Col>
                        <Col xs={10}>
                             <Label bsStyle="info">{this.state.recipientUserName}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Label>Message:</Label>
                        </Col>
                        <Col xs={10}>
                            <Input type="textarea" placeholder="Message Body" onChange={this.handleBodyChange} />     
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={10}>
                            <Input type="file" ref="fileUpload" label="Attachment (optional)" />
                        </Col>
                        <Col xs={2}>
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