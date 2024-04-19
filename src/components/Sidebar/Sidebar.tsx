import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaSearch } from 'react-icons/fa';
import './Sidebar.scss';
import ButtonShare from '../Button/ButtonShare/ButtonShare';
import ButtonCreate from '../Button/ButtonCreate/ButtonCreate';

function Sidebar() {
  return (
    <section className="SidebarContainer">
      <div className="Searchbar">
        <form
          className="styleSearchBar d-flex align-items-center"
          action="search"
        >
          <FaSearch className="mr-2" />
          <input
            placeholder="Rechercher"
            type="text"
            style={{
              width: '12rem',
              border: 'none',
              background: 'transparent',
              outline: 'none',
            }}
          />
        </form>
      </div>

      <div className="Sidebar color">
        <div className="buttonContainer">
          <ButtonShare label="Partager" />
          <ButtonCreate />
        </div>
        <Navbar>
          <Container>
            <Nav.Link>Katsumeme du moment</Nav.Link>
          </Container>
        </Navbar>
        <Navbar>
          <Container>
            <Nav.Link>Les plus likés</Nav.Link>
          </Container>
        </Navbar>
        <Navbar>
          <Container>
            <Nav.Link>Les moins likés</Nav.Link>
          </Container>
        </Navbar>
        <Navbar>
          <Container>
            <Nav.Link>Derniers memes ajoutés</Nav.Link>
          </Container>
        </Navbar>
      </div>
    </section>
  );
}

export default Sidebar;
