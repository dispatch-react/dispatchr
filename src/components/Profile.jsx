var React = require('react');

var Button = require('react-bootstrap').Button;
var Image = require('react-bootstrap').Image;
var Panel = require('react-bootstrap').Panel;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Label = require('react-bootstrap').Label;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var Profile = React.createClass({

    render: function() {
        var title = (<h1>Profile</h1>);
        return(
    <div>
        <Panel header={title} bsStyle="danger">
            <Row>
            <Col xs={12} md={8}>
                <ListGroup>
                    <ListGroupItem><Label>username:</Label> <span id="userInfo">{this.props.user.u_name}</span></ListGroupItem>
                    <ListGroupItem><Label bsStyle="info">email:</Label> <span id="userInfo">{this.props.user.email}</span></ListGroupItem>
                    <ListGroupItem><Label bsStyle="warning">rating:</Label> <span id="userInfo">{this.props.user.ratingScore}</span></ListGroupItem>
                    <ListGroupItem><Label bsStyle="primary">Hometown:</Label> <span id="userInfo">{this.props.user.Hometown}</span></ListGroupItem>
                </ListGroup>
            </Col>
    
            <Col xs={12} md={4}>
                <Image id="profile-pic" src={this.props.user.profile_pic._url} rounded/>
                     <p>
                         <Button bsStyle="default" id="updatePhoto">Update Photo</Button>
                    </p>
            </Col>  
            </Row>
        </Panel>
    </div>
        )
    }
});



module.exports = Profile;