import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
  _addNewUser,
} from "../../API/_DATA";
import {
  setAuthUserAnswer,
  addAuthUserQuestion,
  setAuthUser,
} from "./authUser";
import {
  setUsers,
  setUserAnswer,
  addUsersNewQuestion,
  addNewUser,
} from "../actions/users";
import {
  setQuestions,
  setQuestionAnswer,
  addNewQuestion,
} from "../actions/questions";
import { showLoading, hideLoading } from "react-redux-loading";

export function initData() {
  return (dispatch) => {
    dispatch(showLoading());
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => {
        dispatch(setUsers(users));
        dispatch(setQuestions(questions));
        dispatch(hideLoading());
      }
    );
  };
}

export function updateQuestionAnswer(questionId, answer, authUserId) {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestionAnswer({
      authedUser: authUserId,
      qid: questionId,
      answer,
    }).then(() => {
      dispatch(setAuthUserAnswer(questionId, answer));
      dispatch(setQuestionAnswer(questionId, answer, authUserId));
      dispatch(setUserAnswer(questionId, answer, authUserId));
      dispatch(hideLoading());
    });
  };
}

export function handelAddNewQuestion(question, authUserId) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(showLoading());
      return _saveQuestion(question).then(() => {
        dispatch(addAuthUserQuestion(question));
        dispatch(addNewQuestion(question));
        dispatch(addUsersNewQuestion(question, authUserId));
        dispatch(hideLoading());
        resolve();
      });
    });
  };
}

export function handelAddNewUser(user) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(showLoading());
      return _addNewUser(user).then(() => {
        dispatch(setAuthUser(user));
        dispatch(addNewUser(user));
        dispatch(hideLoading());
        resolve();
      });
    });
  };
}
