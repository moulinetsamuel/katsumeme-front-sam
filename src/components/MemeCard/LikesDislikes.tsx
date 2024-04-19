import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import useUserStore from '../UserStore/UserState';
import axiosInstance from '../API/axios';
import { SlDislike, SlLike } from 'react-icons/sl';
import Signin from '../Modals/Signin/Signin';

interface LikesDislikesProps {
  memeId: number;
  isLiked: boolean;
  likesCount: number;
  dislikesCount: number;
}

function LikesDislikes({
  memeId,
  isLiked,
  likesCount,
  dislikesCount,
}: LikesDislikesProps) {
  const [likes, setLikes] = useState<number>(likesCount);
  const [dislikes, setDislikes] = useState<number>(dislikesCount);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const [openModalSignIn, setOpenModalSignIn] = useState(false);
  console.log('test1', disliked, isLiked);

  useEffect(() => {
    if (isLiked) {
      setLiked(isLiked);
      setDisliked(isLiked);
    }
  }, []);

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
      await axiosInstance.get(`api/toggle/like/meme/${memeId}`);
    } catch (error) {
      console.error('Erreur lors du like du meme', error);
    }
  };

  const handleDislike = async () => {
    try {
      await axiosInstance.get(`api/toggle/dislike/meme/${memeId}`);
    } catch (error) {
      console.error('Erreur lors du like du meme', error);
    }
  };

  return (
    <div className="Reactions">
      <Button
        type="button"
        onClick={() => {
          handleLike();
          handleOpenSigninModal();
        }}
        // If Liked is true, the button will be green, otherwise only the border will be green
        variant={liked ? 'success' : 'outline-success'}
      >
        <SlLike />({likes})
      </Button>

      <Button
        type="button"
        onClick={() => {
          handleDislike();
          handleOpenSigninModal();
        }}
        // If Disliked is true, the button will be red, otherwise only the border will be red
        variant={disliked ? 'danger' : 'outline-danger'}
      >
        <SlDislike />({dislikes})
      </Button>

      <Signin hide={openModalSignIn} onHide={handleCloseSigninModal} />
    </div>
  );
}
export default LikesDislikes;
