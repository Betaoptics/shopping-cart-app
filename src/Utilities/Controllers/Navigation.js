import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/app">App</Link>
          </li>
          <li>
            <Link to="/frontpage">Frontpage</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Navigation;