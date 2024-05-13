import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaSearch } from 'react-icons/fa';
import './Sidebar.scss';
import ButtonShare from '../Button/ButtonShare/ButtonShare';
import ButtonCreate from '../Button/ButtonCreate/ButtonCreate';

function Sidebar() {
  return (
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
  );
}

export default Sidebar;
