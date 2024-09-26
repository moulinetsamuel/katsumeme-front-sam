import MemeCard from '../MemeCard/MemeCard';
import Sidebar from '../Sidebar/Sidebar';
import './MemePage.scss';
import { useEffect, useState } from 'react';
import useUserStore from '../UserStore/UserState';
import axiosInstance from '../API/axios';
import { Button, Col, Row } from 'react-bootstrap';

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
  const { user, uploadCount, isAuthenticated } = useUserStore();

  const deleteMeme = (memeId: number) => {
    setMemes((prevMemes) => prevMemes.filter((meme) => meme.id !== memeId));
  };

  // Function to fetch memes
  const fetchMeme = async () => {
    try {
      let url = `/api/memes?limit=${memesPerPage}&page=${page}`;
      if (isAuthenticated) {
        url += `&user_id=${(user as { id: number }).id}`;
      }
      const response = await axiosInstance.get<Meme[]>(url);
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

  // Fetch memes when the page changes
  useEffect(() => {
    fetchMeme();
  }, [page, isAuthenticated, uploadCount]); // Fetch memes when page, user.id change

  // Function to load more memes
  const handleLoadMoreMemes = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="MemePage">
      <Row>
        <Col md={4} lg={3}>
          <Sidebar />
        </Col>
        <Col md={8} lg={9}>
          <div className="MemeCardContainer d-flex flex-wrap">
            {Array.isArray(memes) &&
              memes.map((meme) => (
                <div key={meme.id} className="row md-12">
                  <div className="col-12">
                    <MemeCard meme={meme} deleteMeme={deleteMeme} />
                  </div>
                </div>
              ))}
          </div>
          {hasMoreMemes && (
            <div className="LoadMoreButton">
              <Button
                variant="primary"
                type="button"
                onClick={handleLoadMoreMemes}
                style={{
                  color: 'black',
                  backgroundColor: '#F9D701',
                  border: 'none',
                }}
              >
                Charger plus
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default MemePage;
