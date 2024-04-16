import MemeCard from '../MemeCard/MemeCard';
import Sidebar from '../Sidebar/Sidebar';
import './MemePage.scss';
import ButtonShare from '../ButtonShare/ButtonShare';
import ButtonCreate from '../ButtonCreate/ButtonCreate';
import { useEffect, useState } from 'react';
import useUserStore from '../UserStore/UserState';
import axiosInstance from '../API/axios';
import Meme from '../MemeCard/MemeCard';
import { Button } from 'react-bootstrap';

function MemePage() {
  const [memes, setMemes] = useState([]); // State to store the memes
  const [page, setPage] = useState(1); // State to store the current page
  const memesPerPage = 3; // Number of memes to display per page
  const [hasMoreMemes, setHasMoreMemes] = useState(true); // State to track if there are more memes to load
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    user;
  }, []);
  console.log(user.id);

  // Function to fetch memes
  const fetchMeme = async () => {
    try {
      const startIndex = (page - 1) * memesPerPage; // Calculate the start index
      const response = await axiosInstance.get(
        `/api/memes?limit=${memesPerPage}&page=${page}&user_id=${(user as { id: number }).id}`
      );
      console.log('pouet', response.data);
      if (response.data.length === 0) {
        setHasMoreMemes(false); // Set hasMoreMemes to false if there are no more memes to load
        return;
      }
      if (page === 1) {
        setMemes(response.data); // Set the new memes
      } else setMemes((prevMemes) => [...prevMemes, ...response.data]); // Concatenate the new memes with the old ones
      setHasMoreMemes(true);
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
