import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import useUserStore from '../UserStore/UserState';

interface ReactionsProps {
  initialLikes: number;
  initialDislikes: number;
  onLike: () => void;
  onDislike: () => void;
}

const Reactions: React.FC<ReactionsProps> = ({
  initialLikes,
  initialDislikes,
  onLike,
  onDislike,
}) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [dislikes, setDislikes] = useState(initialDislikes || 0);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(
    null
  );
  const isAuthenticated = useUserStore((state) => state.isAuthenticated); 

  const handleLike = () => {
    if (isAuthenticated) {
  
      if (userReaction !== 'like') {
        setLikes(likes + 1);
        setUserReaction('like');
        if (userReaction === 'dislike') {
          setDislikes(dislikes - 1);
        }
        onLike();
      } else {
        setLikes(likes - 1);
        setUserReaction(null);
      }
    } else {
    }
  };

  const handleDislike = () => {
    if (isAuthenticated) {
      if (userReaction !== 'dislike') {
        setDislikes(dislikes + 1);
        setUserReaction('dislike');
        if (userReaction === 'like') {
          setLikes(likes - 1);
        }
        onDislike();
      } else {
        setDislikes(dislikes - 1);
        setUserReaction(null);
      }
    } else {
    }
  };

  return (
    <div className="Reactions">
      <Button
        type="button"
        onClick={handleLike}
        variant={userReaction === 'like' ? 'success' : 'outline-success'}
      >
         ({likes})
      </Button>
      <Button
        type="button"
        onClick={handleDislike}
        variant={userReaction === 'dislike' ? 'danger' : 'outline-danger'}
      >
         ({dislikes})
      </Button>
    </div>
  );
};

export default Reactions;
