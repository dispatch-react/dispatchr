var React = require('react');
var Parse = require('parse');
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

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
        console.log('called signUp')
        Parse.User.logIn(this.state.email, this.state.password).then(function(user) {
            //alert('welcome back!'); //ALERT will mess with the loading animation
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
        const wellStyles = {
            maxWidth: 400,
            margin: '0 auto 10px'
        };
        const spanStyles = {
            margin: '0 0 0 10px'
        };
        if (this.state.login) {
            return (
                <div className="row">
        <div className="well clearfix col-md-4 col-md-offset-4">
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

  <div className="well" style={wellStyles}>
    
    <Button bsStyle="success" bsSize="large" block disabled={!(this.state.email.length && this.state.password.length)} type="submit">Sign In
    <span className="fa fa-sign-in" style={spanStyles}></span>
    </Button>
    
    <Button bsStyle="primary" bsSize="large" type="reset" block id="register-btn" onClick={this.handleTypeChange}>
    Create
    <span className="fa fa-user-plus" style={spanStyles}></span>
    </Button>
  </div>

      </form>

      </div>
      </div>)
        }
        else {
            /*RENDERING THE REGISTER PAGE*/

            return (
                <div className="row">
                <div className="well clearfix col-md-4 col-md-offset-4">

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
    <div className="well" style={wellStyles}>
        <Button bsStyle="info" bsSize="large" id="register-btn" block type="submit"
            disabled={!(this.state.email.length && this.state.password.length && (this.state.confPw === this.state.password))}
            >Sign Up
          <span className="fa fa-user-plus" style={spanStyles}></span>
        </Button>
        
        {/* Button to go back */}
        <Button bsStyle="warning" bsSize="large" id="back-to-login" type="reset" block onClick={this.handleTypeChange}>Go back
          <span className="fa fa-sign-in" style={spanStyles}></span>
        </Button>
    </div>

      </form>

      </div>
      </div>);
        }
    }
});


module.exports = Login;