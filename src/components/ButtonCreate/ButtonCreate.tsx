import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ButtonCreate.scss';

function ButtonCreate() {
  return (
    <div>
      <Link to="/create-meme">
        <button
          className="ButtonCreate"
          type="button"
          style={{
            color: 'white',
            background: '#775088',
            border: 'transparent',
            borderRadius: '0.5rem',
          }}
        >
          <FaPlusCircle />
          Créer un meme
        </button>
      </Link>
    </div>
  );
}

export default ButtonCreate;
