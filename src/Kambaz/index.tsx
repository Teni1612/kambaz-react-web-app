import { Routes, Route, Navigate } from "react-router";
import "./styles.css";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import EnrollmentRoute from "./Account/EnrollmentRoute";
import Session from "./Account/Session";
import { useDispatch, useSelector } from "react-redux";
import { setCourses, setEnrollments } from "./Courses/reducer";
import * as userClient from "./Account/client";
import * as enrollmentsClient from "./Courses/enrollmentsClient";
import { useEffect } from "react";

export default function Kambaz() {
    const dispatch = useDispatch();
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchCourses = async () => {
        try {
            const courses = await userClient.findMyCourses();
            dispatch(setCourses(courses));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [currentUser]);

    const fetchEnrollments = async () => {
        try {
            const enrollments = await enrollmentsClient.getAllEnrollments();
            dispatch(setEnrollments(enrollments));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchEnrollments();
    }, [currentUser]);

    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard" element={
                            <ProtectedRoute>
                                <Dashboard courses={courses} />
                            </ProtectedRoute>
                        } />
                        <Route path="/Courses/:cid/*" element={<ProtectedRoute><EnrollmentRoute><Courses /></EnrollmentRoute></ProtectedRoute>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}