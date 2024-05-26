import React, { useState, useRef, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './Header.scss';
import LoginLogout from '../Button/ButtonLogin-Logout/ButtonLogin-Logout';
import { Link } from 'react-router-dom';
import ButtonShare from '../Button/ButtonShare/ButtonShare';
import ButtonCreate from '../Button/ButtonCreate/ButtonCreate';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaSearch } from 'react-icons/fa';

function Header() {
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !(navbarRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <img className="d-md-none" src="Logoname.png" alt="Logo Title" />
      </Link>

      <div className="Login ms-auto d-none d-md-block">
        <LoginLogout close={() => setExpanded(false)} />
      </div>

      {/* Side bar for small screen */}
      <Navbar
        ref={navbarRef}
        expanded={expanded}
        onToggle={handleToggle}
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
              <ButtonShare label="Partager" close={() => setExpanded(false)} />
              <ButtonCreate close={() => setExpanded(false)} />
            </div>
            <div className="Links">
              <Nav.Link onClick={() => setExpanded(false)}>
                Katsumeme du moment
              </Nav.Link>
              <Nav.Link onClick={() => setExpanded(false)}>
                Les plus likés
              </Nav.Link>
              <Nav.Link onClick={() => setExpanded(false)}>
                Les moins likés
              </Nav.Link>
              <Nav.Link onClick={() => setExpanded(false)}>
                Derniers memes ajoutés
              </Nav.Link>
            </div>
            <LoginLogout close={() => setExpanded(false)} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
