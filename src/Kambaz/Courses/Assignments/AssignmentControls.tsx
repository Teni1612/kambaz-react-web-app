import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import FacultyRoute from "../../Account/FacultyRoute";

export default function AssignmentControls() {
    const navigate = useNavigate();

    const handleAssignmentEditor = () => {
        navigate("New");
    };

    return (
        <div id="wd-assignment-controls" className="text-nowrap">
            <Form className="me-1 float-start" id="wd-assignment-search">
                <InputGroup>
                    <InputGroup.Text className="bg-transparent border-end-0">
                        <FaMagnifyingGlass />
                    </InputGroup.Text>
                    <Form.Control placeholder="Search.." className="border-start-0" />
                </InputGroup>
            </Form>

            <FacultyRoute>
                <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn" onClick={handleAssignmentEditor}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Assignment
                </Button>
                <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Group
                </Button>
            </FacultyRoute>

        </div>
    );
}