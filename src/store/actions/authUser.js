export const SET_AUTH_USER = "SET_AUTH_USER";
export const SET_AUTH_USER_ANSWER = "SET_AUTH_USER_ANSWER";
export const ADD_AUTH_USER_QUESTION = "ADD_AUTH_USER_QUESTION";

export function setAuthUser(user) {
  return {
    type: SET_AUTH_USER,
    user,
  };
}

export function setAuthUserAnswer(questionId, answer) {
  return {
    type: SET_AUTH_USER_ANSWER,
    questionId,
    answer,
  };
}

export function addAuthUserQuestion(question) {
  return {
    type: ADD_AUTH_USER_QUESTION,
    question,
  };
}
