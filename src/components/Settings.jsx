var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var Button = require('react-bootstrap').Button;

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var Settings = React.createClass({
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