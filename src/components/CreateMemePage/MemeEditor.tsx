import React, { useState, useRef, useEffect } from 'react';
import { Button, Stack, Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Previews from './MyDropZone';
import './MemeEditor.scss';

// Function to split text into multiple lines
const splitTextIntoLines = (
  text: string,
  maxWidth: number,
  ctx: CanvasRenderingContext2D
) => {
  // Split the text into words using the space character as the separator
  const words = text.split(' ');
  // Create an array to store the lines
  const lines = [];
  // Create a variable to store the current line
  let currentLine = '';
  // Initialize the current line width
  let currentLineWidth = 0;

  // Loop through each word
  words.forEach((word) => {
    const wordWidth = ctx.measureText(word).width;
    const testLine = currentLine === '' ? word : `${currentLine} ${word}`;
    const testLineWidth = ctx.measureText(testLine).width;
    // If the test line is less than the max width, add the word to the current line
    if (testLineWidth > maxWidth && currentLineWidth > 0) {
      lines.push(currentLine);
      currentLine = word;
      currentLineWidth = wordWidth;
    } else {
      currentLine = testLine;
      // Add the word width to the current line width
      currentLineWidth += wordWidth;
    }
  });
  // Add the current line to the lines array
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
    ctx.font = '40px impact';
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
    <div className="meme-container">
      <Stack direction="horizontal" gap={3}>
        <Row>
          <Col md={5} className="dropzone ms-auto">
            <Previews onChange={handleImageChange} />
          </Col>
          <Col md={7} className="img ms-auto">
            <canvas ref={canvasRef} width={500} height={500} />{' '}
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
          </Col>{' '}
          <div className="dl-button">
            <Button onClick={downloadMeme}>Télécharger</Button>
          </div>
        </Row>
      </Stack>
    </div>
  );
}

export default MemeEditor;
