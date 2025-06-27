import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FacultyRoute from "./Account/FacultyRoute";
import { useEffect, useState } from "react";
import { addNewCourse, deleteCourse, updateCourse, enrollCourse, unenrollCourse, setCourses } from "./Courses/reducer";
import * as userClient from "./Account/client";
import * as coursesClient from "./Courses/client";

export default function Dashboard({ courses }: { courses: any[] }) {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [showEnrolled, setShowEnrolled] = useState(true);
    const [shownCourses, setShownCourses] = useState<any[]>([]);
    const [course, setCourse] = useState<any>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description"
    });

    const createCourse = async (course: any) => {
        const newCourse = await coursesClient.createCourse(course);
        dispatch(addNewCourse(newCourse));
    };

    const removeCourse = async (courseId: string) => {
        await coursesClient.deleteCourse(courseId);
        dispatch(deleteCourse(courseId));
    };

    const saveCourse = async (course: any) => {
        await coursesClient.updateCourse(course);
        dispatch(updateCourse(course));
    };

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        const userId = currentUser._id;
        if (enrolled) {
            await userClient.enrollIntoCourse(currentUser._id, courseId);
            dispatch(enrollCourse({ userId, courseId }));
        } else {
            await userClient.unenrollFromCourse(currentUser._id, courseId);
            dispatch(unenrollCourse({ userId, courseId }));
        }
        
        dispatch(setCourses(
            courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            })
        ));
    };

    const fetchAllCourses = async () => {
        try {
            const allCourses = await coursesClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            setShownCourses(courses);
            dispatch(setCourses(courses));
        } catch (error) {
            console.error(error);
        }
    }

    const findCoursesForUser = async () => {
        try {
            const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
            setShownCourses(enrolledCourses);
            dispatch(setCourses(enrolledCourses));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (showEnrolled) {
            findCoursesForUser();
        } else {
            fetchAllCourses();
        }
    }, [currentUser, showEnrolled]);

    return (
        <div id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

            <FacultyRoute>
                <h5>
                    New Course
                    <button className="btn btn-primary float-end"
                        id="wd-add-new-course-click"
                        onClick={() => createCourse(course)} >
                        Add
                    </button>
                    <button className="btn btn-warning float-end me-2"
                        onClick={() => saveCourse(course)} id="wd-update-course-click">
                        Update
                    </button>
                    <br /><br />
                    <Form.Control value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <Form.Control value={course.description} as="textarea" rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                </h5>
                <hr />
            </FacultyRoute>

            <h2 id="wd-dashboard-published">
                Published Courses ({shownCourses.length})
                <Button className="float-end me-2" variant="primary"
                    onClick={() => setShowEnrolled(!showEnrolled)}>
                    {showEnrolled ? "All Courses" : "My Courses"}
                </Button>
            </h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">

                    {courses.map((course: any) => (
                        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Link to={`/Kambaz/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark" >
                                    <Card.Img src={course.image} variant="top" width="100%" height={160} />
                                    <Card.Body className="card-body">
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">{course.name}</Card.Title>
                                        <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>{course.description}</Card.Text>

                                        <Button variant="primary" className="float-start mb-3" hidden={!course.enrolled && !showEnrolled}>Go</Button>

                                        {showEnrolled ? (
                                            <FacultyRoute>
                                                <Button onClick={(event) => {
                                                    event.preventDefault();
                                                    removeCourse(course._id);
                                                }} className="float-end"
                                                    variant="danger"
                                                    id="wd-delete-course-click">
                                                    Delete
                                                </Button>
                                                <Button id="wd-edit-course-click"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        setCourse(course);
                                                    }}
                                                    variant="warning"
                                                    className="me-2 float-end" >
                                                    Edit
                                                </Button>
                                            </FacultyRoute>
                                        ) : (
                                            <Button
                                                className="float-end mb-3" variant={course.enrolled ? "danger" : "success"}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    updateEnrollment(course._id, !course.enrolled);
                                                }}>
                                                {course.enrolled ? "Unenroll" : "Enroll"}
                                            </Button>
                                        )}
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))
                    }
                </Row>
            </div>
        </div>
    );
}
