import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Button, FormControl } from "react-bootstrap";
import * as client from "./client";

export default function Signup() {
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        navigate("/Kambaz/Account/Profile");
    };

    return (
        <div className="wd-signup-screen">
            <h1>Sign up</h1>
            <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="wd-username mb-2" placeholder="username" />
            <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="wd-password mb-2" placeholder="password" type="password" />
            <Button onClick={signup} className="wd-signup-btn mb-2 w-100" variant="primary"> Sign up </Button>
            <br />
            <Link to="/Kambaz/Account/Signin" className="wd-signin-link">Sign in</Link>
        </div>
    );
}

