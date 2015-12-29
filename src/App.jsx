var React = require('react');
var ReactDOM = require('react-dom');

var Home = require('../components/Home.jsx');


var App = React.createClass({
    render: function(){
        return(
            <div>
                {/*Pass the user data to Home*/}
                <Home  />
            </div>
        )
    }
});



ReactDOM.render(<App />, document.getElementById('app'));
