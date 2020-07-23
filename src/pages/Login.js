import React, { useState } from "react";
// import FacebookLogin from "react-facebook-login";
import { Form, Button, Container, Row } from "react-bootstrap";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../app.constants";

// export default function Login() {
//   const responseFacebook = (response) => {
//     console.log(response);
//   };
//   return (
//     <div>
//       <FacebookLogin
//         appId="656968314900863"
//         fields="name,email,picture"
//         callback={responseFacebook}
//       />
//     </div>
//   );
// }

export default function Login({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const loginWithEmail = async () => {
    const data = await fetch(process.env.REACT_APP_SERVER + "/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const dt = await data.json();
    if (dt.status === "success") {
      const user = dt.data.user;
      const token = dt.data.token;
      localStorage.setItem("token", token);
      console.log("this is user", user);
      localStorage.setItem("user", user.name);
      setLogin(user);
      history.push("/");
    } else {
      console.log("fail to login");
    }
  };

  return (
    <Container>
      <Row>
        <div className="login-page">
          <h1>Login</h1>

          <p>
            Please log in to see the detail page of our books. Only the host can
            create a book.
          </p>
          <Form>
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
              onClick={() => loginWithEmail(email, password)}
            >
              Submit
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
}
