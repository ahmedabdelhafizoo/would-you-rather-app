import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { setAuthUser } from "../store/actions/authUser";

class Login extends Component {
  state = {
    showUsersList: false,
    errorFeedback: false,
    searchValue: "",
    selectedUser: null,
  };

  toggleUsersList = () => {
    this.setState({ showUsersList: !this.state.showUsersList });
  };

  setAuthUser = (selectedUser) => {
    this.setState({ selectedUser });
    this.toggleUsersList();
  };

  handelSubmit = (e) => {
    e.preventDefault();
    this.setState({ errorFeedback: false });
    if (!this.state.selectedUser) {
      this.setState({ errorFeedback: true });
    } else {
      this.props.dispatch(setAuthUser(this.state.selectedUser));
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <form
        className="form login-form col-md-8 col-lg-6 mx-auto shadow p-4 text-center"
        onSubmit={this.handelSubmit}
      >
        <h5>Welcome To The Would You Rather App</h5>
        <p className="text-muted">Please Login To Continue</p>
        <hr className="mb-5" />

        <div className="dropdown">
          {this.state.selectedUser ? (
            <div className="d-flex flex-wrap align-items-center justify-content-between border p-1 px-2">
              <span className="mr-2 d-flex align-items-center">
                <img
                  src={this.state.selectedUser.avatarURL}
                  alt="user avatar"
                  width="30"
                  height="40"
                  className="rounded-circle mr-2"
                  onError={(e) =>
                    (e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkk6tEBms7CRug7wsM4xXjHFoOMCIYt5lQrBenScdrTvzgYg9zhJo5kGH06bKV0PVokY&usqp=CAU")
                  }
                />
                {this.state.selectedUser.name}
              </span>

              <button
                className="btn px-2 py-1"
                onClick={() => this.setState({ selectedUser: null })}
              >
                Change
              </button>
            </div>
          ) : (
            <div>
              <input
                type="search"
                name=""
                className="form__input"
                placeholder="Search For Your Account"
                onClick={this.toggleUsersList}
                onChange={(e) => {
                  let searchValue = e.target.value;
                  this.setState({ searchValue });
                }}
              />

              {this.state.errorFeedback && (
                <p className="text-danger text-left my-1">
                  you must choose your account first.
                </p>
              )}
            </div>
          )}

          <div
            className={`dropdown-menu p-0 w-100 ${
              this.state.showUsersList ? "show" : ""
            }`}
          >
            {this.props.filteredUsers(this.state.searchValue).length ? (
              this.props.filteredUsers(this.state.searchValue).map((user) => (
                <span
                  className="dropdown-item d-flex align-items-center border-bottom"
                  key={user.id}
                  onClick={() => this.setAuthUser(user)}
                >
                  <img
                    src={user.avatarURL}
                    alt="user avatar"
                    width="30"
                    height="40"
                    className="rounded-circle mr-2"
                  />
                  {user.name}
                </span>
              ))
            ) : (
              <h6 className="text-muted text-center my-3">
                Can't find a user with this name.
              </h6>
            )}
          </div>
        </div>
        <button className="form__btn btn btn--red w-100 mt-5 mb-3">
          Submit
        </button>
        <Link className="text-primary" to="/signup">
          Create New Account ?
        </Link>
      </form>
    );
  }
}

function mapStateToProps({ users }) {
  let usersList = Object.values(users);
  // add search feature to be able to filter usersList
  let filteredUsers = (searchValue) => {
    return searchValue
      ? usersList.filter((user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : usersList;
  };

  return {
    filteredUsers,
  };
}

export default connect(mapStateToProps)(withRouter(Login));
