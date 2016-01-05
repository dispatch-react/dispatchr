var React = require('react');
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var CreateMissionForm = require('./CreateMissionForm.jsx');

var Menu = React.createClass({

    render: function() {
        return (
    <div>
        <div className="row">
            <div className="well clearfix col-md-4 col-md-offset-4">
                <Nav bsStyle="pills" justified onSelect={this.props.onChange}> 
                  <NavItem eventKey={1}>Profile</NavItem>
                  <NavItem eventKey={2}>Inbox</NavItem>
                  <NavItem eventKey={10}><CreateMissionForm user={this.props.user}/></NavItem>
                  <NavItem eventKey={3}>Missions</NavItem>
                  <NavItem eventKey={4}>Settings</NavItem>
                </Nav>
            </div>
        </div>
        <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <button className="btn btn-danger btn-md btn-block" onClick={this.logOut}>Log Out</button>
                </div>
        </div>
    </div>
        )
    }
})

module.exports = Menu;