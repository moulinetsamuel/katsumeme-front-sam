import React from 'react';
import { Button } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa6';
import './ButtonDownload.scss';

type DownloadButtonProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  label: string;
};

function DownloadMeme({ label, canvasRef }: DownloadButtonProps) {
  const handleDownload = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL(); // Convertir le contenu du canvas en URL de données
    const link = document.createElement('a');
    link.download = `Katsumeme_${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`; // Nom du fichier à télécharger
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="dl-button">
      <Button
        onClick={handleDownload}
        className="Button"
        style={{
          color: 'white',
          background: '#775088',
          border: 'transparent',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FaDownload />
        {label}
      </Button>
    </div>
  );
}

export default DownloadMeme;
