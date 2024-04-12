import { IoIosShareAlt } from 'react-icons/io';
import './ButtonShare.scss';
import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import Signin from '../Modals/Signin/Signin';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosInstance from '../API/axios';

function ButtonShare() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();

  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [tags, setTags] = useState('');
  const [title, setTitle] = useState('');
  const [meme, setMeme] = useState('');

  const [success, setSucces] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [tagsError, setTagsError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const upload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        '/api/memes',
        JSON.stringify({
          meme,
          title,
          tags,
        }),
        {
          headers: { 'Content-type': 'application/json' },
          withCredentials: false,
        }
      );

      console.log(JSON.stringify(response?.data));

      setTitle('');
      setTags('');
      setMeme('');

      setSucces(true);

      handleClose();
    } catch (error) {
      console.error(error);
      if (!error?.response) {
        setErrorMessage('No server response');
      } else if (error.response?.status === 400) {
        const details = error.response.data.message.details;
        if (Array.isArray(details)) {
          details.forEach((detail) => {
            switch (detail.path[0]) {
              case 'title':
                setTitleError(detail.message);
                break;
              case 'tags':
                setTagsError(detail.message);
              default:
                break;
            }
          });
        } else {
          setErrorMessage(error.response.data.message);
        }
      }
    }
  };

  const handleShareButtonClick = () => {
    if (!isLoggedIn) {
      setShow(true);
    } else {
      navigate('/Signin');
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const filePreviewURL = URL.createObjectURL(file);
    setFilePreview(filePreviewURL);
  };

  const handleInputChangeTitle = () => {
    setTitleError('');
  };

  const handleInputChangeTags = () => {
    setTagsError('');
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={handleShareButtonClick}
        className="Button"
        typeof="button"
        style={{
          color: 'white',
          background: '#775088',
          border: 'transparent',
          borderRadius: '1rem',
        }}
      >
        <IoIosShareAlt />
        Partager un meme
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Partager un meme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={upload}>
            <div className="dropzoneStyle">
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input
                        {...getInputProps()}
                        style={{
                          border: 'solid',
                          width: '10rem',
                          height: '2rem',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'rgb(173, 173, 173)',
                        }}
                        type="file"
                        name="meme"
                        onChange={(e) => setMeme(e.target.value)}
                        value={meme}
                      />
                    </div>
                    {filePreview && (
                      <div>
                        <img src={filePreview} alt="Prévisualisation" />
                      </div>
                    )}
                  </section>
                )}
              </Dropzone>
            </div>
            <Form.Group className="mb-3" controlId="title">
              <Form.Control
                type="text"
                placeholder="Titre"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                  handleInputChangeTitle;
                }}
                value={title}
              />
              <p>{titleError}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
              <Form.Control
                type="text"
                placeholder="tags..."
                name="tags"
                onChange={(e) => {
                  setTags(e.target.value);
                  handleInputChangeTags;
                }}
                value={tags}
              />
              <p>{tagsError}</p>
            </Form.Group>
            <Button variant="primary" type="submit">
              Importer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ButtonShare;
