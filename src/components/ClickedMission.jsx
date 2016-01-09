var React = require('react');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Panel = require('react-bootstrap').Panel;
var Accordion = require('react-bootstrap').Accordion;
var Label = require('react-bootstrap').Label;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var ShowMissions = React.createClass({

    render: function() {

        var title = (<h1>Your Missions</h1>);
        var title2 = (<h1>Accepted Missions</h1>);
        var c = this.props.marker;
        return (
            <div>
                    <Row>
                        <Col xs={12}>
                                    <Panel header={c.title}>
                                        <ListGroup fill>
                                            <ListGroupItem><Label bsStyle="info">Brief:</Label> <span id="missionInfo">{c.description}</span></ListGroupItem>
                                            <ListGroupItem><Label bsStyle="danger">Value:</Label> <span id="missionInfo">{c.value}</span></ListGroupItem>
                                            <ListGroupItem><Label bsStyle="warning">Final Score:</Label> <span id="missionInfo">{c.score}</span></ListGroupItem>
                                        </ListGroup>
                                    </Panel>
                        </Col>

                    </Row>
            </div>
        );
    }
});

module.exports = ShowMissions;