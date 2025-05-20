import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


export default function Signin() {
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/Kambaz/Account/Profile");
  };

  return (
    <Container fluid className="vh-100 g-0">
      <Row className="h-100 g-0">
        <Col xs={12} md={50} className="d-flex align-items-start justify-content-center">
          <div style={{ width: "100%", maxWidth: 400, padding: "2rem" }}>           
  <h1 className="mb-4">Sign in</h1>
            <Form onSubmit={handleSignIn}>
              <Form.Group controlId="wd-username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="username" />
              </Form.Group>

              <Form.Group controlId="wd-password" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" />
              </Form.Group>

              <Button
                id="wd-signin-btn"
                variant="primary"
                type="submit"              
                className="w-100 mb-3"
              >
                Sign in
              </Button>

              <div className="text-center">
                <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
                  Sign up
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}