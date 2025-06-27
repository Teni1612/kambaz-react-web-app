import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as quizClient from "./client";
import { Card, FormControl, ListGroup } from "react-bootstrap";
import DOMPurify from "dompurify";

export default function QuizResults() {
    const { qid } = useParams();
    const { attempt } = useSelector((state: any) => state.quizzesReducer);

    const [quiz, setQuiz] = useState<any>({});
    const [questions, setQuestions] = useState<any>([]);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    const [answersMap, setAnswersMap] = useState<any>({});

    const getRecentAttempt = async () => {

        const map: Record<string, any> = {};
        attempt.answers.forEach((a: any) => {
            map[a.questionId] = a;
        });
        setAnswersMap(map);
    }

    const fetchQuestions = async () => {
        const questions = await quizClient.findQuestionsForQuiz(qid as string);
        setQuestions(questions);
    };

    useEffect(() => {
        setQuiz(
            quizzes.find((quiz: any) => quiz._id === qid)
        );
        fetchQuestions();
        getRecentAttempt();
    }, [qid]);

    function createMarkup(html: any) {
        return { __html: DOMPurify.sanitize(html) };
    }

    return (
        <div id="wd-quiz-results">

            <div style={{ width: '80rem' }} className="mx-auto">

                <h4 className="mt-3">{quiz.title}</h4>

                <hr style={{ borderBottom: '2px solid #dee2e6' }} />

                <h5 className="mt-3">Attempt History</h5>

                <table className="table">
                    <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                        <th></th>
                        <th>Attempt</th>
                        <th>Score</th>
                    </tr>
                    <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                        <td>LATEST</td>
                        <td>1 out of {quiz.howManyAttempts}</td>
                        <td>{attempt.points} / {quiz.points} pts</td>
                    </tr>
                </table>
            </div>

            <div className="mt-4 d-flex flex-column align-items-center">
                {questions.map((question: any) => (
                    <Card className={`w-75 ms-3 me-3 mb-3 mt-4 ${answersMap[question._id]?.correct ? 'border-success shadow-lg' : 'border-danger shadow-lg'}`}>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <span>{question.title}</span>
                            <span>{question.points} pts</span>
                        </Card.Header>
                        <Card.Body>
                            <div
                                dangerouslySetInnerHTML={createMarkup(question.question)}
                            />

                            <hr />

                            {(question.type === "MCQ" || question.type === "TF") && (
                                question.possibleAnswers.map((option: any, index: number) => (
                                    <ListGroup className="d-flex gap-2 bg-light border-0 shadow-sm mb-2 ms-2 me-2 rounded-3">
                                        <ListGroup.Item
                                            className={`d-flex justify-content-between align-items-center border-0 ${answersMap[question._id]?.userAnswer === option
                                                ? answersMap[question._id]?.correct
                                                    ? 'bg-success bg-opacity-25'
                                                    : 'bg-danger bg-opacity-25'
                                                : 'bg-transparent'
                                                }`}>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name={`question-${question._id}`}
                                                    id={`option-${index}`}
                                                    value={option}
                                                    checked={answersMap[question._id]?.userAnswer === option}
                                                    readOnly
                                                />
                                                <label className="form-check-label" htmlFor={`option-${index}`}>
                                                    {option}
                                                </label>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                ))
                            )}

                            {question.type === "FITB" && (
                                <div className="d-flex gap-2 mt-3 mb-3">
                                    <FormControl
                                        className={`${answersMap[question._id]?.correct
                                            ? 'bg-success bg-opacity-25'
                                            : 'bg-danger bg-opacity-25'
                                            }`}
                                        placeholder="Enter answer"
                                        value={answersMap[question._id]?.userAnswer || ""}
                                        readOnly
                                    />
                                </div>
                            )}

                        </Card.Body>
                        <Card.Footer>

                        </Card.Footer>
                    </Card>
                ))}

            </div>
        </div>
    );
}