var React = require('react');
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var CreateMissionForm = require('./CreateMissionForm.jsx');
var HomeScreenButton = require('./HomeScreenButton.jsx');

var Menu = React.createClass({

    render: function() {
        return (
    <div>
        <div className="row">
            
                <Nav bsStyle="pills" justified onSelect={this.props.onChange}> 
                  <NavItem eventKey={1}>Profile</NavItem>
                  <NavItem eventKey={2}>Inbox</NavItem>
                  <NavItem eventKey={'home'}>
                  
                  {
                      this.props.location === 'home' ? <CreateMissionForm user={this.props.user}/> :
                      <HomeScreenButton />
                  }

                  </NavItem>
                  <NavItem eventKey={3}>Missions</NavItem>
                  <NavItem eventKey={4}>Settings</NavItem>
                </Nav>
            
        </div>
            <button className="btn btn-danger btn-md btn-block" onClick={this.logOut}>Log Out</button>
    </div>
        )
    }
})

module.exports = Menu;