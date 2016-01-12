var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Panel = require('react-bootstrap').Panel;
var Label = require('react-bootstrap').Label;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Pagination = require('react-bootstrap').Pagination;
var Pager = require('react-bootstrap').Pager;
var PageItem = require('react-bootstrap').PageItem;

var ShowMissions = React.createClass({
    mixins: [ParseReact.Mixin],
    //Check parse-react documentation
    //Pass the state to observe
    //https://github.com/ParsePlatform/ParseReact/blob/master/docs/api/Mixin.md
    observe: function(currentProps, currentState) {
        const skip = currentState.limit * (currentState.activePage - 1);
        console.log(skip);
        return {
            userOwnMissions: (new Parse.Query("Missions")).equalTo("createdBy", this.props.user).ascending('createdAt').skip(skip).limit(this.state.limit),
            userActiveMissions: (new Parse.Query("Missions")).equalTo("acceptedBy", this.props.user).equalTo("status", "active").skip(skip).limit(this.state.limit),
            userCompletedMissions: (new Parse.Query("Missions")).equalTo("acceptedBy", this.props.user).equalTo("status", "complete").ascending('createdAt').skip(skip).limit(this.state.limit)
        };
    },
    getInitialState(){
        return {
            limit: 2,
            activePage: 1
        }
    },
    handleSelect(event, selectedEvent) {
        console.log('selected', selectedEvent.eventKey);
        if (selectedEvent.eventKey !== this.state.activePage) {
            this.setState({
                activePage: selectedEvent.eventKey
            });
        }

    },
    renderPagination(){
        return (
            <Pagination
                prev
                next
                first
                last
                bsSize="medium"
                ellipsis
                items={10}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.handleSelect} />
        )
    },
    render: function() {
        var self = this;
        var ownMissionsTitle = (<h1 className="panelTitle">Your Missions</h1>);
        var activeTitle = (<h1 className="panelTitle">Active Missions</h1>);
        var completedMissionsTitle = (<h1 className="panelTitle">Complete Missions</h1>);
        
        return (
            <div id="viewContent">
        <Panel collapsible defaultExpanded header={activeTitle} bsStyle="danger">
            <Row>
                <Col xs={12}>
                        {this.data.userActiveMissions.map(function(c) {
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
            
        <Panel collapsible header={ownMissionsTitle} bsStyle="info">
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
                    {this.renderPagination()}
                </Col>
            </Row>
        </Panel>
        
        <Panel collapsible header={completedMissionsTitle} bsStyle="success">
            <Row>
                <Col xs={12}>
                        {this.data.userCompletedMissions.map(function(c) {
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