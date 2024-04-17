import MemeCard from '../MemeCard/MemeCard';
import Sidebar from '../Sidebar/Sidebar';
import './MemePage.scss';
import ButtonShare from '../ButtonShare/ButtonShare';
import ButtonCreate from '../ButtonCreate/ButtonCreate';
import { useEffect, useState } from 'react';
import useUserStore from '../UserStore/UserState';
import axiosInstance from '../API/axios';
import { Button } from 'react-bootstrap';

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

function MemePage() {
  const [memes, setMemes] = useState<Meme[]>([]); // State to store the memes
  const [page, setPage] = useState(1); // State to store the current page
  const memesPerPage = 3; // Number of memes to display per page
  const [hasMoreMemes, setHasMoreMemes] = useState(true); // State to track if there are more memes to load
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    user;
  }, []);

  // Function to fetch memes
  const fetchMeme = async () => {
    try {
      const response = await axiosInstance.get<Meme[]>(
        `/api/memes?limit=${memesPerPage}&page=${page}&user_id=${(user as { id: number }).id}`
      );
      console.log('pouet', response.data);
      if (response.data.length === 0) {
        setHasMoreMemes(false); // Set hasMoreMemes to false if there are no more memes to load
        return; 
      }
      if (page === 1) {
        setMemes(response.data); // Set the new memes
      } else {
        setMemes((prevMemes) => [...prevMemes, ...response.data]); // Append the new memes
        setHasMoreMemes(true);
      }
    } catch (error) {
      console.error('Error fetching meme data', error);
    }
  };
  // Fetch memes when the page loads
  useEffect(() => {
    fetchMeme();
  }, [page]); // Fetch memes when the page changes

  // Function to load more memes
  const handleLoadMoreMemes = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div>
      <div className="ButtonContainer">
        <ButtonShare />
        <ButtonCreate />
      </div>
      <MemeCard memes={memes} />
      {hasMoreMemes && (
        <div className="LoadMoreButton">
          <Button
            variant="primary"
            type="button"
            onClick={handleLoadMoreMemes}
            style={{ backgroundColor: '#e8811c' }}
          >
            Charger plus
          </Button>
        </div>
      )}
      <Sidebar />
    </div>
  );
}

export default MemePage;
