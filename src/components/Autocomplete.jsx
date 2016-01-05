var React = require("react");

var Autocomplete = React.createClass({
    getInitialState(){
        return {
            location: ""
        }
    },
    handleChange(e){
        this.setState({
            location: e.target.value
        })
    },
    render: function () {
        return (
            <div>
                <input id="autocomplete" type="text" onChange={this.handleChange} />
            </div>
        )
    }
});

module.exports = Autocomplete;