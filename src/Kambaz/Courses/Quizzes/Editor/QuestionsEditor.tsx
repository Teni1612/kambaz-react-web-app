import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as quizClient from "../client";
import * as questionClient from "../questionClient";
import { setQuestions, addQuestion, updateQuestion, deleteQuestion, updateQuiz } from "../reducer";
import { Button, Col, Form, FormControl, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaPencil, FaTrash, FaRegCircleCheck, FaCircleCheck } from "react-icons/fa6";
import ReactQuill from "react-quill";
import { useRef } from "react";
import 'react-quill/dist/quill.snow.css';

export default function QuestionsEditor({ quiz, setQuiz }: {
    quiz: any;
    setQuiz: (quiz: any) => void;
}) {
    const { qid } = useParams();
    const dispatch = useDispatch();
    const quillRef = useRef(null);

    const { questions } = useSelector((state: any) => state.quizzesReducer);

    const [questionChanges, setQuestion] = useState<any>({});
    const [possibleAnswersList, setPossibleAnswersList] = useState<string[]>([]);

    const createQuestionForQuiz = async () => {
        if (!qid) return;
        const newQuestion = {
            title: "New Question",
            type: "MCQ",
            points: 0
        };
        const question = await quizClient.createQuestionForQuiz(qid, newQuestion);
        dispatch(addQuestion(question));
    };

    const onEditQuestion = (question: any) => {
        dispatch(updateQuestion({ ...question, editing: true }));
        setPossibleAnswersList(question.possibleAnswers);
        setQuestion({ ...question, editing: true });
    }

    const removeQuestion = async (questionId: any) => {
        await questionClient.deleteQuestion(questionId);
        dispatch(deleteQuestion(questionId));
    }

    const saveQuestion = async () => {
        const updatedQuestion = {
            ...questionChanges,
            possibleAnswers:
                questionChanges.type === "TF" ? ["True", "False"] : possibleAnswersList,
            editing: false,
        };
        await questionClient.updateQuestion(updatedQuestion);
        dispatch(updateQuestion(updatedQuestion));
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion((prevState: any) => ({
            ...prevState,
            correctAnswer: e.target.value
        }));
    };

    const handleMarkCorrect = (answer: String) => {
        setQuestion((prevState: any) => ({
            ...prevState,
            correctAnswer: answer
        }));
    }

    const [newAnswer, setNewAnswer] = useState("");
    const addPossibleAnswer = () => {
        if (newAnswer.trim() === "") return;
        setPossibleAnswersList((prevState) => ([...prevState, newAnswer.trim()]));
        setNewAnswer("");
    };

    const removePossibleAnswer = (posAnswer: String) => {
        setPossibleAnswersList(possibleAnswersList.filter(answer => answer !== posAnswer))
    }

    const handleQuestionChange = (ques: String) => {
        setQuestion((prevState: any) => ({...prevState, question: ques}));
    }

    const updateQuizPoints = async (points: Number) => {
        await quizClient.updateQuiz({ ...quiz, points: points });
        dispatch(updateQuiz({ ...quiz, points: points }));
    }

    const fetchQuestions = async () => {
        const questions = await quizClient.findQuestionsForQuiz(qid as string);
        dispatch(setQuestions(questions));
    };
    useEffect(() => {
        fetchQuestions();
    }, [qid]);

    useEffect(() => {
        if (questions.length > 0) {
            let totalPoints = 0;
            questions.forEach((question: any) => {
                totalPoints += question.points;
            });
            setQuiz({ ...quiz, points: totalPoints });
            updateQuizPoints(totalPoints);
        }
    }, [questions]);

    return (
        <div>
            {questions.map((question: any) => (
                <ListGroup className="rounded-0 ms-4 me-4" key={question._id}>
                    <ListGroup.Item as={Row} className="p-3 ps-1 border border-secondary-subtle">
                        {!question.editing && (
                            <div className="d-flex justify-content-between align-items-center">
                                <Col>
                                    {question.title}
                                </Col>
                                <Col>
                                    {question.type}
                                </Col>
                                <Col>
                                    <div>{question.points} pts</div>
                                </Col>
                                <Col>
                                    <FaTrash className="text-danger float-end me-2"
                                        onClick={() => removeQuestion(question._id)}
                                    />
                                    <FaPencil className="text-primary float-end me-4"
                                        onClick={() => onEditQuestion(question)}
                                    />
                                </Col>
                            </div>
                        )}

                        {question.editing && (
                            <Form>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Col>
                                        <FormControl className="w-75 d-inline-block"
                                            onChange={(e) => setQuestion((prevState: any) => ({ ...prevState, title: e.target.value }))}
                                            defaultValue={question.title}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Select className="w-75 d-inline-block"
                                            defaultValue={question.type}
                                            onChange={(e) => setQuestion((prevState: any) => ({ ...prevState, type: e.target.value }))}
                                        >
                                            <option value="MCQ">MCQ</option>
                                            <option value="FITB">Fill in the Blanks</option>
                                            <option value="TF">True or False</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <FormControl className="w-25 d-inline-block"
                                            onChange={(e) => setQuestion((prevState: any) => ({ ...prevState, points: Number(e.target.value) }))}
                                            defaultValue={question.points}
                                        />  pts
                                    </Col>
                                    <Col className="text-end me-4">
                                    </Col>
                                </div>
                                <div className="mt-2">
                                    <h5>Question:</h5>
                                    <ReactQuill
                                        theme="snow"
                                        value={questionChanges.question || ''}
                                        onChange={handleQuestionChange}
                                        ref={quillRef}
                                    />

                                    <h5 className="mt-2">Answers:</h5>

                                    {questionChanges.type === "MCQ" && (
                                        <div>
                                            <p>Enter possible answers then select the correct answer:</p>
                                            {possibleAnswersList.map((posAns) => (
                                                <ListGroup className="w-75 d-flex gap-2 bg-light border-0 shadow-sm mb-2 rounded-3">
                                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 bg-transparent">
                                                        {posAns}
                                                        <div>
                                                            {questionChanges.correctAnswer === posAns ? (
                                                                <FaCircleCheck onClick={() => handleMarkCorrect(posAns)} className="text-success float-end me-2" />
                                                            ) : (
                                                                <FaRegCircleCheck onClick={() => handleMarkCorrect(posAns)} className="float-end me-2" style={{ color: '#a3d9a5' }} />
                                                            )}
                                                            <FaTrash onClick={() => removePossibleAnswer(posAns)}
                                                                className="float-end text-danger me-3"
                                                            />
                                                        </div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            ))}

                                            <div className="d-flex gap-2 mt-3 mb-3">
                                                <FormControl
                                                    className="w-75"
                                                    placeholder="Enter answer"
                                                    value={newAnswer}
                                                    onChange={(e) => setNewAnswer(e.target.value)}
                                                />
                                                <Button onClick={addPossibleAnswer}>Add</Button>
                                            </div>
                                        </div>
                                    )}

                                    {questionChanges.type === "TF" && (
                                        <div>
                                            <p className="mb-2">Select the correct answer:</p>
                                            <Form.Check type="radio" name="wd-true-false-options" label="True" value="true"
                                                onChange={handleOptionChange}
                                                checked={questionChanges.correctAnswer === "true"} />
                                            <Form.Check type="radio" name="wd-true-false-options" label="False" value="false"
                                                onChange={handleOptionChange}
                                                checked={questionChanges.correctAnswer === "false"} />
                                        </div>
                                    )}

                                    {questionChanges.type === "FITB" && (
                                        <div>
                                            <p>Enter all possible correct answers:</p>
                                            {possibleAnswersList.map((posAns) => (
                                                <ListGroup className="w-75 d-flex gap-2 bg-light border-0 shadow-sm mb-2 rounded-3">
                                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 bg-transparent">
                                                        {posAns}
                                                        <FaTrash onClick={() => removePossibleAnswer(posAns)}
                                                            className="float-end text-danger me-2">
                                                            Delete
                                                        </FaTrash>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            ))}

                                            <div className="d-flex gap-2 mt-3 mb-3">
                                                <FormControl
                                                    className="w-75"
                                                    placeholder="Enter answer"
                                                    value={newAnswer}
                                                    onChange={(e) => setNewAnswer(e.target.value)}
                                                />
                                                <Button onClick={addPossibleAnswer}>Add</Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="float-end mb-2 me-1">
                                    <Button onClick={() => dispatch(updateQuestion({ ...question, editing: false }))} className="me-2" variant="secondary">Cancel</Button>
                                    <Button onClick={() => saveQuestion()} className="me-2" variant="danger">Save</Button>
                                </div>
                            </Form>
                        )}

                    </ListGroup.Item>
                </ListGroup>
            ))}

            <hr />

            <div className="d-flex justify-content-center my-3">
                <Button onClick={createQuestionForQuiz} variant="danger">+ Add Question</Button>
            </div>
        </div>
    );
}