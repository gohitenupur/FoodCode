import React from "react";
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <>
      <section className="bg-info">
        <footer classNameName="text-center text-white bg-info">
          <div className="container p-4 pb-0  ">
            <section className="bg-info">
              <p className="d-flex justify-content-center align-items-center">
                <span>Register for free</span>
                <Link to="/signup"
                  className="bg-info"
                  style={{
                    color:"white",
                    outline: "none",
                    border: "none",
                    marginLeft: "15px",
                    fontSize: "30px",
                  }}
                >
                  Sign up!
                </Link>
              </p>
            </section>
          </div>

          <div
            className="text-center p-3 bg-info"
            style={{ background: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2023 Copyright:
            <Link className="text-white" to="/">
              Nupur Gohite
            </Link>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Footer;
