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
import AuthProvider from '../Auth/AuthProvider';

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
}

function MemeCard() {
  const [meme, setMeme] = useState<meme[]>([]);

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const response = await axiosInstance.get('/api/memes?limit=6&page=1');
        setMeme(response.data);
      } catch (error) {
        console.error('Error fetching meme data', error);
      }
    };

    fetchMeme();
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    //   return localStorage.getItem('token') !== null;
    // }); // State to track if user is login or not

    // useEffect(() => {
    //   const handleStorageCHange = () => {
    //     setIsLoggedIn(localStorage.getItem('token') !== null);
    //   };
    //   window.addEventListener('storage', handleStorageCHange);

    //   return () => {
    //     window.removeEventListener('storage', handleStorageCHange);
    //   };
  }, []);

  return (
    <div className="MemeCardContainer">
      {meme.map((meme, index) => (
        <Card key={index} className="CardStyle" style={{ width: '25rem' }}>
          <Card.Body>
            <Card.Title>{meme.title}</Card.Title>
            <Card.Subtitle>{`Auteur: ${meme.author.nickname}, créé le ${meme.created_at}`}</Card.Subtitle>

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
              <Button variant="primary">
                <FaComment />
              </Button>
              <Button variant="primary">
                <AiFillLike />
              </Button>
              <Button variant="primary">
                <AiFillDislike />
              </Button>
              <Button variant="primary">
                <FaDownload />
              </Button>
              {isLoggedIn && (
                <Button variant="primary">
                  <MdOutlineStarBorder />
                  {/* <MdOutlineStar /> */}
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default MemeCard;
