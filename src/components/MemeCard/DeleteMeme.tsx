import Button from 'react-bootstrap/Button';
import axiosInstance from '../API/axios';
import { TiDelete } from 'react-icons/ti';

interface DeleteMemeProps {
  memeId: number;
  deleteMeme: (memeId: number) => void;
}

function DeleteMeme({ memeId, deleteMeme }: DeleteMemeProps) {
  const deleteMemeHandler = async () => {
    try {
      await axiosInstance.delete(`api/memes/${memeId}`);
      deleteMeme(memeId);
    } catch (error) {
      console.error('Erreur lors de la suppression du meme', error);
    }
  };

  return (
    <Button
      style={{
        color: '#775088',
        backgroundColor: 'transparent',
        border: 'none',
      }}
      onClick={deleteMemeHandler}
    >
      <TiDelete style={{ color: '#775088' }} />
    </Button>
  );
}

export default DeleteMeme;
