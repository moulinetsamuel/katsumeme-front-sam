import { useRef, useState } from 'react';
import DropZoneWithoutPreview from '../Dropzone/DropZoneWithoutPreview';
import './CreateMemePage.scss';
import MemeEditor from '../MemeEditor/MemeEditor';
import ButtonPublish from '../Button/ButtonPublish/ButtonPublish';
import DownloadMeme from '../Button/ButtonDownload/ButtonDownload';

function CreateMemePage() {
  const [meme, setMeme] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="CreateMemePage">
      <div className="content-container">
        <DropZoneWithoutPreview setMeme={setMeme} />
        <MemeEditor meme={meme} canvasRef={canvasRef} />
      </div>
      {/* 
      <div className="CreateMemePageButton">
        <ButtonPublish label="Publier" canvasRef={canvasRef} />
        <DownloadMeme label="Télécharger" canvasRef={canvasRef} />
      </div>
      */}
    </div>
  );
}

export default CreateMemePage;
