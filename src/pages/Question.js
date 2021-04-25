import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { updateQuestionAnswer } from "../store/actions/shared";

const Question = (props) => {
  let handelAnswerQuestions = (answer) => {
    console.log(answer);
    props.dispatch(
      updateQuestionAnswer(props.match.params.id, answer, props.authUser.id)
    );
  };

  return (
    <section className="question-page col-md-8 col-lg-7 mx-auto p-0">
      {props.getQuestionById(props.match.params.id) && (
        <QuestionCard
          showQuestionDetails={true}
          question={props.getQuestionById(props.match.params.id)}
          authUserId={props.authUser.id}
          handelAnswerQuestions={(answer) => handelAnswerQuestions(answer)}
        />
      )}
    </section>
  );
};

let mapStateToProps = ({ users, questions, authUser }) => {
  return {
    authUser,
    // to get the question by id even the page is reloaded
    getQuestionById: (id) => {
      let question = questions[id];
      if (question) {
        question = JSON.parse(JSON.stringify(question));
        question.authorName = users[question.author].name;
        question.authorAvatarURL = users[question.author].avatarURL;
        question.totalVotes =
          question.optionOne.votes.length + question.optionTwo.votes.length;
        if (authUser.answers[id]) {
          question.answered = true;
        }

        return question;
      } else {
        return null;
      }
    },
  };
};

export default connect(mapStateToProps)(withRouter(Question));
