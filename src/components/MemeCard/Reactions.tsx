import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import useUserStore from '../UserStore/UserState';
import axiosInstance from '../API/axios';
import { SlDislike, SlLike } from 'react-icons/sl';
import Signin from '../Modals/Signin/Signin';

// RECUPERER LE NOMBRE DE LIKES ET DISLIKES DEJA PRESENTS SUR LE MEME

interface ReactionsProps {
  memeId: number;
}

function Reactions({ memeId }: ReactionsProps) {
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(
    null
  );
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const [openModalSignIn, setOpenModalSignIn] = useState(false);
  
  const handleOpenSigninModal = () => {
    if (!isAuthenticated) {
      setOpenModalSignIn(true);
    }
  };
  
  const handleCloseSigninModal = () => {
    setOpenModalSignIn(false);
  };

  const handleLike = async () => {
    {
      try {
        const likeUrl = `/api/toggle/like/meme/${memeId}`;
        console.log(likeUrl);
        
        await axiosInstance.get(likeUrl); // Use the constructed URL
        setUserReaction('like'); // Update user reaction state
        setLikes((prevLikes) => prevLikes + 1); // Update likes count
        if (userReaction === 'dislike') {
          setDislikes((prevDislikes) => prevDislikes - 1); // Update dislikes count
        }
      } catch (error) {
        console.error('Error liking meme', error);
      }
    }
  };

  const handleDislike = async () => {
     {
      try {
        const dislikeUrl = `/api/toggle/dislike/meme/${memeId}`;
         // Build the URL dynamically
        await axiosInstance.get(dislikeUrl); // Use the constructed URL
        setUserReaction('dislike');
        setDislikes((prevDislikes) => prevDislikes + 1);
        if (userReaction === 'like') {
          setLikes((prevLikes) => prevLikes - 1);
        }
      } catch (error) {
        console.error('Error disliking meme', error);
      }
    }
  };

  return (
    <div className="Reactions">
      <Button
        type="button"
        onClick={()=> { handleLike(); handleOpenSigninModal(); }}
        variant={userReaction === 'like' ? 'success' : 'outline-success'}
      >
        <SlLike className={userReaction === 'like' ? 'filled-icon' : ''} /> (
        {likes})
      </Button>
      <Button
        type="button"
        onClick={()=> { handleDislike(); handleOpenSigninModal(); }}
        variant={userReaction === 'dislike' ? 'danger' : 'outline-danger'}
      >
        <SlDislike
          className={userReaction === 'dislike' ? 'filled-icon' : ''}
        />{' '}
        ({dislikes})
      </Button>
      <Signin hide={openModalSignIn} onHide={handleCloseSigninModal} />
    </div>
  );
}

export default Reactions;
