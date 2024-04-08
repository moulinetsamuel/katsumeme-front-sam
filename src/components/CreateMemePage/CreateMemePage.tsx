import { useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './CreateMemePage.scss';

const API_URL = //use api
  function CreateMemePage() {
    const [memeData, setMemeData] = useState({
      textTop: '',
      textBottom: '',
      image: null,
    });

    const handleMemeChange = (event) => {
      const { name, value } = event.target;
      setMemeData({ ...memeData, [name]: value });
    };

    const handleImageUpload = (event) => {
      const imageFile = event.target.files[0];
      setMemeData({ ...memeData, image: imageFile });
    };

    const handleGenerateMeme = async () => {
      const formData = new FormData();
      //use api
      if (memeData.image) {
        formData.append('image', memeData.image);
      }

      try {
        const response = await axios.post(API_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const memeUrl = response.data.data.url;
        // Handle successful meme generation, e.g., display the meme image
        console.log('Meme generated:', memeUrl);
      } catch (error) {
        console.error('Error generating meme:', error);
        // Handle API errors
      }
    };

    return (
      <div className="container">
        <h1>Créer son Katsumeme</h1>
        <div className="row">
          <div className="col-md-6">
            <img
              src={memeData.image ? URL.createObjectURL(memeData.image) : ''}
              alt="Selected Meme"
              className="img-fluid"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="textTop"
              placeholder="Top Text"
              value={memeData.textTop}
              onChange={handleMemeChange}
            />
            <input
              type="text"
              name="textBottom"
              placeholder="Bottom Text"
              value={memeData.textBottom}
              onChange={handleMemeChange}
            />
            <button
              type="button"
              onClick={handleGenerateMeme}
              className="btn btn-primary"
              style={{
                backgroundColor: '#775088',
              }}
            >
              Generate Meme
            </button>
          </div>
        </div>
      </div>
    );
  };
export default CreateMemePage;
