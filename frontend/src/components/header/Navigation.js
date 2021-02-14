import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as actions from "../../store/auth/actions";
const Navigation = () => {
  const isAuth = useSelector((state) => state.auth.userId);
  let history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actions.logout());
    history.push("/login");
  };

  return (
    <div
      className="collapse navbar-collapse d-flex justify-content-between"
      id="navbarSupportedContent"
    >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {isAuth && (
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/addproduct"
            >
              Add Product
            </Link>
          </li>
        )}
      </ul>
      <ul className="navbar-nav mr-2 mb-lg-0">
        {!isAuth && (
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/login">
              Login
            </Link>
          </li>
        )}

        {!isAuth && (
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/signup">
              SignUp
            </Link>
          </li>
        )}
        {isAuth && (
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="page"
              onClick={handleLogout}
            >
              Logout
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
