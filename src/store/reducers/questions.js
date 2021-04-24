import {
  SET_QUESTIONS,
  SET_QUESTION_ANSWER,
  ADD_NEW_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case SET_QUESTION_ANSWER:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.answer]: {
            ...state[action.questionId][action.answer],
            votes: state[action.questionId][action.answer].votes.concat([
              action.authUserId,
            ]),
          },
        },
      };

    case ADD_NEW_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };

    default:
      return state;
  }
}
