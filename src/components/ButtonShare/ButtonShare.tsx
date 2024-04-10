import { IoIosShareAlt } from 'react-icons/io';
import './ButtonShare.scss';
import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import Signin from '../Modals/Signin/Signin';
import { Navigate, useNavigate } from 'react-router-dom';

function ButtonShare() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track if user is login or not
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                      name="meme"
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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Titre" name="title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="tags..." name="tags" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Importer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ButtonShare;
