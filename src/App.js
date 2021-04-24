import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import { connect } from "react-redux";
import { initData } from "./store/actions/shared";

import AppHeader from "./components/AppHeader";
import Home from "./pages/Home";
import AddQuestion from "./pages/AddQuestion";
import Question from "./pages/Question";
import LeaderBoard from "./pages/LeaderBoard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(initData());
  }

  redirectToLoginPage = () => {
    setTimeout(() => {
      alert("You should login to open this page");
    }, 300);
    return <Redirect to="/login" />;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppHeader />
          <LoadingBar />
          <div className="container my-4 py-3">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>

              <Route path="/" exact>
                {this.props.authUser ? <Home /> : this.redirectToLoginPage}
              </Route>
              <Route path="/add">
                {this.props.authUser ? (
                  <AddQuestion />
                ) : (
                  this.redirectToLoginPage
                )}
              </Route>
              <Route path="/questions/:id">
                {this.props.authUser ? <Question /> : this.redirectToLoginPage}
              </Route>

              <Route path="/leaderboard">
                {this.props.authUser ? (
                  <LeaderBoard />
                ) : (
                  this.redirectToLoginPage
                )}
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps)(App);
