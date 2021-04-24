import {
  SET_USERS,
  SET_USER_ANSWER,
  ADD_USERS_NEW_QUESTION,
  ADD_NEW_USER,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        ...action.users,
      };

    case SET_USER_ANSWER:
      return {
        ...state,
        [action.authUserId]: {
          ...state[action.authUserId],
          answers: {
            ...state[action.authUserId].answers,
            [action.questionId]: action.answer,
          },
        },
      };

    case ADD_USERS_NEW_QUESTION:
      return {
        ...state,
        [action.authUserId]: {
          ...state[action.authUserId],
          questions: [
            ...state[action.authUserId].questions,
            action.question.id,
          ],
        },
      };

    case ADD_NEW_USER:
      return {
        ...state,
        [action.user.id]: {
          ...action.user,
        },
      };
    default:
      return state;
  }
}
