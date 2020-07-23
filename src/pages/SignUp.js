import React, { useState } from "react";
// import FacebookLogin from "react-facebook-login";
import { Form, Button, Container, Row } from "react-bootstrap";
import "./SignUp.css";
import { BACKEND_URL } from "../app.constants";

export default function SignUp() {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const signUp = async () => {
<<<<<<< HEAD
    const data = await fetch(process.env.REACT_APP_SERVER + "/users", {
=======
    const data = await fetch(`${BACKEND_URL}/users`, {
>>>>>>> develop
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
    if (data.status === 201) {
      console.log("user has been created");
      alert("User has been created, now you can login with this account");
    } else {
      console.log("cannot register");
    }
  };

  return (
    <Container>
      <Row>
        <div className="signup-page">
          <h1>Sign Up</h1>

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => signUp(name, email, password)}
            >
              Submit
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
}
