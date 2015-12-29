var React = require('react');

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




module.exports = App;