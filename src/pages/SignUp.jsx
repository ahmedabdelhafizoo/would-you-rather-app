import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { handelAddNewUser } from "../store/actions/shared";

class SignUp extends Component {
  state = {
    errorFeedback: false,
    validUserFeedback: false,
    name: "",
    avatarURL: "",
  };

  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorFeedback: false,
      validUserFeedback: false,
    });
  };

  setAuthUser = (selectedUser) => {
    this.setState({ selectedUser });
    this.toggleUsersList();
  };

  handelSubmit = (e) => {
    e.preventDefault();
    if (!this.state.name || !this.state.avatarURL) {
      this.setState({ errorFeedback: true });
    } else {
      let name = this.state.name;
      let id = name.toLowerCase().replace(/ /g, "_");
      let avatarURL = this.state.avatarURL;

      let user = {
        id,
        name,
        avatarURL,
        answers: {},
        questions: [],
      };

      if (this.props.users[id]) {
        this.setState({
          validUserFeedback: true,
        });
      } else {
        this.props.dispatch(handelAddNewUser(user)).then(() => {
          this.props.history.push("/");
        });
      }
    }
  };

  render() {
    return (
      <form
        className="form login-form col-md-8 col-lg-6 mx-auto shadow p-4 text-center"
        onSubmit={this.handelSubmit}
      >
        <h5>Welcome To The Would You Rather App</h5>
        <hr className="mb-5" />

        <div>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handelChange}
            className="form__input"
            placeholder="Enter Your Name"
          />
          {this.state.name && (
            <p className="text-muted text-left m-0">
              <small>@{this.state.name.toLowerCase().replace(/ /g, "_")}</small>
            </p>
          )}

          <div className="mb-3"></div>

          <input
            type="url"
            name="avatarURL"
            value={this.state.avatarURL}
            onChange={this.handelChange}
            className="form__input"
            placeholder="Avatar URL"
          />

          {this.state.errorFeedback && (
            <p className="text-danger text-left mt-3 mb-0">
              You Must Fill the previous fields..
            </p>
          )}

          {this.state.validUserFeedback && (
            <p className="text-danger text-left mt-3 mb-0">
              The user name is already exist.
            </p>
          )}
        </div>

        <button className="form__btn btn btn--red w-100 mt-5 mb-3">
          Submit
        </button>
        <Link className="text-primary" to="/login">
          Already Have an account ?
        </Link>
      </form>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(withRouter(SignUp));
