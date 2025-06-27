import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import FacultyRoute from "../../Account/FacultyRoute";

export default function QuizControls() {
    const navigate = useNavigate();

    const handleQuizEditor = () => {
        navigate("New");
    };

    return (
        <div id="wd-quiz-controls" className="text-nowrap">
            <Form className="me-1 float-start" id="wd-quiz-search">
                <InputGroup>
                    <InputGroup.Text className="bg-transparent border-end-0">
                        <FaMagnifyingGlass />
                    </InputGroup.Text>
                    <FormControl placeholder="Search.." className="border-start-0" />
                </InputGroup>
            </Form>

            <FacultyRoute>
                <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-quizzes-context-btn">
                    <IoEllipsisVertical className="position-relative" style={{ bottom: "1px" }} />
                </Button>
                <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-quiz-btn" onClick={handleQuizEditor}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Quiz
                </Button>
            </FacultyRoute>
        </div>
    );
}