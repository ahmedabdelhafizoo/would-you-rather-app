import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { setAuthUser } from "../store/actions/authUser";

class AppHeader extends Component {
  state = {
    showNavBar: false,
  };

  logout = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthUser(null));
  };

  render() {
    let { authUser } = this.props;
    return (
      <header className="header">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark align-items-baseline">
            <NavLink className="navbar-brand mr-5" to="/">
              Navbar
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() =>
                this.setState({ showNavBar: !this.state.showNavBar })
              }
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`collapse navbar-collapse d-lg-flex ${
                !this.state.showNavBar ? "d-none" : ""
              }`}
            >
              <ul className="navbar-nav mr-auto flex-grow-1 align-items-center">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" exact>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/add">
                    New Question
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">
                    Leader Board
                  </NavLink>
                </li>

                {authUser ? (
                  <React.Fragment>
                    <li className="nav-item ml-lg-auto">
                      <span className="nav-link text-white">
                        <img
                          src={authUser.avatarURL}
                          alt="user avatar"
                          width="40"
                          height="40"
                          className="rounded-circle border mr-2 p-1"
                          onError={(e) =>
                            (e.target.src =
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkk6tEBms7CRug7wsM4xXjHFoOMCIYt5lQrBenScdrTvzgYg9zhJo5kGH06bKV0PVokY&usqp=CAU")
                          }
                        />
                        {authUser.name}
                      </span>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="##" onClick={this.logout}>
                        Logout
                      </a>
                    </li>
                  </React.Fragment>
                ) : (
                  <li className="nav-item ml-lg-auto">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps)(AppHeader);
