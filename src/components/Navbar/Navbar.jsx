import { Link } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <ul>
        <li>
          <Link to = "/carousel" className="carousel-link">
            Carousel
          </Link>
        </li>
        <li>
          <Link to = "progressbar" className="progress-bar-link">ProgressBar</Link>
        </li>
        <li><Link to = "file/explorer" className="file-explorer-link">File Explorer</Link></li>
        <li><Link className="wallet-expense-link">Expense Tracker</Link></li>
        <li><Link className="notes-link">Notes</Link></li>
        <li><Link className="infinite-scrolling-link">Infinte Scrolling</Link></li>
        <li><Link className="password-generator-link">Password Generator</Link></li>
        <li><Link className="countdown-link">Countdown</Link></li>
        <li><Link className="tic-tac-toe-link">Tic Tac Toe</Link></li>
        <li>
          <Link className="typeahead-search-link">Typeahead Search</Link>
        </li>
      </ul>
    </div>
  )
};

export default NavBar;
