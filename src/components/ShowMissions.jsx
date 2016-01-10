var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Panel = require('react-bootstrap').Panel;
var Label = require('react-bootstrap').Label;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var ShowMissions = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        return {
            userOwnMissions: (new Parse.Query("Missions")).equalTo("createdBy", this.props.user).ascending('createdAt'),
            userAcceptedMissions: (new Parse.Query("Missions")).equalTo("acceptedBy", this.props.user).ascending('createdAt'),
        };
    },
    
    render: function() {
        
        var title = (<h1>Your Missions</h1>);
        var title2 = (<h1>Accepted Missions</h1>);
        
        return (
            <div>
        <Panel header={title} bsStyle="success">
            <Row>
                <Col xs={12}>
                        {this.data.userOwnMissions.map(function(c) {
                          return(
    <Panel collapsible key={c.objectId} header={c.title}>
        <ListGroup fill>
            <ListGroupItem><Label bsStyle="info">Brief:</Label> <span id="missionInfo">{c.description}</span></ListGroupItem>
            <ListGroupItem><Label bsStyle="danger">Value:</Label> <span id="missionInfo">{c.value}</span></ListGroupItem>
            <ListGroupItem><Label bsStyle="warning">Final Score:</Label> <span id="missionInfo">{c.score}</span></ListGroupItem>
        </ListGroup>
    </Panel>
                            );
                        })}
                </Col>
            </Row>
        </Panel>
        
        <Panel header={title2} bsStyle="danger">
            <Row>
                <Col xs={12}>
                        
                        {this.data.userAcceptedMissions.map(function(c) {
                          return(
    <Panel collapsible key={c.objectId} header={c.title}>
        <ListGroup fill>
            <ListGroupItem><Label bsStyle="info">Brief:</Label> <span id="missionInfo">{c.description}</span></ListGroupItem>
            <ListGroupItem><Label bsStyle="danger">Value:</Label> <span id="missionInfo">{c.value}</span></ListGroupItem>
            <ListGroupItem><Label bsStyle="warning">Final Score:</Label> <span id="missionInfo">{c.score}</span></ListGroupItem>
        </ListGroup>
    </Panel>
                            );
                        })}
                       
                </Col>
            </Row>
        </Panel>
    </div>
        );
    }
});
module.exports = ShowMissions;