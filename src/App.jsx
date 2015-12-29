var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
Parse.initialize("ttJuZRLZ5soirHP0jetkbsdqSGR3LUzO0QXRTwFN", "BDmHQzYoQ87Dpq0MdBRj9er20vfYytoh3YF5QXWd");

var Home = require('./components/Home.jsx');
var Login = require('./components/Login.jsx');


var App = React.createClass({
    observe: function() {
        return {
            user: ParseReact.currentUser
        };
    },
    render: function() {
        if (this.data.user) {
            return (
                <div>
                {/*Pass the user data to Home*/}
                <Home user={this.data.user}/>
            </div>
            )
        }
        else {
            <Login />
        }
    }
});



ReactDOM.render(<App />, document.getElementById('app'));
