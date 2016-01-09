var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var Button = require('react-bootstrap').Button;

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var Settings = React.createClass({
    updateSetting: function(e) {
        var nthis= this;
        var target = {
                className: '_User',
                objectId: nthis.props.user.objectId
            };
            var changes = {
                column_name: "new_value"
            };
            var updater = ParseReact.Mutation.Set(target, changes)
            updater.dispatch().then(function(res) {
                    alert('settings we updated')
                },
                function(error) {
                    alert('bad file')
                })
    },
    render: function() {
        return (
                    <Row>
                       <Col xs={10}>
                           <Button bsStyle="warning" onClick={this.props.logOut}>Log Out</Button>
                       </Col>
                    </Row>
    )}
});

module.exports = Settings;