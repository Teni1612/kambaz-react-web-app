import { useParams } from "react-router";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControls from "./AssignmentControls";
import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useEffect, useState } from "react";
import FacultyRoute from "../../Account/FacultyRoute";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import { FiEdit } from "react-icons/fi";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(true);

    const { assignments } = useSelector((state: any) => state.assignmentReducer);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, [cid]);

    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };

    return (
        <div id="wd-assignments">

            <AssignmentControls />

            <br /><br /><br /><br />

            <ListGroup id="wd-assignment-list" className="rounded-0">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <Button
                            variant="link"
                            className="p-0 text-black me-2"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                        </Button>
                        ASSIGNMENTS
                        <FacultyRoute>
                            <AssignmentControlButtons />
                        </FacultyRoute>
                    </div>
                    {isExpanded &&
                        assignments
                            .filter((assignment: any) => assignment.course === cid)
                            .map((assignment: any) => (
                                <ListGroup className="wd-lessons rounded-0" key={assignment._id}>
                                    <ListGroup.Item className="wd-lesson p-3 ps-1">

                                        <Row>
                                            <Col xs='auto'>
                                                <BsGripVertical className="me-2 fs-3" />
                                                <FiEdit className="text-success fs-4" />
                                            </Col>


                                            <Col>
                                                <a href={currentUser.role === 'FACULTY' ? (`#/Kambaz/Courses/${assignment.course}/Assignments/${assignment._id}`) : (`#/Kambaz/Courses/${assignment.course}/Assignments`)} className="wd-assignment-link" >
                                                    {assignment.title}
                                                </a>
                                                <br />
                                                <span style={{ color: 'red' }}>Multiple Modules</span> |
                                                {
                                                    assignment.availableFromDate > new Date().toISOString() ?
                                                        <span> <b>Not available until</b> {formatDate(assignment.dueDate)} at 12:00am |</span> :
                                                        ""
                                                }
                                                <br />
                                                <b>Due</b> {formatDate(assignment.dueDate)} at 11:59pm | -/{assignment.points} pts
                                            </Col>

                                            <FacultyRoute>
                                                <Col xs='auto'>
                                                    <FaTrash onClick={() => handleShow()} className="text-danger me-3 mb-1" />
                                                    <LessonControlButtons />
                                                </Col>
                                            </FacultyRoute>
                                        </Row>

                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Delete Assignment</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Are you sure you want to remove this assignment?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}> Cancel </Button>
                                                <Button variant="danger"
                                                    onClick={() => {
                                                        removeAssignment(assignment._id);
                                                        handleClose();
                                                    }} > Delete Assignment </Button>
                                            </Modal.Footer>
                                        </Modal>

                                    </ListGroup.Item>
                                </ListGroup>
                            ))
                    }
                </ListGroup.Item>
            </ListGroup>

        </div>
    );
}
