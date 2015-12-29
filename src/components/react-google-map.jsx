var React = require('react');
var gmap = require("react-google-maps");


var SimpleMap = React.createClass ({
    render: function(){
  return (
    <section style={{height: "100%"}}>
      <gmap.GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: "100%",
            }} 
          />
        }
        googleMapElement={
          <gmap.GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{lat: -25.363882, lng: 131.044922}}
            >
          </gmap.GoogleMap>
        }
      />
    </section>
  )}
})

module.exports = SimpleMap;