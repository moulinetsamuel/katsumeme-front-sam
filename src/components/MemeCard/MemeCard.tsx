import Card from 'react-bootstrap/Card';
import { FaComment } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';
import './MemeCard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import LikesDislikes from './LikesDislikes';
import Bookmarks from './Bookmarks';
import { saveAs } from 'file-saver';
import DeleteMeme from './DeleteMeme';
import { useEffect, useState } from 'react';
import useUserStore from '../UserStore/UserState';
import { IoPricetagOutline } from 'react-icons/io5';

interface MemeCardProps {
  meme: {
    id: number;
    image_url: string;
    title: string;
    created_at: string;
    tags: { tags: { name: string } }[];
    author: { nickname: string; avatar_url: string };
    _count: { liked_by: number };
    dislikeCount: { liked_by: number };
    isBookmarked: boolean;
    isliked: boolean;
  };
  deleteMeme: (memeId: number) => void;
}

// Component to display the memes
function MemeCard({ meme, deleteMeme }: MemeCardProps) {
  const [show, setShow] = useState(false);
  const { user, isAuthenticated } = useUserStore();

  const showDeleteBtn = () => {
    if (!isAuthenticated) {
      setShow(false);
      return;
    }
    if (
      user.nickname === meme.author.nickname ||
      (user.role && user.role.name === 'admin')
    ) {
      setShow(true);
    }
  };

  useEffect(() => {
    showDeleteBtn();
  }, [isAuthenticated]);

  // Function to format the date
  const formatDate = () => {
    const date = new Date(meme.created_at);
    const now = new Date();

    const diffMilliseconds = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      if (diffDays === 1) {
        return 'publié hier';
      } else {
        return `publié il y a ${diffDays} jour(s)`;
      }
    } else if (diffHours > 0) {
      return `publié il y a ${diffHours} heure(s)`;
    } else if (diffMinutes > 0) {
      return `publié il y a ${diffMinutes} minute(s)`;
    } else {
      return `publié il y a quelques secondes`;
    }
  };

  const handleDownload = () => {
    const filename = `Katsumeme_${meme.title}.jpg`;
    const url = `${import.meta.env.VITE_API_URL}${meme.image_url}`;
    saveAs(url, filename);
  };

  return (
    <div>
      <div className="CardContainer ">
        <Card className="CardStyle col-md-10 col-lg-10 col-xl-10 d-flex justify-content-center">
          <Card.Header style={{ backgroundColor: '#e8811c' }}>
            <Card.Title
              className="CardTitle pb-2"
              style={{
                fontSize: '1.8rem',
                color: '#775088',
              }}
            >
              {meme.title}
              {show && <DeleteMeme memeId={meme.id} deleteMeme={deleteMeme} />}
            </Card.Title>
            <Card.Subtitle
              className="Subtitle my-1 d-flex justify-content-between"
              style={{
                fontSize: '0.8rem',
                textAlign: 'left',
                color: '#ffffff',
              }}
            >
              {`Auteur: ${meme.author.nickname}, ${formatDate()}`}
            </Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <div className="margin-bottom-img align-self-center">
              <Card.Img
                className="CardImage img-fluid"
                variant="top"
                src={`${import.meta.env.VITE_API_URL}${meme.image_url}`}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div className="my-2 d-flex flex-wrap align-items-center">
              {meme.tags.map((tag, tagIndex) => (
                <Card.Link
                  key={tagIndex}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1rem',
                    color: '#806c00',
                    borderRadius: '0.8rem',
                  }}
                >
                  <IoPricetagOutline style={{ marginRight: '0.2rem' }} />

                  {tag.tags.name}
                </Card.Link>
              ))}
            </div>
          </Card.Body>
          <Card.Footer
            style={{
              backgroundColor: '#E8811C',
            }}
            className="d-flex justify-content-between align-items-center"
          >
            <Button
              type="button"
              variant="primary"
              className="me-2"
              style={{
                border: 'transparent',
                background: 'transparent',
                color: '#ffff',
                fontSize: '1.5rem',
              }}
            >
              <FaComment />
            </Button>

            <LikesDislikes
              memeId={meme.id}
              isLiked={meme.isliked}
              likesCount={meme._count.liked_by}
              dislikesCount={meme.dislikeCount.liked_by}
            />

            <Button
              className="downloadButton"
              type="button"
              variant="primary"
              onClick={() => handleDownload()} // Handle download button click
              style={{
                border: 'transparent',
                background: 'transparent',
                color: '#ffff',
                fontSize: '1.5rem',
              }}
            >
              <FaDownload />
            </Button>

            <Bookmarks memeId={meme.id} isBookmarked={meme.isBookmarked} />
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default MemeCard;
