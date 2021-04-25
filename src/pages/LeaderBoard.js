import React from "react";
import { connect } from "react-redux";

const LeaderBoard = (props) => {
  return (
    <section className="leader-board col-lg-7 p-0 mx-auto">
      {props.usersList.map((user) => (
        <div className="card user-card shadow-sm mb-4" key={user.id}>
          <div className="card-body py-3">
            <div className="row no-gutters">
              <div className="col-sm-4 col-md-2 border-right text-center mb-4 mb-sm-0">
                <img
                  src={user.avatarURL}
                  alt="user avatar"
                  onError={(e) =>
                    (e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkk6tEBms7CRug7wsM4xXjHFoOMCIYt5lQrBenScdrTvzgYg9zhJo5kGH06bKV0PVokY&usqp=CAU")
                  }
                />
              </div>
              <div className="col-sm-8 col-md-8">
                <div className="card-body py-0">
                  <h5 className="mb-4">{user.name}</h5>
                  <div className="d-flex align-items-center font-weight-bold">
                    <small>Answered Questions</small>
                    <small className="ml-auto">{user.answeredQuestions}</small>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex align-items-center font-weight-bold">
                    <small>Created Questions</small>
                    <small className="ml-auto">{user.createdQuestions}</small>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mt-3 mt-md-0">
                <div>
                  <div className="border text-center">
                    <h6 className="m-0 py-2 bg-light border-bottom">Score</h6>
                    <span
                      className="d-inline-flex align-items-center justify-content-center h4 my-3 rounded-circle bg-success text-white"
                      style={{ minWidth: "50px", height: "50px" }}
                    >
                      {user.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

function mapStateToProps({ users }) {
  // map users and return only top 3
  let usersList = Object.values(users)
    .map((user) => {
      let answeredQuestions = Object.keys(user.answers).length;
      let createdQuestions = user.questions.length;

      return {
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answeredQuestions,
        createdQuestions,
        score: answeredQuestions + createdQuestions,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return {
    usersList,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
