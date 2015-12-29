var React = require('react');
var Parse = require('parse');

var Login = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            password: '',
            confPw: '',
            login: true
        };
    },

    handleEmailChange: function(e) {
        this.setState({
            email: e.target.value
        });
    },
    handlePasswordChange: function(e) {
        this.setState({
            password: e.target.value
        });
    },
    handleConfPasswordChange: function(e) {
        this.setState({
            confPw: e.target.value
        });
    },
    handleTypeChange: function(e) {
        this.setState({
            login: !this.state.login
        });
    },

    /*LogIn Function*/

    logIn: function(e) {
        e.preventDefault();
        Parse.User.logIn(this.state.email, this.state.password).then(function(user) {
            alert('welcome back!');
        }, function(user, error) {
            alert('bad login, check your inputs');
        });
    },

    /* SignUp Function */

    signUp: function(e) {
        e.preventDefault();
        console.log('called signUp function' + this.refs);
        var user = new Parse.User();
        user.set("username", this.state.email);
        user.set("password", this.state.password);
        user.set("email", this.state.email);

        user.signUp(null, {
            success: function(user) {
                // Hooray! Let them use the app now.
                alert('you have signed up succesfully');
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },

    /*Rendering the Login Page OR Register, based on this.state.login*/

    render: function() {
        if (this.state.login) {
            return (
        <div className="well clearfix">
            <h2>Welcome to the Login Screen</h2>
        
            {/* This is the login area! */}
        
         <form className="form-horizontal" onSubmit={this.logIn}>
         
        {/*EMAIL AND PASSWORD FIELDS*/}
        
    <div className="input-group">
      <span className="input-group-addon"><i className="fa fa-at"></i></span>
      <input type="text" className="form-control" placeholder=" Email" id="formEmail" onChange={this.handleEmailChange}></input>
    </div>

    <div className="input-group">
      <span className="input-group-addon"><i className="fa fa-key"></i></span>
      <input type="text" className="form-control" placeholder=" Password" id="formPw" onChange={this.handlePasswordChange}></input>
    </div>
    
        <br/> {/*BUTTONS TO LOGIN OR GO TO REGISTRATION*/}
      
        <button className="btn btn-success btn-md btn-block" id="signIn-btn" type="submit">Sign In
          <span className="fa fa-sign-in"></span>
        </button>
        
        <button className="btn btn-info btn-md btn-block" id="register-btn" onClick={this.handleTypeChange}>Create
          <span className="fa fa-user-plus"></span>
        </button>

      </form>
      
      </div>)
        }
        else {
            /*RENDERING THE REGISTER PAGE*/

            return (
                <div className="well clearfix">

      <h2>So glad you're joining us!</h2>
        
            {/* This is the signUp area! */}
        
      <form onSubmit={this.signUp} className="form-horizontal">
         
        {/*EMAIL AND PASSWORD FIELDS*/}
    
    <div className="input-group">
      <span className="input-group-addon"><i className="fa fa-at"></i></span>
      <input type="text" className="form-control" placeholder=" Email" id="formEmail" onChange={this.handleEmailChange}></input>
    </div>

    <div className="input-group">
      <span className="input-group-addon"><i className="fa fa-key"></i></span>
      <input type="text" className="form-control" placeholder=" Password" id="formPw" onChange={this.handlePasswordChange}></input>
    </div>
    
    <div className="input-group" id="pwConfirm">
      <span className="input-group-addon"><i className="fa fa-key"></i></span>
      <input type="text" className="form-control" placeholder=" Confirm Password" onChange={this.handleConfPasswordChange}></input>
    </div>
    
        <br/> {/*BUTTONS TO REGISTER*/}
        
        <button className="btn btn-info btn-md btn-block" id="register-btn" type="submit">Sign Up
          <span className="fa fa-user-plus"></span>
        </button>
        
        {/* Button to go back */}
        <button className="btn btn-warning btn-md btn-block" id="back-to-login" onClick={this.handleTypeChange}>Go back
          <span className="fa fa-sign-in"></span>
        </button>

      </form>
      
      </div>);
        }
    }
});



module.exports = Login;