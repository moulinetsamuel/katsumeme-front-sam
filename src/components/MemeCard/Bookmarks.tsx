import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import useUserStore from '../UserStore/UserState';
import axiosInstance from '../API/axios';
import { GoStarFill } from 'react-icons/go';
import Signin from '../Modals/Signin/Signin';

interface BookmarksProps {
  memeId: number;
  isBookmarked: boolean;
}

function Bookmarks({ memeId, isBookmarked }: BookmarksProps) {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const { isAuthenticated } = useUserStore();
  const [openModalSignIn, setOpenModalSignIn] = useState(false);

  useEffect(() => {
    toggleBookmark();
  }, [isBookmarked]);

  const toggleBookmark = () => {
    if (isBookmarked === true || isBookmarked === false) {
      setBookmarked(isBookmarked);
    } else {
      setBookmarked(false);
    }
  };

  const onClickBookmark = () => {
    if (!isAuthenticated) {
      setOpenModalSignIn(true);
    } else {
      localBookmark();
      handleBookmark();
    }
  };

  const handleCloseSigninModal = () => {
    setOpenModalSignIn(false);
  };

  const handleBookmark = async () => {
    try {
      await axiosInstance.get(`api/toggle/bookmark/meme/${memeId}`);
    } catch (error) {
      console.error('Erreur lors de la mise en favoris', error);
    }
  };

  const localBookmark = async () => {
    if (bookmarked) {
      setBookmarked(false);
    } else {
      setBookmarked(true);
    }
  };

  return (
    <div className="Bookmark">
      <Button
        type="button"
        onClick={() => {
          onClickBookmark();
        }}
        // If Bookmark is true, the button will be yellow, otherwise only the border will be
        variant={bookmarked ? 'warning' : 'outline-dark'}
        style={{
          border: 'transparent',
          fontSize: '2rem',
          backgroundColor: 'transparent',
        }}
      >
        <div>
          <GoStarFill style={{ color: bookmarked ? 'yellow' : 'white' }} />
        </div>
      </Button>

      <Signin hide={openModalSignIn} onHide={handleCloseSigninModal} />
    </div>
  );
}
export default Bookmarks;
