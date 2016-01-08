var React = require('react');

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