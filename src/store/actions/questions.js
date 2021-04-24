export const SET_QUESTIONS = "SET_QUESTIONS";
export const SET_QUESTION_ANSWER = "SET_QUESTION_ANSWER";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    questions,
  };
}

export function setQuestionAnswer(questionId, answer, authUserId) {
  return {
    type: SET_QUESTION_ANSWER,
    questionId,
    answer,
    authUserId,
  };
}

export function addNewQuestion(question) {
  return {
    type: ADD_NEW_QUESTION,
    question,
  };
}
