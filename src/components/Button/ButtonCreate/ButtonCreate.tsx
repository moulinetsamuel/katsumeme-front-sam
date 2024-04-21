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
          style={{
            color: 'white',
            background: '#775088',
            border: 'transparent',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
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
