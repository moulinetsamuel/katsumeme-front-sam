import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ButtonCreate.scss';
import { Button } from 'react-bootstrap';

function ButtonCreate() {
  return (
    <div>
      <Link to="/create-meme" style={{ textDecoration: 'none' }}>
        <Button
          type="button"
          className="Button"
          variant="primary"
          style={{
            color: 'white',
            background: '#70905f',
            border: 'solid 0.1rem',
            borderRadius: '1rem',
            display: 'flex',
          }}
        >
          <FaPlusCircle />
          Créer
        </Button>
      </Link>
    </div>
  );
}

export default ButtonCreate;
