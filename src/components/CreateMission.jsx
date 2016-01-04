var React = require('react');
var CreateMissionForm = require('./CreateMissionForm.jsx');

var CreateMission = React.createClass({
    render: function() {
        return (
        <div>
        <h1>This is pertaining to missions...</h1>
            <CreateMissionForm />
        </div>
        )
    }
});



module.exports = CreateMission;