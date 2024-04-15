import Card from 'react-bootstrap/Card';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';
import { MdOutlineStarBorder } from 'react-icons/md';
import { BsTags } from 'react-icons/bs';
import './MemeCard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axiosInstance from '../API/axios';
import Reactions from './Reactions';

interface MemeCardProps {
  meme: Meme;
}

interface Meme {
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
  likes: number;
  dislikes: number;
}

const handleLike = (memeId: number) => {
};

const handleDislike = (memeId: number) => {

};

// Function to format the date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const diffMilliseconds = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    if (diffDays === 1) {
      return 'Publié hier';
    } else {
      return `Publié il y a ${diffDays} jour(s)`;
    }
  } else if (diffHours > 0) {
    return `Publié il y a ${diffHours} heure(s)`;
  } else if (diffMinutes > 0) {
    return `Publié il y a ${diffMinutes} minute(s)`;
  } else {
    return `Publié il y a quelques secondes`;
  }
}

function MemeCard() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [page, setPage] = useState(1);
  const [totalMemesCount, setTotalMemesCount] = useState(0);
  const memesPerPage = 3;

  const fetchMeme = async () => {
    try {
      const startIndex = (page - 1) * memesPerPage;
      const response = await axiosInstance.get(
        `/api/memes?limit=${memesPerPage}&page=${page}`
      );
      if (page === 1) {
        setMemes(response.data); // Set the new memes
      } else setMemes((prevMemes) => [...prevMemes, ...response.data]); // Concatenate the new memes with the old ones
    } catch (error) {
      console.error('Error fetching meme data', error);
    }
  };

  useEffect(() => {
    fetchMeme();
  }, [page]);

  const handleLoadMoreMemes = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="MemeCardContainer">
      {memes.map((meme, index) => (
        <Card key={index} className="CardStyle" style={{ width: '23rem' }}>
          <Card.Body>
            <Card.Title>{meme.title}</Card.Title>
            <Card.Subtitle style={{ fontSize: '0.9rem', textAlign: 'left' }}>
              {`Auteur: ${meme.author.nickname}, ${formatDate(meme.created_at)}`}
            </Card.Subtitle>

            <Card.Img variant="top" src={meme.image_url} />
            <section>
              <BsTags />
              <div>
                {meme.tags.map((tag, tagIndex) => (
                  <Card.Link key={tagIndex} href="#">
                    {tag.tags.name}
                  </Card.Link>
                ))}
              </div>
            </section>

            <div className="Emotes">
              <Button 
              type="button"
              variant="primary">
                <FaComment />
              </Button>

           <Reactions
          initialLikes={meme.likes}
          initialDislikes={meme.dislikes}
          onLike={() => handleLike(meme.id)} 
          onDislike={() => handleDislike(meme.id)}
/>

              <Button 
              type="button"
              variant="primary">
                <FaDownload />
              </Button>
              <Button variant="primary">
                <MdOutlineStarBorder />
                {/* <MdOutlineStar /> */}
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <div className="LoadMoreButton">
        <Button variant="primary" type="button" onClick={handleLoadMoreMemes}>
          Chargez plus
        </Button>
      </div>
    </div>
  );
}

export default MemeCard;
