import { Routes, Route, Navigate, useParams, useLocation } from "react-router";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import FacultyRoute from "../Account/FacultyRoute";
import * as courseClient from "./client";
import { useEffect, useState } from "react";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import QuizDetails from "./Quizzes/Details";
import QuizPreview from "./Quizzes/Preview";
import StartQuiz from "./Quizzes/StartQuiz";
import QuizResults from "./Quizzes/Results";
import PreviewResults from "./Quizzes/PreviewResults";

export default function Courses() {
    const pathname = useLocation().pathname;
    const { cid } = useParams();

    const [course, setCourse] = useState({
        _id: cid,
        name: "",
        number: "",
        startDate: "",
        endDate: "",
        image: "",
        description: ""
    });
    const [users, setUsers] = useState<any[]>([]);

    // useEffect fetch by ID
    const fetchCourseByID = async () => {
        try {
            if (cid) {
                const course = await courseClient.fetchCourseById(cid);
                setCourse(course);
            } else {
                console.error("Course ID is undefined.");
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchCourseByID();
    }, [cid]);

    const fetchUsersForCourse = async () => {
        try {
            if (cid) {
                const users = await courseClient.findUsersForCourse(cid);
                setUsers(users);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchUsersForCourse();
    }, [cid]);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>

                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<FacultyRoute><AssignmentEditor /></FacultyRoute>} />
                        <Route path="Assignments/New" element={<FacultyRoute><AssignmentEditor /></FacultyRoute>} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/:qid" element={<StartQuiz />} />
                        <Route path="Quizzes/:qid/Details" element={<QuizDetails />} />
                        <Route path="Quizzes/:qid/Results" element={<QuizResults />} />
                        <Route path="Quizzes/:qid/Edit" element={<FacultyRoute><QuizEditor /></FacultyRoute>} />
                        <Route path="Quizzes/:qid/Preview" element={<FacultyRoute><QuizPreview /></FacultyRoute>} />
                        <Route path="Quizzes/:qid/Preview/Results" element={<FacultyRoute><PreviewResults /></FacultyRoute>} />
                        <Route path="Quizzes/New" element={<FacultyRoute><QuizEditor /></FacultyRoute>} />
                        <Route path="People" element={<PeopleTable users={users} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}