import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { formatQuestion } from "../API/_DATA";

import { handelAddNewQuestion } from "../store/actions/shared";

class AddNewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    showErrorFeedback: false,
  };

  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      showErrorFeedback: "",
    });
  };

  handelAddQuestion = (e) => {
    e.preventDefault();
    let optionOneText = this.state.optionOne.trim();
    let optionTwoText = this.state.optionTwo.trim();

    if (optionOneText && optionTwoText) {
      let question = formatQuestion({
        optionOneText,
        optionTwoText,
        author: this.props.authUser.id,
      });
      console.log(question);
      this.setState({
        showErrorFeedback: false,
      });

      this.props
        .dispatch(handelAddNewQuestion(question, this.props.authUser.id))
        .then(() => {
          this.setState({
            optionOne: "",
            optionTwo: "",
            showErrorFeedback: false,
          });
          this.props.history.push("/");
        });
    } else {
      this.setState({
        showErrorFeedback: true,
      });
    }
  };

  render() {
    return (
      <form
        className="form col-md-8 col-lg-6 mx-auto shadow p-4"
        onSubmit={this.handelAddQuestion}
      >
        <h4>Create New Question</h4>
        <hr />
        <p className="mb-4">Complete the question:</p>
        <h6 className="mb-3">Would You Rather ...</h6>
        <input
          type="text"
          name="optionOne"
          value={this.state.optionOne}
          className="form__input"
          placeholder="Enter option one here"
          onChange={this.handelChange}
        />
        <h6 className="my-3">OR</h6>
        <input
          type="text"
          name="optionTwo"
          value={this.state.optionTwo}
          className="form__input"
          placeholder="Enter option Two here"
          onChange={this.handelChange}
        />

        {this.state.showErrorFeedback && (
          <div className="text-danger mt-3">
            You Must Fill the previous fields.
          </div>
        )}
        <button className="form__btn btn btn--red w-100 mt-4">Submit</button>
      </form>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps)(withRouter(AddNewQuestion));
