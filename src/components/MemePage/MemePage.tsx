import MemeCard from '../MemeCard/MemeCard';
import Sidebar from '../Sidebar/Sidebar';
import { IoIosShareAlt } from 'react-icons/io';
import { FaPlusCircle } from 'react-icons/fa';
import './MemePage.scss';

function MemePage() {
  return (
    <div className="MemePageContainer">
      <div className="ButtonContainer">
        <button
          className="Button"
          typeof="button"
          style={{
            color: 'white',
            background: '#775088',
            border: 'transparent',
            borderRadius: '1rem',
          }}
        >
          <IoIosShareAlt />
          Partager un meme
        </button>
        <button
          className="Button"
          typeof="button"
          style={{
            color: 'white',
            background: '#775088',
            border: 'transparent',
            borderRadius: '1rem',
          }}
        >
          <FaPlusCircle />
          Créer un meme
        </button>
      </div>

      <MemeCard />
      <Sidebar />
    </div>
  );
}

export default MemePage;
