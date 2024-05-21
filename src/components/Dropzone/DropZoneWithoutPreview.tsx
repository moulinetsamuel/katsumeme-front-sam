import React, { useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import './DropZone.scss';

type MemeProps = {
  setMeme: (file: File | null) => void;
  setMemeResp: (file: File | null) => void;
};

function DropZoneWithoutPreview({ setMeme, setMemeResp }: MemeProps) {
  const [fileImported, setFileImported] = useState<boolean>(false); // State to track if a file has been imported

  // Function to handle file drop
  const handleDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    // Gérer les fichiers acceptés ici
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setMeme(file);
      setMemeResp(file);
      setFileImported(true); // Set fileImported state to true
    }

    // Gérer les rejets de fichiers si nécessaire
    if (fileRejections && fileRejections.length > 0) {
      console.log('Fichiers rejetés :', fileRejections);
    }
  };

  const deleteMeme = () => {
    setMeme(null);
    setMemeResp(null);
    setFileImported(false);
  };

  return (
    <div
      className="dropzoneStyle"
      style={{ position: 'relative', textAlign: 'center' }}
    >
      <button
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translate(-100%, -50%)',
          marginTop: '2rem',
        }}
        onClick={deleteMeme}
      >
        X
      </button>
      {!fileImported && (
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input
                  {...getInputProps({
                    accept: '.jpg,.jpeg,.png,.gif',
                  })}
                  style={{
                    border: 'dashed',
                    width: '25rem',
                    height: '15rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(119, 80, 136, 0.5)',
                    marginTop: '1.5rem',
                  }}
                  type="file"
                  name="meme"
                />
              </div>
            </section>
          )}
        </Dropzone>
      )}
    </div>
  );
}

export default DropZoneWithoutPreview;
