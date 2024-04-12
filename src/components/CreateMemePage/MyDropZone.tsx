import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  /* flexDirection: 'row', */
  /* flexWrap: 'wrap', */
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: '30rem',
  height: '30rem',
  padding: 4,
  /* boxSizing: 'border-box', */
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

interface FileWithPreview extends File {
  preview: string;
}

function Previews({ onChange }: { onChange: (file: File) => void }) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      const filesWithPreview: FileWithPreview[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(filesWithPreview);
      onChange(filesWithPreview[0]); // Call onChange with the first image
    },
  });

  const thumbs =
    files.length === 1 ? (
      <div style={thumb} key={files[0].name}>
        <div style={thumbInner}>
          <img
            alt=""
            src={files[0].preview}
            style={img}
            // ...
          />
        </div>
      </div>
    ) : null;

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag and drop le fichier ou sélectionnez en un.</p>
      </div>
    </section>
  );
}

export default Previews;
