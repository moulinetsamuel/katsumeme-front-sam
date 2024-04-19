import Card from 'react-bootstrap/Card';
import { FaComment } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';
import { MdOutlineStarBorder } from 'react-icons/md';
import './MemeCard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import LikesDislikes from './LikesDislikes';
import Bookmarks from './Bookmarks';

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

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl); // Fetch the image URL
      const blob = await response.blob(); // Convert response to Blob

      const url = window.URL.createObjectURL(blob); // Create Blob URL
      const link = document.createElement('a'); // Create a link element
      link.href = url; // Set the href attribute of the link
      link.download = `Katsumeme-${new Date().getTime()}.png`;
      document.body.appendChild(link); // Append the link to the body
      link.click(); // Click the link
      document.body.removeChild(link); // Remove the link from the body
    } catch (error) {
      console.error('Error downloading meme:', error);
    }
  };

  return (
    <div className="MemeCardContainer d-flex flex-column justify-content-center">
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
                <div className="align-self-center">
                  <Card.Img
                    className="CardImage img-fluid"
                    variant="top"
                    src={meme.image_url}
                    // `${process.env.VITE_API_URL}/${meme.image_url}`
                  />
                </div>
                <div className="my-2 align-items-end">
                  {meme.tags.map((tag, tagIndex) => (
                    <Card.Link
                      key={tagIndex}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      {tag.tags.name}
                    </Card.Link>
                  ))}
                </div>
              </Card.Body>
              <Card.Footer
                style={{ backgroundColor: '#d6cadb' }}
                className="d-flex justify-content-between"
              >
                <Button type="button" variant="primary" className="me-2">
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
                  onClick={() => handleDownload(meme.image_url)} // Handle download button click
                >
                  <FaDownload />
                </Button>

                <Bookmarks memeId={meme.id} isBookmarked={meme.isBookmarked} />
              </Card.Footer>
            </Card>
          </div>
        </div>
      ))}
      ;
    </div>
  );
}

export default MemeCard;
