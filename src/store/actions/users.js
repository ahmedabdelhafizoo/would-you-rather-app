export const SET_USERS = "SET_USERS";
export const SET_USER_ANSWER = "SET_USER_ANSWER";
export const ADD_USERS_NEW_QUESTION = "ADD_USERS_NEW_QUESTION";
export const ADD_NEW_USER = "ADD_NEW_USER";

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function setUserAnswer(questionId, answer, authUserId) {
  return {
    type: SET_USER_ANSWER,
    questionId,
    answer,
    authUserId,
  };
}

export function addUsersNewQuestion(question, authUserId) {
  return {
    type: ADD_USERS_NEW_QUESTION,
    question,
    authUserId,
  };
}

export function addNewUser(user) {
  return {
    type: ADD_NEW_USER,
    user,
  };
}
