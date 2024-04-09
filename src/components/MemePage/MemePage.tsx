import MemeCard from '../MemeCard/MemeCard';
import Sidebar from '../Sidebar/Sidebar';
import { IoIosShareAlt } from 'react-icons/io';
import { FaPlusCircle } from 'react-icons/fa';
import './MemePage.scss';
import axios from 'axios';

function MemePage() {
  const handleButton = async () => {
    await axios
      .get('https://katsumeme-8c128449f9bf.herokuapp.com/api/test')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          onClick={handleButton}
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
