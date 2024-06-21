import "./footer.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <ul className="menu">
        <li>
          <Link className="link" to={"/"}>
            Home
          </Link>
        </li>
        <li>About</li>
        <li>Services</li>
        <li>
          <Link className="link" to={"/timekiller"}>
            Timekiller
          </Link>
        </li>
        <li>Contact</li>
      </ul>
      <p>@2024 Footer | All Rights Reserved</p>
    </footer>
  );
}
