import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'react-bootstrap';

interface MemeEditorProps {
  isLogged: boolean;
}

function MemeEditor(props: MemeEditorProps) {
  const { isLogged } = props;

  const [image, setImage] = useState<File | null>(null);
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const generateMeme = () => {
    if (!canvasRef.current || !image) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx?.drawImage(img, 0, 0);

      //ctx?.fillStyle = 'white';
      // ctx?.font = '40px sans-serif';
      // ctx?.textAlign = 'center';

      ctx?.fillText(topText, canvas.width / 2, 50);
      ctx?.fillText(bottomText, canvas.width / 2, canvas.height - 50);
    };
  };

  const publishMeme = () => {
    if (!isLogged) {
      alert('Veuillez vous connecter pour publier un meme.');
      return;
    }

    if (!canvasRef.current) {
      return;
    }
  };

  const downloadMeme = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const link = document.createElement('a');

    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="container-fluid">
      {' '}
      {/* Container for full-width */}
      <div className="row">
        <div className="col-md-6">
          {' '}
          {/* Left column (image upload) */}
          <div className="image-upload" {...getRootProps()}>
            <input {...getInputProps()} />
            {!image && (
              <p>Drag and drop ou cliquez pour télécharger une image</p>
            )}
            {image && (
              <img src={URL.createObjectURL(image)} alt="uploaded meme" />
            )}
          </div>
        </div>
        <div className="col-md-6">
          {' '}
          {/* Right column (text inputs & actions) */}
          <div className="text-inputs">
            <input
              type="text"
              placeholder="Top Text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
            <input
              type="text"
              placeholder="Bottom Text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
          </div>
          <div className="meme-actions">
            <Button onClick={generateMeme}>Generate</Button>
            <Button onClick={publishMeme} disabled={!isLogged}>
              Publier
            </Button>
            <Button onClick={downloadMeme}>Download</Button>
          </div>
          <div className="generated-meme">
            {/* Display generated meme here (initially empty) */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemeEditor;
