import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import AuthService from "./services/AuthService";
import AdminRoute from "./auth/AdminRoute";
import NormalRoute from "./auth/NormalRoute";
import {
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  DropdownButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";

import About from "./pages/About";
import AddBook from "./pages/AddBook";
import SignUp from "./pages/SignUp";
import BookList from "./components/BookList";
import Details from "./pages/Details";

import Login from "./pages/Login";

import Spinner from "react-bootstrap/Spinner";
const apiKey = process.env.REACT_APP_APIKEY;

function App() {
  let [bookList, setBookList] = useState([]);
  const [user, setUser] = useState({
    loaded: false,
    user: null,
    isLoggedIn: false,
  });

  let history = useHistory();
  const logout = () => {
    AuthService.logout({ setLogin });
    // setLoggedIn(false);
    window.location.href = "/login";
    alert("You has been logged out");
  };

  const setLogin = (user) => {
    setUser({ loaded: true, isLoggedIn: true, user: user });
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser({ isLoggedIn: false, loaded: true });

      return;
    }

    const res = await fetch(process.env.REACT_APP_SERVER + "/users/me", {
      method: "POST",
      headers: {
        "content-type": `application/json`,
      },
      body: JSON.stringify({ token }),
    });

    if (res.status === 200) {
      const u = await res.json();
      setLogin(u);
    } else {
      alert("not logged in");
      localStorage.removeItem("token");
      setUser({ isLoggedIn: false, loaded: true });
    }
  };
  // const ProtectedRoute = (props) => {
  //   if (user.isAuthenticated === true) {
  //     return <Route {...props} />;
  //   } else {
  //     return <Redirect to="/login" />;
  //   }
  // };
  useEffect(() => {
    console.log("this is the list");
    fetchUser();
    // getBookCollection();
  }, []);

  // if (bookList.length === 0) {
  //   return (
  //     <div>
  //       <span>Loading data...</span>
  //       <Spinner animation="border" />
  //     </div>
  //   );
  // }
  console.log(user);
  if (!user.loaded) return <h1>loading</h1>;
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">The Talking Books</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/about" className="navi-item">
                About
              </Link>

              <Link to="/books/create" className="navi-item">
                Create
              </Link>
              {/* <Link to="/create">Create</Link> */}

              {/* <NavDropdown title="Book Categories" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Best-selling books
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Books of the month
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Editor's choice
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Exclusive
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>

            <Link to="/signup" className="navi-item">
              Sign Up
            </Link>
            <Link to="/login" className="navi-item">
              Sign In
            </Link>

            {user.isLoggedIn ? (
              <DropdownButton
                title={`hi, ` + user.user.name}
                className="navi-item add-right-space"
              >
                <Link onClick={() => logout()} className="navi-item">
                  Sign Out
                </Link>
              </DropdownButton>
            ) : (
              <Link to="/login"></Link>
            )}

            {/* <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <div className="main-banner">
              <img
                src="https://images.pexels.com/photos/3767420/pexels-photo-3767420.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
              />
              <h1 className="page-title text-on-image">
                Welcome to The Talking Books
              </h1>
            </div>
            <div>
              <BookList />
            </div>
          </Route>

          <AdminRoute
            user={user}
            exact
            path="/books/create"
            component={AddBook}
          />
          <NormalRoute
            exact
            user={user}
            path="/books/:id"
            component={Details}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setLogin={setLogin} />}
          />
          <Route path="/about">
            <About></About>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          {/* <Route path="books/create">
              <AddBook></AddBook>
          </Route> */}
        </Switch>
        {/* <Login /> */}
        <div className="footer">
          <div className="footer-text text-center">Made by Duong Tran</div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
