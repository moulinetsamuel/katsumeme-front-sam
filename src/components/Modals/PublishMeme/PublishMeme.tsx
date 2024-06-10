import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../API/axios';
import React, { useEffect, useState } from 'react';
import './PublishMeme.scss';
import { IoIosRocket } from 'react-icons/io';
import useUserStore from '../../UserStore/UserState';
import { useNavigate } from 'react-router-dom';

type PublishMemeProps = {
  hide: boolean;
  onHide: (boolean: any) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

function PublishMeme({ hide, onHide, canvasRef }: PublishMemeProps) {
  const [tags, setTags] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [meme, setMeme] = useState<File | null>(null);

  const [success, setSucces] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [tagsError, setTagsError] = useState('');

  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const { incrementUploadCount } = useUserStore();

  const handleClose = () => {
    setTags('');
    setTitle('');
    setMeme(null);
    onHide(false);
  };

  const canvasToFile = async (
    canvas: HTMLCanvasElement | null
  ): Promise<File | null> => {
    if (!canvas) {
      return null;
    }
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
        } else {
          const file = new File([blob], 'meme.png', { type: 'image/png' });

          resolve(file);
        }
      }, 'image/png');
    });
  };

  const upload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const memeFile = await canvasToFile(canvasRef.current);

      const tagsArrayUpdated = tags.split(' / ');

      const dataForm = {
        meme: memeFile,
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
      navigate('/');
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

  const generatePreview = async () => {
    if (!canvasRef.current) {
      return;
    }
    const previewFile = await canvasToFile(canvasRef.current);

    setPreviewFile(previewFile);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generatePreview();
    }, 300); // Délai en millisecondes avant de générer la preview
    return () => clearTimeout(timeoutId);
  }, [canvasRef.current, meme, hide]);

  return (
    <div>
      <Modal show={hide} onHide={handleClose}>
        <Modal.Header closeButton className="modalBannerStyle">
          <Modal.Title>Publiez votre meme !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={upload} encType="multipart/form-data">
            {previewFile && (
              <img src={URL.createObjectURL(previewFile)} alt="Preview" />
            )}
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
                  color: '#ffffff',
                  border: 'transparent',
                }}
                className="CustomButton d-flex justify-content-center align-items-center"
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

export default PublishMeme;
