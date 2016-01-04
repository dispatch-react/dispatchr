var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
Parse.initialize("ttJuZRLZ5soirHP0jetkbsdqSGR3LUzO0QXRTwFN", "BDmHQzYoQ87Dpq0MdBRj9er20vfYytoh3YF5QXWd");

var Home = require('./components/Home.jsx');
var Login = require('./components/Login.jsx');
var Inbox = require('./components/Inbox.jsx');
var Settings = require('./components/Settings.jsx');
var ShowMissions = require('./components/ShowMissions.jsx');
var Profile = require('./components/Profile.jsx');
var Nav = require('./components/Nav.jsx');

var App = React.createClass({
    
    mixins: [ParseReact.Mixin],
    observe: function() {
        return {
            user: ParseReact.currentUser
        };
    },
    getInitialState: function() {
        return {
            location: 'home'
        }
    },
    navChanged: function(newValue) {
        this.setState({
            location: newValue
        });
    },
    render: function() {
        if (this.data.user) {
            if (this.state.location === 1){
                return (<div><Profile user={this.data.user}/><Nav onChange={this.navChanged} location={this.state.location}/></div>)
            }
            else if (this.state.location === 2) {
                return (<div><Inbox user={this.data.user}/><Nav onChange={this.navChanged} location={this.state.location}/></div>)
            }
            else if (this.state.location === 3) {
                return (<div><ShowMissions user={this.data.user}/><Nav onChange={this.navChanged} location={this.state.location}/></div>)
            }
            else if (this.state.location === 4) {
                return (<div><Settings user={this.data.user}/><Nav onChange={this.navChanged} location={this.state.location}/></div>)
            }
            else {
        return (
            <div>
                <Home user={this.data.user}/>
                <Nav onChange={this.navChanged} location={this.state.location} />
            </div>
            )
            }
        }
        else {
            return <Login />;
        }
    }
});



ReactDOM.render(<App />, document.getElementById('app'));
    
    