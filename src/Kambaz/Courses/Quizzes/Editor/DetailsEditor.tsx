import { Button, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as coursesClient from "../../client";
import * as quizClient from "../client";
import { addQuiz, updateQuiz } from "../reducer";
import ReactQuill from "react-quill";
import { useRef } from "react";
import 'react-quill/dist/quill.snow.css';

export default function DetailsEditor({ quiz, setQuiz }: {
    quiz: any;
    setQuiz: (quiz: any) => void;
}) {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const quillRef = useRef(null);

    const createQuizForCourse = async (quiz: any) => {
        if (!cid) return;
        const newQuiz = await coursesClient.createQuizForCourse(cid, quiz);
        dispatch(addQuiz(newQuiz));
    };

    const saveQuiz = async (quiz: any) => {
        await quizClient.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    };

    const handleSave = (quiz: any) => {
        if (location.pathname.includes("New")) {
            createQuizForCourse(quiz);
        }
        else {
            saveQuiz(quiz);
        }
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    }

    const handleDescriptionChange = (desc: String) => {
        setQuiz((prevState: any) => ({ ...prevState, description: desc }));
    }

    const handleCheckboxChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuiz((prevQuiz: any) => ({
            ...prevQuiz,
            [field]: e.target.checked,
        }));
    };

    return (
        <Form id="wd-quiz-details-editor">
            <div>
                <FormGroup className="mb-2">
                    <FormLabel htmlFor="wd-quiz-title">Quiz Title</FormLabel>
                    <FormControl id="wd-quiz-title"
                        value={quiz?.title}
                        onChange={(e) => setQuiz((prevState: any) => ({ ...prevState, title: e.target.value }))}
                    />
                </FormGroup>

                <FormGroup className="mb-4">
                    <FormLabel htmlFor="wd-quiz-description">Quiz Instructions:</FormLabel>
                    <ReactQuill theme="snow" id="wd-quiz-description" value={quiz?.description}
                        onChange={handleDescriptionChange} ref={quillRef} />
                </FormGroup>

                <FormGroup as={Row} className="mb-2">
                    <FormLabel column sm="4" htmlFor="wd-quiz-type" className="text-sm-end">
                        Quiz Type
                    </FormLabel>
                    <Col sm="4">
                        <FormSelect id="wd-quiz-type" name="wd-quiz-type"
                            defaultValue={quiz?.quizType}
                            onChange={(e) => setQuiz((prevState: any) => ({ ...prevState, quizType: e.target.value }))}
                        >
                            <option value="GRADED_QUIZ">Graded Quiz</option>
                            <option value="PRACTICE_QUIZ">Practice Quiz</option>
                            <option value="GRADED_SURVEY">Graded Survey</option>
                            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                        </FormSelect>
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-2">
                    <FormLabel column sm="4" htmlFor="wd-group" className="text-sm-end">
                        Assignment Group
                    </FormLabel>
                    <Col sm="4">
                        <FormSelect id="wd-group" name="wd-group"
                            defaultValue={quiz?.assignmentGroup}
                            onChange={(e) => setQuiz((prevState: any) => ({ ...prevState, group: e.target.value }))}
                        >
                            <option value="quizzes">QUIZZES</option>
                            <option value="assignments">ASSIGNMENTS</option>
                            <option value="exams">EXAMS</option>
                            <option value="project">PROJECT</option>
                        </FormSelect>
                    </Col>
                </FormGroup>

                <Row className="mb-2">
                    <Col sm="4" />
                    <Col sm="8">
                        <p className="mb-2 mt-2"><strong>Options</strong></p>
                        <FormCheck
                            className="mb-2"
                            id="wd-shuffle-answers"
                            label="Shuffle Answers"
                            checked={quiz.shuffleAnswers}
                            onChange={handleCheckboxChange("shuffleAnswers")}
                        />
                        <FormCheck
                            className="mb-2"
                            id="wd-time-limit"
                            label="Time Limit"
                            checked={quiz.timeLimit}
                            onChange={handleCheckboxChange("timeLimit")}
                        />
                        <FormCheck
                            className="mb-2"
                            id="wd-multiple-attempts"
                            label="Allow Multiple Attempts"
                            checked={quiz.multipleAttempts}
                            onChange={handleCheckboxChange("multipleAttempts")}
                        />
                        {quiz.multipleAttempts && (
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <FormLabel className="mb-0">
                                    Attempts Allowed
                                </FormLabel>
                                <FormControl
                                    value={quiz?.howManyAttempts}
                                    onChange={(e) => setQuiz((prevState: any) => ({ ...prevState, howManyAttempts: e.target.value }))}
                                    className="w-25"
                                    type="number"
                                />
                            </div>
                        )
                        }
                        <FormCheck
                            className="mb-2"
                            id="wd-one-question"
                            label="One Question at a Time"
                            checked={quiz.oneQuestionAtATime}
                            onChange={handleCheckboxChange("oneQuestionAtATime")}
                        />
                        <FormCheck
                            className="mb-2"
                            id="wd-webcam-req"
                            label="Webcam Required"
                            checked={quiz.webcamRequired}
                            onChange={handleCheckboxChange("webcamRequired")}
                        />
                        <FormCheck
                            className="mb-2"
                            id="wd-lock-questions"
                            label="Lock Questions After Answering"
                            checked={quiz.lockQuestionsAfterAnswering}
                            onChange={handleCheckboxChange("lockQuestionsAfterAnswering")}
                        />
                    </Col>
                </Row>

                <FormGroup as={Row} className="mb-2">
                    <FormLabel column sm="4" htmlFor="wd-show-correct-answers" className="text-sm-end">
                        Show Correct Answers
                    </FormLabel>
                    <Col sm="4">
                        <FormSelect id="wd-show-correct-answers" name="wd-show-correct-answers"
                            defaultValue={quiz?.showCorrectAnswers}
                            onChange={(e) => setQuiz((prevState: any) => ({ ...prevState, showCorrectAnswers: e.target.value }))}
                        >
                            <option value="no">No</option>
                            <option value="immediately">Immediately after submit</option>
                            <option value="grade_release">After grade released</option>
                        </FormSelect>
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-2">
                    <FormLabel column sm="4" htmlFor="wd-access-code" className="text-sm-end">
                        Access Code
                    </FormLabel>
                    <Col sm="8">
                        <FormControl id="wd-access-code"
                            value={quiz?.accessCode}
                            onChange={(e) => setQuiz((prevState: any) => ({ ...prevState, accessCode: e.target.value }))}
                        />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-2">
                    <FormLabel column sm="4" className="text-sm-end">
                        Assign
                    </FormLabel>
                    <Col sm="8" className="mt-2">

                        <FormLabel htmlFor="wd-due-date">Due</FormLabel>
                        <FormControl type="date" id="wd-due-date"
                            value={quiz?.dueDate}
                            onChange={(e) => setQuiz((prevState: any) => ({ ...prevState, dueDate: e.target.value }))}
                        />

                        <Row className="mb-2">
                            <Col>
                                <FormLabel htmlFor="wd-available-from" >Available from</FormLabel>
                                <FormControl type="date" id="wd-available-from"
                                    value={quiz?.availableDate}
                                    onChange={(e) => setQuiz((prevState: any) => ({ ...prevState, availableDate: e.target.value }))}
                                />
                            </Col>
                            <Col>
                                <FormLabel htmlFor="wd-available-until" >Until</FormLabel>
                                <FormControl type="date" id="wd-available-until"
                                    value={quiz?.untilDate}
                                    onChange={(e) => setQuiz((prevState: any) => ({ ...prevState, untilDate: e.target.value }))}
                                />
                            </Col>

                        </Row>
                    </Col>
                </FormGroup>

                <hr />

                <div className="float-end mb-2 me-1">
                    <Link to={`/Kambaz/Courses/${cid}/Quizzes`} className="btn btn-secondary me-2">Cancel</Link>
                    <Button onClick={() => handleSave(quiz)} className="me-2" variant="danger">Save</Button>
                </div>
            </div>
        </Form>
    );
}