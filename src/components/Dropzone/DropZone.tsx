import React, { useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import './DropZone.scss';

type memeProps = {
  meme: File | null;
  setMeme: (boolean: any) => void;
};

function DropZone({ meme, setMeme }: memeProps) {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Function to handle file drop
  const handleDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    // Gérer les fichiers acceptés ici
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setMeme(file);

      // When the file is read it triggers the onload event
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          // Check if the result is not null
          setFilePreview(e.target.result as string); // Update filePreview state with generated URL
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
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setFilePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteMeme = () => {
    setMeme(null);
    setFilePreview(null);
  };

  return (
    <div>
      {filePreview ? (
        <div>
          <button onClick={deleteMeme}>X</button>
          <img src={filePreview} alt="Prévisualisation" />
        </div>
      ) : (
        <div className="dropzoneStyle">
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
                    }}
                    type="file"
                    name="meme"
                    onChange={handleFileChange}
                  />
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      )}
    </div>
  );
}

export default DropZone;
