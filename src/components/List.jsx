var React = require('react');
var ListItem = require('./ListItem.jsx');

//Dummy data for testing purposes
var words = [{"id": 1, "text": "Huston"}, {"id": 2, "text": "We Have"}, {"id": 3, "text": "No Problems"}];

var List = React.createClass({
    render: function () {
        var listItems = words.map(function(item){
            console.log(listItems);
            return <ListItem key={item.id} word={item.text} />
        });
        return (
            <ul>{listItems}</ul>
        )
    }
});

module.exports = List;