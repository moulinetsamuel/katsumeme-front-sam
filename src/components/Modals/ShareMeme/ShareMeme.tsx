import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../API/axios';
import { useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import FileWithPreview from 'react-dropzone';
import { type } from 'os';

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
  const defaultFile = new File([], 'default.jpg', { type: 'image/jpeg' });

  // const [tagsArray, setTagsArray] = useState<string[]>([]);

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

      const response = await axiosInstance.post('/api/memes', dataForm, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSucces(true);

      handleClose();
    } catch (error) {
      if (error.response?.status === 400) {
        const details = error.response.data.message.details;
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

  const handleFilePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        setFilePreview(e.target.result as string);
      }
    };

    reader.readAsDataURL(file);
  };

  // Function to handle file drop
  const handleDrop = (
    acceptedFiles: FileWithPreview[],
    fileRejections: FileRejection[]
  ) => {
    // Gérer les fichiers acceptés ici
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setMeme(file);
      handleFilePreview(file);

      // When the file is read it triggers the onload event
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          // Check if the result is not null
          setFilePreview(e.target.result as string); // Update filePreview state with generated URL
          setMeme(file);
        }
      };

      reader.readAsDataURL(file); // Generate preview URL asynchronously
    }

    // Gérer les rejets de fichiers si nécessaire
    if (fileRejections && fileRejections.length > 0) {
      console.log('Fichiers rejetés :', fileRejections);
    }
  };

  // Function to preview file when selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setMeme(file);
      // Pass an array with the selected file and an empty array for rejections
      handleDrop([file], []);
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
        <Modal.Header closeButton>
          <Modal.Title>Partager un meme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={upload} encType="multipart/form-data">
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
                        onChange={handleFileChange}
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

            <Button variant="primary" type="submit">
              Publier
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ShareMeme;
