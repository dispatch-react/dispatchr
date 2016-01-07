var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Panel = require('react-bootstrap').Panel;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var ShowMissions = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        console.log(this.props.user);
        return {
            userOwnMissions: (new Parse.Query("Missions")).equalTo("createdBy", this.props.user.objectId).ascending('createdAt'),
            usersAcceptedMissions: (new Parse.Query("Missions")).equalTo("acceptedBy", this.props.user.objectId).ascending('createdAt'),
        };
    },
    
    render: function() {
        
        var title = (<h1>Missions</h1>);
        
        return (
        <Panel header={title} bsStyle="danger">
            <Row>
                <Col xs={12} md={8}>
                    <ListGroup>
                        {this.data.userOwnMissions.map(function(c) {
                          return <ListGroupItem><p>{c.title}</p><p>{c.description}</p></ListGroupItem>;
                            })}
                    </ListGroup>
                    
                    <ListGroup>
                        {this.data.userAcceptedMissions.map(function(c) {
                          return <ListGroupItem><p>{c.title}</p><p>{c.description}</p></ListGroupItem>;
                            })}
                    </ListGroup>
                </Col>
            </Row>
        </Panel>
        )
    }
});

module.exports = ShowMissions;