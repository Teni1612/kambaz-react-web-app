import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function EnrollmentRoute({ children }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.coursesReducer)
    const { cid } = useParams();

    const isUserEnrolled = (courseId: string, currentUserId: string): boolean => {
        return enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUserId &&
                enrollment.course === courseId
        );
    };

    if (cid && isUserEnrolled(cid, currentUser._id)) {
        return children;
    } else {
        return <Navigate to="/Kambaz/Dashboard" />;
    }
}