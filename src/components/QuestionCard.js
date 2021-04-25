import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const QuestionCard = (props) => {
  let { question } = props;
  return (
    <div className="card question-card mb-4">
      <h6 className="card-header">
        {question.answered ? <span>Asked By </span> : ""}
        {question.authorName}
      </h6>
      <div className="card-body py-3">
        <div className="row no-gutters">
          <div className="col-sm-4 col-md-2 border-right">
            <img
              src={question.authorAvatarURL}
              alt="user avatar"
              onError={(e) =>
                (e.target.src =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkk6tEBms7CRug7wsM4xXjHFoOMCIYt5lQrBenScdrTvzgYg9zhJo5kGH06bKV0PVokY&usqp=CAU")
              }
            />
          </div>
          <div className="col-sm-8 col-md-10">
            <div className="card-body pb-0 pt-3 pt-sm-0">
              {!question.answered ? (
                <h6 className="card-title">Would You rather</h6>
              ) : (
                <h5 className="card-title">Results:</h5>
              )}
              {question.answered ? (
                <div>
                  <div
                    className={`question-answer border p-3 ${
                      question.optionOne.votes.includes(props.authUserId)
                        ? "answered"
                        : ""
                    }`}
                  >
                    <h6 className="card-title">
                      Would You rather {question.optionOne.text} ?
                    </h6>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${
                            (question.optionOne.votes.length * 100) /
                            question.totalVotes
                          }%`,
                        }}
                      >
                        {(
                          (question.optionOne.votes.length * 100) /
                          question.totalVotes
                        ).toFixed(2)}{" "}
                        %
                      </div>
                    </div>
                    <small>
                      {question.optionOne.votes.length} out of{" "}
                      {question.totalVotes} votes
                    </small>
                  </div>

                  <div
                    className={`question-answer border p-3 ${
                      question.optionTwo.votes.includes(props.authUserId)
                        ? "answered"
                        : ""
                    }`}
                  >
                    <h6 className="card-title">
                      Would You rather {question.optionTwo.text} ?
                    </h6>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${
                            (question.optionTwo.votes.length * 100) /
                            question.totalVotes
                          }%`,
                        }}
                      >
                        {(
                          (question.optionTwo.votes.length * 100) /
                          question.totalVotes
                        ).toFixed(2)}{" "}
                        %
                      </div>
                    </div>
                    <small>
                      {question.optionTwo.votes.length} out of{" "}
                      {question.totalVotes} votes
                    </small>
                  </div>
                </div>
              ) : props.showQuestionDetails ? (
                <form
                  className="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.handelAnswerQuestions(e.target.question.value);
                  }}
                >
                  <div className="mb-3">
                    <label className="custom-radio-btn align-items-center">
                      <input
                        type="radio"
                        name="question"
                        value="optionOne"
                        // className="d-none"
                        required
                      />
                      <span className="label-value">
                        {question.optionOne.text}
                      </span>
                    </label>
                  </div>

                  <div className="mb-3">
                    <label className="custom-radio-btn align-items-center">
                      <input
                        type="radio"
                        name="question"
                        value="optionTwo"
                        required
                      />
                      <span className="label-value">
                        {question.optionTwo.text}
                      </span>
                    </label>
                  </div>

                  <button className="btn btn--red w-100">Submit</button>
                </form>
              ) : (
                <div>
                  <p className="card-text">
                    {question.optionOne.text.substring(0, 5)}.....
                  </p>
                  <Link to={`/questions/${question.id}`}>
                    <button className="btn btn--red w-100">View Poll</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// validate props
QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  showQuestionDetails: PropTypes.bool,
  authUserId: PropTypes.string,
  handelAnswerQuestions: PropTypes.func,
};

export default QuestionCard;
