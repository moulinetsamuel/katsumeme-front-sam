import { Nav, Navbar } from 'react-bootstrap';
import './Header.scss';
import LoginLogout from '../Button/ButtonLogin-Logout/ButtonLogin-Logout';
import { Link } from 'react-router-dom';
import ButtonShare from '../Button/ButtonShare/ButtonShare';
import ButtonCreate from '../Button/ButtonCreate/ButtonCreate';
import { RxHamburgerMenu } from 'react-icons/rx';

function Header() {
  return (
    <header className="Header d-flex justify-content-between">
      {/* Logo pour les écrans larges */}
      <Link to="/" className="d-none d-md-block">
        <img className="ImageTitle" src="Logo.png" alt="Logo Katsumeme Chat" />
      </Link>

      {/* Logo pour les écrans de taille md et plus petits */}
      <Link
        to="/"
        className="logo-container justify-content-center align-items-center"
      >
        <img
          className="Logoname d-md-none"
          src="Logoname.png"
          alt="Logo Title"
          style={{ width: '100%' }}
        />
      </Link>

      <div className="Login ms-auto d-none d-md-block">
        <LoginLogout />
      </div>

      {/* Side bar for small screen */}
      <Navbar
        collapseOnSelect
        expand="md"
        className="BurgerMenu d-md-none me-auto"
      >
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="bg-light"
        >
          <RxHamburgerMenu />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="flex-column text-center">
            <div className="buttonContainer">
              <ButtonShare label="Partager" />
              <ButtonCreate />
            </div>
            <div className="Links">
              <Nav.Link>Katsumeme du moment</Nav.Link>
              <Nav.Link>Les plus likés</Nav.Link>
              <Nav.Link>Les moins likés</Nav.Link>
              <Nav.Link>Derniers memes ajoutés</Nav.Link>
            </div>
            <LoginLogout />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
