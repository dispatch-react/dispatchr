var React = require('react');

var Profile = React.createClass({
    getInitialState: function() {
        return {
        userData: this.props.user
        }
    },
    render: function() {
        return(
    <div className="row">
        <h1>Profile</h1>
        <img id="profile-pic" src="http://files.parsetfss.com/334e1198-ecc2-49e6-9341-5d88a891b5c0/tfss-3819fc4d-94d8-4de8-b2f9-b4b7af11e8ed-dot.jpg" />
        <p>{this.props.user.email}</p>
         <p>{this.props.user.u_name}</p>
          <p>{this.props.user.userLocation}</p>
           <p>{this.props.user.email}</p>
            <p>{this.props.user.email}</p>
             <p>{this.props.user.email}</p>
    </div>
        )
    }
});



module.exports = Profile;