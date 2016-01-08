var React = require('react');

var Autocomplete = React.createClass({
    setupInput() {
        var input = this.refs.searchField;
        var autocomplete = new google.maps.places.Autocomplete(input);
     
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            var place = autocomplete.getPlace();
            // document.getElementById('city2').value = place.name;
            this.refs.lat.value = place.geometry.location.lat();
            this.refs.lng.value = place.geometry.location.lng();
         });
     },
     componentDidMount() {
        this.setupInput();
     },
     handleChange(e){
        this.setState({
            location: e.target.value
        })
    },
     render: function() {
       return (
           <div>
               <input ref='searchField' type="text" size="50" onChange={this.handleChange} addonBefore="Start Location" placeholder="Enter a Location"/>
               <input type="text" ref="lat" name="cityLat"/>
               <input type="text" ref="lng" name="cityLng" />  
           </div>
           );
   }
   });



module.exports = Autocomplete;