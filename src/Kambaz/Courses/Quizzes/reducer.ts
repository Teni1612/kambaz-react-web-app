import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  questions: [],
  attempt: {},
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        quizType: quiz.quizType,
        points: quiz.points,
        assignmentGroup: quiz.assignmentGroup,
        shuffleAnswers: quiz.shuffleAnswers,
        timeLimit: quiz.timeLimit,
        multipleAttempts: quiz.multipleAttempts,
        showCorrectAnswers: quiz.showCorrectAnswers,
        accessCode: quiz.accessCode,
        oneQuestionAtATime: quiz.oneQuestionAtATime,
        webcamRequired: quiz.webcamRequired,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
        dueDate: quiz.dueDate,
        availableDate: quiz.availableDate,
        untilDate: quiz.untilDate,
        published: quiz.published,
        course: quiz.course,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
    publishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, published: true } : q
      ) as any;
    },
    setQuestions: (state, { payload: questions }) => {
      state.questions = questions;
    },
    addQuestion: (state, { payload: question }) => {
      const newQuestion: any = {
        _id: question._id,
        quiz: question.quiz,
        title: question.title,
        question: question.question,
        type: question.quizType,
        points: question.points,
        possibleAnswers: question.possibleAnswers,
        correctAnswer: question.correctAnswer,
      };
      state.questions = [...state.questions, newQuestion] as any;
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q
      ) as any;
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: any) => q._id !== questionId
      );
    },
    setAttempt: (state, { payload: attempt }) => {
      state.attempt = attempt;
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setAttempt,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
