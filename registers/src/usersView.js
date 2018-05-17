import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import axios from "axios";

class UsersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  fetchingUsers = () => {
    const token = localStorage.getItem("token");
    const authToken = `Bearer ${token}`;
    const requestOptions = {
      headers: { Authorization: authToken }
    };

    const promise = axios.get(
      "http://localhost:9000/api/registers",
      requestOptions
    );
    console.log("promise2", promise);

    promise
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {});
  };
  componentWillMount = () => {
    this.fetchingUsers();
  };
  render() {
    console.log("u", this.state.users);

    return (
      <div>
        <button>Sign out</button>
        {this.state.users.map((user, index) => {
          return (
            <div key={index}>
              <ul>{user.username}</ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default UsersView;
