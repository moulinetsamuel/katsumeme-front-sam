import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaSearch } from 'react-icons/fa';
import './Sidebar.scss';
import ButtonShare from '../Button/ButtonShare/ButtonShare';
import ButtonCreate from '../Button/ButtonCreate/ButtonCreate';
import { Button } from 'react-bootstrap';
import LoginLogout from '../Button/ButtonLogin-Logout/ButtonLogin-Logout';

function Sidebar() {
  return (
    <>
      <section className="SidebarContainer d-none d-md-block">
        <div className="Searchbar">
          <form
            className="styleSearchBar d-flex align-items-center"
            action="search"
          >
            <FaSearch className="mglass mr-2" />
            <input
              placeholder="Rechercher"
              type="text"
              style={{
                width: '10rem',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                textAlign: 'center',
                paddingTop: '1rem',
              }}
            />
          </form>
        </div>
        <div className="Sidebar color">
          <div className="buttonContainer">
            <ButtonShare label="Partager" />
            <ButtonCreate />
          </div>

          <Navbar className="Navbar">
            <Container>
              <Nav.Link className="custom">Katsumeme du moment</Nav.Link>
            </Container>
          </Navbar>
          <Navbar>
            <Container>
              <Nav.Link className="custom">Les plus likés</Nav.Link>
            </Container>
          </Navbar>
          <Navbar>
            <Container>
              <Nav.Link className="custom">Les moins likés</Nav.Link>
            </Container>
          </Navbar>
          <Navbar>
            <Container>
              <Nav.Link className="custom">Derniers memes ajoutés</Nav.Link>
            </Container>
          </Navbar>

          <img src="/LogoChat.png" alt="Logo" className="SidebarImage" />
        </div>
      </section>

      {/* Burger Menu for Small Screens */}
      <Navbar collapseOnSelect expand="md" className="d-md-none me-auto">
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="bg-light"
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" className="navbar-collapse">
          <Nav className="flex-column">
            {/* Search bar added here */}
            <div className="Searchbar">
              <form
                className="styleSearchBar d-flex align-items-center"
                action="search"
              >
                <FaSearch className="glass mglass mr-2" />
                <input
                  placeholder="Rechercher"
                  type="text"
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    textAlign: 'center',
                  }}
                />
              </form>
            </div>
            <div className="buttonContainer">
              <ButtonShare label="Partager" />
              <ButtonCreate />
            </div>
            <Nav.Link className="custom">Katsumeme du moment</Nav.Link>
            <Nav.Link className="custom">Les plus likés</Nav.Link>
            <Nav.Link className="custom">Les moins likés</Nav.Link>
            <Nav.Link className="custom">Derniers memes ajoutés</Nav.Link>
            <div className="logButton">
              <Button className="btn-logout">
                Se déconnecter
                <LoginLogout />
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Sidebar;
