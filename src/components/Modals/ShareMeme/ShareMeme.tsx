import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../API/axios';
import { useState } from 'react';
import './ShareMeme.scss';
import DropZone from '../../Dropzone/DropZone';
import { IoIosRocket } from 'react-icons/io';
import useUserStore from '../../UserStore/UserState';

type ShareMemeProps = {
  hide: boolean;
  onHide: (boolean: any) => void;
};

function ShareMeme({ hide, onHide }: ShareMemeProps) {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [meme, setMeme] = useState<File | null>(null);

  const [success, setSucces] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [tagsError, setTagsError] = useState('');
  const { incrementUploadCount } = useUserStore();

  const handleClose = () => {
    setTags('');
    setTitle('');
    setMeme(null);
    setFilePreview(null);
    onHide(false);
  };

  const upload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const tagsArrayUpdated = tags.split(' / ');

      const dataForm = {
        meme: meme,
        title: title,
        tags: tagsArrayUpdated,
      };

      await axiosInstance.post('/api/memes', dataForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSucces(true);

      incrementUploadCount();

      handleClose();
    } catch (error) {
      if ((error as any).response?.status === 400) {
        const details = (error as any).response.data.message.details;
        if (Array.isArray(details)) {
          details.forEach((detail) => {
            switch (detail.path[0]) {
              case 'title':
                setTitleError(detail.message);
                break;
              case 'tags':
                setTagsError(detail.message);
                break;
              default:
                break;
            }
          });
        } else {
          setErrorMessage('An error occured');
        }
      }
    }
  };

  const handleInputChangeTitle = () => {
    setTitleError('');
  };

  const handleInputChangeTags = () => {
    setTagsError('');
  };

  return (
    <div>
      <Modal show={hide} onHide={handleClose}>
        <Modal.Header closeButton className="modalBannerStyle">
          <Modal.Title>Partager un meme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={upload} encType="multipart/form-data">
            <DropZone meme={meme} setMeme={setMeme} />
            <Form.Group
              className="mb-3"
              controlId="title"
              style={{ marginTop: '0.5rem' }}
            >
              <Form.Control
                type="text"
                placeholder="Titre"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                  handleInputChangeTitle();
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
                  setTags(e.target.value.replace(/,/g, ' / '));
                  handleInputChangeTags();
                }}
                value={tags}
              />
              <Form.Text className="text-muted">
                Pour ajouter plusieurs tags ","
              </Form.Text>
              <p>{tagsError}</p>
            </Form.Group>

            <p>{errorMessage}</p>
            <div className="text-center d-grid">
              <Button
                type="submit"
                style={{
                  gap: '0.5rem',
                  background: '#e8811c',
                  color: 'black',
                  border: 'transparent',
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <IoIosRocket />
                Publier
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ShareMeme;
