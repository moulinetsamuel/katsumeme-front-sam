import Card from 'react-bootstrap/Card';
import { FaComment } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';
import './MemeCard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import LikesDislikes from './LikesDislikes';
import Bookmarks from './Bookmarks';
import { saveAs } from 'file-saver';

interface Meme {
  memes: {
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
  }[];
}

// Component to display the memes
function MemeCard({ memes }: Meme) {
  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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

  const handleDownload = (path: string, title: string) => {
    const filename = `Katsumeme_${title}.jpg`;
    const url = `${import.meta.env.VITE_API_URL}${path}`;
    saveAs(url, filename);
  };

  return (
    <div>
      {memes.map((meme) => (
        <div key={meme.id} className="row mb-4">
          <div className="col d-flex justify-content-center">
            <Card
              className="CardStyle"
              style={{ border: '#000000 solid 0.2rem', width: '32rem' }}
            >
              <Card.Header style={{ backgroundColor: '#d6cadb' }}>
                <Card.Title
                  className="CardTitle pb-2"
                  style={{ fontSize: '2rem' }}
                >
                  {meme.title}
                </Card.Title>
                <Card.Subtitle
                  className="text-muted my-1"
                  style={{ fontSize: '1rem', textAlign: 'left' }}
                >
                  {`Auteur: ${meme.author.nickname}, ${formatDate(meme.created_at)}`}
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <div className="margin-bottom-img align-self-center">
                  <Card.Img
                    className="CardImage img-fluid"
                    variant="top"
                    src={`${import.meta.env.VITE_API_URL}${meme.image_url}`}
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
                        fontSize: '1.3rem',
                        textDecoration: 'none',
                        color: 'white',
                        background: '#70905f',
                        border: 'solid 0.1rem',
                        borderRadius: '0.8rem',
                        padding: '0.3rem 0.5rem 0.3rem 0.5rem',
                        marginRight: '0.5rem',
                        marginBottom: '0.5rem',
                        marginLeft: tagIndex !== 0 ? '0rem' : '0',
                      }}
                    >
                      {tag.tags.name}
                    </Card.Link>
                  ))}
                </div>
              </Card.Body>
              <Card.Footer
                style={{ backgroundColor: '#d6cadb' }}
                className="d-flex justify-content-between align-items-center"
              >
                <Button
                  type="button"
                  variant="primary"
                  className="me-2"
                  style={{
                    border: 'transparent',
                    background: 'transparent',
                    color: 'black',
                    fontSize: '2rem',
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
                  onClick={() => handleDownload(meme.image_url, meme.title)} // Handle download button click
                  style={{
                    border: 'transparent',
                    background: 'transparent',
                    color: 'black',
                    fontSize: '2rem',
                  }}
                >
                  <FaDownload />
                </Button>

                <Bookmarks memeId={meme.id} isBookmarked={meme.isBookmarked} />
              </Card.Footer>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemeCard;
