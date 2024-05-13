import { Nav, Navbar } from 'react-bootstrap';
import './Header.scss';
import LoginLogout from '../Button/ButtonLogin-Logout/ButtonLogin-Logout';
import { Link } from 'react-router-dom';
import ButtonShare from '../Button/ButtonShare/ButtonShare';
import ButtonCreate from '../Button/ButtonCreate/ButtonCreate';
import { FaBars } from 'react-icons/fa6';

function Header() {
  return (
    <header className="Header d-flex justify-content-between">
      <div className="Banner px-3 py-2">
        {/* Logo pour les écrans larges */}
        <Link to="/" className="d-none d-md-block">
          <img
            className="ImageTitle"
            src="Logo.png"
            alt="Logo Katsumeme Chat"
          />
        </Link>

        {/* Logo pour les écrans de taille md et plus petits */}
        <Link to="/" className="bg-light d-md-none">
          <div className="">
            <img
              className="ImageTitle"
              src="public/Logoname.png"
              alt="Logo Title"
            />
          </div>
        </Link>
        <div className="Login ms-auto d-none d-md-block">
          <LoginLogout />
        </div>
      </div>

      {/* Side bar for small screen */}
      <Navbar
        collapseOnSelect
        expand="md"
        className="BurgerMenu d-md-none ms-auto"
      >
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="bg-light"
        >
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link>Katsumeme du moment</Nav.Link>
            <Nav.Link>Les plus likés</Nav.Link>
            <Nav.Link>Les moins likés</Nav.Link>
            <Nav.Link>Derniers memes ajoutés</Nav.Link>
          </Nav>
          <div>
            <LoginLogout />
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
