import Button from 'react-bootstrap/Button';
import axiosInstance from '../API/axios';
import { TiDelete } from 'react-icons/ti';

interface DeleteMemeProps {
  memeId: number;
}

function DeleteMeme({ memeId }: DeleteMemeProps) {
  const deleteMeme = async () => {
    try {
      await axiosInstance.delete(`api/memes/${memeId}`);
    } catch (error) {
      console.error('Erreur lors de la suppression du meme', error);
    }
  };

  return (
    <Button
      onClick={() => {
        deleteMeme();
      }}
    >
      <TiDelete />
    </Button>
  );
}

export default DeleteMeme;
