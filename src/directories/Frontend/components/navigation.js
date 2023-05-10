import { Outlet, Link } from "react-router-dom";
import NavigationBar from "./navigationbar/navigationBar";

const Navigation = () => {
  return (
    <>
    <NavigationBar key={`Navigation-bar`}/>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/app">Navigation</Link>
          </li>
          {/* <li>
            <Link to="/catalog">Frontpage</Link>
          </li> */}
          {/* <li>
            <Link to="/history">purchaseHistory</Link>
          </li> */}
          <li>
            <Link to="/minicard">miniCard</Link>
          </li>
          <li>
            <Link to="/dash/catalog">Frontpage</Link>
          </li>
          <li>
            <Link to="/dash/history">purchaseHistory</Link>
          </li>
          {/* <li>
            <Link to="/dash/minicard">miniCard</Link>
          </li> */}
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Navigation;