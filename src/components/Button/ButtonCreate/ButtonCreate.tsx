import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ButtonCreate.scss';
import { Button } from 'react-bootstrap';

type ButtonCreateProps = {
  close?: (boolean: any) => void;
};

function ButtonCreate({ close = () => {} }: ButtonCreateProps) {
  return (
    <div className="CreateButton">
      <Link to="/create-meme" style={{ textDecoration: 'none' }}>
        <Button
          type="button"
          className="CustomButton"
          variant="primary"
          style={{
            background: '#F9D701',
            border: 'solid 0.1rem',
            borderRadius: '1rem',
            display: 'flex',
            fontVariant: 'small-caps',
          }}
          onClick={(event) => {
            close(false);
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
