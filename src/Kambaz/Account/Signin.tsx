import { useState } from "react";
import { useDispatch } from "react-redux";
import { Accordion, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
import { FaCircleInfo, FaCheck, FaWandMagicSparkles } from "react-icons/fa6";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate("/Kambaz/Dashboard");
    };

    const UseThisButton = ({
        username,
        password,
        label,
    }: {
        username: string;
        password: string;
        label: string;
    }) => (
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{copiedField === label ? "Used!" : "Use this"}</Tooltip>}
        >
            <Button
                variant="link"
                className="p-0 ms-2 text-decoration-none"
                style={{ fontSize: "0.85rem", width: "75px" }}
                onClick={() => {
                    setCredentials({ username, password });
                    setCopiedField(label);
                    setTimeout(() => setCopiedField(null), 3000);
                }}
            >
                {copiedField === label ? <FaCheck className="text-success" /> : <span className="text-danger"><FaWandMagicSparkles className="mb-1" /> Use this</span>}
            </Button>
        </OverlayTrigger>
    );

    return (
        <div id="wd-signin-screen">
            <h1>Sign in</h1>

            <Form.Control defaultValue={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                id="wd-username" placeholder="username" className="mb-2" />
            <Form.Control defaultValue={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                id="wd-password" placeholder="password" type="password" className="mb-2" />
            <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2"> Sign in </Button> <br />
            <Link to="/Kambaz/Account/Signup" id="wd-signup-link">Sign up</Link>

            <Accordion className="mb-3 mt-4 border-0 shadow-sm rounded" style={{ width: "325px", margin: "0 auto" }}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <FaCircleInfo className="me-2 text-secondary" />
                        <span className="me-3">
                            Demo Credentials
                        </span>
                    </Accordion.Header>
                    <Accordion.Body className="pt-2">
                        <div className="d-flex justify-content-between align-items-stretch flex-wrap">
                            <div className="d-flex flex-column">
                                <div className="fw-bold">
                                    Faculty
                                </div>
                                <div>
                                    <span className="me-2">Username: <code style={{ backgroundColor: "#f5f5f5", color: "#333", padding: "2px 6px", borderRadius: "4px" }}>
                                        iron_man
                                    </code>
                                    </span>
                                </div>
                                <div>
                                    <span className="me-2">Password: <code style={{ backgroundColor: "#f5f5f5", color: "#333", padding: "2px 6px", borderRadius: "4px" }}>
                                        stark123
                                    </code>
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <UseThisButton username="iron_man" password="stark123" label="faculty" />
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-stretch flex-wrap">
                            <div className="d-flex flex-column">
                            <div className="fw-bold">
                                    Student
                                </div>
                                <div>
                                    <span className="me-2">Username: <code style={{ backgroundColor: "#f5f5f5", color: "#333", padding: "2px 6px", borderRadius: "4px" }}>
                                        dark_knight
                                    </code>
                                    </span>
                                </div>
                                <div>
                                    <span className="me-2">Password: <code style={{ backgroundColor: "#f5f5f5", color: "#333", padding: "2px 6px", borderRadius: "4px" }}>
                                        wayne123
                                    </code>
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <UseThisButton username="dark_knight" password="wayne123" label="student" />
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </div>
    );
}
