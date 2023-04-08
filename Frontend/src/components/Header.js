import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import "../style/header.css";
import Cart from "../screens/Cart";
import Model from "../Model";
import { useCart } from "./ContextReuser";

function Header() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <Navbar className="bg-info" variant="light">
        <Container fluid="md" className="justify-content-between">
          <Nav>
            <Navbar.Brand className="fs-1 nav-link ">Food-Code</Navbar.Brand>
            <Link to="/" className="nav-link" style={{ marginTop: "15px" }}>
              Home
            </Link>
            {localStorage.getItem("authToken") ? (
              <Link to="/my-order" className="nav-link" style={{ marginTop: "15px" }}>
                My Orders
              </Link>
            ) : (
              ""
            )}
          </Nav>

          <Nav>
            {!localStorage.getItem("authToken") ? (
              <div>
                <Link to="/login" className="btn-comman">
                  Login
                </Link>
                <Link to="/signup" className="btn-comman">
                  SignUp
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-row">
                <div>
                  <div
                    className="btn-comman mx-2"
                    onClick={() => {
                      setCartView(true);
                    }}
                  >
                    My Cart{" "}
                    {data.length !== 0 ? (
                      <Badge pill bg="danger">
                        {data.length}
                      </Badge>
                    ) : null}
                  </div>
                </div>
                {cartView ? (
                  <Model onClose={() => setCartView(false)}>
                    <Cart />
                  </Model>
                ) : null}
                <div>
                  <div
                    className="btn-comman mx-2 text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
