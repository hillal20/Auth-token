import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    console.log("p", props);
    super(props);
    this.state = {
      username: [],
      password: []
    };
  }

  postingLogins = () => {
    const obj = {
      username: this.state.username,
      password: this.state.password
    };
    console.log("obj", obj);
    const promise = axios.post("http://localhost:9000/api/login", obj);

    promise
      .then(response => {
        console.log("response1", response);
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/users");
      })
      .catch(err => {
        console.log("error", err);
        localStorage.removeItem("token");
      });
  };

  addUserHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div>
        <h1>Welcome to Register</h1>
        <div>
          User Name:{" "}
          <div>
            <input
              type="text"
              placeholder=" enter your username"
              name="username"
              value={this.state.username}
              onChange={this.addUserHandler}
            />
          </div>
        </div>
        <div>
          Password:<div>
            {" "}
            <input
              type="text"
              placeholder=" enter your password"
              name="password"
              value={this.state.password}
              onChange={this.addUserHandler}
            />
          </div>
        </div>
        <Link to="/users">
          <button
            onClick={() => {
              this.postingLogins();
              this.setState({ username: "", password: "" });
            }}
          >
            Login
          </button>
        </Link>
      </div>
    );
  }
}
export default Form;
