import React from "react";
import axios from "axios";
import switchScreens from "./LoginBtn";
import Main from "./Main";

/**
 * Login Class
 */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
    };
  }
  // get user input for username and set state
  onChangeUserName(e) {
    this.setState({ username: e.target.value });
  }
  // get user input for password and set state
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  // submit login data to server when button is clicked
  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      username: this.state.username,
      password: this.state.password,
    };
    const currentUser = this.state.username;

    axios
      .post("http://localhost:9000/adviz/login", userObject)
      .then((res) => {
        console.log(res.data);
        this.setState({ username: this.state.username });
        //this.pass(currentUser);
        switchScreens("main", "loginScreen");
        document.getElementById("buttons").style.display = "inline";
        document.getElementById("header").style.display = "block";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {" "}
        <Main currentUser={this.state.username} />
        <div id="loginScreen">
          <form id="loginForm" onSubmit="return false">
            <h1>A D V I Z</h1>
            <div id="content">
              <input
                type="text"
                value={this.state.username}
                onChange={this.onChangeUserName}
                placeholder="Enter Username"
                name="username"
              />
              <br />
              <input
                type="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                placeholder="Enter Password"
                name="password"
              />
              <br />
              <button
                type="submit"
                id="loginbtn"
                className="button"
                value="Login"
                onClick={this.onSubmit}
              >
                {" "}
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
