import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import useUserStore from '../UserStore/UserState';
import axiosInstance from '../API/axios';
import { SlDislike, SlLike } from 'react-icons/sl';
import Signin from '../Modals/Signin/Signin';

// RECUPERER LE NOMBRE DE LIKES ET DISLIKES DEJA PRESENTS SUR LE MEME
// POUVOIR ANNULER SON LIKE ET DISLKIKE

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
    try {
  
      if (userReaction !== 'like') {
        // If user have already reacted
        if (userReaction === 'dislike') {
          //then, cancel the dislike
          await axiosInstance.get(`/api/toggle/like/meme/${memeId}`);
          // setUserReaction('like');
          setDislikes((prevDislikes) =>  prevDislikes - 1);
        }
      // Apply like
        await axiosInstance.get(`/api/toggle/like/meme/${memeId}`);
        setUserReaction('like');
        setLikes((prevLikes) => prevLikes + 1);
         } else {
        // If user already liked, cancel the like
          await axiosInstance.get(`/api/toggle/like/meme/${memeId}`);
          setUserReaction(null);
          setLikes((prevLikes)=> prevLikes - 1);
        }
    } catch (error) {
      console.error('Error liking meme', error);
  }};


  const handleDislike = async () => {
    try {

      if (userReaction !== 'dislike') {
        // If user have already reacted
        if (userReaction === 'like') {
          //then, cancel the like
          await axiosInstance.get(`/api/toggle/dislike/meme/${memeId}`);
          // setUserReaction('dislike');
          setLikes((prevLikes) => prevLikes - 1);
        }
      // Apply dislike
        await axiosInstance.get(`/api/toggle/dislike/meme/${memeId}`);
        setUserReaction('dislike');
        setDislikes((prevDislikes) => prevDislikes + 1);
      } else {
        // If user already disliked, cancel the dislike
        await axiosInstance.get(`/api/toggle/dislike/meme/${memeId}`);
        setUserReaction(null);
        setDislikes((prevDislikes) => prevDislikes - 1);
      }
    } catch (error) {
      console.error('Error disliking meme', error);
    }
  }

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
