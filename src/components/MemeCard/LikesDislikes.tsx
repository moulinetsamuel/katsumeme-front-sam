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
  const { isAuthenticated, setAppState } = useUserStore();
  const [openModalSignIn, setOpenModalSignIn] = useState(false);

  useEffect(() => {
    toggleLike();
  }, [isLiked]);

  const toggleLike = () => {
    if (isLiked === true || isLiked === false) {
      setLiked(isLiked);
      setDisliked(!isLiked);
    } else {
      setLiked(false);
      setDisliked(false);
    }
  };

  const onClickLike = () => {
    if (!isAuthenticated) {
      setOpenModalSignIn(true);
    } else {
      handleLike();
    }
  };

  const onClickDislike = () => {
    if (!isAuthenticated) {
      setOpenModalSignIn(true);
    } else {
      handleDislike();
    }
  };

  const handleCloseSigninModal = () => {
    setOpenModalSignIn(false);
  };

  const handleLike = async () => {
    try {
      await axiosInstance.get(`api/toggle/like/meme/${memeId}`);
      localLike();
    } catch (error) {
      console.error('Erreur lors du like du meme', error);
    }
  };

  const handleDislike = async () => {
    try {
      await axiosInstance.get(`api/toggle/dislike/meme/${memeId}`);
      localDislike();
    } catch (error) {
      console.error('Erreur lors du like du meme', error);
    }
  };

  const localLike = async () => {
    switch (true) {
      case liked:
        setLikes(likes - 1);
        setLiked(false);
        break;
      case disliked:
        setLikes(likes + 1);
        setDislikes(dislikes - 1);
        setLiked(true);
        setDisliked(false);
        break;
      default:
        setLikes(likes + 1);
        setLiked(true);
        break;
    }
  };

  const localDislike = async () => {
    switch (true) {
      case disliked:
        setDislikes(dislikes - 1);
        setDisliked(false);
        break;
      case liked:
        setDislikes(dislikes + 1);
        setLikes(likes - 1);
        setDisliked(true);
        setLiked(false);
        break;
      default:
        setDislikes(dislikes + 1);
        setDisliked(true);
        break;
    }
  };

  return (
    <div className="Reactions">
      <Button
        type="button"
        onClick={() => {
          onClickLike();
        }}
        // If Liked is true, the button will be green, otherwise only the border will be green
        variant={liked ? 'success' : 'outline-success'}
      >
        <SlLike />({likes})
      </Button>

      <Button
        type="button"
        onClick={() => {
          onClickDislike();
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
