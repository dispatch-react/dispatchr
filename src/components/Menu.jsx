var React = require('react');
var CreateMissionForm = require('./CreateMissionForm.jsx');
var HomeScreenButton = require('./HomeScreenButton.jsx');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Badge = require('react-bootstrap').Badge;

var Menu = React.createClass({

    render: function() {
        return (
                <Nav bsStyle="pills" justified onSelect={this.props.onChange}> 
                  <NavItem eventKey={1}><span className="fa fa-user fa-3x"></span>Profile</NavItem>
                  <NavItem eventKey={2}><Badge bsStyle="danger" pullRight>11</Badge><span className="fa fa-comments fa-3x"></span>Inbox</NavItem>
                  <NavItem eventKey={'home'}>
                  {
                      this.props.location === 'home' ? <CreateMissionForm user={this.props.user}/> :
                      <HomeScreenButton />
                  }
                  </NavItem>
                  <NavItem eventKey={3}><span className="fa fa-map-marker fa-3x"></span>Missions</NavItem>
                  <NavItem eventKey={4}><span className="fa fa-gear fa-3x"></span>Settings</NavItem>
                </Nav>
        )
    }
})

module.exports = Menu;