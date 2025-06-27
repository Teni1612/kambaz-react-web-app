import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import * as client from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchProfile = () => {
        if (!currentUser) return navigate("/Kambaz/Account/Signin");
        setProfile(currentUser);
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
    };

    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };

    useEffect(() => {
        fetchProfile();
    }, [currentUser]);

    return (
        <div id="wd-profile-screen">
            <h1>Profile</h1>
            {profile && (
                <div>
                    <FormControl id="wd-username-profile" placeholder="username" className="mb-2"
                        defaultValue={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                    <FormControl id="wd-password-profile" placeholder="password" type="password" className="mb-2"
                        defaultValue={profile.password}
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                    <FormControl id="wd-firstname" placeholder="First name" className="mb-2"
                        defaultValue={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                    <FormControl id="wd-lastname" placeholder="Last name" className="mb-2"
                        defaultValue={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                    <FormControl id="wd-dob" type="date" className="mb-2"
                        defaultValue={profile.dob}
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
                    <FormControl id="wd-email" placeholder="email" type="email" className="mb-2"
                        defaultValue={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    <FormSelect id="wd-role" className="mb-2"
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </FormSelect>

                    <Button onClick={updateProfile} className="w-100 mb-2" id="wd-update-profile-btn" variant="primary">
                        Update
                    </Button>
                    <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn" variant="danger">
                        Sign out
                    </Button>
                </div>
            )}
        </div>
    );
}
