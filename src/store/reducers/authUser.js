import {
  SET_AUTH_USER,
  SET_AUTH_USER_ANSWER,
  ADD_AUTH_USER_QUESTION,
} from "../actions/authUser";

export default function authUser(
  state = JSON.parse(localStorage.getItem("authUser")) || null,
  action
) {
  switch (action.type) {
    case SET_AUTH_USER:
      localStorage.setItem("authUser", JSON.stringify(action.user));
      return action.user;

    case SET_AUTH_USER_ANSWER:
      let newState = {
        ...state,
        answers: {
          ...state["answers"],
          [action.questionId]: action.answer,
        },
      };
      localStorage.setItem("authUser", JSON.stringify(newState));
      return newState;

    case ADD_AUTH_USER_QUESTION:
      let updatedState = {
        ...state,
        questions: [...state.questions, action.question.id],
      };
      localStorage.setItem("authUser", JSON.stringify(updatedState));
      return updatedState;

    default:
      return state;
  }
}
