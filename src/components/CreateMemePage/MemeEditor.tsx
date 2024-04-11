import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Previews from './MyDropZone';
import './MemeEditor.scss';

// Function to split text into multiple lines
// Function to split text into multiple lines
const splitTextIntoLines = (
  text: string,
  maxWidth: number,
  ctx: CanvasRenderingContext2D
) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  lines.push(currentLine);
  return lines;
};

function MemeEditor() {
  const [image, setImage] = useState<File | null>(null);
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null); // Reference to the canvas element

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  const handleTopText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopText(e.target.value);
  };

  const handleBottomText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBottomText(e.target.value);
  };

  // Function to setup text styles
  const setupTextStyles = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'white';
    ctx.font = '40px inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
  };

  useEffect(() => {
    const generateText = () => {
      if (!canvasRef.current || !image) return; // handle the case where the canvas or image is null

      const canvas = canvasRef.current; // To interact with the canvas, we need to get the 2D context.
      const ctx = canvas.getContext('2d'); // 2D to render shapes, text, images, etc.

      const img = new Image(); // Create an image element
      img.src = URL.createObjectURL(image); // Set the image source to the uploaded image

      img.onload = () => {
        if (!canvasRef.current || !ctx) return; // handle the case where the canvas or context is null

        canvas.width = img.width; // Set dimensions
        canvas.height = img.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing the image
        ctx.drawImage(img, 0, 0); // Draw the image on the canvas

        // Call the function to setup text styles
        setupTextStyles(ctx);

        const maxLineWidth = canvas.width - 100; // Maximum width for the text (100 pixels from each side)
        const lineHeight = 50; // Height of each line

        // Split top and bottom text into multiple lines if needed
        const topLines = splitTextIntoLines(topText, maxLineWidth, ctx);
        const bottomLines = splitTextIntoLines(bottomText, maxLineWidth, ctx);

        // Draw top text
        topLines.forEach((line, index) => {
          ctx.fillText(line, canvas.width / 2, 50 + index * lineHeight);
        });

        // Draw bottom text
        bottomLines.forEach((line, index) => {
          ctx.fillText(
            line,
            canvas.width / 2,
            canvas.height - 50 - (bottomLines.length - index - 1) * lineHeight
          );
        });
      };
    };

    generateText(); // Call generateText when component mounts or when image, topText, or bottomText changes
  }, [image, topText, bottomText]);

  const downloadMeme = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the original image
    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Call the function to setup text styles
      setupTextStyles(ctx);

      // Split top and bottom text into multiple lines if needed
      const maxLineWidth = canvas.width - 100; // Maximum width for the text (100 pixels from each side)
      const topLines = splitTextIntoLines(topText, maxLineWidth, ctx);
      const bottomLines = splitTextIntoLines(bottomText, maxLineWidth, ctx);

      // Draw the top text
      topLines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, 50 + index * 50);
      });

      // Draw the bottom text
      bottomLines.forEach((line, index) => {
        ctx.fillText(
          line,
          canvas.width / 2,
          canvas.height - 50 - (bottomLines.length - index - 1) * 50
        );
      });

      // Convert the canvas content to a data URL
      const dataURL = canvas.toDataURL();

      // Create an anchor element to trigger the download"
      const link = document.createElement('a');
      link.download = 'Katsumeme.png';
      link.href = dataURL;
      link.click();
    };
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          <div className="dropzone">
            <Previews onChange={handleImageChange} />
          </div>
        </div>
        <div className="col-md-7">
          <canvas ref={canvasRef} width={500} height={500} />
          <div className="meme-container">
            <div className="text-inputs">
              <input
                className="top-text form-control col-lg-8"
                type="text"
                placeholder="Top Text"
                value={topText}
                onChange={handleTopText}
              />
              <input
                className="bottom-text form-control col-lg-8"
                type="text"
                placeholder="Bottom Text"
                value={bottomText}
                onChange={handleBottomText}
              />
            </div>
          </div>
          <div className="meme-actions">
            <Button onClick={downloadMeme}>Download</Button>
          </div>
          {/* <Button OnClick={Publier}> Publier</Button> */}
        </div>
      </div>
    </div>
  );
}

export default MemeEditor;
