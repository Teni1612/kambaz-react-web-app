import { useEffect, useState } from "react";
import { Button, Card, FormControl, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as quizClient from "./client";
import { setAttempt, setQuestions } from "./reducer";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import DOMPurify from 'dompurify';

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [quiz, setQuiz] = useState<any>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { questions } = useSelector((state: any) => state.quizzesReducer);

    useEffect(() => {
        setQuiz(quizzes.find((quiz: any) => quiz._id === qid));
    }, [qid, quizzes]);

    const fetchQuestions = async () => {
        const questions = await quizClient.findQuestionsForQuiz(qid as string);
        dispatch(setQuestions(questions));
    };

    useEffect(() => {
        fetchQuestions();
    }, [qid]);

    const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
    const [newAnswer, setNewAnswer] = useState<string>('');

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const handleFITBChange = (questionId: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: newAnswer,
        }));
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
    };

    const handlePrev = () => {
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    };

    const currentQuestion = questions[currentQuestionIndex];

    const calculateScore = () => {
        let calculatedScore = 0;

        questions.forEach((question: any) => {
            const userAnswer = answers[question._id];
            const correctAnswer = question.correctAnswer;

            if (question.type === "FITB") {
                if (question.possibleAnswers.includes(userAnswer)) {
                    calculatedScore += question.points;
                }
            } else {
                if (userAnswer === correctAnswer) {
                    calculatedScore += question.points;
                }
            }
        });
        return calculatedScore;
    }

    const handleSubmit = () => {
        const attemptAnswers = Object.entries(answers).map(([questionId, userAnswer]) => {
            const question = questions.find((q: any) => q._id === questionId);
            return {
                questionId,
                userAnswer,
                correct: isCorrect(question)
            };
        });

        let totalScore = calculateScore();
        const newAttempt = {
            user: currentUser._id,
            quiz: quiz._id,
            points: totalScore,
            submittedAt: new Date().toISOString(),
            answers: attemptAnswers
        }
        dispatch(setAttempt(newAttempt));
        navigate("Results");
    };

    const isCorrect = (question: any) => {
        const userAnswer = answers[question._id];
        if (question.type === "FITB") {
            return question.possibleAnswers.includes(userAnswer);
        }
        return userAnswer === question.correctAnswer;
    };

    function createMarkup(html: any) {
        return { __html: DOMPurify.sanitize(html) };
    }

    return (
        <div className="d-flex">
            <div className="flex-grow-1">
                <h4 className="mt-3 ms-3 mb-3">{quiz.title}</h4>

                <ListGroup className="d-flex gap-2 border-0 ms-3 me-3 mb-3 mt-4 rounded-3"
                    style={{
                        backgroundColor: "#fff5f5",
                        boxShadow: "0 0 8px rgba(255, 0, 0, 0.2)",
                    }}>
                    <ListGroup.Item className="d-flex align-items-center border-0 bg-transparent text-danger">
                        <IoInformationCircleOutline className="me-2 fs-5" />
                        This is a preview
                    </ListGroup.Item>
                </ListGroup>

                {currentQuestion && (
                    <div className="d-flex justify-content-center">
                        <Card className="w-50 ms-3 me-3 mb-3 mt-4">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <span>{currentQuestion.title}</span>
                                <span>{currentQuestion.points} pts</span>
                            </Card.Header>
                            <Card.Body>
                                <div
                                    dangerouslySetInnerHTML={createMarkup(currentQuestion.question)}
                                />

                                <hr />

                                {(currentQuestion.type === "MCQ" || currentQuestion.type === "TF") && (
                                    currentQuestion.possibleAnswers.map((option: any, index: number) => (
                                        <ListGroup className="d-flex gap-2 bg-light border-0 shadow-sm mb-2 ms-2 me-2 rounded-3">
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 bg-transparent">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`question-${currentQuestion._id}`}
                                                        id={`option-${index}`}
                                                        value={option}
                                                        checked={answers[currentQuestion._id] === option}
                                                        onChange={() => handleAnswerChange(currentQuestion._id, option)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`option-${index}`}>
                                                        {option}
                                                    </label>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    ))
                                )}

                                {currentQuestion.type === "FITB" && (
                                    <div className="d-flex gap-2 mt-3 mb-3">
                                        <FormControl
                                            placeholder="Enter answer"
                                            value={newAnswer}
                                            onChange={(e) => setNewAnswer(e.target.value)}
                                        />
                                        <Button onClick={() => handleFITBChange(currentQuestion._id)} variant="secondary">
                                            Submit
                                        </Button>
                                    </div>
                                )}

                            </Card.Body>
                            <Card.Footer>
                                <Button
                                    className="float-start ms-2"
                                    onClick={handlePrev}
                                    disabled={currentQuestionIndex === 0}
                                    variant="secondary"
                                >
                                    Previous
                                </Button>
                                <Button
                                    className="float-end me-2"
                                    onClick={handleNext}
                                    disabled={currentQuestionIndex >= questions.length - 1}
                                    variant="secondary"
                                >
                                    Next
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                )}

                <div className="ms-3 me-3 mt-4 d-flex justify-content-center">
                    <Button onClick={handleSubmit} className="me-2" variant="danger">Submit Quiz</Button>
                    <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`} className="btn btn-secondary me-2">Edit Quiz</Link>
                </div>

            </div>

            <div
                className="p-3"
                style={{
                    width: "250px",
                    borderLeft: "1px solid #ccc",
                    height: "100vh",
                    overflowY: "auto",
                    position: "sticky",
                    top: 0,
                }}
            >
                <h5 className="mb-3">Questions</h5>
                <ul className="list-unstyled">
                    {questions.map((q: any, index: number) => (
                        <li key={q._id}>
                            <a
                                className={`w-100 mb-2 text-start text-danger ${index === currentQuestionIndex ? "fw-bold" : ""}`}
                                onClick={() => setCurrentQuestionIndex(index)}
                            >
                                <FaRegCircleQuestion className="me-2" />
                                Question {index + 1}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}