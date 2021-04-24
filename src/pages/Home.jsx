import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionCard from "./../components/QuestionCard";

class Home extends Component {
  state = {
    showAnsweredQuestions: false,
  };
  showAnsweredQuestions = () => {
    this.setState({
      showAnsweredQuestions: true,
    });
  };

  showUnAnsweredQuestions = () => {
    this.setState({
      showAnsweredQuestions: false,
    });
  };

  render() {
    return (
      <section className="home col-lg-7 p-0 mx-auto border shadow">
        <ul
          className="nav nav-tabs border-0 text-center"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item col p-0">
            <span
              className={`nav-link border-0 m-0 rounded-0 ${
                !this.state.showAnsweredQuestions ? "active" : ""
              }`}
              onClick={this.showUnAnsweredQuestions}
            >
              Unanswered Questions
            </span>
          </li>
          <li className="nav-item col p-0">
            <span
              className={`nav-link border-0 m-0 rounded-0 ${
                this.state.showAnsweredQuestions ? "active" : ""
              }`}
              onClick={this.showAnsweredQuestions}
            >
              Answered Questions
            </span>
          </li>
        </ul>
        <div className="border-top px-4 pt-4">
          {this.state.showAnsweredQuestions && (
            <div className="fade-animation">
              {this.props.answeredQuestions.length ? (
                this.props.answeredQuestions.map((question) => (
                  <QuestionCard question={question} key={question.id} />
                ))
              ) : (
                <h6 className="text-center text-muted my-5">
                  You didn't answer any question yet.
                </h6>
              )}
            </div>
          )}

          {!this.state.showAnsweredQuestions && (
            <div className="fade-animation">
              {this.props.unAnsweredQuestions.length ? (
                this.props.unAnsweredQuestions.map((question) => (
                  <QuestionCard question={question} key={question.id} />
                ))
              ) : (
                <h6 className="text-center text-muted my-5">
                  Congrats, You answered all questions.
                </h6>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }
}

function mapStateToProps({ users, questions, authUser }) {
  let answeredQuestionsIds = authUser.answers;

  let answeredQuestions = [];
  let unAnsweredQuestions = [];

  // check and create answered & unanswered question
  Object.values(questions).forEach((question) => {
    question.authorName = users[question.author].name;
    question.authorAvatarURL = users[question.author].avatarURL;

    if (answeredQuestionsIds[question.id]) {
      answeredQuestions.push(question);
    } else {
      unAnsweredQuestions.push(question);
    }
  });

  // sort by date to show latest created questions first
  answeredQuestions.sort((a, b) => b.timestamp - a.timestamp);
  unAnsweredQuestions.sort((a, b) => b.timestamp - a.timestamp);

  return {
    answeredQuestions,
    unAnsweredQuestions,
  };
}

export default connect(mapStateToProps)(Home);
