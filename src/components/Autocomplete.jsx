var React = require("react");
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var FormControls = require('react-bootstrap').FormControls;
var Autocomplete = require('./Autocomplete.jsx');


// var Autocomplete = React.createClass({
//     getInitialState(){
//         return {
//             location: ""
//         }
//     },
//     handleChange(e){
//         this.setState({
//             location: e.target.value
//         })
//     },
//     render: function () {
//         return (
//             <div>
//                 <input id="autocomplete" type="text" onChange={this.handleChange} />
//             </div>
//         )
//     }
// });

var Autocomplete = React.createClass({
    // getInitialState: function() {
    //     return {
    //         showModal: true
    //     }
    // },
    componentDidMount: function() {
        var reactId= this.refs.autocomplete;
        new google.maps.places.Autocomplete(reactId);
    },
    render: function() {
        return (
        <Input ref="autocomplete" type="text" label="" addonBefore="Start Location" autocomplete="on" />
            )
    }

});


module.exports = Autocomplete;