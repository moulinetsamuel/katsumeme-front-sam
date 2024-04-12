import { IoIosShareAlt } from 'react-icons/io';
import './ButtonShare.scss';

function ButtonShare() {
  return (
    <div>
      <button
        className="ButtonShare"
        type="button"
        style={{
          color: 'white',
          background: '#775088',
          border: 'transparent',
          borderRadius: '0.5rem',
        }}
      >
        <IoIosShareAlt />
        Partager un meme
      </button>
    </div>
  );
}
export default ButtonShare;
